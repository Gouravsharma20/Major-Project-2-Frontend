import LeadList from "./LeadList";

export default function NewLead() {
    return (
    <>
    <h1 style={{border:"2px solid black" , display: "inline-block", padding:"8px", color:"red"}}>New Lead</h1>
    <LeadList status={"New"}/>
    </>
)

}