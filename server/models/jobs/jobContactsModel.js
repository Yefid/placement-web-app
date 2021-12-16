const mongoose = require('mongoose');

let JobsContactsSchema = new mongoose.Schema({
	contactId: String,
	creationDate: Date,
	companyName: String,
	poc: String,
	pocEmail: String,
	pocPhone: String,
	notes: String,
});

module.exports = mongoose.model('jobscontacts', JobsContactsSchema);
