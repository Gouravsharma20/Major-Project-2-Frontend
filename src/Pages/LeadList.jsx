import { useContext } from "react";

import LeadContext from "../Context/LeadContext";

export default function LeadList({status}) {

    const {lead,leadLoading} = useContext(LeadContext)

    if (leadLoading) return <h2>loading leads ...</h2>

    const filteredLead = lead.filter((l)=>l.status === status)

    if (filteredLead.length === 0) return <h2>`No  leads found`</h2>

    return (
        filteredLead.map((lead)=>(
        <div key={lead._id}>
        <h1>Name : {lead.name}</h1>
        <h2>Source : {lead.source}</h2>
        <h2>Status : {lead.status}</h2>
        <h2>Priority : {lead.priority}</h2>
        <hr/>
        </div>
        ))
    )
}