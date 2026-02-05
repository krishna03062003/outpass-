import React from 'react';

export default function Viewuser({ selectedUser }) {  // user is received as a prop
    if (!selectedUser) return <p>Loading...</p>;

    return (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold">User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            {/* Add more user fields if necessary */}
        </div>
    );
}
