import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteMap, setNoteMap] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const fetchReturns = async () => {
    try {
      const res = await axios.get(`${API}/orders/return/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReturns(res.data.returnRequests);
    } catch (error) {
      console.log("Failed to fetch return requests: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (id, status) => {
    const note = status === "rejected" ? noteMap[id]?.trim() || "No reason provided" : "";

    try {
      await axios.patch(`${API}/orders/return/handle/${id}`, { status, note }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReturns();
    } catch (error) {
      console.log("Failed to update return status: ", error);
    }
  };

  const filteredReturns =
    statusFilter === "all"
      ? returns
      : returns.filter((o) => (o.returnStatus || "pending") === statusFilter);

  useEffect(() => {
    fetchReturns();
  }, []);

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Return Requests</h1>
        <div>
          <label htmlFor="filter" className="mr-2 font-medium text-sm">Filter by:</label>
          <select
            id="filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      ) : filteredReturns.length === 0 ? (
        <p>No return requests found.</p>
      ) : (
        <div className="space-y-4">
          {filteredReturns.map((order) => (
            <div key={order._id} className="bg-white border rounded p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">
                Order ID: <span className="font-medium">{order._id}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                User: {order.user?.name} ({order.user?.email})
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Status: <span className="capitalize font-semibold">{order.status}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Return Status:{" "}
                <span className="capitalize font-semibold text-blue-600">
                  {order.returnStatus || "pending"}
                </span>
              </p>
              {order.returnStatus === "rejected" && (
                <p className="text-red-600 text-sm mb-1">
                  Note: {order.returnNote}
                </p>
              )}

              <div className="mt-2">
                <p className="font-semibold">Items:</p>
                <ul className="ml-4 list-disc text-sm text-gray-700">
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.product?.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {order.returnStatus === "pending" && (
                <div className="mt-4 flex flex-col gap-2">
                  <textarea
                    rows={2}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                    placeholder="Optional rejection note"
                    value={noteMap[order._id] || ""}
                    onChange={(e) =>
                      setNoteMap((prev) => ({ ...prev, [order._id]: e.target.value }))
                    }
                  />

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleReturn(order._id, "approved")}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReturn(order._id, "rejected")}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminReturns