const Quest = require('../models/Quest');
const QuestApplication = require('../models/QuestApplication');
const UserQuest = require('../models/UserQuest');
const userService = require('./user.service');

exports.createQuest = (questDetails) => Quest.create(questDetails);

exports.getQuestById = (id) => Quest.findById(id);

exports.getQuest = (filter) => Quest.findOne(filter);

exports.getAllQuests = () => Quest.find();

exports.getCompletedQuests = async (userId) => {
  const userQuests = await UserQuest.find({ user: userId });
  const completedQuestIds = userQuests.map((q) => q.quest);
  const completedQuests = await Quest.find({ _id: { $in: completedQuestIds } });
  return completedQuests;
};

exports.getPendingQuests = async (userId) => {
  const completedQuests = await this.getCompletedQuests(userId);
  const completedQuestsIds = completedQuests.map((q) => q._id);
  const pendingQuests = await Quest.find({ _id: { $nin: completedQuestsIds } });
  return pendingQuests;
};

exports.updateQuest = (id, questDetails) =>
  Quest.findByIdAndUpdate(id, questDetails);

exports.deleteQuest = (id) => Quest.findByIdAndDelete(id);

exports.questExists = (filter) => Quest.exists(filter);

exports.questRewardClaimed = async (userId, questId) =>
  await UserQuest.exists({ user: userId, quest: questId });

exports.claimQuestReward = async (userId, questId) => {
  await this.markQuestClaimed(userId, questId);
  const quest = await this.getQuestById(questId)
  await userService.increaseUnclaimedBalance(userId, quest.reward);
};

exports.markQuestClaimed = async (userId, questId) => {
  const quest = await Quest.findById(questId);
  if (!quest) throw new Error('Quest not found');

  const questRewardClaimed = await this.questRewardClaimed(userId, questId);
  if (questRewardClaimed) throw new Error('Quest Reward Already Claimed');

  await UserQuest.create({ user: userId, quest: questId });
}

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
