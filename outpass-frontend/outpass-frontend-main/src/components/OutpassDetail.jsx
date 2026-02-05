import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function OutpassDetails() {
  const { rollNumber } = useParams(); 
  const [outpasses, setOutpasses] = useState([]);
  const currentTime = new Date().toLocaleString();
  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const resp = await api.get(`/admin/admin/outpass/${rollNumber}`);
        setOutpasses(resp.data.outpasses);
      } catch (error) {
        console.error('Error fetching outpasses:', error);
      }
    };

    fetchOutpasses();
  }, [rollNumber]);

return (
    <Motion.div
      className="p-4 rounded-lg shadow-lg max-w-6xl mx-auto w-full h-full bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 bg-slate-500">
        <h2 className="text-4xl font-bold mb-2"> Hostel Name Outpass </h2>
        <p className="text-lg text-black">Current Time: {currentTime}</p>
       
      </div>

      {/* Outpasses Display */}
      {outpasses.length === 0 ? (
        <p className=' text-white text-5xl'>No outpasses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {outpasses.map((outpass) => (
            <Motion.div
              key={outpass}
              className="bg-gray-400 rounded-xl shadow-md p-4 border"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                Outpass Created: {new Date(outpass.createdAt).toLocaleString()}
              </h3>
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                Outpass for {outpass.student?.name}
              </h3>
              <p><strong>Roll Number:</strong> {outpass.student?.rollNumber}</p>
              <p><strong>Hostel:</strong> Hostel Name</p> {/** hoste  */}
              <p><strong>Batch Year:</strong> {outpass.student?.batchyear}</p>
              <p><strong>Place:</strong> {outpass.place}</p>
              <p><strong>Out Date:</strong> {new Date(outpass.outDate).toLocaleDateString()}</p>
              <p><strong>In Date:</strong> {new Date(outpass.inDate).toLocaleDateString()}</p>
              <p><strong>Reason:</strong> {outpass.reason}</p>
              <p><strong>Phone:</strong> {outpass.student?.phonenumber}</p>
              <p><strong>Parent's Number:</strong> {outpass.student?.parentsnumber}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="text-green-600">{outpass.status}</span>
              </p>
              <p><strong>Entry:</strong> {outpass.entry}</p>
            </Motion.div>
          ))}
        </div>
      )}
    </Motion.div>
  );
}