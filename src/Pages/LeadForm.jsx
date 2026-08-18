import { Link } from "react-router-dom";

export default function LeadForm() {
    return (
        <div className="row">
            <div className="col-3 left-sidebar">
                <h2>sidebar</h2>
                <Link to={"/"}>Back to Dashbaord</Link>
            </div>
            <div className="col main-home">
                <h2>Lead details</h2>
                <h4>Lead name : <input type="string" placeholder="Lead Name"/></h4>
                <h4>Sales Agent : <input type="string" placeholder="Sales Agent"/></h4>
                <h4>Lead Source : <input type="string" placeholder="Lead Source"/></h4>
                <h4>Lead Status : <input type="string" placeholder="Lead Status"/></h4>
                <h4>Priority : <input type="string" placeholder="Priority"/></h4>
                <h4>Time to Close : <input type="string" placeholder="Time to close"/></h4>
                <hr/>
                 <button className="btn-sm">
                Edit lead details
            </button>

            <hr/>

                <h2>Common Section</h2>
                <hr/>
                <h4>author: date and time</h4>
                <h4>Comment: comment</h4>

            <hr/>

            <div className="d-flex flex-column">
                <input type="text" placeholder="add new comment" />
                <button>Submit comment</button>
            </div>




            </div>
           

            

            

        </div>
    )
}