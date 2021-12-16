const JobContact = require('./jobContactsModel');

exports.getAllJobContacts = function () {
	return new Promise((resolve, reject) => {
		JobContact.find({}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

exports.getJobContact = function (id) {
	return new Promise((resolve, reject) => {
		JobContact.findById(id, function (err, data) {
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

exports.addJobContact = function (obj) {
	console.log(obj);
	return new Promise((resolve, reject) => {
		let jobContact = new JobContact({
			contactId: obj.contactId,
			companyName: obj.companyName,
			poc: obj.poc,
			pocEmail: obj.pocEmail,
			pocPhone: obj.pocPhone,
			creationDate: new Date().toISOString(),
			notes: obj.notes,
		});

		jobContact.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve('Created  with id : ' + jobContact._id);
			}
		});
	});
};

exports.updateJobContact = function (id, obj) {
	return new Promise((resolve, reject) => {
		JobContact.findByIdAndUpdate(
			id,
			{
				contactId: obj.contactId,
				companyName: obj.companyName,
				poc: obj.poc,
				pocEmail: obj.pocEmail,
				pocPhone: obj.pocPhone,
				notes: obj.notes,
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

exports.deleteJobContact = function (id) {
	return new Promise((resolve, reject) => {
		JobContact.findByIdAndDelete(id, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('Deleted !');
			}
		});
	});
};

exports.getJobContactList = function () {
	return new Promise((resolve, reject) => {
		JobContact.find({}, function (err, data) {
			let jobContactList = [];
			if (err) {
				reject(err);
			} else {
				data.map((x) => {
					let jobContactListItem = {
						contactId: x.contactId,
						companyName: x.companyName,
					};
					jobContactList.push(jobContactListItem);
				});

				resolve(jobContactList);
			}
		});
	});
};
