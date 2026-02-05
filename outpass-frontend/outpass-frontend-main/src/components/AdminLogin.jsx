 AdminLogin

 import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../api"; // Axios instance with withCredentials: true

export default function  AdminLogin() {
  const [Admin, setAdmin] = useState({ name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!Admin.name.trim()) {
      errors.name = 'name cannot be empty.';
      toast.error(errors.name);
    }

    if (!Admin.password.trim()) {
      errors.password = 'Password cannot be empty.';
      toast.error(errors.password);
    } else if (Admin.password.length < 6) {
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
      const resp = await api.post('/admin/login', Admin);
      if (resp.status === 200 || resp.status === 201) {
        toast.success(resp.data.message);
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
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
        Hostel Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
        >
          {/* admin name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
              value={Admin.name}
              onChange={(e) => setAdmin({ ...Admin, name: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
              value={Admin.password}
              onChange={(e) => setAdmin({ ...Admin, password: e.target.value })}
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
          <Link to="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

  

