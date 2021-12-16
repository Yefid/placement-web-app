const jsonIndustryDal = require('../../DAL/industryJsonDal');

const getJsonIndustries = async () => {
	const allUsers = await jsonIndustryDal.getJsonIndustries();
	return allUsers;
};
const getJsonIndustry = async (id) => {
	console.log(id);
	let allIndustries = await getJsonIndustries();
	const industry = allIndustries.find((x) => x.id == id);

	return industry;
};

module.exports = {
	getJsonIndustries,

	getJsonIndustry,
};
