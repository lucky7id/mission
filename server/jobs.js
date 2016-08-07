import * as _ from 'lodash';
const getJobsQuery = `SELECT * from job_postings WHERE status = 'active';`;
const getAdminJobsQuery = `SELECT * from job_postings WHERE status = 'active' or status = 'pending'`

export default class JobsController {
    constructor (db) {
        this.db = db;
    }

    getJobs (req, res) {
        this.db.query(getJobsQuery, (err, rows, fields) => {
            this.db.end();

            if (err) res.json({success: false, error: err});

            console.log(`GET request to jobs unathenticated returned ${rows.length} rows`);
            res.json({items: rows});
        });
    }
}
