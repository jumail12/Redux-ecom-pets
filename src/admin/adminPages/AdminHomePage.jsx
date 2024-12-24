import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { logOut } from '../../sliceLogic/userAuth';

const AdminHomePage = () => {
  const role = Cookies.get('role');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Object.keys(Cookies.get()).forEach(function (cookieName) {
          Cookies.remove(cookieName);
        });
       
        dispatch(logOut());
        navigate("/login");
      }
    });
  };

  if (role !== 'Admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar (Fixed) */}
      <aside className="w-80 p-5 bg-gray-800 text-white fixed h-full"> {/* Fixed position and full height */}
        <div className="py-7  ml-2">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Product Section
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/add-product"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/order-details"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Order Details
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="block w-full px-4 py-2 text-left rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 ml-80"> {/* Added ml-80 to push content to the right */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to the Admin Panel</h2>
          <p className="text-gray-700">
            Select an option from the menu to manage the application.
          </p>
        </div>

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminHomePage;
