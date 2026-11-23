import { useParams } from 'react-router-dom'
import { useState, useEffect,useContext } from 'react'
import { Link } from "react-router-dom";

import BackLink from '../Components/BackLink';

import {toast} from 'react-toastify'


import LeadContext from '../Context/LeadContext'






export default function LeadByIdDetails() {
    const { updateLeadInList } = useContext(LeadContext)
    const { id } = useParams()
    const [lead, setLead] = useState(null)   
    const [loading, setLoading] = useState(true)   
    const [error, setError] = useState(false)
    
    const [isEditing,setIsEditing] = useState(false)
    const [editLead,setEditLead] = useState(null)

    const [saveLoading,setSaveLoading] = useState(false)
    const [saveError,setSaveError] = useState(false)

    const [comment,setComment] = useState("")
    const [commentLoading,setCommentLoading] = useState(false)



    useEffect(() => {                    
        async function fetchLead() {
            try {
                const response = await fetch(`https://major-project-2-backend-ecru.vercel.app/leads/${id}`)
                if (response.ok) {
                    const data = await response.json()

                    const commentsResponse = await fetch(`https://major-project-2-backend-ecru.vercel.app/leads/${id}/comments`)

                    const commentsData = await commentsResponse.json()


                    setLead({...data.foundLead,comments:commentsData.foundComments})
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

     const handleStartEdit = () => {
        setEditLead({
            name:lead.name,
            salesAgent:lead.salesAgent,
            source:lead.source,
            status:lead.status,
            priority:lead.priority,
            timeToClose:lead.timeToClose
        })
        setIsEditing(true)
    }

    const handleEditChange = (e) => {
        const {name,value} = e.target
        setEditLead(prev=>({
            ...prev,
            [name]:name === "timeToClose" ? Number(value) : value
        }))
    }

    const handleEditLead = async () => {  
        setSaveLoading(true)
        setSaveError(false)
        try {
            const editLeadResponse = await fetch(
                `https://major-project-2-backend-ecru.vercel.app/leads/id/${id}`,
                {
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(editLead)
                }
            )
            if (editLeadResponse.ok) {
                const data = await editLeadResponse.json()
                const merged = data.updatedLead ?? {...lead,...editLead}
                setLead(merged)
                updateLeadInList(merged)
                setIsEditing(false)
                toast.success("lead updated successfully")
            } else {
                setSaveError(true)
                toast.error("failed to update lead")
            }
        } catch (err) {
            console.log("error editing lead",err)
            setSaveError(true)
            toast.error("Failed to update lead")
        } finally {
            setSaveLoading(false)
        }
    }


    const handleCancelEdit = () => {
        setIsEditing(false)
        setEditLead(null)
        setSaveError(false)
    }

    async function addComment(commentToAdd) {
        setCommentLoading(true)
        try {
            const fetchedComment = await fetch(
            `https://major-project-2-backend-ecru.vercel.app/leads/${id}/comments`,
            {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(commentToAdd)
        })

        if (!fetchedComment.ok) {
            throw new Error("an error occured while adding comments")
        }

        const data = await fetchedComment.json()

        setLead((prevLead) => ({
            ...prevLead,
            comments: [...(prevLead.comments || []), data.Comments]
        }))


        toast.success("comment added successfully")
        setComment("")
        return data.Comments

        } catch (err) {
            console.log(err)
            toast.error("Failed to add comment")
        } finally {
            setCommentLoading(false)
        }
        
    }

    if (loading) return (
        <div className="loadingStyle">
            <div className="loadingSpinner"></div>
            <p className="loadingText">Loading lead details...</p>
        </div>
    )
    if (error || !lead) return (<div className="errorStyle">
            <div className="errorIcon">!</div>
            <h2 className="errorTitle">Lead not found</h2>
            <p className="errorText">We couldn't load this lead. It may have been deleted or the server is unavailable.</p>
            <Link to="/" className="errorButton" style={{ textDecoration: "none" }}>
                Back to Dashboard
            </Link>
        </div>)

    return (
        <>
            <div className="row container-fluid">
            <div className="col-3 left-sidebar">
                <div className="sidebarInner">
                    <BackLink />
                </div>
            </div>
            <div className="col main-home">
                <h2 style={{textAlign:"center",marginTop:"6px"}}> Lead details</h2>

                {!isEditing ? (
                    <>
                    <h4>Lead name : {lead.name}</h4>
                    <h4>Lead agent : {lead.salesAgent}</h4>
                    <h4>Lead Source : {lead.source}</h4>
                    <h4>Lead Status : {lead.status}</h4>
                    <h4>Priority : {lead.priority}</h4>
                    <h4>Time to Close : {lead.timeToClose}</h4>
                <hr/>

                <button className = "defaultButton" onClick={handleStartEdit}>
                    Edit lead details
                </button>

                    </>
                ): (
                    <div className='d-flex flex-column edit-lead-form'>
                        <label>
                            Name : <input className="defaultInputBox" type='text' name='name' value={editLead.name} onChange={handleEditChange} />
                        </label>

                        <label>
                            Sales Agent : <input className="defaultInputBox" type='text' name='salesAgent' value={editLead.salesAgent} onChange={handleEditChange} />
                        </label>

                        <label>
                            Source
                            <select className="defaultInputBox" name="source" value={editLead.source} onChange={handleEditChange}>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Advertisement">Advertisement</option>
                                <option value="Email">Email</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <label>
                            Status
                            <select className="defaultInputBox" name="status" value={editLead.status} onChange={handleEditChange}>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </label>


                        <label>
                            Priority
                            <select className="defaultInputBox" name="priority" value={editLead.priority} onChange={handleEditChange}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>

                        <label>
                            Time to Close (days)
                            <input  className="defaultInputBox"
                                type="number"
                                name="timeToClose"
                                value={editLead.timeToClose}
                                onChange={handleEditChange}
                            />
                        </label>

                        {saveError && <p className='text-danger'>Failed to save. Try again.</p>}

                        <div className="d-flex gap-2 mb-3 mt-3">
                            <button className="btn btn-sm defaultButton" onClick={handleEditLead} disabled={saveLoading}>
                                {saveLoading ? "saving ..." : "Save"}
                            </button>
                             <button className="btn btn-sm defaultButton" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            <hr/>

                <h2>Common Section</h2>
                <hr/>
                {lead.comments?.map((item) => (
                    <div key={item._id}>
                    <h4>{item.author}</h4>
                <small>{new Date(item.createdAt).toLocaleString()}</small>
            <p>{item.comment}</p>
        <hr />
    </div>
))}

            <hr/>

            <div className="d-flex flex-column">
                <input className='defaultInputBox' type="text" placeholder="add new comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
                <button style={{marginTop:"20px"}} className='defaultButton'
                disabled={commentLoading || !comment.trim()}
                onClick={()=>addComment({comment:comment.trim(),author:lead.salesAgent,
                })
            }
            >{commentLoading ? "Adding..." :"Submit comment"}</button>
            </div>
            </div>
           

            

            

        </div>
        </>
    )
}





