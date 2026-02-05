 import React, { useEffect, useState } from 'react';
import api from '../api';
import StudentNavbar from '../components/StudentNavbar';
import Outpass from '../components/Outpass';
import StudentOutpass from '../components/StudetnOtpass';

export default function Homepage() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get('/student/me');
        setStudent(res.data);
      } catch (err) {
        console.error(" Failed to fetch student:", err);
      }
    };

    fetchStudent();
  }, []);

  if (!student) return <div className="p-4">Loading student info...</div>;

  return (
    <>
    <div className="p-6 bg-gray-900 shadow-md rounded-lg ">
      <h1 className="text-xl font-bold text-white">Welcome, {student.name}</h1>
      <p className="text-white mt-2">Roll Number: {student.rollNumber}</p>
      <StudentNavbar student={student} /> {/**  props pass   */}
    </div>
    <div className="p-6 bg-gray-900 shadow-md rounded-lg">
      <Outpass/>
    </div >

    </>
  );
}
