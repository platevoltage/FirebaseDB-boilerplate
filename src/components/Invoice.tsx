import { useState, useRef, useEffect } from 'react';


interface Props {
    job: any;
}

const mainStyle = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    height: "100vh",
    backgroundColor: "#282c34",
    color: "#ffffff",
    padding: "1em"
}

export default function Invoice({job}: Props) {
    return (
        <main style={mainStyle}>
            <h1>INVOICE</h1>
            <p>{job.client}</p>
            <p>{(new Date(job.date)).toString()}</p>
            <p>{job.bill}</p>

        </main>
    );
}
