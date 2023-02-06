const Quest = require('../models/Quest');
const UserQuest = require('../models/UserQuest');
const userService = require('./user.service');

exports.createQuest = (questDetails) => new Quest(questDetails).save();

exports.getQuestById = (id) => Quest.findById(id);

exports.getAllQuests = () => Quest.find();

exports.updateQuest = (id, questDetails) =>
  Quest.findByIdAndUpdate(id, questDetails);

exports.deleteQuest = (id) => Quest.findByIdAndDelete(id);

exports.questExists = (filter) => Quest.exists(filter);

exports.questRewardClaimed = async (userId, questId) =>
  await UserQuest.exists({ user: userId, quest: questId });

exports.claimQuestReward = async (userId, questId) => {
  const quest = await Quest.findById(questId);
  if (!quest) throw new Error('Quest not found');

  const questRewardClaimed = await this.questRewardClaimed(userId, questId);
  if (questRewardClaimed) throw new Error('Quest Reward Already Claimed');

  await UserQuest.create({ user: userId, quest: questId });
  await userService.increaseUnclaimedBalance(userId, quest.reward);
};
