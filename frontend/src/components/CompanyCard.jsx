import React from "react";
import { Building, MapPin, Mail, Trash2 } from "lucide-react";

const CompanyCard = ({ company, onView, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 rounded-lg">
            <Building size={24} className="text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{company.name}</h3>
            <p className="text-sm text-slate-500">
              {company.totalOrders || 0} Orders
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="text-slate-400" />
          <span>{company.address || "No address"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail size={16} className="text-slate-400" />
          <span>{company.email || "No email"}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView(company)}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg font-medium text-sm hover:from-amber-500 hover:to-amber-600 transition-all"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(company._id)}
          className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
