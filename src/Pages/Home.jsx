import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import LeadForm from './LeadForm';

import {useContext,useEffect} from 'react'

import LeadContext from '../Context/LeadContext';

import { useNavigate } from 'react-router-dom';


export default function Home() {
    const {lead} = useContext(LeadContext)


    

    const navigate = useNavigate()

    async function newLead() {
        navigate("/")

    }

    function goToNewLead() {
    navigate("/newLeads")
}


function goToContractedLead() {
    navigate("/contractedLeads")
}

function leadManagement() {
    navigate("/SideBarLeads")
}

// if (leadLoading) {
//     return <h2>loading leads ...</h2>
// }

// if (leadError) {
//     return <h2>error loading leads</h2>
// }


    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-3 left-sidebar">
                        <h2>Sidebar</h2>
                        <div className='d-flex flex-column gap-2'>
                        <button onClick={()=>{navigate("/allLeads")}}>Leads</button>
                        <button onClick={()=>{navigate("/sales")}}>sales</button>
                        <button onClick={()=>{navigate("/agents")}}>agent</button>
                        <button onClick={()=>{navigate("/reports")}}>reports</button>
                        <button onClick={()=>{navigate("/settings")}}>settings</button>
                        </div>
                </div>
                <div className="col-9 main-home" style={{ minWidth: 0 }}>
                    <h1 style={{border:"2px solid black" , display: "inline-block", padding:"8px", color:"red"}}>Main Content</h1>
                        <div className="overflow-auto">
                        <div className='d-flex flex-nowrap gap-3'>
                            {lead && lead.map((l,index)=>{
                            return (
                                <div className='flex-shrink-0' key={l._id}>
                                {/* if (leadLoading) return <h2>loading all leads ...</h2> */}
                                <button onClick={()=>navigate(`/leadById/${l._id}`)}>Lead {index + 1}</button>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    
                        
                    <div>
                        <h2 style={{border:"2px solid black" , display: "inline-block", padding:"8px", color:"red"}}>Lead status</h2>
                        <div>New:[{lead.filter((lead)=>lead.status === "New").length}] Leads</div>
                        <div>Contacted:[{lead.filter((lead)=>lead.status === "Contacted").length}] Leads</div>
                        <div>Qualified:[{lead.filter((lead)=>lead.status === "Qualified").length}] Leads</div>
                    </div>
                    <div>
                        <p style={{border:"2px solid black", padding:"8px", color:"red"}}>quick filter : <button onClick={goToNewLead}>[New]</button> <button onClick={goToContractedLead}>[Contracted]</button></p>
                        <Link to={"/LeadForm"}>add new lead</Link>
                    </div>
                </div>

            </div>
        </div>
            
    )
}