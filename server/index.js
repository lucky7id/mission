import express from 'express';
import JobsController from './jobs';
import mysql from 'mysql';
const config = require('./../config.json');
const connection = mysql.createConnection(config.db);
const app = express();

connection.connect(err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('DB connected, app running');
});

connection.on('error', err => {
    console.log(err);
});

const jobsCtrl = new JobsController(connection);

app
    .get('/', (req, res) => {
        res.send('hello world');
    })
    .get('/jobs', jobsCtrl.getJobs)
    .listen(3001, () => {
        console.log('Example app listening on port 3000!');
    });
