const express = require('express');
var jwt = require('jsonwebtoken');
const usersBL = require('../models/users/usersBL');

const getRoleFromId = async (id) => {
	const userInfo = await usersBL.getUser(id);
	return userInfo.role;
};

const VerifcationStatus = async (token, callback) => {
	const RSA_PRIVATE_KEY = 'somekey';

	if (!token) {
		callback(
			new Promise((resolve, reject) => {
				resolve({ status: 401, auth: false, message: 'No token provided.' });
			})
		);
	}
	jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
		if (err) {
			callback(
				new Promise((resolve, reject) => {
					resolve({
						status: 500,
						auth: false,
						message: 'Failed to authenticate token.',
						userRole: 'none',
					});
				})
			);
		} else {
			const userRole = await getRoleFromId(decoded.id);
			callback(
				new Promise((resolve, reject) => {
					resolve({
						status: 200,
						auth: true,
						id: decoded?.id ? decoded?.id : 'none',
						userRole: userRole,
					});
				})
			);
		}
	});
};

module.exports = { VerifcationStatus, getRoleFromId };
