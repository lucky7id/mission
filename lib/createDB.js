const mysql = require('mysql');
const config = require('./../config.json');
const connection = mysql.createConnection(config.db);
const jobsTable = `
CREATE TABLE IF NOT EXISTS job_postings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1500) NOT NULL,
    salary INT UNSIGNED,
    external_url VARCHAR(255),
    tour_duration INT UNSIGNED,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB
`
const usersTable = `
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB
`
console.log('Connecting to DB');
connection.connect();
console.log('Connected, Creating DB');
// kick off table creation
connection.query(jobsTable, (err, rows, fields) => {
    if (err) console.log(err);

    console.log('Jobs Table created');
});

connection.query(usersTable, (err, rows, fields) => {
    if (err) console.log(err);

    console.log('Users Table created');
});

connection.end();
console.log('exiting');
