const Job = require('./jobsModel');

exports.getAllJobs = function () {
	return new Promise((resolve, reject) => {
		Job.find({}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

exports.getJob = function (id) {
	return new Promise((resolve, reject) => {
		Job.findById(id, function (err, data) {
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

exports.addJob = function (obj) {
	console.log(obj);
	return new Promise((resolve, reject) => {
		let job = new Job({
			jobNumber: obj.jobNumber,
			company: obj.company,
			poc: obj.poc,
			pocEmail: obj.pocEmail,
			pocPhone: obj.pocPhone,
			companyToPublish: obj.companyToPublish,
			companyDescription: obj.companyDescription,
			jobDescriprion: obj.jobDescriprion,
			jobRequirements: obj.jobRequirements,
			landingPageLink: obj.landingPageLink,
			subscriptions: obj.subscriptions,
			industryId: obj.industryId,
			industryName: obj.industryName,
			creationDate: new Date().toISOString(),
			notes: obj.notes,
			jobContactId: obj.jobContactId,
		});

		job.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve('Created  with id : ' + job._id);
			}
		});
	});
};

exports.updateJob = function (id, obj) {
	return new Promise((resolve, reject) => {
		Job.findByIdAndUpdate(
			id,
			{
				jobNumber: obj.jobNumber,
				company: obj.company,
				poc: obj.poc,
				pocEmail: obj.pocEmail,
				pocPhone: obj.pocPhone,
				companyToPublish: obj.companyToPublish,
				companyDescription: obj.companyDescription,
				jobDescriprion: obj.jobDescriprion,
				jobRequirements: obj.jobRequirements,
				landingPageLink: obj.landingPageLink,
				subscriptions: obj.subscriptions,
				industryId: obj.industryId,
				industryName: obj.industryName,
				notes: obj.notes,
				jobContactId: obj.jobContactId,
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

exports.deleteJob = function (id) {
	return new Promise((resolve, reject) => {
		Job.findByIdAndDelete(id, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('Deleted !');
			}
		});
	});
};

exports.getJobList = function () {
	return new Promise((resolve, reject) => {
		Job.find({}, function (err, data) {
			let jobList = [];
			if (err) {
				reject(err);
			} else {
				data.map((x) => {
					let jobListItem = {
						jobContactId: x.jobContactId,
						jobNumber: x.jobNumber,
						companyToPublish: x.companyToPublish,
						companyDescription: x.companyDescription,
					};
					jobList.push(jobListItem);
				});

				resolve(jobList);
			}
		});
	});
};
