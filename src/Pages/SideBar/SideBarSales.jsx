import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"


export default function SideBarSales() {
    const {salesAgentLoading,salesAgent} = useContext(LeadContext)

    console.log(salesAgent)

    if (salesAgentLoading) return <h2>loading sales data ...</h2>

    if (salesAgent.length === 0 ) {
        return <h2>No sales agent Found</h2>
    }
    return (
        <div>
            <h2>mai hu sales agent</h2>
            {salesAgent && salesAgent.map((agent)=>{
                return (
                    <div key={agent._id}>
                        <h2>Agent Name : {agent.name}</h2>
                        <h2>Agent Email : {agent.email}</h2>
                    </div>
                )
            })}
        </div>
    )
}