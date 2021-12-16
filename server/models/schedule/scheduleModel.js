const mongoose = require('mongoose');

let ScheduleSchema = new mongoose.Schema({
	id: String,
	creationDate: String,
	dateTime: String,
	candidateName: String,
	candidateId: String,
	jobDescriprion: String,

	jobId: String,
	status: String,


});

module.exports = mongoose.model('schedules', ScheduleSchema);
