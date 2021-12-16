const mongoose = require('mongoose');

let CandidatesSchema = new mongoose.Schema({
	name: String,
	idNumber: String,
	email: String,
	phone: String,
	offers: Boolean,
	gender: String,
	birthDate: Date,
	wantedJobs: [String],
	certificates: [String],
	experienceYears: String,
	requiredJobScale: [String],
	requiredJobAreas: [String],
	pastRoles: [String],
	pastFieldOfActivity: [String],
	salaryExpectations: String,
	freeText: String,
	cv: String,
	creationDate: Date,
	fromWhere: [String],
	insight: String,
	driveId: String,
	cvContent: String,
	status: [String],
});

module.exports = mongoose.model('candidates', CandidatesSchema);
