import React, { useState } from 'react';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion as Motion } from 'framer-motion';

export default function Outpass() {
  const [data, setData] = useState({
    outDate: '',
    inDate: '',
    reason: '',
    place: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/outpass/createoutpass', data);
      toast.success(res.data.message);

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create outpass');

      console.error("Outpass error:", err.response || err);
    }
  };

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center h-[700px] bg-gray-500 px-4 "
    >
      <div className="w-full max-w-md bg-gray-300 p-6 rounded-2xl shadow-2xl ">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Create Outpass</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Out Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Out Date</label>
            <input
              type="date"
              value={data.outDate}
              onChange={(e) => setData({ ...data, outDate: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* In Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">In Date</label>
            <input
              type="date"
              value={data.inDate}
              onChange={(e) => setData({ ...data, inDate: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <input
              type="text"
              placeholder="Enter reason"
              value={data.reason}
              onChange={(e) => setData({ ...data, reason: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
            <select
              value={data.place}
              onChange={(e) => setData({ ...data, place: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Place</option>
              <option value="Market">Market</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              placeholder="Enter full address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              required
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Submit Outpass
            </Motion.button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Motion.div>
  );
}
