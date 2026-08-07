import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeadContext from './Context/LeadContext';

import { BrowserRouter,Routes,Route} from "react-router-dom"

import Home from './Pages/Home';


import Navbar from './Components/Navbar'
import Footer from './Components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <LeadContext.Provider value={{}}>

      <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar/>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="flex-grow-1">
        <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </main>
      <Footer/>
      </div>
      </BrowserRouter>
    </LeadContext.Provider>
  )
}

export default App
