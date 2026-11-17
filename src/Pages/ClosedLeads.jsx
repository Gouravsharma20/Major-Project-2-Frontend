import { useContext } from "react"
import { Link } from "react-router-dom"
import LeadContext from "../Context/LeadContext"
import LeadList from "./LeadList";

export default function ClosedLeads() {
    const { lead = [] } = useContext(LeadContext)

    const closedLeads = lead.filter((l) => l.status === "Closed")

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <h2>sidebar</h2>
                    <Link to="/reports">Back to Reports</Link>
                </div>

                <div className="col-9">
                    <h2 className="pageHeading">Closed leads <span>({closedLeads.length})</span></h2>

                    {closedLeads.length === 0 && <p>No closed leads found.</p>}
                    <LeadList status={"Closed"}/>
                </div>




            </div>
        </div>
    )
}