import React, { useEffect, useState } from 'react'

import api from '../api';
import StudentList from '../components/StudentList';
import AdminNavbar from '../components/AdminNavbar';

export default function Adminpage() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get('/admin/admin'); // this should return the logged-in student
        setAdmin(res.data);
      } catch (err) {
        console.error(" Failed to fetch student:", err);
      }
    };

    fetchStudent();
  }, []);

  if (!admin) return <div className="p-4">Loading admin info...</div>;

  return (
    < >
    <div className="p-6 bg-slate-900 shadow-md rounded-lg">
      <h1 className="text-xl font-bold text-white">Welcome, Hostel Name</h1>

      <AdminNavbar admin={admin} /> {/**  props pass   */}
    </div>
    <div className="p-6 bg-slate-600 shadow-md rounded-lg">
      <StudentList/>
    </div>
    </>
  );
}
