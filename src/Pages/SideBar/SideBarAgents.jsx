import {useNavigate} from 'react-router-dom'


import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"

import { Link } from "react-router-dom"


export default function SideBarAgents() {
    const navigate = useNavigate()
    const {salesAgentLoading,salesAgent} = useContext(LeadContext)

    console.log(salesAgent)

    if (salesAgentLoading) return <h2>loading sales data ...</h2>

    if (salesAgent.length === 0 ) {
        return <h2>No sales agent Found</h2>
    }
    return (
        <div>
            <div className="row">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>

            <div>
                <h2>Sales Agent List</h2>
            {salesAgent && salesAgent.map((agent)=>{
                return (
                    <div key={agent._id}>
                        <div>Agent: [{agent.name}] - [{agent.email}]</div>
                    </div>
                )
            })}
            <button onClick={()=>navigate("/agent/addAgent")}>Add new Agent</button>
            </div>
        </div>
    </div>
    )
}