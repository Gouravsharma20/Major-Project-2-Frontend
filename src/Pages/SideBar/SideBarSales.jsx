import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"
import { Link } from "react-router-dom"
import BackLink from "../../Components/BackLink"


export default function SideBarSales() {
    const { lead = [] } = useContext(LeadContext)
    const closedLeads = lead.filter((l) => l.status === "Closed")


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 left-sidebar">
                    <div className="sidebarInner">
                        <BackLink />
                    </div>
                </div>
                <div className="col-9">


                    <h2 className="pageHeading">List of Completed Sales</h2>


                     <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Time To Close</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>
                                {closedLeads.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.source}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    item.status === "Closed"
                                                        ? "bg-success"
                                                        : item.status === "Contacted"
                                                        ? "bg-primary"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>{item.timeToClose}</td>
                                        <td>
                                            <Link
                                                to={`/leadById/${item._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>



            </div>
            
        </div>
    )
}