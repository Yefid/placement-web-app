const Candidate = require('./candidatesModel');
const candidateMailerBL = require('./candidateMailerBL');
const candidateCVUploadBL = require('./candidateCVUploadBL');
const path = require('path');

exports.getLimitedCandidates = function () {
	return new Promise((resolve, reject) => {
		Candidate.find({}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		})
			.limit(50) //limit returned items
			.sort({ creationDate: -1 }); //sorting for last returning latest items
	});
};

exports.getAllCandidates = function () {
	return new Promise((resolve, reject) => {
		Candidate.find({}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
		//.limit(50) //limit returned items
		//.sort({ creationDate: -1 }); //sorting for last returning latest items
	});
};

exports.getCandidate = function (id) {
	return new Promise((resolve, reject) => {
		console.log('in get function');
		Candidate.findById(id, function (err, data) {
			if (err) {
				console.log('err');
				reject(err);
			} else {
				console.log('resolve');
				resolve(data);
			}
		});
	});
};

exports.addCandidate = function (obj) {
	console.log(obj);
	return new Promise((resolve, reject) => {
		let candidate = new Candidate({
			name: obj.name,
			idNumber: obj.idNumber,
			email: obj.email,
			phone: obj.phone,
			offers: obj.offers,
			gender: obj.gender,
			birthDate: obj.birthDate,
			wantedJobs: obj.wantedJobs,
			certificates: obj.certificates,
			experienceYears: obj.experienceYears,
			requiredJobScale: obj.requiredJobScale,
			requiredJobAreas: obj.requiredJobAreas,
			pastRoles: obj.pastRoles,
			pastFieldOfActivity: obj.pastFieldOfActivity,
			salaryExpectations: obj.salaryExpectations,
			freeText: obj.freeText,
			cv: obj.cv,
			creationDate: new Date().toISOString(),
			fromWhere: obj.fromWhere,
			insight: obj.insight,
			driveId: obj.driveId,
			cvContent: obj.cvContent,
			status: obj.status,
		});

		candidate.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve('Created  with id : ' + candidate._id);
			}
		});
	});
};
exports.addCandidatesFromMail = async (objects) => {
	for (const obj of objects) {
		await addCandidateFromMail(obj);
	}
};
const addCandidateFromMail = async (element) => {
	console.log(element);
	//1. downloading attachment
	const resp = await candidateMailerBL.downloadAttachments(
		element.messageId,
		element.attachmentID,
		element.attachmentEncoding,
		element.filename
	);
	console.log(resp);

	let fileName = element.filename;
	let name = element.subject;
	let ext = path.extname(fileName);
	let newFileName = name + '-CV-' + Date.now() + ext;

	let { fileText, cvId } = await candidateCVUploadBL.uploadCVFromMail(
		fileName,
		newFileName
	);

	return new Promise((resolve, reject) => {
		let candidate = new Candidate({
			name: name,
			idNumber: null,
			email: null,
			phone: null,
			offers: null,
			gender: null,
			birthDate: '1900-01-01',
			wantedJobs: [],
			certificates: [],
			experienceYears: null,
			requiredJobScale: [],
			requiredJobAreas: [],
			pastRoles: [],
			pastFieldOfActivity: [],
			salaryExpectations: null,
			freeText: null,
			cv: newFileName,
			creationDate: new Date().toISOString(),
			fromWhere: element.jobNumber,
			insight: null,
			driveId: cvId,
			cvContent: fileText,
			status: [],
		});
		candidate.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve('Created  with id : ' + candidate._id);
			}
		});
	});
};

exports.updateCandidate = function (id, obj) {
	return new Promise((resolve, reject) => {
		Candidate.findByIdAndUpdate(
			id,
			{
				name: obj.name,
				idNumber: obj.idNumber,
				email: obj.email,
				phone: obj.phone,
				offers: obj.offers,
				gender: obj.gender,
				birthDate: obj.birthDate,
				wantedJobs: obj.wantedJobs,
				certificates: obj.certificates,
				experienceYears: obj.experienceYears,
				requiredJobScale: obj.requiredJobScale,
				requiredJobAreas: obj.requiredJobAreas,
				pastRoles: obj.pastRoles,
				pastFieldOfActivity: obj.pastFieldOfActivity,
				salaryExpectations: obj.salaryExpectations,
				freeText: obj.freeText,
				cv: obj.cv,
				fromWhere: obj.fromWhere,
				insight: obj.insight,
				driveId: obj.driveId,
				cvContent: obj.cvContent,
				status: obj.status,
			},
			function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Updated');
				}
			}
		);
	});
};

exports.deleteCandidate = function (id) {
	return new Promise((resolve, reject) => {
		Candidate.findByIdAndDelete(id, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('Deleted !');
			}
		});
	});
};
