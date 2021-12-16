const xlsx = require('xlsx');

let wb = xlsx.readFile('cand3.xlsx');
let ws = wb.Sheets['sheet'];
let data = xlsx.utils.sheet_to_json(ws);


console.log(data[1]);


