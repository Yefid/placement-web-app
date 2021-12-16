const usersdbBL = require('./usersdbBL');

const getUsers = async () => {
	const allUsers = await usersdbBL.getAllUsers();

	return allUsers;
};

const getUser = async (id) => {
	const user = await usersdbBL.getUser(id);

	return user;
};

const addUser = async (obj) => {
	const resp = await usersdbBL.addUser(obj);
	return resp;
};

const updateUser = async (id,obj) => {
	const resp = await usersdbBL.updateUser(id,obj);
	return resp;
};

const getUserbyEmailAndPassword = async (email, password) => {
	let allUsers = await getUsers();
	const user = allUsers.find((x) => x.email == email && x.password == password);
	if (!user) {
		return null;
	} else {
		return user.id;
	}
};

const isOverTransLimit = async (id, currentNumberOfTrans) => {
	let user = await getUser(id);
	console.log('in isOverTransLimit function ');
	return user.transactionNum < currentNumberOfTrans ? true : false;
};

module.exports = {
	getUsers,
	getUser,
	getUserbyEmailAndPassword,
	isOverTransLimit,
	addUser,
	updateUser
};
