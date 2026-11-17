
import logo from "../Assets/Anvaya-crm-logo.svg"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{padding:"12px 24px"}}>
      <img src={logo} alt="anvaya-Logo" height="55"/>
      <div  style={{fontSize:"40px", color: "#3B82F6" , fontWeight:"bold" , cursor: "pointer"}}>Avanya CRM</div>
    </nav>
  );
}