import { Link } from "react-router-dom"
import "./BankLink.css"

export default function BackLink({ to = "/", label = "Back to Dashboard" }) {
    return (
        <Link to={to} className="backLink">
            <span className="backLinkIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5"
                     strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
            </span>
            <span className="backLinkText">{label}</span>
        </Link>
    )
}