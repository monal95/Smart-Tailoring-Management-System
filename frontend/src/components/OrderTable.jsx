import React from "react";
import { Eye, Edit2, MoreVertical } from "lucide-react";

const OrderTable = ({ orders, title, onView, onEdit, onAction }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in progress":
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">{title}</h2>
        <p className="text-center text-slate-500 py-8">No orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Sets
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id || order.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {order._id ? order._id.slice(-6).toUpperCase() : order.id}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.customerName || order.name || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.numberOfSets || 0}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(order.createdAt || new Date()).toLocaleDateString(
                    "en-US",
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView && onView(order)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="View"
                    >
                      <Eye size={16} className="text-slate-600" />
                    </button>
                    <button
                      onClick={() => onEdit && onEdit(order)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} className="text-slate-600" />
                    </button>
                    <button
                      onClick={() => onAction && onAction(order)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="More"
                    >
                      <MoreVertical size={16} className="text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
