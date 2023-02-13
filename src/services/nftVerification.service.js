const { XummSdk } = require('xumm-sdk');
const xrpl = require('xrpl');
const NftTransaction = require('../models/NftTransaction');
const userService = require('../services/user.service');
const settingService = require('../services/setting.service');

const { XUMM_API_KEY, XUMM_API_SECRET, XRPL_CLUSTER, BROKER_ADDRESS } =
  process.env;

const xummSdk = new XummSdk(XUMM_API_KEY, XUMM_API_SECRET);

exports.xummSignInInfo = async () => {
  const request = {
    TransactionType: 'SignIn',
  };

  const subscription = await xummSdk.payload.createAndSubscribe(
    request,
    async (event) => {
      const { signed, payload_uuidv4 } = event.data;

      if (signed) {
        const { response } = await xummSdk.payload.get(payload_uuidv4);
        return response.account;
      }
    }
  );

  return {
    authUrl: subscription.created.next.always,
    qrImageUrl: subscription.created.refs.qr_png,
    subscription,
  };
};

exports.claimNftReward = async (account) => {
  const xrplClient = new xrpl.Client(XRPL_CLUSTER);

  await xrplClient.connect();

  const response = await xrplClient.request({
    account,
    command: 'account_tx',
    ledger_index_min: -1,
    ledger_index_max: -1,
    binary: false,
    limit: 100,
    forward: false,
  });

  xrplClient.disconnect();

  const { transactions } = response.result;

  const filteredTxs = transactions.filter(
    ({ tx }) => tx.TransactionType === 'NFTokenAcceptOffer' && tx.Account === BROKER_ADDRESS
  ).map(({tx}) => tx);

  const txHashes = filteredTxs.map(tx => tx.hash);
  const existingTxs = await NftTransaction.find({ hash: { $in: txHashes }});

  const newTxs = filteredTxs.filter(ftx => !existingTxs.find(etx => etx.hash === ftx.hash));
  
  if (newTxs.length === 0) return 0;

  const user = await userService.getUser({ walletAddress: account });
  
  await NftTransaction.insertMany(
    newTxs.map((tx) => new NftTransaction({ hash: tx.hash, user: user._id }))
  );

  const nftReward = await settingService.getNftReward();
  const reward = nftReward * newTxs.length;

  await userService.increaseUnclaimedBalance(user._id, reward);

  return reward;
};
