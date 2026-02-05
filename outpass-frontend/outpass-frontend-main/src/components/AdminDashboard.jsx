import React, { useEffect, useState } from 'react';
import api from "../api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admindashboard() {
  const [outpass, setoutpass] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const resp = await api.get('/admin/outpasses');
      setoutpass(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      toast.success('Outpass approved!');
      fetchData();
    } catch (err) {
      console.error('Error approving:', err);
      toast.error('Approval failed!');
    }
  };

  const handleCloseEntry = async (id) => {
    try {
      await api.put(`/admin/entry/${id}`);
      toast.success('Entry closed!');
      fetchData();
    } catch (err) {
      console.error('Error closing entry:', err);
      toast.error('Failed to close entry!');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.delete(`/admin/reject/${id}`);
      toast.success('Outpass rejected!');
      fetchData();
    } catch (err) {
      console.error('Error rejecting:', err);
      toast.error('Rejection failed!');
    }
  };

  const filterOptions = {
    All: () => true,
    Approved: (op) => op.status === 'Approved',
    Pending: (op) => !op.status || op.status === 'Pending',
    'Entry Closed': (op) => op.entry === 'Close',
    Market: (op) => op.place?.toLowerCase() === 'market',
    Home: (op) => op.place?.toLowerCase() === 'home',
  };

  const filteredOutpasses = outpass
    .filter(filterOptions[filter])
    .filter((op) => {
      const name = op.student?.name?.toLowerCase() || '';
      const roll = op.student?.rollNumber?.toLowerCase() || '';
      return (
        name.includes(searchTerm.toLowerCase()) ||
        roll.includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="p-4 bg-slate-500">
      <h2 className="text-[50px] font-semibold mb-4 text-center">All Outpasses</h2>

    

      {/* 🔘 Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(filterOptions).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded ${filter === key ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {key}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search by name or roll number..."
          className="px-3 py-2 border rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Roll No</th>
              <th className="px-4 py-2">Hostel</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Out Date</th>
              <th className="px-4 py-2">In Date</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Entry</th>
              <th className="px-4 py-2">Approve</th>
              <th className="px-4 py-2">Close</th>
              <th className="px-4 py-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {filteredOutpasses.map((op) => (
              <tr key={op._id} className="border-t">
                <td className="px-4 py-2">{op.student?.name}</td>
                <td className="px-4 py-2">{op.student?.rollNumber}</td>
                <td className="px-4 py-2"> Hostel Name</td> {/** op.student?.hostel */}
                <td className="px-4 py-2">{op.student?.batchYear}</td>
                <td className="px-4 py-2">{op.outDate}</td>
                <td className="px-4 py-2">{op.inDate}</td>
                <td className="px-4 py-2 capitalize">{op.place}</td>
                <td className="px-4 py-2">{op.reason}</td>
                <td className="px-4 py-2">{op.status}</td>
                <td className="px-4 py-2">{op.entry}</td>

                <td className="px-4 py-2">
                  {op.status === 'Pending' && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleApprove(op._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td className="px-4 py-2">
                  {op.entry !== 'Close' && (
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCloseEntry(op._id)}
                    >
                      Close Entry
                    </button>
                  )}
                </td>
                <td className="px-4 py-2">
                  {op.status === 'Pending' && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleReject(op._id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}
