// export default function Footer() {
//     return (
//         <div style={{backgroundColor:"#E7EDF4",color:"black"}}>
//             <h2 style={{margin:25,color:"#64748B "}}>@ 2026 CRM. All rights reserved.</h2>
//         </div>
//     )
// }


export default function Footer() {
    return (
        <footer className="text-center mt-4 text-muted small">
                <p className="mb-1">
                    &copy; {new Date().getFullYear()} Avanya. All rights reserved.
                </p>
                <p className="mb-0">
                    <a href="/terms" className="text-muted text-decoration-none me-3">
                        Terms
                    </a>
                    <a href="/privacy" className="text-muted text-decoration-none me-3">
                        Privacy
                    </a>
                    <a href="/contact" className="text-muted text-decoration-none">
                        Contact
                    </a>
                </p>
        </footer>
    )
}