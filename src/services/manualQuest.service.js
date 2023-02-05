const ManualQuest = require('../models/ManualQuest');

exports.createManualQuest = (questDetails) =>
  new ManualQuest(questDetails).save();

exports.getManualQuestById = (id) => ManualQuest.findById(id);

exports.getAllManualQuests = () => ManualQuest.find();

exports.updateManualQuest = (id, questDetails) =>
  ManualQuest.updateOne(id, questDetails);

exports.deleteManualQuest = (id) => ManualQuest.deleteOne(id);
