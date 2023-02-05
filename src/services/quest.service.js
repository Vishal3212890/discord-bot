const Quest = require('../models/Quest');

exports.createQuest = (questDetails) => new Quest(questDetails).save();

exports.getQuestById = (id) => Quest.findById(id);

exports.getAllQuests = () => Quest.find();

exports.updateQuest = (id, questDetails) =>
  Quest.findByIdAndUpdate(id, questDetails);

exports.deleteQuest = (id) => Quest.findByIdAndDelete(id);

exports.questExists = (filter) => Quest.exists(filter);
