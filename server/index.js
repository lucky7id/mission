import express from 'express';
import JobsController from './jobs';

const app = express();
const jobsCtrl = new JobsController();

app
    .get('/', (req, res) => {
        res.send('hello world');
    })
    .get('/jobs', jobsCtrl.getJobs)
    .listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });
