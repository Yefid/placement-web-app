const excelDal = require('../../DAL/excelDal');

exports.getData = async () => {
	 return await excelDal.getExcelData();
};

exports.getExcelDataByid = async (id) => {
	return await excelDal.getExcelDataByid(id);
};


