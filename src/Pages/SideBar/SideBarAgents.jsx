// import { useContext } from "react"
// import LeadContext from "../../Context/LeadContext"

// import {useNavigate} from 'react-router-dom'

// import { Link } from "react-router-dom"

// function addAgent() {
//     console.log("agent add kr liya")
// }


// export default function SideBarAgents() {
//     const navigate = useNavigate()

//     const {salesAgentLoading,salesAgent} = useContext(LeadContext)

//     console.log(salesAgent)

//     if (salesAgentLoading) return <h2>loading sales agent ...</h2>

//     if (salesAgent.length === 0 ) {
//         return <h2>No sales agent Found</h2>
//     }
//     return (
//         <div>
//             <h2>mai hu sales agent</h2>
            
//             <button onClick={()=>navigate("/agent/addAgent")}>Add new Agent</button>

//             <div className="row">
//             <div className="col-3 left-sidebar">
//                 <h2>sidebar</h2>
//                 <Link to={"/"}>Back to Dashbaord</Link>
//             </div>

//             {salesAgent && salesAgent.map((agent)=>{
//                 return (
//                     <div key={agent._id}>
//                         <h2>Agent Name : {agent.name}</h2>
//                         <h2>Agent Email : {agent.email}</h2>
//                     </div>
//                 )
//             })}

            
//         </div>



//         </div>
//     )
// }


import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"

import { Link } from "react-router-dom"


export default function SideBarAgents() {
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
            <button>add new agent</button>
            </div>
        </div>
    </div>
    )
}