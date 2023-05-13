import React from 'react';
import './JobList.css';
import Job from './Job';

interface Props {
    data: object[];
}

export default function JobList({data}: Props) {
  return (
    <div id="job-list">
        { 
            data.map((job, i) => {
                return (
                    <div key={i}>
                        <Job job={job} />
                    </div>
                )
            })
        }
    </div>
  )
}
