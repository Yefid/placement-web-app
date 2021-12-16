const mongoose = require('mongoose');
const mongoString = process.env.MONGOURI;
mongoose.connect(mongoString);
