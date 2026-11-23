import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { toast,ToastContainer } from "react-toastify";
import LeadContext from "../Context/LeadContext";
import BackLink from "./../Components/BackLink"

import { useNavigate } from "react-router-dom";



async function addLead(leadData) {
        const addLeadresponse = await fetch("https://major-project-2-backend-ecru.vercel.app/leads/createLead",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(leadData)
        })
        if(!addLeadresponse.ok) {
            throw new Error(`Failed to add new Lead : ${addLeadresponse.status}`)
        }
        const leadToAdd = await addLeadresponse.json()
        return leadToAdd
    }


export default function LeadForm() {
    const navigate = useNavigate()
    const {salesAgent:salesAgentList,salesAgentLoading,addLeadToList} = useContext(LeadContext)
    const [leadFormLoading,setLeadFormLeading] = useState(false)
    const [leadName,setLeadName] = useState("")
    const [selectSalesAgent,setSelectedSalesAgent] = useState("")
    const [leadSource,setLeadSource] = useState("")
    const [leadStatus,setLeadStatus] = useState("")
    const [leadPriority,setLeadPriority] = useState("")
    const [timeToClose,settimeToClose] = useState("")

    const addNewLeadHandeler = async () => {
        if (!leadName || !selectSalesAgent || !leadSource || !leadStatus || !leadPriority || !timeToClose) {
            toast.error("Please fill all the fields")
            return
        }
        setLeadFormLeading(true)
        try {
            const response = await addLead({
                name:leadName,
                salesAgent:selectSalesAgent,
                source:leadSource,
                status:leadStatus,
                priority:leadPriority,
                timeToClose:Number(timeToClose)
            })
            addLeadToList(response.newlyAddedLead);
            setLeadName("")
            setSelectedSalesAgent("")
            // setSalesAgent("")
            setLeadSource("")
            setLeadStatus("")
            setLeadPriority("")
            settimeToClose("")
            toast.success("New lead added to database successfully")
            navigate("/")
        } catch(err) {
            console.log(err)
            toast.error("failed to add new lead")
        } finally{
            setLeadFormLeading(false)
        }
    }

    const salesAgentOptions = salesAgentList.map((agent) => (
        <option key={agent._id} value={agent._id}>{agent.name}</option>
    ));


       


    
    return (
        <div className="row container-fluid">
            <div className="col-3 left-sidebar">
                <div className="sidebarInner">
                    <BackLink />
                </div>
            </div>
            <div className="col main-home">
                <h2 style={{textAlign:"center",marginTop:"6px"}}>Lead details</h2>
                <h4>Lead name : <input className="defaultInputBox" placeholder="Lead Name" type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                </h4>
                <h4>Sales Agent : <select className="defaultInputBox" value={selectSalesAgent} onChange={(e)=>setSelectedSalesAgent(e.target.value)}>
                    <option value="" disabled>select sales agaent</option>
                    {salesAgentLoading? (
                        <option disabled>loading agents...</option>
                    ) : (
                        salesAgentOptions
                    )
                }
                    </select>

                </h4>
                <h4>Lead Source : <select className="defaultInputBox"  value={leadSource} onChange={(e)=>setLeadSource(e.target.value)}>
                    <option value="" disabled>select lead source</option>
                    <option value="Website">Website</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                    </select>
                </h4>


                <h4>Lead Status : <select className="defaultInputBox" value={leadStatus} onChange={(e)=>setLeadStatus(e.target.value)}>
                    <option value="" disabled>Select lead status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select></h4>



                <h4>Priority : <select className="defaultInputBox" value={leadPriority} onChange={(e)=>setLeadPriority(e.target.value)}>
                    <option value="" disabled>Select lead priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select></h4>


                <h4>Time to Close : <input className="defaultInputBox" type="text" placeholder="Time to Close" value={timeToClose} onChange={(e)=>settimeToClose(e.target.value)}/></h4>
                <hr/>
                 <button onClick={addNewLeadHandeler} className="btn btn-sm defaultButton" disabled={leadFormLoading}>
                {leadFormLoading ? "Adding..." : "Add lead details"}
            </button>
            </div>
        </div>
    )
}