const User = require('./usersModel');

exports.getAllUsers = function () {
	return new Promise((resolve, reject) => {
		User.find({}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

exports.getUser = function (id) {
	return new Promise((resolve, reject) => {
		console.log('in get function');
		User.findById(id, function (err, data) {
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

exports.addUser = function (obj) {
	console.log(obj);
	return new Promise((resolve, reject) => {
		let user = new User({
			email: obj.email,
			password: obj.password,
			createdDate: new Date().toISOString(),
			totalMinInSystem: obj.totalMinInSystem,
			role: obj.role,
		});

		user.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve('Created  with id : ' + user._id);
			}
		});
	});
};

exports.updateUser = function (id, obj) {
	return new Promise((resolve, reject) => {
		User.findByIdAndUpdate(
			id,
			{
				email: obj.email,
				password: obj.password,
				totalMinInSystem: obj.totalMinInSystem,
				role: obj.role,
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

exports.deleteUser = function (id) {
	return new Promise((resolve, reject) => {
		User.findByIdAndDelete(id, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('Deleted !');
			}
		});
	});
};
