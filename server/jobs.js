import * as _ from 'lodash';
const getJobsQuery = `SELECT * from job_postings WHERE status = 'active';`;
const getAdminJobsQuery = `SELECT * from job_postings WHERE status = 'active' or status = 'pending'`

export default class JobsController {
    constructor (db) {
        this.db = db;
        console.log(db);
    }

    getJobs (req, res) {
        console.log(this.db);
        this.db.query(getJobsQuery, (err, rows, fields) => {
            this.db.end();

            if (err) res.json({success: false, error: err});
            console.log(rows, fields);
            res.json({rows: rows, fields: fields})
        });
    }
}
