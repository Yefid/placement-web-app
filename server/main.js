const express = require('express');
const candidatesRouter = require('./routers/candidatesRouter');
const candidateExcelRouter = require('./routers/candidateExcelRouter');
const jobsRouter = require('./routers/jobsRouter');
const jobContactsRouter = require('./routers/jobContactsRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const landingJobRouter = require('./routers/landingJobRouter');
const usersRouter = require('./routers/usersRouter');
const industriesRouter = require('./routers/industriesRouter');
const candidateMailerRouter = require('./routers/candidateMailerRouter');
const uploadRouter = require('./routers/uploadRouter');
const downloadRouter = require('./routers/downloadRouter');
const loginRouter = require('./routers/loginRouter');
require('dotenv').config();

let PORT = process.env.PORT || 8000;
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require('./configs/database');

app.use('/api/candidates', candidatesRouter);
app.use('/api/candidatesExcel', candidateExcelRouter);
app.use('/api/candidatesMailer', candidateMailerRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/jobcontacts', jobContactsRouter);
app.use('/api/landingJob', landingJobRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/download', downloadRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/industries', industriesRouter);
app.use('/api/schedule', scheduleRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
