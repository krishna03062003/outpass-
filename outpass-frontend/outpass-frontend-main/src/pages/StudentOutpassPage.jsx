import React, { useEffect, useState } from 'react';
import api from '../api';
import StudentOutpass from '../components/StudetnOtpass';

export default function StudentOutpassPage() {
  const [outpasses, setOutpasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
      
        const res = await api.get('/student/me');
        const studentData = res.data;
        setStudent(studentData);


        const outpassRes = await api.get(`/outpass/${studentData.rollNumber}`);
        setOutpasses(outpassRes.data.outpasses);
      } catch (err) {
        console.error("Error fetching outpasses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutpasses();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">{student.name}</h1>
      <StudentOutpass outpasses={outpasses} />
    </div>
  );
}
