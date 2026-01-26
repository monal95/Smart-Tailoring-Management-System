import React, { useState } from 'react';
import { Building2, Plus, Trash2 } from 'lucide-react';

const CompanyList = ({ companies, addCompany, removeCompany }) => {
    const [newCompany, setNewCompany] = useState({ name: '', orderCount: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (newCompany.name) {
            addCompany({ ...newCompany, status: 'Active' });
            setNewCompany({ name: '', orderCount: '' });
        }
    };

    return (
        <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Building2 size={28} className="text-primary" />
                    <h2 style={{ margin: 0 }}>Company Details</h2>
                </div>
            </div>

            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                <input
                    style={{ flex: 2, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '0.5rem', color: 'white' }}
                    placeholder="Company Name"
                    value={newCompany.name}
                    onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
                />
                <input
                    style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '0.5rem', color: 'white' }}
                    placeholder="No. of Orders"
                    type="number"
                    value={newCompany.orderCount}
                    onChange={e => setNewCompany({ ...newCompany, orderCount: e.target.value })}
                />
                <button type="submit" className="btn btn-primary">
                    <Plus size={20} /> Add New Company
                </button>
            </form>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>No. of Orders</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company.id}>
                                <td style={{ fontWeight: '600' }}>{company.name}</td>
                                <td>{company.orderCount}</td>
                                <td>
                                    <span className="status-badge status-active">{company.status}</span>
                                </td>
                                <td>
                                    <button onClick={() => removeCompany(company.id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyList;
