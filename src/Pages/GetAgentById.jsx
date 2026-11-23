// Get agent by id
import { useNavigate, useParams,Link } from "react-router-dom"


import { useContext, useEffect, useState } from "react"
import LeadContext from "../Context/LeadContext"

import BackLink from "../Components/BackLink"



export default function  GetAgentById() {
    const { agentId } = useParams()
    const { salesAgent } = useContext(LeadContext)
    const [agentLeads, setAgentLeads] = useState([])
    const [agentLeadsLoading, setAgentLeadsLoading] = useState(true)
     const [error, setError] = useState(false)

     const agent = salesAgent?.find((a) => a._id === agentId)

     useEffect(() => {
        async function fetchAgentLeads() {
            setAgentLeadsLoading(true)
            setError(false)
            try {
                const res = await fetch(
                    `https://major-project-2-backend-ecru.vercel.app/leads/agent/${agentId}`
                )
                if (res.ok) {
                    const json = await res.json()
                    setAgentLeads(json.data || [])
                } else {
                    setAgentLeads([])
                }
            } catch (err) {
                console.log("error fetching agent leads", err)
                setError(true)
                setAgentLeads([])
            } finally {
                setAgentLeadsLoading(false)
            }
        }
        fetchAgentLeads()
    }, [agentId])
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <div className="sidebarInner">
                        <BackLink />
                    </div>
                </div>

                <div className="col-9">
                    <h2>Leads of {agent ? agent.name : "agent"}</h2>

                    {agentLeadsLoading && <p>Loading leads...</p>}
                    {error && <p className="text-danger">Failed to load leads.</p>}

                    {!agentLeadsLoading && !error && agentLeads.length === 0 && (
                        <p>No leads found for this agent.</p>
                    )}

                    {agentLeads.map((lead) => (
                        <div key={lead._id} className="border rounded p-2 mb-2">
                            <h5>{lead.name}</h5>
                            <p className="mb-1">
                                Status: {lead.status} | Priority: {lead.priority} | Source: {lead.source}
                            </p>
                            <Link className="btn btn-sm btn-primary" to={`/leadById/${lead._id}`}>
                                View lead
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}