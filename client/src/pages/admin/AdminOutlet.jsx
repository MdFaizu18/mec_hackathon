import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminOutlet = () => {
    return (
        <div className="admin-layout">
            <div className="admin-content">
                <Outlet /> {/* This renders the child routes (e.g., AdminDashboardPage, ViewFeedbackPage, etc.) */}
            </div>
        </div>
    );
};

export default AdminOutlet;
