export const isIsoDate = (str) => {
	if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
	var d = new Date(str);
	return d.toISOString() === str;
};
//Convert isoDateString to local timezone and format
export const parseISOString = (s) => {
	var b = s.split(/\D+/);
	return new Date(
		Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
	).toLocaleString('en-GB', {
		timeZone: 'Asia/Jerusalem',
	});
};

export const LocalDateStringToUTCDate = (localDateString) => {
	let localDate = new Date(localDateString);
	let UTCDate = localDate.toISOString();
	console.log(localDate);
	console.log(UTCDate);
	return UTCDate;
};

export const getDateFromIso = (isoDate) => {
	let date = new Date(isoDate);
	let dateString = date.toISOString().substring(0, 10);
	return dateString;
};


