import {Routes,Route} from "react-router-dom"

import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"

export default function SideBarLeads() {
    const {lead} = useContext(LeadContext)
    if (lead.length === 0) {
        return <h2>No leads found ...</h2>
    }
    return (
        <>
        <h1>mai hu saarey key sarey Leads</h1>
        {lead.map((lead)=>(<div key={lead._id}><h2>Name: {lead.name}</h2></div>))}
        </>
    )
}