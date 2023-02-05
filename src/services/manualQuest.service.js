const ManualQuest = require('../models/ManualQuest');

exports.createManualQuest = (questDetails) =>
  new ManualQuest(questDetails).save();

exports.getManualQuestById = (id) => ManualQuest.findById(id);

exports.questExists = (filter) => ManualQuest.exists(filter);

exports.getAllManualQuests = () => ManualQuest.find();

exports.updateManualQuest = (id, questDetails) =>
  ManualQuest.findByIdAndUpdate(id, questDetails);

exports.deleteManualQuest = (id) => ManualQuest.findByIdAndDelete(id);
