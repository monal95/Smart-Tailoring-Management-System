import React, { useState } from "react";
import { Plus, Trash2, Edit2, MapPin, Phone, Heart } from "lucide-react";
import Toast from "./Toast";

const LabourDashboardModern = () => {
  const [tailors, setTailors] = useState([
    {
      _id: "1",
      name: "Sanjay",
      role: "Shirt Maker",
      emoji: "👔",
      experience: 5,
      rating: 4.5,
      address: "123 Main St",
      phone: "9876543210",
    },
    {
      _id: "2",
      name: "Anwar",
      role: "Pant Maker",
      emoji: "👔",
      experience: 7,
      rating: 4.8,
      address: "456 Oak Ave",
      phone: "9876543211",
    },
    {
      _id: "3",
      name: "Dhana",
      role: "Shirt Maker",
      emoji: "👔",
      experience: 3,
      rating: 4.2,
      address: "789 Elm St",
      phone: "9876543212",
    },
  ]);

  const [ironMasters, setIronMasters] = useState([
    {
      _id: "4",
      name: "Ramesh",
      role: "Iron Master",
      emoji: "🔥",
      experience: 10,
      rating: 4.9,
      address: "321 Pine Rd",
      phone: "9876543213",
    },
    {
      _id: "5",
      name: "Vikram",
      role: "Iron Master",
      emoji: "🔥",
      experience: 8,
      rating: 4.6,
      address: "654 Maple Dr",
      phone: "9876543214",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    experience: "",
    address: "",
  });

  const handleAddLabour = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setToast({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    const newLabour = {
      _id: Date.now().toString(),
      name: formData.fullName,
      role: "Tailor",
      emoji: "👔",
      experience: parseInt(formData.experience) || 0,
      rating: 4.0,
      address: formData.address,
      phone: formData.phone,
    };

    setTailors([...tailors, newLabour]);
    setFormData({ fullName: "", phone: "", experience: "", address: "" });
    setShowAddModal(false);
    setToast({
      type: "success",
      message: "Labour added successfully!",
    });
  };

  const handleDelete = (id, type) => {
    if (type === "tailor") {
      setTailors(tailors.filter((t) => t._id !== id));
    } else {
      setIronMasters(ironMasters.filter((i) => i._id !== id));
    }
    setToast({
      type: "success",
      message: "Labour removed successfully!",
    });
  };

  const LabourCard = ({ labour, type }) => (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl mb-2">{labour.emoji}</div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-slate-100 rounded transition-colors">
            <Edit2 size={16} className="text-slate-600" />
          </button>
          <button
            onClick={() => handleDelete(labour._id, type)}
            className="p-2 hover:bg-red-100 rounded transition-colors"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-slate-900 text-lg mb-1">
        {labour.name}
      </h3>
      <p className="text-sm text-slate-600 mb-4">{labour.role}</p>

      <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="text-slate-400" />
          <span>{labour.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone size={16} className="text-slate-400" />
          <span>{labour.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">
            {labour.experience}
          </span>{" "}
          years exp.
        </div>
        <div className="flex items-center gap-1">
          <Heart size={16} className="text-red-500 fill-red-500" />
          <span className="text-sm font-semibold text-slate-900">
            {labour.rating}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ml-64 pt-24 pb-8 px-8 max-w-7xl">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Tailors Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Tailors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tailors.map((tailor) => (
            <LabourCard key={tailor._id} labour={tailor} type="tailor" />
          ))}
        </div>
      </div>

      {/* Iron Masters Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Iron Masters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ironMasters.map((master) => (
            <LabourCard key={master._id} labour={master} type="iron" />
          ))}
        </div>
      </div>

      {/* Add Labour Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg font-semibold hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl z-40"
      >
        <Plus size={20} />
        Add Labour
      </button>

      {/* Add Labour Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Add Labour
            </h2>

            <form onSubmit={handleAddLabour} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="Years of experience"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Enter address"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg font-semibold hover:from-amber-500 hover:to-amber-600 transition-all"
                >
                  Add Labour
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourDashboardModern;
