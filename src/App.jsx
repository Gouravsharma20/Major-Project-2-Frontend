import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeadContext from './Context/LeadContext';

import { BrowserRouter,Routes,Route} from "react-router-dom"

import Home from './Pages/Home';

import SideBarLeads from './Pages/SideBar/SideBarLeads';

import SideBarSales from './Pages/SideBar/SideBarSales';

import SideBarAgents from './Pages/SideBar/SideBarAgents'

import SideBarReports from './Pages/SideBar/SideBarReports'

import SideBarSettings from './Pages/SideBar/SideBarSettings'

import LeadByIdDetails from './Pages/LeadByIdDetails'

import AddagentForm from './Pages/addAgentForm';


import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
import LeadForm from './Pages/LeadForm';

import NewLead from './Pages/NewLead';

import ContractedLead from './Pages/ContractedLead';
// import AllLeads from './Pages/SideBar/SideBarLeads';



function App() {

  const [leadLoading,setLeadLoading] = useState(true)
  const [lead,setLead] = useState([])

  const [leadError,setLeadError] = useState(null)

  const [salesAgentLoading,setSalesAgentLoading] = useState(true)
  const [salesAgent,setSalesAgent] = useState([])

  const [salesLoading,setSalesLoading] = useState(true)
  const [salesData,setSalesData] = useState([])


  // Get all leads

  async function getAllLeads() {
    setLeadLoading(true)
    setLeadError(null)
    try {
      const response = await fetch("https://major-project-2-backend-ecru.vercel.app/leads/getAllLeads")
      if (!response.ok) {
        throw new Error(`Server response with ${response.status}`)
      }
      const data = await response.json()
      setLead(data.allLeads)
    } catch(err) {
      setLeadError(err.message || "Failed to fetch leads")
    } finally {
      setLeadLoading(false)
    }
  }

  useEffect(()=>{
    getAllLeads()
  },[])




















  // get all sales data

  async function allSales() {
    setSalesLoading(false)
    try {
      const allSales = await fetch("")

    } catch(err) {
      return console.log("error getting all sales data",err)
    } finally {
      setSalesLoading(false)
    }
    
  }

















  // get all saled agents

  async function allSalesAgent() {
    setSalesAgentLoading(true)
    try {
      const response = await fetch("https://major-project-2-backend-ecru.vercel.app/agent/getAllagent")
      const data = await response.json()
      setSalesAgent(data.allAgentList)
    } catch(err) {
      console.log("error loading sales agent",err)
    } finally {
      setSalesAgentLoading(false)
    }
  }

  useEffect(()=>{
    allSalesAgent()
  },[])




  ////////////////////////////////////////

  // a function for update lead in list 

  // lead is an array of all leads now in get lead by id if any one lead is updated it should get updated in leads as well , so that our leads list is always be the list of all edited leads, 

  // in short prev list is the list of all the list elements , and updatedlead is the singe lead which is updated just now 

  // so we are comparing it with updated lead if leads match , we are comparing them 

  


function addLeadToList(newLead) {
  setLead(prevList => {
    const alreadyExist = prevList.some(leadItem => leadItem._id === newLead._id)
    if (alreadyExist) {
      return prevList
    }
    return [newLead,...prevList]
  }
  )
}


function updateLeadInList(updatedLead) {
    setLead(prevList => prevList.map(leadItem => leadItem._id === updatedLead._id ? {...leadItem, ...updatedLead} : leadItem))   
}

 


  return (
    <LeadContext.Provider value={{
      lead,
      leadLoading,
      salesAgent,
      salesAgentLoading,
      leadError,
      updateLeadInList,
      setSalesAgent,
      setSalesLoading,
      addLeadToList
      }}>
      <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar/>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="flex-grow-1">
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/LeadForm' element={<LeadForm/>}/>
        <Route path='/newLeads' element={<NewLead/>} />
        <Route path='/contractedLeads' element={<ContractedLead/>}/>
        {/* <Route path='/newLeads' element={<NewLead/>} />
        <Route path='/newLeads' element={<NewLead/>} />
        <Route path='/newLeads' element={<NewLead/>} />
        <Route path='/newLeads' element={<NewLead/>} /> */}
        <Route path='/allLeads' element={<SideBarLeads/>}/>
        <Route path='/leadById/:id' element={<LeadByIdDetails/>}/>
        <Route path='/sales' element={<SideBarSales/>}/>
        <Route path='/agents' element={<SideBarAgents/>}/>
        <Route path='/agent/addAgent' element={<AddagentForm/>}/>
        <Route path='/reports' element={<SideBarReports/>}/>
        <Route path='/settings' element={<SideBarSettings/>}/>
      </Routes>
      </main>
      <Footer/>
      </div>
      </BrowserRouter>
    </LeadContext.Provider>
  )
}

export default App
