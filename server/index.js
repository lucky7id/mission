// npm deps
import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

// modules
import JobsController from './jobs';
import AuthController from './auth';

// global vars
const config = require('./../config.json');
const pool = mysql.createPool(config.db);
const app = express();

// service instances

// controller instances
const jobsCtrl = new JobsController(pool, app);
const authCtrl = new AuthController(app);

app
    .set('jwtSecret', config.app.secret)
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/', (req, res) => {
        res.send('hello world');
    })
    .get('/jobs', jobsCtrl.getJobs.bind(jobsCtrl))
    .post('/auth', authCtrl.authenticate.bind(authCtrl))
    .listen(3001, () => {
        console.log('Example app listening on port 3000!');
    });
