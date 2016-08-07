import express from 'express';
import JobsController from './jobs';
import mysql from 'mysql';
const config = require('./../config.json');
const pool = mysql.createPool(config.db);
const app = express();
const jobsCtrl = new JobsController(pool);

app
    .get('/', (req, res) => {
        res.send('hello world');
    })
    .get('/jobs', jobsCtrl.getJobs.bind(jobsCtrl))
    .listen(3001, () => {
        console.log('Example app listening on port 3000!');
    });
