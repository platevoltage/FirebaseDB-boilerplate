import { useState, useRef, useEffect } from 'react';
import './Job.css'
import Invoice from './Invoice';
import { createPortal } from 'react-dom';

interface Props {
    job: any;
    methods: any;
    newJob? : boolean;
}

export default function Job({job, methods, newJob}: Props) {
    const [ client, setClient ] = useState(job.client);
    const [ date, setDate ] = useState(new Date(job.date).toLocaleDateString());
    const [ bill, setBill ] = useState(job.bill.toFixed(2));
    const [ editMode, setEditMode ] = useState(newJob);
    const [container, setContainer] = useState<HTMLDivElement|null>(null);
    const newWindow = useRef<Window>(null);

    function handleUpdate() {
        try {
            methods.updateData(job.id, {
                client,
                date: new Date(date).getTime(),
                bill: parseFloat(bill)
            });
            setEditMode(false);
        } catch(e) {
            console.error(e);
        }
    }

    function handleAdd() {
        try {
            methods.addData({
                client,
                date: new Date(date).getTime(),
                bill: parseFloat(bill)
            });
            methods.setCreateJob(false);
        } catch(e) {
            console.error(e);
        }
    }

    function handleInvoice() {
        // Create container element on client-side
        const element = document.createElement("div");
        setContainer(element);
    }

    useEffect(() => {
        // When container is ready
        if (container && newWindow) {
          // Create window
          let newWindowCurrent = newWindow.current;
          newWindowCurrent = window.open(
            "",
            "_blank",
            ""
          );
          // Append container
          if (newWindowCurrent) {
              newWindowCurrent.document.body.appendChild(container);          
              newWindowCurrent.document.body.style.margin = "0";    
              newWindowCurrent.document.title = `Invoice for ${job.client}`;      
          }
    
          // Return cleanup function
        //   return () =>  {
        //       if (newWindowCurrent) newWindowCurrent.close();
        //   }
        }
      }, [container]);

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
                    <button onClick={() => newJob ?  methods.setCreateJob(false) : setEditMode(false)}>Cancel</button>
                    <button onClick={newJob ? handleAdd : handleUpdate}>Save</button>
                </> :
                <>
                    <button onClick={() => methods.deleteData(job.id)}>Delete</button>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={handleInvoice}>Invoice</button>
                </> 

            }

            {container && createPortal(<Invoice job={job}/>, container)}
        </div>
    )
}
