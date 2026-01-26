import React from 'react';
import { LayoutDashboard, Users, Building2, ClipboardList } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'orders', label: 'Order Status', icon: LayoutDashboard },
        { id: 'civil', label: 'Civil (Customer)', icon: Users },
        { id: 'companies', label: 'Company Details', icon: Building2 },
        { id: 'company-orders', label: 'Company Orders', icon: ClipboardList },
    ];

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <div className="logo-text">SMART TAILOR</div>
            </div>

            <nav className="nav-links">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
