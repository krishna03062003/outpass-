import React, { useEffect, useState } from 'react';
import api from "../api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Viewuser from './viewuser';


export default function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchData = async () => {
        try {
            const resp = await api.get('/admin/outpasses');
            setUsers(resp.data);
        } catch (error) {
            console.log(error);
        }
    };



 const deleteuser = async (id) => {
        try {
            const resp = await api.delete(`/user/userdelete/${id}`);
            if (resp.status === 200) {
                toast.success("User deleted successfully!");
                fetchData();
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error occurred while deleting user");
        }
  
    

 

}
   

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Operations</th>
                            <th className="px-4 py-2">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.place}</td>
                     
                                <td>
                                    <button
                                        className="bg-red-600 text-white py-1 px-2 rounded"
                                        onClick={() => deleteuser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                  
                                  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Conditionally render the Viewuser component when selectedUser is not null */}
            {selectedUser && <Viewuser selectedUser={selectedUser} />}

            <ToastContainer />
        </div>
    );
}
