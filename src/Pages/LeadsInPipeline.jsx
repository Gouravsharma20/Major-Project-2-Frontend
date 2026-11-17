import { useContext } from "react"
import { Link } from "react-router-dom"
import LeadContext from "../Context/LeadContext"

export default function ClosedLeads() {
    const { lead = [], salesAgent = [] } = useContext(LeadContext)

    const leadsInPipeline = lead.filter((l) => l.status != "Closed")

    function leadAgentName(agent) {
        const id = agent?._id ?? agent
        const found = salesAgent.find((a) => String(a._id) === String(id))
        return found ? found.name : "unknown agent"
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <h2>sidebar</h2>
                    <Link to="/reports">Back to Reports</Link>
                </div>

                <div className="col-9">
                    <h2 className="pageHeading">Leads in Pipeline <span>({leadsInPipeline.length})</span></h2>

                    {leadsInPipeline.length === 0 && <p>No closed leads found.</p>}

                    {leadsInPipeline.map((l) => (
                        <p key={l._id}>
                            {l.name} ({leadAgentName(l.salesAgent)})
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}