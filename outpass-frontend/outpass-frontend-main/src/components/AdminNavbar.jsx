import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AdminNavbar({ admin }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout', {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  const handleDateSubmit = async () => {
    if (!selectedDate) return toast.error("Please select a date first");

    const formattedDate = selectedDate.getFullYear() + "-" +
      String(selectedDate.getMonth() + 1).padStart(2, '0') + "-" +
      String(selectedDate.getDate()).padStart(2, '0');

    try {
      await api.post('/admin/set-date', { allowedDate: formattedDate }, { withCredentials: true });
      toast.success("Registration date set successfully");
      setShowDatePicker(false);
    } catch (err) {
      console.error("Failed to set date", err);
      toast.error("Failed to set registration date");
    }
  };

  return (
    <div className="bg-indigo-600 p-4 text-white flex justify-between items-center flex-wrap gap-4">
      <div className="text-lg font-semibold">Outpass System (Admin)</div>
      {admin && (
        <div className="flex gap-2 items-center">
          <button
            className="bg-blue-600 py-1 px-3 rounded hover:bg-blue-700 transition"
            onClick={() => navigate('/admin/dashboard')}
          >
           Outpasses
          </button>

          <button
            className="bg-green-600 py-1 px-3 rounded hover:bg-green-700 transition"
            onClick={() => navigate('/admin/messbill')}
          >
            Mess Bill
          </button>

          <button
            className="bg-yellow-500 py-1 px-3 rounded hover:bg-yellow-600 transition"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            Set Date
          </button>

          <button
            className="bg-red-500 py-1 px-3 rounded hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {showDatePicker && (
        <div className="mt-2 bg-white text-black rounded p-3 shadow-lg flex gap-2 items-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select registration date"
            className="border px-2 py-1 rounded"
          />
          <button
            className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition"
            onClick={handleDateSubmit}
          >
            Submit Date
          </button>
        </div>
      )}
    </div>
  );
}
