import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../sliceLogic/UserSlice';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.adUser);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // Function to generate a random background color based on user ID
    const generateRandomBackgroundColor = (userId) => {
        const colors = [
            'bg-blue-300', 'bg-green-300', 'bg-red-300',
            'bg-yellow-300', 'bg-purple-300', 'bg-pink-300'
        ];
        return colors[userId % colors.length]; // Generate unique but consistent color
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Link to={"/admin"} className="text-lg text-blue-600 hover:text-blue-800 font-semibold mb-6 block">
                {"< Back to Admin Panel"}
            </Link>
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
                User Management
            </h2>

            {isLoading ? (
                <p className="text-center text-gray-500">Loading users...</p>
            ) : (
                <>
                    {users && users.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
                                >
                                    <Link to={`/admin/users/${user.id}`} className="text-center w-full">
                                        {/* Applying a unique background color for each user profile */}
                                        <div
                                            className={`w-20 h-20 rounded-full mb-4 border-4 border-white ${generateRandomBackgroundColor(user.id)}`}
                                        >
                                            <img
                                                src="https://cdn.pixabay.com/photo/2016/08/20/05/51/avatar-1606939_1280.png"
                                                alt="Profile Icon"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-gray-800">{user.userName}</p>
                                            <p className="text-sm text-gray-600">{user.userEmail}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">
                            No users found.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default UserManagement;
