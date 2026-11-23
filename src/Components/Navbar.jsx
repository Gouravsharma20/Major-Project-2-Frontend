
import { useNavigate } from "react-router-dom"
import logo from "../Assets/anvaya-crm-logo.svg"


export default function Navbar() {
  const navigate = useNavigate()

  function goToHome(){
    navigate("/")
  }


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" style={{padding:"12px 24px",borderBottom: "1px solid #CBD5E1"}}>
      <img style={{cursor:"pointer"}} onClick={goToHome} src={logo} alt="anvaya-Logo" height="55"/>
      <div  style={{fontSize:"40px", color: "#3B82F6" , fontWeight:"bold" , cursor: "pointer"}}>Avanya CRM</div>
    </nav>
  );
}

