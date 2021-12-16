const express = require('express');
const router = express.Router();
const industriesBL = require('../models/industries/industriesBL');

router.route('/').get(async (req, resp) => {
	let data = {};
	data = await industriesBL.getJsonIndustries();

	return resp.json(data);
});

router.route('/:id').get(async (req, resp) => {
	let data = {};

	data = await industriesBL.getJsonIndustry(req.params.id);

	return resp.json(data);
});

module.exports = router;
