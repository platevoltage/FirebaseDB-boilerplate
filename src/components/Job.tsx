import React from 'react';
import './Job.css'

interface Props {
    job: any;
    methods: any;
}

export default function Job({job, methods}: Props) {
    return (
        <div id="job">
            <p>Client: {job.client}</p>
            <p>Date: {new Date(job.date).toLocaleDateString()}</p>
            <p>Bill: ${job.bill.toFixed(2)}</p>
            {job.id}
            <button onClick={() => methods.deleteData(job.id)}>Delete</button>
            <button>Edit</button>
        </div>
    )
}
