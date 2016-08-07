const mysql = require('mysql');
const config = require('./../config.json');
const connection = mysql.createConnection(config.db);
const query = `
CREATE TABLE IF NOT EXISTS job_postings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    company NOT NULL VARCHAR(255),
    title NOT NULL VARCHAR(255),
    description NOT NULL VARCHAR(1500),
    salary UNSIGNED INT,
    external_url VARCHAR(255),
    tour_duration UNSIGNED INT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB
`

console.log('Connecting to DB');
connection.connect();
console.log('Connected, Creating DB');
connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);

    console.log('DB created');
})

connection.end();
console.log('exiting');
