import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import api from '../api'; // make sure this points to your axios instance
// not use this components but more code exrea future use 
export default function AdminFilter() {
  const [outpasses, setOutpasses] = useState([]);
  const [filters, setFilters] = useState({
    place: null,
    status: null,
    entry: null,
  });

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Fetch all outpasses
  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const res = await api.get('/admin/outpasses');
        setOutpasses(res.data.outpasses || res.data); // adjust according to your backend response shape
      } catch (err) {
        console.error('Error fetching outpasses:', err);
      }
    };

    fetchOutpasses();
  }, []);

  // Live clock update every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  const clearFilters = () => {
    setFilters({ place: null, status: null, entry: null });
  };

  const filteredOutpasses = outpasses.filter((outpass) => {
    const { place, status, entry } = filters;
    return (
      (place ? outpass.place?.toLowerCase() === place.toLowerCase() : true) &&
      (status ? outpass.status === status : true) &&
      (entry ? outpass.entry?.toLowerCase() === entry.toLowerCase() : true)
    );
  });

  const sortedOutpasses = [...filteredOutpasses].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const buttonStyle = (active) =>
    `px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${
      active ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-100'
    }`;

  return (
    <Motion.div
      className="p-4 bg-white rounded-lg shadow-lg max-w-6xl mx-auto w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-2">Outpass Dashboard</h2>
        <p className="text-lg text-gray-600">Current Time: {currentTime}</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button className={buttonStyle(filters.place === 'Market')} onClick={() => toggleFilter('place', 'Market')}>Market</button>
        <button className={buttonStyle(filters.place === 'Home')} onClick={() => toggleFilter('place', 'Home')}>Home</button>
        <button className={buttonStyle(filters.status === 'Approved')} onClick={() => toggleFilter('status', 'Approved')}>Approved</button>
        <button className={buttonStyle(filters.status === 'Pending')} onClick={() => toggleFilter('status', 'Pending')}>Pending</button>
        <button className={buttonStyle(filters.status === 'Rejected')} onClick={() => toggleFilter('status', 'Rejected')}>Rejected</button>
        <button className={buttonStyle(filters.entry === 'open')} onClick={() => toggleFilter('entry', 'open')}>Entry Open</button>
        <button className={buttonStyle(filters.entry === 'closed')} onClick={() => toggleFilter('entry', 'closed')}>Entry Closed</button>
        <button className="px-4 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Outpasses Display */}
      {sortedOutpasses.length === 0 ? (
        <p className="text-center text-gray-500">No outpasses found for selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOutpasses.map((outpass, index) => (
            <Motion.div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-4 border"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">Outpass Created: {new Date(outpass.createdAt).toLocaleString()}</h3>
              <h3 className="text-lg font-bold text-blue-700 mb-2">Outpass for {outpass.student?.name}</h3>
              <p><strong>Roll Number:</strong> {outpass.student?.rollNumber}</p>
              <p><strong>Hostel:</strong> {outpass.student?.hostel}</p>
              <p><strong>Batch Year:</strong> {outpass.student?.batchyear}</p>
              <p><strong>Place:</strong> {outpass.place}</p>
              <p><strong>Out Date:</strong> {new Date(outpass.outDate).toLocaleDateString()}</p>
              <p><strong>In Date:</strong> {new Date(outpass.inDate).toLocaleDateString()}</p>
              <p><strong>Reason:</strong> {outpass.reason}</p>
              <p><strong>Phone:</strong> {outpass.student?.phonenumber}</p>
              <p><strong>Parent's Number:</strong> {outpass.student?.parentsnumber}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  outpass.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  outpass.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {outpass.status}
                </span>
              </p>
              <p><strong>Entry:</strong> {outpass.entry}</p>
            </Motion.div>
          ))}
        </div>
      )}
    </Motion.div>
  );
}
