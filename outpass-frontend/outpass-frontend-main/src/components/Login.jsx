import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../api"; // Axios instance with withCredentials: true

export default function Login() {
  const [user, setUser] = useState({ rollNumber: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!user.rollNumber.trim()) {
      errors.rollNumber = 'Roll number cannot be empty.';
      toast.error(errors.rollNumber);
    }

    if (!user.password.trim()) {
      errors.password = 'Password cannot be empty.';
      toast.error(errors.password);
    } else if (user.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
      toast.error(errors.password);
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      const resp = await api.post('/auth/login', user);
      if (resp.status === 201) {
        toast.success(resp.data.message);
        navigate('/'); // Or any protected route
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Student Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              placeholder="Enter your roll number"
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
              value={user.rollNumber}
              onChange={(e) => setUser({ ...user, rollNumber: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-4 py-2 font-semibold text-white focus:outline-none ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Not registered yet?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
