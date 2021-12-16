const mongoose = require('mongoose');

let JobsSchema = new mongoose.Schema({
	id: String,
	jobNumber: Number,
	creationDate: Date,
	company: String,
	jobContactId: String,
	poc: String,
	pocEmail: String,
	pocPhone: String,
	companyToPublish: String,
	companyDescription: String,
	jobDescriprion: String,
	jobRequirements: String,
	landingPageLink: String,
	industryId: String,
	industryName: String,
	subscriptions: [String],
	notes: String,
});

module.exports = mongoose.model('jobs', JobsSchema);
