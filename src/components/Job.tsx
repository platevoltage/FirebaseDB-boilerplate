import { useState } from 'react';
import './Job.css'

interface Props {
    job: any;
    methods: any;
}

export default function Job({job, methods}: Props) {
    const [ client, setClient ] = useState(job.client);
    const [ date, setDate ] = useState(new Date(job.date).toLocaleDateString());
    const [ bill, setBill ] = useState(job.bill.toFixed(2));
    const [ editMode, setEditMode ] = useState(false);

    function handleUpdate() {
        methods.updateData(job.id, {
            client,
            date: new Date(date).getTime(),
            bill: parseFloat(bill)
        });
        setEditMode(false);
    }

    return (
        <div id="job">
            <p>
                <label htmlFor="client">Client: </label>
                <input disabled={!editMode} type="text" id="client" name="client" value={client} onChange={(e) => setClient(e.target.value)} />
            </p>
            <p>
                <label htmlFor="date">Date: </label>
                <input disabled={!editMode} type="text" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </p>
            <p>
                <label htmlFor="client">Bill: $</label>
                <input disabled={!editMode} type="text" id="bill" name="bill" value={bill} onChange={(e) => setBill(e.target.value)} />
            </p>

            { editMode ?
                <>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                    <button onClick={handleUpdate}>Save</button>
                </> :
                <>
                    <button onClick={() => methods.deleteData(job.id)}>Delete</button>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </> 

            }
        </div>
    )
}
