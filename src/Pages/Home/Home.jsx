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
        return (
        <div className="loadingStyle">
            <div className="loadingSpinner"></div>
            <p className="loadingText">Loading leads...</p>
        </div>
    )
    }

    if (leadError) {
        return (
        <div className="errorStyle">
            <div className="errorIcon">!</div>
            <h2 className="errorTitle">Couldn't load leads</h2>
            <p className="errorText">{leadError}</p>
            <button onClick={()=>{navigate("/")}} className="errorButton">
                Try again
            </button>
        </div>
    )
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

    const topNewLeads = lead.filter((l) => l.status === "New").slice(0, 3);

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-3 left-sidebar">
                        <div className='sideBar'>
                            <div className="leadContainer leads">
                                <img style={{backgroundColor:"#E6F0FD", borderRadius:"50%", padding:"8px"}} src={SideBarAgents}/>
                                <button className='sideBarButton' onClick={()=>{navigate("/allLeads")}}> Leads</button>
                            </div>

                            <hr/>

                            <div className="leadContainer sales">
                                <img style={{backgroundColor:"#EEE7FD", borderRadius:"50%", padding:"8px"}} src={SideBarLeads} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/sales")}}>Sales</button>
                            </div>

                            <hr/>


                            <div className="leadContainer agents">
                                <img style={{backgroundColor:"#E2F5E5", borderRadius:"50%", padding:"8px"}} src={SideBarReport} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/agents")}}>Agents</button>
                            </div>

                            <hr/>


                            <div className="leadContainer reports">
                                <img style={{backgroundColor:"#FEEEE1", borderRadius:"50%", padding:"8px"}} src={SideBarSales} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/reports")}}>Reports</button>
                            </div>

                            <hr/>


                            <div className="leadContainer settings">
                                <img style={{backgroundColor:"#E1E5F8", borderRadius:"50%", padding:"8px"}} src={SideBarSettings} height="45" />
                                <button className='sideBarButton' onClick={()=>{navigate("/settings")}}>Settings</button>
                            </div>

                            <hr/>

                            
                        </div>
                </div>
                <div className="col-9 main-home" style={{ minWidth: 0 }}>
                    <h1 style={{display: "block", color:"black", fontSize:"42px", fontWeight:"bold",lineHeight:"1.1", marginTop:"10px",marginBottom:"0px"}}>Anvaya CRM Dashboard</h1>
                    <p style={{color : "#606C86" , fontSize:"16px",marginBottom:"10px"}}>Manage your leads, track progress and grow your bussiness.</p>


                    <div className="card border-0 shadow-sm mb-3">
  <div className="card-body">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="mb-0">New leads</h6>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => navigate("/allLeads")}
      >
        Show all leads →
      </button>
    </div>

    {topNewLeads.length === 0 ? (
      <p className="text-muted small mb-0">No new leads right now.</p>
    ) : (
      <ul className="list-group list-group-flush">
        {topNewLeads.map((l) => (
          <li
            key={l._id}
            className="list-group-item d-flex justify-content-between align-items-center px-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/leadById/${l._id}`)}
          >
            <span>{l.name}</span>
            <span className="badge rounded-pill text-bg-primary">New</span>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


                    
                        
                    <div>
                        <h2 style={{border:"2px" , display: "inline-block", padding:"8px", color:"blue"}}>Lead status</h2>
                        <div className='leadStatusRow new'><img src={newLeadLogo}/> New:<b> {lead.filter((lead)=>lead.status === "New").length}</b> Leads</div>
                        <hr/>
                        <div className='leadStatusRow contacted' style={{cursor:"pointer"}}><img src={contactedLead}/> Contacted:<b> {lead.filter((lead)=>lead.status === "Contacted").length}</b> Leads</div>
                        <hr/>
                        <div className='leadStatusRow qualified' style={{cursor:"pointer"}}> <img src={qualified}/> Qualified:<b> {lead.filter((lead)=>lead.status === "Qualified").length}</b> Leads</div>
                        <hr/>
                        <div className='leadStatusRow proposalSent' style={{cursor:"pointer"}}><img src={proposalSent}/> Proposal Sent:<b> {lead.filter((lead)=>lead.status === "Proposal Sent").length}</b> Leads</div>
                        <hr/>
                        <div className='leadStatusRow closed' style={{cursor:"pointer"}}><img src={closedLead}/> Closed:<b> {lead.filter((lead)=>lead.status === "Closed").length}</b> Leads</div>
                        <hr/>
                    </div>
                    <div>
                        <p style={{border:"2px", padding:"8px", color:"blue"}}>
                            <p>quick filter :</p>
                            <div>
                                <button className='quickFilterLead new' onClick={goToNewLead}><img className='filterLogo' src={newLeadLogo}/>New Leads <p className='filterQnt'>{lead.filter((lead)=>lead.status === "New").length}</p></button>
                                <button className='quickFilterLead contacted' onClick={goToContractedLead}><img className='filterLogo' src={contactedLead}/>Contracted <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Contacted").length}</p></button>
                                <button className='quickFilterLead qualified' onClick={goToQualifiedLead}><img className='filterLogo' src={qualified}/>Qualified <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Qualified").length}</p></button>
                                <button className='quickFilterLead proposalSent' onClick={goToProposalSentLead}><img className='filterLogo' src={proposalSent}/>Proposal Sent <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Proposal Sent").length}</p></button>
                                <button className='quickFilterLead closed' onClick={goToClosedLead}><img className='filterLogo' src={closedLead}/>Closed <p className='filterQnt'>{lead.filter((lead)=>lead.status === "Closed").length}</p></button>
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