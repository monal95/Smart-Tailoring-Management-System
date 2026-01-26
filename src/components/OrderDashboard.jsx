import React from 'react';
import { ClipboardList, ShoppingBag, TrendingUp, Clock } from 'lucide-react';

const OrderDashboard = ({ orders, companies }) => {
    const stats = [
        { label: 'Pending Orders', count: orders.length, icon: Clock, color: '#f59e0b' },
        { label: 'Active Companies', count: companies.length, icon: Building2, color: '#6366f1' },
        { label: 'Bulk Orders', count: companies.reduce((acc, c) => acc + (parseInt(c.orderCount) || 0), 0), icon: ShoppingBag, color: '#ec4899' },
    ];

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="glass-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{stat.label}</p>
                                <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{stat.count}</h2>
                            </div>
                            <div style={{ background: `${stat.color}20`, padding: '0.75rem', borderRadius: '0.75rem' }}>
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <ClipboardList size={28} className="text-primary" />
                    <h2 style={{ margin: 0 }}>Recent Orders (Civil)</h2>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th>Sets</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                                        No orders found. Add one in the Civil section.
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{order.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.position}</div>
                                        </td>
                                        <td>{order.phno}</td>
                                        <td>{order.date}</td>
                                        <td>{order.noOfSets}</td>
                                        <td>
                                            <span className="status-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Internal Import helper
const Building2 = ({ size, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
    >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
    </svg>
);

export default OrderDashboard;
