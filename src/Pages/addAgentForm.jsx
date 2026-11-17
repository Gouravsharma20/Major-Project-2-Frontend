import { useState } from "react"
import {Link} from "react-router-dom"

import { useContext } from "react";
import LeadContext from "../Context/LeadContext";

import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from 'react-router-dom';




async function addAgent(agentData) {
    
    const response = await fetch("https://major-project-2-backend-ecru.vercel.app/agent/addAgent",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(agentData)
    });

    if (!response.ok) {
        throw new Error(`Failed to add new agent : ${response.status}`)
    }

    const agentToAdd = await response.json()
    console.log(agentToAdd)
    return agentToAdd


}


export default function AddagentForm() {
    const navigate = useNavigate()
    const {setSalesLoading,setSalesAgent} = useContext(LeadContext)
    // const [agent,setAgent] = useState(null)
    // const [agentLoading,setAgentLoading] = useState(true)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")

   

    const handleSubmit = async () => {
        
        setSalesLoading(true)
        try {
            const {addedAgent} = await addAgent({name,email}) 
            setSalesAgent(prev => [...prev,addedAgent])
            setName("")
            setEmail("")
            toast.success("New agent added to database successfully")
            navigate("/agents")
        } catch(err) {
            console.log(err)
            toast.error("Failed to add new agent")
        } finally {
            setSalesLoading(false)
        }
    }


    return (
        <div className="row container-fluid">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>

            <div className="col-9">

            <div>Agent Name : <input
            type="text"
            placeholder="agent name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            />
            </div>
            <div>Agent Email : <input
            type="text" 
            placeholder="agent email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            /></div>
            <button className="btn btn-sm defaultButton" onClick={handleSubmit}>Add agent</button>

            </div>

            
            
        </div>
    )
    
}