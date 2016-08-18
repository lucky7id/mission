// npm deps
import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

// modules
import JobsController from './jobs';
import AuthController from './auth';
import UsersController from './users';
import UserService from './services/user';

// global vars
const config = require('./../config.json');
const pool = mysql.createPool(config.db);
const app = express();
const mailerOptions = { auth: { api_key: config.app.smtpApiKey } };
const mailer = nodemailer.createTransport(sgTransport(mailerOptions));

// initialize app with data
app.set('jwtSecret', config.app.secret);
// service instances
const userService = new UserService(pool);

// controller instances
const jobsCtrl = new JobsController(app, pool);
const authCtrl = new AuthController(app, userService);
const usersCtrl = new UsersController(app, pool, userService, mailer);

app
    .use(morgan('combined'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/', (req, res) => {
        res.send('hello world');
    })
    .get('/jobs', jobsCtrl.getJobs.bind(jobsCtrl))
    .post('/token', authCtrl.getToken.bind(authCtrl))
    .listen(3001, () => {
        console.log('Example app listening on port 3000!');
    });
