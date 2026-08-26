import { useState } from "react"

import { toast, ToastContainer } from "react-toastify";




async function addAgent(agentData) {
    const response = await fetch("https://major-project-2-backend-ecru.vercel.app/agent/addAgent",{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(agentData)
    });

    if (!response.ok) {
        throw new Error(`Failed to add new agent : ${response.status}`)
    }

    const agentToAdd = await response.json()
    return agentToAdd


}


export default function AddagentForm() {
    const [agent,setAgent] = useState(null)
    const [agentLoading,setAgentLoading] = useState(true)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")

    const handleSubmit = async () => {
        setAgentLoading(true)
        try {
            const newAgent = await addAgent({name,email}) 
            setAgent(newAgent)
            setName("")
            setEmail("")
            toast.success("New agent added to database successfully")
        } catch(err) {
            console.log(err)
            toast.error("Failed to add new agent")
        } finally {
            setAgentLoading(false)
        }
    }


    return (
        <div>
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
            <button onClick={handleSubmit}>Add agent</button>
        </div>
    )
    
}