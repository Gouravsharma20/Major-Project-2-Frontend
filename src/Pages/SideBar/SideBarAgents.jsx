import { useState, useEffect, useContext } from "react"
import { Link ,useParams} from "react-router-dom"
import LeadContext from "../../Context/LeadContext"
import BackLink from "../../Components/BackLink"

export default function SideBarAgents() {
    const { salesAgentLoading, salesAgent } = useContext(LeadContext)

    const [selectedAgent, setSelectedAgent] = useState(null)
    const [agentLeads, setAgentLeads] = useState([])
    const [agentLeadsLoading, setAgentLeadsLoading] = useState(false)

    useEffect(() => {
        if (!selectedAgent) return

        async function fetchAgentLeads() {
            setAgentLeadsLoading(true)
            try {
                const res = await fetch(
                    `https://major-project-2-backend-ecru.vercel.app/leads/agent/${selectedAgent._id}`
                )
                if (res.ok) {
                    const json = await res.json()
                    setAgentLeads(json.data || [])
                } else {
                    setAgentLeads([])
                }
            } catch (err) {
                console.log("error fetching agent leads", err)
                setAgentLeads([])
            } finally {
                setAgentLeadsLoading(false)
            }
        }
        fetchAgentLeads()
    }, [selectedAgent])

    if (salesAgentLoading) return <h2>loading sales agent data ...</h2>
    if (salesAgent.length === 0) return <h2>No sales agent Found</h2>

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <div className="sidebarInner">
                        <BackLink />
                    </div>
                </div>

                <div className="col-9">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Joining Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesAgent.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            {new Date(item.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </td>
                                        <td>
                                            <Link to={`/agent/${item._id}`} className="btn btn-sm btn-primary">
                                            View leads
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>                    
                </div>
            </div>
        </div>
    )
}