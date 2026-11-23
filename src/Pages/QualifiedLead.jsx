import LeadList from "./LeadList";

import { useContext } from "react"
import { Link } from "react-router-dom"
import LeadContext from "../Context/LeadContext"

import BackLink from "../Components/BackLink";

export default function QualifiedLead() {

    const { lead = [] } = useContext(LeadContext)

    const QualifiedLeads = lead.filter((l) => l.status === "Qualified")

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
                    <h2 className="pageHeading">Qualified leads <span>({QualifiedLeads.length})</span></h2>
                    {QualifiedLeads.length === 0 && <p>No Qualified leads found.</p>}
                    <LeadList status={"Qualified"}/>
                </div>
            </div>
        </div>
    </>
    )

}