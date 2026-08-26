import {Routes,Route} from "react-router-dom"

import { useContext } from "react"
import LeadContext from "../../Context/LeadContext"

import { Link } from "react-router-dom"

export default function SideBarLeads() {
    const {lead} = useContext(LeadContext)
    if (lead.length === 0) {
        return <h2>No leads found ...</h2>
    }
    return (
        <>
        <div className="row">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>

            <div>
                <h1 className="mt-0">mai hu saarey key sarey Leads</h1>
                {lead.map((lead)=>(<div key={lead._id}><h2>Name: {lead.name}</h2></div>))}

            </div>
        </div>
        
        
        </>
    )
}