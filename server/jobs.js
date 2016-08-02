import * as _ from 'lodash';

const mocks = [
    {
        id: 1,
        company: "Dropbox",
        job_title: "Senior Scala Engineer",
        description: "Blah blah blah, this is a description about the job",
        salary: 150000,
        external_url: "https://dropbox.com/jobs",
        tour_duration: 2,
        company_values: [1, 2, 7, 9],
        status: "approved"
    },
    {
        id: 2,
        company: "Apple",
        job_title: "Senior UI Designer",
        description: "Blah blah blah, this is a description about the job",
        salary: 175000,
        external_url: "https://dropbox.com/jobs",
        tour_duration: 4,
        company_values: [1, 2, 7, 9],
        status: "pending"
    },
    {
        id: 3,
        company: "Google",
        job_title: "UX specialist",
        description: "Blah blah blah, this is a description about the job",
        salary: 185000,
        external_url: "https://dropbox.com/jobs",
        tour_duration: 4,
        company_values: [1, 2, 7, 9],
        status: "archived"
    }
]

export default class JobsController {
    getJobs (req, res) {
        const jobs = mocks.filter(job => {
            return job.status === "approved"
        });

        res.json(jobs);
    }
}
