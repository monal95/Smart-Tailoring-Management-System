import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CivilForm from './components/CivilForm';
import CompanyList from './components/CompanyList';
import OrderDashboard from './components/OrderDashboard';
import CompanyOrders from './components/CompanyOrders';

function App() {
  const [activeView, setActiveView] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Rekitt Company', orderCount: 500, status: 'Active' },
    { id: 2, name: 'Narayanan Hospital', orderCount: 200, status: 'Active' }
  ]);

  // Load data from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('tailor_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const savedCompanies = localStorage.getItem('tailor_companies');
    if (savedCompanies) setCompanies(JSON.parse(savedCompanies));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('tailor_orders', JSON.stringify(orders));
    localStorage.setItem('tailor_companies', JSON.stringify(companies));
  }, [orders, companies]);

  const renderView = () => {
    switch (activeView) {
      case 'orders':
        return <OrderDashboard orders={orders} companies={companies} />;
      case 'civil':
        return <CivilForm addOrder={(order) => setOrders([...orders, order])} />;
      case 'companies':
        return (
          <CompanyList
            companies={companies}
            addCompany={(c) => setCompanies([...companies, { ...c, id: Date.now() }])}
            removeCompany={(id) => setCompanies(companies.filter(c => c.id !== id))}
          />
        );
      case 'company-orders':
        return (
          <CompanyOrders
            companies={companies}
            addOrder={(order) => setOrders([...orders, order])}
          />
        );
      default:
        return <OrderDashboard orders={orders} companies={companies} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
