import LeadList from "./LeadList";

export default function ContactedLead() {
    return (
    <>
    <h1 style={{border:"2px solid black" , display: "inline-block", padding:"8px", color:"red"}}>Contracted Lead</h1>
    <LeadList status={"Contacted"}/>
    </>
    )

}