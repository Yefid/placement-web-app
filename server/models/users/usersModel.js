const mongoose = require('mongoose');

let UserssSchema = new mongoose.Schema({
	email: String,
	password: String,
	createdDate: Date,
	totalMinInSystem: Number,
	role: String,
});

module.exports = mongoose.model('users', UserssSchema);
