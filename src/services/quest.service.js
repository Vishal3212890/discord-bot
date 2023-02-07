const Quest = require('../models/Quest');
const QuestApplication = require('../models/QuestApplication');
const UserQuest = require('../models/UserQuest');
const userService = require('./user.service');

exports.createQuest = (questDetails) => Quest.create(questDetails);

exports.getQuestById = (id) => Quest.findById(id);

exports.getQuest = (filter) => Quest.findOne(filter);

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

exports.createQuestApplication = async (userId, questId) => {
  const questRewardClaimed = await this.questRewardClaimed(userId, questId);
  if (questRewardClaimed) throw new Error('Quest Reward Already Claimed');

  const questApplicationExists = await this.questApplicationSubmitted(userId, questId);
  if (questApplicationExists) throw new Error('Quest Application Already Exists');

  return await QuestApplication.create({ user: userId, quest: questId });
};

exports.getQuestApplicationById = (id) => QuestApplication.findById(id);

exports.questApplicationSubmitted = async (userId, questId) =>
  QuestApplication.exists({
    user: userId,
    quest: questId,
  });

exports.acceptQuestApplication = async (applicationId) => {
  const questApplication = await this.getQuestApplicationById(applicationId);
  if (!questApplication) throw new Error('Quest Application not found');

  const { user: userId, quest: questId } = questApplication;
  
  await this.claimQuestReward(userId, questId);
 
  await questApplication.delete();
};

exports.rejectQuestApplication = async (applicationId) => {
  const questApplication = await this.getQuestApplicationById(applicationId);
  if (!questApplication) throw new Error('Quest Application not found');

  await questApplication.delete();
};
