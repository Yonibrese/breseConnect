// frontend/src/Dashboard.jsx
import React from 'react';
import { useAuth } from './context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="container-fluid vh-100 p-0 d-flex overflow-hidden">
            
            {/* 1. LEFT SIDEBAR: Workspaces & Channels Panel */}
            <div className="bg-dark text-white d-flex flex-column justify-content-between p-3" style={{ width: '280px', minWidth: '280px' }}>
                <div>
                    {/* Header Workspace Title */}
                    <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary">
                        <h5 className="mb-0 text-truncate fw-bold">breseConnect</h5>
                        <span className="badge bg-primary text-uppercase">Dev</span>
                    </div>

                    {/* Navigation Channels Section */}
                    <div className="mb-4">
                        <small className="text-muted text-uppercase fw-bold tracking-wider d-block mb-2">Channels</small>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item mb-1">
                                <a href="#" className="nav-link active bg-primary text-white py-2 px-3 small">
                                    # general
                                </a>
                            </li>
                            <li className="nav-item mb-1">
                                <a href="#" className="nav-link text-white-50 hover-bg-dark py-2 px-3 small">
                                    # random
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom User Footer Context Panel */}
                <div className="border-top border-secondary pt-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center min-w-0 me-2">
                        <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-uppercase font-weight-bold shadow-sm" style={{ width: '38px', height: '38px', minWidth: '38px' }}>
                            {user?.username?.charAt(0) || 'U'}
                        </div>
                        <div className="ms-2 min-w-0">
                            <p className="mb-0 small fw-bold text-truncate text-white">{user?.username}</p>
                            <small className="text-success d-block text-truncate" style={{ fontSize: '0.75rem' }}>● Online</small>
                        </div>
                    </div>
                    <button className="btn btn-outline-danger btn-sm px-2 py-1" onClick={logout} title="Sign Out">
                        Sign Out
                    </button>
                </div>
            </div>

            {/* 2. RIGHT MAIN INTERFACE AREA: Chat Container Engine */}
            <div className="flex-grow-1 bg-light d-flex flex-column justify-content-between">
                
                {/* Channel Top Header Bar */}
                <div className="bg-white border-bottom px-4 py-3 shadow-sm d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="mb-0 fw-bold"># general</h6>
                        <small className="text-muted">Welcome to the central workspace conversation area.</small>
                    </div>
                </div>

                {/* Central Chat Streaming Logs (Scrollable Area) */}
                <div className="flex-grow-1 p-4 overflow-auto bg-white">
                    <div className="alert alert-info py-2 small shadow-sm" style={{ maxWidth: '400px' }}>
                        💡 Secure WebSocket data feeds and channels will hook directly into this view in the upcoming phases.
                    </div>
                    {/* Mock Chat Stream Node */}
                    <div className="d-flex align-items-start mb-3">
                        <div className="bg-secondary rounded-circle text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', minWidth: '40px' }}>S</div>
                        <div className="ms-3">
                            <span className="fw-bold small text-dark me-2">System Bot</span>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>12:00 PM</small>
                            <p className="mb-0 text-secondary mt-1 bg-light p-2 rounded border-start border-primary border-3">
                                Welcome to **breseConnect**! Your multi-origin configuration and Session IDs are verified and running natively.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Input Communication Controller Box */}
                <div className="p-3 bg-light border-top">
                    <form className="input-group shadow-sm">
                        <input 
                            type="text" 
                            className="form-control border-secondary-subtle" 
                            placeholder="Message # general" 
                        />
                        <button className="btn btn-primary px-4" type="button">
                            Send
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;