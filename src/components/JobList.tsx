import React from 'react';
import './JobList.css';

interface Props {
    data: object;
}

export default function JobList({data}: Props) {
  return (
    <div id="job-list">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
