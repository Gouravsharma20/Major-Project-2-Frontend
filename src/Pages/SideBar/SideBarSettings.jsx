import { useState } from "react"
import { toast } from "react-toastify"

import BackLink from "../../Components/BackLink"

const DEFAULTS = {
    emailNotifications: true,
    defaultLeadStatus: "New",
    defaultPriority: "Medium",
}

function loadSettings() {
    try {
        const saved = localStorage.getItem("anvayaSettings")
        return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS
    } catch {
        return DEFAULTS
    }
}

export default function SideBarSettings() {
    const [settings, setSettings] = useState(loadSettings)

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setSettings((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSave = () => {
        localStorage.setItem("anvayaSettings", JSON.stringify(settings))
        toast.success("Settings saved")
    }

    const handleReset = () => {
        setSettings(DEFAULTS)
        localStorage.removeItem("anvayaSettings")
        toast.info("Settings reset to defaults")
    }

    return (
        <div className="row container-fluid">
            <div className="col-3 left-sidebar">
                <div className="sidebarInner">
                    <BackLink />
                </div>
            </div>

            <div className="col main-home">
                <h2 className="pageHeading">Settings</h2>
                <p className="text-muted mb-4">
                    Manage notifications and defaults for new leads.
                </p>

                <div style={{ maxWidth: 640 }}>
                    {/* Notifications */}
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                            <h6 className="mb-3">Notifications</h6>
                            <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                                <label className="form-check-label" htmlFor="emailNotifications">
                                    <div>Email notifications</div>
                                    <small className="text-muted">
                                        Get an email whenever a new lead is added.
                                    </small>
                                </label>
                                <input
                                    className="form-check-input ms-3"
                                    type="checkbox"
                                    role="switch"
                                    id="emailNotifications"
                                    name="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onChange={handleChange}
                                    style={{ cursor: "pointer", width: "2.5em", height: "1.4em" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lead defaults */}
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                            <h6 className="mb-3">Lead defaults</h6>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label small text-muted" htmlFor="defaultLeadStatus">
                                        Default status
                                    </label>
                                    <select
                                        className="form-select"
                                        id="defaultLeadStatus"
                                        name="defaultLeadStatus"
                                        value={settings.defaultLeadStatus}
                                        onChange={handleChange}
                                    >
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                    </select>
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label small text-muted" htmlFor="defaultPriority">
                                        Default priority
                                    </label>
                                    <select
                                        className="form-select"
                                        id="defaultPriority"
                                        name="defaultPriority"
                                        value={settings.defaultPriority}
                                        onChange={handleChange}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex justify-content-end gap-2 mb-4">
                        <button className="btn btn-sm btn-outline-secondary" onClick={handleReset}>
                            Reset
                        </button>
                        <button className="btn btn-sm defaultButton" onClick={handleSave}>
                            Save settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}