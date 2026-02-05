import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function StudentList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [branchFilter, setBranchFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const resp = await api.get('/admin/students');
      setUsers(resp.data);
      setFilteredUsers(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...users];
  
    if (branchFilter) {
      filtered = filtered.filter((user) =>
        user.branch?.toLowerCase() === branchFilter.toLowerCase()
      );
    }
  
    if (batchFilter) {
      filtered = filtered.filter((user) => user.batchYear === batchFilter);
    }
  
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(term) ||
          user.rollNumber?.toLowerCase().includes(term)
      );
    }
  
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rollNumber.localeCompare(b.rollNumber);
      } else {
        return b.rollNumber.localeCompare(a.rollNumber);
      }
    });
  
    setFilteredUsers(filtered);
  }, [branchFilter, batchFilter, sortOrder, users, searchTerm]);
  const viewOutpassDetails = (rollNumber) => {
    navigate(`/admin/outpass/${rollNumber}`);
  };

  return (
    <div className="p-4 bg-gray-400 shadow-2xl rounded-lg">
      <div className="mb-4 flex flex-wrap gap-4">
              {/* Search Input */}
      <div className="mb-4 border-black border-2 rounded-xl text-black">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          className="px-3 py-2 border rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        {/* Branch Filter */}
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="px-3 py-1 h-[40px] border rounded"
        >
          <option value="">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
       
        </select>

        {/* Batch Year Filter */}
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="px-3 py-1 h-[40px] border rounded"
        >
          <option value="">All Batches</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          {/* Add more batch years if needed */}
        </select>

        {/* Sort Button */}
        <button
          onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          className="px-2 py-1 h-[40px] bg-blue-600 text-white rounded"
        >
          Sort by Roll No ({sortOrder === 'asc' ? '↑' : '↓'})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Roll Number</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Parent</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Pincode</th>
              <th className="px-4 py-2">Hostel</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Outpass</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.rollNumber}</td>
                <td className="px-4 py-2">{user.branch}</td>
                <td className="px-4 py-2">{user.phonenumber}</td>
                <td className="px-4 py-2">{user.parentsnumber}</td>
                <td className="px-4 py-2">{user.homestate}</td>
                <td className="px-4 py-2">{user.pincode}</td>
                <td className="px-4 py-2">Hostel Name</td> {/** user.hostel*/}
                <td className="px-4 py-2">{user.batchYear}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-600 text-white py-1 px-2 rounded"
                    onClick={() => viewOutpassDetails(user.rollNumber)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
