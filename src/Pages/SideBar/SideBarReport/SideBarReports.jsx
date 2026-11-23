import { useContext } from "react"
import { Link,Navigate,useNavigate } from "react-router-dom"
import LeadContext from "../../../Context/LeadContext"

import BackLink from "../../../Components/BackLink"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

import "./SideBarReports.css"
import { Button } from "bootstrap"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
)

export default function SideBarReport() {
    const { lead = [], salesAgent = [] } = useContext(LeadContext)
    const navigate = useNavigate()

    const totalLeads = lead.length
    const closedLeads = lead.filter((l) => l.status === "Closed")
    const closedLeadLength = closedLeads.length
    const leadsInPipelineLength = totalLeads - closedLeadLength

    function leadAgentName(agent) {
        const id = agent?._id ?? agent
        const found = salesAgent.find((a) => String(a._id) === String(id))
        return found ? found.name : "unknown agent"
    }

    const closedByAgent = salesAgent.map(
        (agent) =>
            closedLeads.filter(
                (l) => String(l.salesAgent?._id ?? l.salesAgent) === String(agent._id)
            ).length
    )

    const status = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"]
    const leadByStatus = status.map(
        (stat) => lead.filter((l) => l.status === stat).length
    )

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-3 left-sidebar">
                    <div className="sidebarInner">
                        <BackLink />
                    </div>
                </div>

                <div className="col-9">
                    <h2 className="pageHeading">Report overview</h2>
                    <div className="charts-grid" style={{ paddingBottom: 0 }}>

    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button className="leadStyle" onClick={() => navigate("/leads/closedLeads")}>
            Closed leads: {closedLeadLength}
        </button>
        <button className="leadStyle" onClick={() => navigate("/leads/leadInPipeline")}>
            Leads in pipeline: {leadsInPipelineLength}
        </button>
    </div>

    <div>
        <button className="leadStyle" onClick={() => navigate("/leads/leadsClosedBySalesAgent")}> leads closed by sales agent</button>
    </div>

    <div>
        <button className="leadStyle" onClick={() => navigate("/leads/allLeadsType")}>leads type</button>
    </div>

</div>
                    
                    

                    

                    <div className="charts-grid">
                        <div className="dataCard closedAndOpen">
                            <Pie
                                data={{
                                    labels: ["Lead Closed", "Lead in Pipeline"],
                                    datasets: [
                                        {
                                            data: [closedLeadLength, leadsInPipelineLength],
                                            backgroundColor: ["#22c55e", "#f59e0b"],
                                            borderColor: "#ffffff",
                                            borderWidth: 2,
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>

                        <div className="dataCard leadClosedByAgent">
                            <Bar
                                data={{
                                    labels: salesAgent.map((agent) => agent.name),
                                    datasets: [
                                        {
                                            label: "Leads closed by agent",
                                            data: closedByAgent,
                                            backgroundColor: "#3b82f6",
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>

                        <div className="dataCard customerCard">
                            <Pie
                                data={{
                                    labels: status,
                                    datasets: [
                                        {
                                            data: leadByStatus,
                                            backgroundColor: [
                                                "#3b82f6",
                                                "#06b6d4",
                                                "#8b5cf6",
                                                "#f59e0b",
                                                "#22c55e",
                                            ],
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}



