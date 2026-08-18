import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function LeadByIdDetails() {
    const { id } = useParams()          
    const [lead, setLead] = useState(null)   
    const [loading, setLoading] = useState(true)   
    const [error, setError] = useState(false)   

    useEffect(() => {                    
        async function fetchLead() {
            try {
                const response = await fetch(`https://major-project-2-backend-ecru.vercel.app/leads/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setLead(data.foundLead)
                } else {
                    setError(true)
                }
            } catch (err) {
                console.log("error fetching lead by id", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchLead()
    }, [id])

    if (loading) return <h2>Loading...</h2>
    if (error || !lead) return <h2>Lead not found</h2>

    return (
        <>
            <div className="row">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>
            <div className="col main-home">
                <h2>Lead details</h2>
                <h4>Lead name : {lead.name}</h4>
                <h4>Lead agent : {lead.salesAgent}</h4>
                <h4>Lead Source : {lead.source}</h4>
                <h4>Lead Status : {lead.status}</h4>
                <h4>Priority : {lead.priority}</h4>
                <h4>Time to Close : {lead.timeToClose}</h4>
                <hr/>
                 <button className="btn-sm">
                Edit lead details
            </button>

            <hr/>

                <h2>Common Section</h2>
                <hr/>
                <h4>author: date and time</h4>
                <h4>Comment: comment</h4>

            <hr/>

            <div className="d-flex flex-column">
                <input type="text" placeholder="add new comment" />
                <button>Submit comment</button>
            </div>




            </div>
           

            

            

        </div>
        </>
    )
}



import { Link } from "react-router-dom";

