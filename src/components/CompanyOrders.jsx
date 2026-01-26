import React, { useState } from 'react';
import { Building2, UserPlus, ArrowLeft, Save } from 'lucide-react';

const CompanyOrders = ({ companies, addOrder }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState({
        name: '', phno: '', position: '',
        shirt: { shoulder: '', collar: '', sleeve: '', length: '', chest: '' },
        pant: { length: '', hip: '', thigh: '', bottom: '', zip: '', butt: '' },
        noOfSets: '1'
    });

    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
    };

    const handleBack = () => {
        setSelectedCompany(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {
            ...formData,
            id: Date.now(),
            companyId: selectedCompany.id,
            companyName: selectedCompany.name,
            date: new Date().toLocaleDateString(),
            status: 'Pending',
            type: 'Company'
        };
        addOrder(orderData);
        alert(`Order for ${formData.name} in ${selectedCompany.name} saved!`);
        setFormData({
            name: '', phno: '', position: '',
            shirt: { shoulder: '', collar: '', sleeve: '', length: '', chest: '' },
            pant: { length: '', hip: '', thigh: '', bottom: '', zip: '', butt: '' },
            noOfSets: '1'
        });
    };

    const handleNestedChange = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    if (!selectedCompany) {
        return (
            <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Building2 size={28} className="text-primary" />
                    <h2 style={{ margin: 0 }}>Select Company for Orders</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {companies.map(company => (
                        <div
                            key={company.id}
                            className="glass-card"
                            style={{ cursor: 'pointer', marginBottom: 0, padding: '1.5rem', border: '1px solid var(--glass-border)' }}
                            onClick={() => handleCompanySelect(company)}
                        >
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{company.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{company.orderCount} Orders</p>
                            <span className="status-badge status-active" style={{ marginTop: '0.5rem', display: 'inline-block' }}>{company.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card">
            <button onClick={handleBack} className="btn btn-danger" style={{ marginBottom: '2rem', background: 'transparent' }}>
                <ArrowLeft size={18} /> Back to Company Selection
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <UserPlus size={28} className="text-primary" />
                <h2 style={{ margin: 0 }}>{selectedCompany.name} - Individual Details</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid-form" style={{ marginBottom: '2rem' }}>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="input-group">
                        <label>Phone</label>
                        <input type="tel" value={formData.phno} onChange={e => setFormData({ ...formData, phno: e.target.value })} required />
                    </div>
                    <div className="input-group">
                        <label>Position</label>
                        <input type="text" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>No. of Sets</label>
                        <input type="number" value={formData.noOfSets} onChange={e => setFormData({ ...formData, noOfSets: e.target.value })} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h3 style={{ color: 'var(--primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Shirt Details</h3>
                        <div className="grid-form">
                            {['shoulder', 'collar', 'sleeve', 'length', 'chest'].map(field => (
                                <div className="input-group" key={field}>
                                    <label style={{ textTransform: 'capitalize' }}>{field}</label>
                                    <input type="text" value={formData.shirt[field]} onChange={e => handleNestedChange('shirt', field, e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ color: 'var(--accent)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Pant Details</h3>
                        <div className="grid-form">
                            {['length', 'hip', 'thigh', 'bottom', 'zip', 'butt'].map(field => (
                                <div className="input-group" key={field}>
                                    <label style={{ textTransform: 'capitalize' }}>{field === 'butt' ? 'Butt Size' : field}</label>
                                    <input type="text" value={formData.pant[field]} onChange={e => handleNestedChange('pant', field, e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '2.5rem', width: '100%' }}>
                    <Save size={20} /> Save Entry for {selectedCompany.name}
                </button>
            </form>
        </div>
    );
};

export default CompanyOrders;
