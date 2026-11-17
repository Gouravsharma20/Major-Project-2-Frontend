import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useNavigate } from 'react-router-dom';

import LeadForm from '../LeadForm';

import {useContext} from 'react'

import LeadContext from '../../Context/LeadContext';

import newLeadLogo from "../../Assets/new-leads.svg";
import closedLead from "../../Assets/closed.svg";
import contactedLead from "../../Assets/contacted.svg";
import proposalSent from "../../Assets/proposal-sent.svg";
import qualified from "../../Assets/qualified.svg";

import SideBarAgents from "../../Assets/SideBarAgent.svg";
import SideBarLeads from "../../Assets/SideBarLeads.svg";
import SideBarReport from  "../../Assets/SideBarReports.svg";
import SideBarSales from "../../Assets/SideBarSales.svg";
import SideBarSettings from  "../../Assets/SideBarSettings.svg";


import { color } from 'chart.js/helpers';
// import newLead from "../../Assets/new-leads.svg";

import  "./HomeStyles.css"




export default function Home() {
    const {lead,leadLoading,leadError} = useContext(LeadContext)

    // usinglead from lead context only but lead is not updateing instantly , lead quantity 
    const navigate = useNavigate()

    if (leadLoading) {
        return <h2>loading leads ...</h2>
    }

    if (leadError) {
        return <h2>error loading leads</h2>
    }

    function goToContractedLead() {
        navigate("/contractedLeads")
    }

    function goToQualifiedLead() {
        navigate("/qualifiedLeads")
    }

    function goToProposalSentLead() {
        navigate("/contractedLeads")
    }


    function goToClosedLead() {
        navigate("/contractedLeads")
    }

    function leadManagement() {
        navigate("/SideBarLeads")
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-3 left-sidebar">
                        <div className='sideBar'>
                            <div className="leadContainer">
                                <img src={SideBarAgents} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/allLeads")}}>Leads</button>
                            </div>

                            <div className="leadContainer">
                                <img src={SideBarLeads} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/sales")}}>Sales</button>
                            </div>


                            <div className="leadContainer">
                                <img src={SideBarReport} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/agents")}}>Agents</button>
                            </div>


                            <div className="leadContainer">
                                <img src={SideBarSales} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/reports")}}>Reports</button>
                            </div>


                            <div className="leadContainer">
                                <img src={SideBarSettings} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/settings")}}>Settings</button>
                            </div>
                        </div>
                </div>
                <div className="col-9 main-home" style={{ minWidth: 0 }}>
                    <div style={{display: "inline-block", color:"black", fontSize:"42px", fontWeight:"bold"}}>Anvaya CRM Dashboard</div>
                    <div style={{color : "#606C86" , fontSize:"16px"}}>Manage your leads, track progress and grow your bussiness.</div>
                        <div className="overflow-auto">
                        <div className='d-flex flex-nowrap gap-3'>
                            {lead && lead.map((l,index)=>{
                            return (
                                <div className='flex-shrink-0' key={l._id}>
                                {/* if (leadLoading) return <h2>loading all leads ...</h2> */}


                                <button className='leadStyle' onClick={()=>navigate(`/leadById/${l._id}`)}>Lead {index + 1}</button>


                                </div>
                            )
                        })}
                        </div>
                    </div>
                    
                        
                    <div>
                        <h2 style={{border:"2px" , display: "inline-block", padding:"8px", color:"blue"}}>Lead status</h2>
                        <div><img src={newLeadLogo}/> New:[{lead.filter((lead)=>lead.status === "New").length}] Leads</div>
                        <div><img src={contactedLead}/> Contacted:[{lead.filter((lead)=>lead.status === "Contacted").length}] Leads</div>
                        <div><img src={qualified}/> Qualified:[{lead.filter((lead)=>lead.status === "Qualified").length}] Leads</div>
                        <div><img src={proposalSent}/> Proposal Sent:[{lead.filter((lead)=>lead.status === "Proposal Sent").length}] Leads</div>
                        <div><img src={closedLead}/> Closed:[{lead.filter((lead)=>lead.status === "Closed").length}] Leads</div>
                    </div>
                    <div>
                        <p style={{border:"2px", padding:"8px", color:"blue"}}>
                            <p>quick filter :</p>
                            <div>
                                <button className='quickFilterLead' onClick={goToNewLead}><img className='filterLogo' src={newLeadLogo}/>New Leads <p className='filterQnt'>{lead.filter((lead)=>lead.status === "New").length}</p></button>
                                <button className='quickFilterLead' onClick={goToContractedLead}><img className='filterLogo' src={contactedLead}/>Contracted <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Contacted").length}</p></button>
                                <button className='quickFilterLead' onClick={goToQualifiedLead}><img className='filterLogo' src={qualified}/>Qualified <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Qualified").length}</p></button>
                                <button className='quickFilterLead' onClick={goToProposalSentLead}><img className='filterLogo' src={proposalSent}/>Proposal Sent <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Proposal Sent").length}</p></button>
                                <button className='quickFilterLead' onClick={goToClosedLead}><img className='filterLogo' src={closedLead}/>Closed <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Closed").length}</p></button>
                            </div>
                            
                        </p>
                        <Link className='defaultButton' to={"/LeadForm"}> + add new lead</Link>
                    </div>
                </div>
            </div>
        </div>
    )

    async function newLead() {
        navigate("/")

    }

    function goToNewLead() {
    navigate("/newLeads")
    
}







}