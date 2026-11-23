import LeadList from "./LeadList";

import { useContext } from "react"
import { Link } from "react-router-dom"
import LeadContext from "../Context/LeadContext"

import BackLink from "../Components/BackLink";

export default function ProposalSent() {

    const { lead = [] } = useContext(LeadContext)

    const ProposalSentLeads = lead.filter((l) => l.status === "Proposal Sent")
    return (
    <>
    <div className="container-fluid">
                <div className="row">
                    <div className="col-3 left-sidebar">
                         <div className="sidebarInner">
                            <BackLink />
                        </div>
                    </div>
    
                    <div className="col-9">
                        <h2 className="pageHeading">Proposal Sent leads <span>({ProposalSentLeads.length})</span></h2>
                        {ProposalSentLeads.length === 0 && <p>No Proposal Sent leads found.</p>}
                        <LeadList status={"Proposal Sent"}/>
                    </div>
                </div>
            </div>
    </>
    )

}