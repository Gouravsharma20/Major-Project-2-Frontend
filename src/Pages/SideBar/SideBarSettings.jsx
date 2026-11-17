// import { useContext } from "react"
// import LeadContext from "../../Context/LeadContext"

// import { Link } from "react-router-dom"

// export default function SideBarSettings() {
//     const {lead} = useContext(LeadContext)

    

//     return (
//         <div>
//             <div className="row">
//             <div className="col-3 left-sidebar">
//                 <h2>sidebar</h2>
//                 <Link to={"/"}>Back to Dashbaord</Link>
//             </div>

//             <div>
//                 <h2>Settings overview</h2>
//                 <p>settings is coming soon ...</p>

//             </div>
//         </div>
            
//         </div>
//     )
// }





import { useState } from "react"
import { Link } from "react-router-dom"

export default function SideBarSettings() {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [defaultLeadStatus, setDefaultLeadStatus] = useState("New")
    const [defaultPriority, setDefaultPriority] = useState("Medium")

    return (
        <div className="row container-fluid">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashboard</Link>
            </div>
            <div className="col main-home">
                <h2>Settings</h2>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                        />
                        Email notifications for new leads
                    </label>
                </div>

                <div>
                    Default Lead Status:
                    <select value={defaultLeadStatus} onChange={(e) => setDefaultLeadStatus(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                    </select>
                </div>

                <div>
                    Default Priority:
                    <select value={defaultPriority} onChange={(e) => setDefaultPriority(e.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <button className="btn btn-sm defaultButton">Save Settings</button>
            </div>
        </div>
    )
}