import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function StudentNavbar({ student }) {
  const navigate = useNavigate();

  const viewOutpassDetails = (rollNumber) => {
    navigate(`/outpass`);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
      <div className="text-lg font-semibold">complaint</div>
      <div className="flex gap-2">
        {student && (
          <>
            <button
              className="bg-blue-600 text-white py-1 px-2 rounded"
              onClick={() => viewOutpassDetails(student.rollNumber)}
            >
              Your Outpass
            </button>
            <button
              className="bg-red-600 text-white py-1 px-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
