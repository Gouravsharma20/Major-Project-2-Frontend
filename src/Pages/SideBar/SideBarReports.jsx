import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"

import { Link } from "react-router-dom"


export default function SideBarReport() {
    const {lead,salesAgent:salesAgentList} = useContext(LeadContext)

    // if (leadLoading || salesAgentLoading) {
    //     return <h2>Loading report...</h2>
    // }

    const totalLeads = lead.length

    const closedLeads = lead.filter((l)=>l.status === "Closed")

    const closedLeadLength = closedLeads.length

    const leadsInPipelineLength = totalLeads - closedLeadLength

    // function leadAgentName(agentId) {
    //     const foundAgent = salesAgentList.find((agent)=>String(agent._id) === String(agentId))
    //     console.log("salesAgentList:", salesAgentList)
    //     console.log("closedLeads:", closedLeads.map(l => ({ name: l.name, salesAgent: l.salesAgent })))
    //     return foundAgent ? foundAgent.name : "unknown agent"
    // }


    function leadAgentName(agentId) {
    console.log("Looking for agentId:", agentId, "| typeof:", typeof agentId)
    console.log("Available agent ids:", salesAgentList.map(a => String(a._id)))
    const foundAgent = salesAgentList.find((agent) => String(agent._id) === String(agentId))
    return foundAgent ? foundAgent.name : "unknown agent"
}

    

    return (
        <>
        <div className="row">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>

            <div>
            <h2>Report overview</h2>
            <div> Total Leads closed and in Pipeline : Closed leads : [ {closedLeadLength} : {closedLeadLength > 0 ? closedLeads.map((lead)=>{return <p>{lead.name}</p>}):"no closed leads found"} ].   and   leads in pipeline : {leadsInPipelineLength}</div>
            <div>leads closed by sales agent with their name : {closedLeads.map((lead)=> (<p key={lead._id}>{leadAgentName(lead.salesAgent)}</p>))}</div>
            </div>
        </div>
        </>
        
    )
}