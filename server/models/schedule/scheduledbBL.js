const Schedule = require('./scheduleModel');

exports.getAllSchedules = function () {
	return new Promise((resolve, reject) => {
		Schedule.find({}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

exports.getSchedule = function (id) {
	return new Promise((resolve, reject) => {
		Schedule.findById(id, function (err, data) {
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

exports.addSchedule = function (obj) {
	console.log(obj);
	return new Promise((resolve, reject) => {
		let schedule = new Schedule({
			dateTime: obj.dateTime,
			candidateName: obj.candidateName,
			candidateId: obj.candidateId,
			jobDescriprion: obj.jobDescriprion,
			jobId: obj.jobId,
			status: obj.status,
			creationDate: new Date().toISOString(),
		});

		schedule.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve('Created  with id : ' + schedule._id);
			}
		});
	});
};

exports.updateSchedule = function (id, obj) {
	return new Promise((resolve, reject) => {
		console.log(id);
		console.log(obj);
		Schedule.findByIdAndUpdate(
			id,
			{
				dateTime: obj.dateTime,
				candidateName: obj.candidateName,
				candidateId: obj.candidateId,
				jobDescriprion: obj.jobDescriprion,
				jobId: obj.jobId,
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

exports.deleteSchedule = function (id) {
	return new Promise((resolve, reject) => {
		Schedule.findByIdAndDelete(id, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('Deleted !');
			}
		});
	});
};
