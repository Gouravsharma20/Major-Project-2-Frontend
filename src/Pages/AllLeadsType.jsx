// import { useContext } from "react"
// import { Link,Navigate, useNavigate} from "react-router-dom"
// import LeadContext from "../Context/LeadContext"

// import BackLink from "../Components/BackLink"

// export default function AllLeadsType() {
//     const navigate = useNavigate()
//     const { lead = [], salesAgent = [] } = useContext(LeadContext)

//     const leadsInPipeline = lead.filter((l) => l.status != "Closed")

//     function leadAgentName(agent) {
//         const id = agent?._id ?? agent
//         const found = salesAgent.find((a) => String(a._id) === String(id))
//         return found ? found.name : "unknown agent"
//     }

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-3 left-sidebar">
//                      <div className="sidebarInner">
//                         <BackLink />
//                     </div>
//                 </div>

//                 <div className="col-9" style={{display:"flex", flexDirection:"column"}}>

//                     <button onClick={()=> navigate("/newLeads")} className="leadStyle">New</button>
//                     <button onClick={()=> navigate("/contractedLeads")} className="leadStyle">Contacted</button>
//                     <button onClick={()=> navigate("/qualifiedLeads")} className="leadStyle">Qualified</button>  
//                     <button onClick={()=> navigate("/proposalSent")} className="leadStyle">Proposal Sent</button>  
//                     <button onClick={()=> navigate("/leads/closedLeads")} className="leadStyle">Closed</button>  
//                 </div>
//             </div>
//         </div>
//     )
// }


import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import LeadContext from "../Context/LeadContext"
import BackLink from "../Components/BackLink"

import newLeadLogo from "../Assets/new-leads.svg"
import contactedLead from "../Assets/contacted.svg"
import qualified from "../Assets/qualified.svg"
import proposalSent from "../Assets/proposal-sent.svg"
import closedLead from "../Assets/closed.svg"

const STATUS_CARDS = [
    { status: "New", description: "Fresh leads that haven't been contacted", icon: newLeadLogo, bg: "#E6F0FD", route: "/newLeads" },
    { status: "Contacted", description: "Reached out, waiting on a reply", icon: contactedLead, bg: "#E2F5E5", route: "/contractedLeads" },
    { status: "Qualified", description: "Confirmed as a good fit", icon: qualified, bg: "#EEE7FD", route: "/qualifiedLeads" },
    { status: "Proposal Sent", description: "Proposal shared, decision pending", icon: proposalSent, bg: "#FEEEE1", route: "/proposalSent" },
    { status: "Closed", description: "Deals that are won or finished", icon: closedLead, bg: "#FDE6EA", route: "/leads/closedLeads" },
]

export default function AllLeadsType() {
    const navigate = useNavigate()
    const { lead = [] } = useContext(LeadContext)

    const countOf = (status) => lead.filter((l) => l.status === status).length

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <div className="sidebarInner">
                        <BackLink />
                    </div>
                </div>

                <div className="col-9 main-home">
                    <h2 className="pageHeading">Leads by status</h2>
                    <p className="text-muted mb-4">Pick a stage to see its leads.</p>

                    <div className="d-flex flex-column gap-3" style={{ maxWidth: 760 }}>
                        {STATUS_CARDS.map((card) => (
                            <button
                                key={card.status}
                                type="button"
                                className="btn text-start card border-0 shadow-sm p-0"
                                onClick={() => navigate(card.route)}
                            >
                                <div className="card-body d-flex align-items-center gap-3 py-3">
                                    <img
                                        src={card.icon}
                                        alt=""
                                        style={{
                                            backgroundColor: card.bg,
                                            borderRadius: "50%",
                                            padding: "10px",
                                            width: 46,
                                            height: 46,
                                        }}
                                    />

                                    <div className="flex-grow-1">
                                        <div className="fw-semibold">{card.status}</div>
                                        <small className="text-muted">{card.description}</small>
                                    </div>

                                    <span className="fs-4 fw-semibold">{countOf(card.status)}</span>
                                    <span className="text-muted fs-5">›</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}