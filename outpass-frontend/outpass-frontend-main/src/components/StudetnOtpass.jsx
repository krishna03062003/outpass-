import React from 'react';
import { motion as Motion } from 'framer-motion';

export default function StudentOutpass({ outpasses = [] }) {
  const currentTime = new Date().toLocaleString();

  // Always filter by Approved AND Entry === Open
  const filteredOutpasses = outpasses.filter(
    (outpass) =>
      outpass.status === 'Approved' &&
      outpass.entry?.toLowerCase() === 'open'
  );
  
  return (
    <Motion.div
      className="p-4 rounded-lg shadow-lg max-w-6xl mx-auto w-full h-full bg-gray-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 bg-gray-400">
        <h2 className="text-4xl font-bold mb-2">Outpass Dashboard</h2>
        <p className="text-lg text-black">Current Time: {currentTime}</p>
     
       
      </div>

      {/* Outpasses Display */}
      {filteredOutpasses.length === 0 ? (
        <p className="text-center text-gray-500">
          No approved & entry open outpasses found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filteredOutpasses.map((outpass, index) => (
            <Motion.div
              key={index}
              className="bg-gray-400 rounded-xl shadow-md p-4 border"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
               <p className=' text-center text-2xl text-Black'>
                       {outpass.status}
              </p>
              <h3 className="text-lg font-bold text-blue-black mb-2">
                Outpass Created: {new Date(outpass.createdAt).toLocaleString()}
              </h3>
              <h3 className="text-2xl text-center font-bold text-black mb-2">
                  {outpass.student?.name}
              </h3>
              <p><strong>Roll Number:</strong> {outpass.student?.rollNumber}</p>
              <p><strong>Hostel:</strong>Hostel Name</p>{/**outpass.student?.hostel */}
              <p><strong>Batch Year:</strong> {outpass.student?.batchYear}</p>
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
