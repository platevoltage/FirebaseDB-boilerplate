import React from 'react';
import './Job.css'

interface Props {
    job: any;
}

export default function Job({job}: Props) {

    return (
        <div id="job">
            <p>Client: {job.client}</p>
            <p>Date: {new Date(job.date).toLocaleDateString()}</p>
            <p>Bill: ${job.bill.toFixed(2)}</p>
        </div>
    )
}
