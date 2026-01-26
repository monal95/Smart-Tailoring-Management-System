import React, { useState } from 'react';
import { Save, UserPlus } from 'lucide-react';

const CivilForm = ({ addOrder }) => {
    const [formData, setFormData] = useState({
        name: '', phno: '', email: '', position: '',
        shirt: { shoulder: '', collar: '', sleeve: '', length: '', chest: '' },
        pant: { length: '', hip: '', thigh: '', bottom: '', zip: '', butt: '' },
        payment: '', noOfSets: '1'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrder({ ...formData, id: Date.now(), date: new Date().toLocaleDateString(), status: 'Pending' });
        alert('Order saved successfully!');
        setFormData({
            name: '', phno: '', email: '', position: '',
            shirt: { shoulder: '', collar: '', sleeve: '', length: '', chest: '' },
            pant: { length: '', hip: '', thigh: '', bottom: '', zip: '', butt: '' },
            payment: '', noOfSets: '1'
        });
    };

    const handleNestedChange = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    return (
        <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <UserPlus size={28} className="text-primary" />
                <h2 style={{ margin: 0 }}>Customer Measurement Details (Civil)</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid-form" style={{ marginBottom: '2rem' }}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="tel" value={formData.phno} onChange={e => setFormData({ ...formData, phno: e.target.value })} required />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Position/Title</label>
                        <input type="text" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Shirt Section */}
                    <div>
                        <h3 style={{ color: 'var(--primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Shirt Measurements</h3>
                        <div className="grid-form">
                            {Object.keys(formData.shirt).map(field => (
                                <div className="input-group" key={field}>
                                    <label style={{ textTransform: 'capitalize' }}>{field}</label>
                                    <input type="text" value={formData.shirt[field]} onChange={e => handleNestedChange('shirt', field, e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pant Section */}
                    <div>
                        <h3 style={{ color: 'var(--accent)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Pant Measurements</h3>
                        <div className="grid-form">
                            {Object.keys(formData.pant).map(field => (
                                <div className="input-group" key={field}>
                                    <label style={{ textTransform: 'capitalize' }}>{field === 'butt' ? 'Butt Size' : field}</label>
                                    <input type="text" value={formData.pant[field]} onChange={e => handleNestedChange('pant', field, e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid-form" style={{ marginTop: '2rem' }}>
                    <div className="input-group">
                        <label>No. of Sets</label>
                        <input type="number" value={formData.noOfSets} onChange={e => setFormData({ ...formData, noOfSets: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Payment Mode / Status</label>
                        <input type="text" value={formData.payment} onChange={e => setFormData({ ...formData, payment: e.target.value })} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '2.5rem', width: '100%' }}>
                    <Save size={20} /> Save Customer Details
                </button>
            </form>
        </div>
    );
};

export default CivilForm;
