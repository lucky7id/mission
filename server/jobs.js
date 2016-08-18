import * as _ from 'lodash';
const getJobsQuery = `SELECT * from job_postings WHERE status = 'active';`;
const getAdminJobsQuery = `
    SELECT * from job_postings WHERE status = 'active' or status = 'pending';`;
const postJobQuery = `
    INSERT INTO job_postings(
        company,
        title,
        description,
        salary,
        external_url,
        tour_duration,
        status
    )
    VALUES(?, ?, ?, ?, ?, ?, ?);
    `

export default class JobsController {
    constructor (app, db) {
        this.db = db;
    }

    getJobs (req, res) {
        this.db.getConnection((err, connection) => {
            if (err) {
                return res.json({
                    error: 'Unable to establish connection to the database'
                });
            }

            connection.query(getJobsQuery, (err, rows, fields) => {
                if (err) {
                    res.json({success: false, error: err});
                    return connection.release();
                }

                connection.release();
                res.json({items: rows});
            });
        })
    }

    getJobValues (job) {
        const validKeys = [
            'company',
            'title',
            'description',
            'salary',
            'external_url',
            'tour_duration'
        ];

        let vals = [];

        for (let key of validKeys) {
            const val = job[key];

            if (typeof val === 'undefined') return false;
            vals.push(val);
        }

        return vals;
    }

    postJob (req, res) {
        const vals = getJobValues(req.body);

        if (!vals) return res.json({error: 'Invalid job posting'});

        this.db.getConnection((err, connection) => {
            if (err) {
                return res.json({
                    error: 'Unable to establish connection to the database'
                });
            }

            connection.query(postJobQuery, vals, (err, rows, fields) => {
                if (err) {
                    res.json({success: false, error: err});
                    return connection.release();
                }

                connection.release();
                res.json({items: rows});
            });
        })
    }
}
