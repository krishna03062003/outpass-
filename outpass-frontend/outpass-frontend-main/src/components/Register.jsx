import React, { useState, useEffect } from 'react';
import api from "../api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUser] = useState({
        name: "", rollNumber: "", password: "", phonenumber: "", parentsnumber: "",
        homestate: "", pincode: "", hostel: "", batchYear: ""
    });

    const [allowedDate, setAllowedDate] = useState(null);
    const [isAllowed, setIsAllowed] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false); // New state for checking registration status
    const navigate = useNavigate();

    // 🟢 Fetch allowed registration date
    useEffect(() => {
        const fetchAllowedDate = async () => {
            try {
                const res = await api.get("/auth/registration-date"); // Make sure this endpoint returns { allowedDate: "YYYY-MM-DD" }
              
                const now = new Date();
                const today =
                    now.getFullYear() + "-" +
                    String(now.getMonth() + 1).padStart(2, '0') + "-" +
                    String(now.getDate()).padStart(2, '0');

                setAllowedDate(res.data.allowedDate);
                setIsAllowed(today === res.data.allowedDate);
            } catch (error) {
                toast.error("Error fetching registration date");
            }
        };
        fetchAllowedDate();
    }, []);

    // 🟢 Check if the user is already registered based on rollNumber
    useEffect(() => {
        const checkIfRegistered = async () => {
            try {
                const res = await api.get(`/auth/check-registration/${user.rollNumber}`); // You should create this API
                setIsRegistered(res.data.isRegistered); // Assuming response contains an `isRegistered` field
            } catch (error) {
                console.log("Error checking registration:", error);
            }
        };

        if (user.rollNumber) {
            checkIfRegistered();
        }
    }, [user.rollNumber]);

    const validateForm = () => {
        const errors = {};
        if (!user.name.trim()) errors.name = toast.error("Name is required.");
        if (!user.rollNumber.trim()) errors.rollNumber = toast.error("Roll Number is required.");

        if (!user.parentsnumber.trim()) errors.parentsnumber = toast.error("Parent's number is required.");
        if (!user.phonenumber.trim()) errors.phonenumber = toast.error("Phone number is required.");
        if (!user.pincode.trim()) errors.pincode = toast.error("Pincode is required.");
        if (!user.batchYear.trim()) errors.batchYear = toast.error("Batch year is required.");
        if (!user.homestate.trim()) errors.homestate = toast.error("Home state is required.");
        if (!user.password.trim()) {
            errors.password = toast.error("Password is required.");
        } else if (user.password.length < 6) {
            errors.password = toast.error("Password must be at least 6 characters.");
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0 && !isRegistered) { // Only submit if not already registered
            try {
                const resp = await api.post("/auth/register", user);
                if (resp.status === 201) {
                    toast.success("User registered successfully!");
                    navigate("/login");
                }
            } catch (error) {
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong");
                }
            }
        } else if (isRegistered) {
            toast.error("You are already registered.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <ToastContainer />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                    {isAllowed ? "Sign up for an account" : "Registration not started"}
                </h2>
            </div>

            {/* ❌ Show message if today is NOT the allowed date */}
            {!isAllowed ? (
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 font-semibold">
                        🚫 Registration is not open today.
                    </p>
                    {allowedDate && (
                        <p className="mt-2 text-gray-600">
                            Registration will start on <strong>{allowedDate}</strong>.
                        </p>
                    )}
                </div>
            ) : isRegistered ? (
                // ✅ Show message if the user is already registered
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 font-semibold">
                        🚫 You are already registered.
                    </p>
                </div>
            ) : (
                // ✅ Show form if registration is allowed and not already registered
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                        {[ 
                            { label: "Name", key: "name" },
                            { label: "Roll Number", key: "rollNumber" },
                            { label: "Home State", key: "homestate" },
                            { label: "Phone Number", key: "phonenumber" },
                            { label: "Parent's Number", key: "parentsnumber" },
                            { label: "Pincode", key: "pincode" },
                  
                            { label: "Batch Year", key: "batchYear" },
                            { label: "Password", key: "password", type: "password" }
                        ].map(({ label, key, type = "text" }) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    type={type}
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                                    onChange={(e) => setUser({ ...user, [key]: e.target.value })}
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
