import React from 'react';
import { useAuth } from '../context/auth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Dashboard
            </h1>
            <p className="text-gray-600 mb-4">
              Hello, {user?.username || user?.email}!
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;