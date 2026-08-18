export default function LeadManagement() {
    return (
        <div className="row">
            <div className="col-3 left-sidebar">
                <h2>Sidebar</h2>
                <div className='d-flex flex-column gap-2'>back to home</div>
            </div>
            <div className="col main-home">
                <div className='d-flex flex-column gap-2'>
                    <div>
                        <h2>Lead detials</h2>
                <div>lead name</div>
                <div>sales agent</div>
                <div>lead source</div>
                <div>lead status</div>
                <div>priority</div>
                <div>time to close</div>
                <button>edit lead details</button>
                    </div>
                    <div>
                        <h2>Comment section</h2>
                        <div>
                        <div>author</div>
                        <div>comment</div>
                        </div>
                        <div>
                            <input placeholder="add new comment"></input>
                            <button>submit comment</button>
                        </div>
                        
                    </div>
                </div>

                
            </div>
        </div>
    )
}