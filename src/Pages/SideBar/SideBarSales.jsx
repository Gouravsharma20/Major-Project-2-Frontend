import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"

import { Link } from "react-router-dom"


export default function SideBarSales() {
    const {salesAgentLoading,salesAgent,lead} = useContext(LeadContext)

    console.log(salesAgent)

    if (salesAgentLoading) return <h2>loading sales data ...</h2>

    if (salesAgent.length === 0 ) {
        return <h2>No sales agent Found</h2>
    }
    const foundAgent = salesAgent[0]

    const foundAgentLeads = lead.filter((lead)=>lead.salesAgent === foundAgent._id)


    return (
        <div>
            <div className="row">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>

            <div>
                <h2>Lead List by Agent</h2>

                <h2>Sales Agent : {foundAgent.name} </h2>

                <ul><li>{foundAgentLeads.map((lead)=>(
                    <li key={lead.id}>{lead.name} - [Status: {lead.status}]</li>
                ))}</li></ul>

                <div>Filters: [Status] [priority]</div>

                <div>Sort by : [Time to Close]</div>
            
            
            </div>
        </div>
    </div>
    )
}