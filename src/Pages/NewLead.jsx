import LeadList from "./LeadList";

import { useContext } from "react"
import { Link } from "react-router-dom"
import LeadContext from "../Context/LeadContext"

export default function NewLead() {
     const { lead = [] } = useContext(LeadContext)

    const newLeads = lead.filter((l) => l.status === "New")
    return (

        
    <>

    <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <h2>sidebar</h2>
                    <Link to="/reports">Back to Reports</Link>
                </div>

                <div className="col-9">
                    <h2 className="pageHeading">New leads <span>({newLeads.length})</span></h2>
                    {newLeads.length === 0 && <p>No closed leads found.</p>}
                    <LeadList status={"New"}/>
                </div>
            </div>
        </div>
    </>
)

}