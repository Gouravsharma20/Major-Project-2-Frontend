import LeadList from "./LeadList";

import { useContext } from "react"
import { Link } from "react-router-dom"
import LeadContext from "../Context/LeadContext"

export default function ContactedLead() {

    const { lead = [] } = useContext(LeadContext)

    const ContactedLeads = lead.filter((l) => l.status === "Contacted")


    return (
    <>
        <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 left-sidebar">
                            <h2>sidebar</h2>
                            <Link to="/reports">Back to Reports</Link>
                        </div>
        
                        <div className="col-9">
                            <h2 className="pageHeading">Contacted leads <span>({ContactedLeads.length})</span></h2>
                            {ContactedLeads.length === 0 && <p>No Contacted leads found.</p>}
                            <LeadList status={"Contacted"}/>
                        </div>
                    </div>
                </div>
        </>
    )

}