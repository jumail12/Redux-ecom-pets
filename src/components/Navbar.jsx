import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaPaw } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Navbar = () => {
  const nav = useNavigate();
  const user = localStorage.getItem("user");
  const id = localStorage.getItem("id");
  
  const [cartL, setCartL] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchCartL = async () => {
    try {
      if (id) {
        const res = await axios.get(`http://localhost:5002/users/${id}`);
        setCartL(res.data.cart);
      } else {
        setCartL([]);
      }
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchCartL();
  }, [id, cartL]);

  const handleLogOut = () => {
    localStorage.clear();
    fetchCartL();
    setCartL([]);
    setDropdownOpen(false);
  };

  const handleLogIn = () => {
    nav("/login");
    setDropdownOpen(false);
  };
  const navigateHome = () => nav("/");
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


  // search
  const [search, setSearch] = useState('');
  const products = useSelector((state) => state.pro.products);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    setQuery(products.filter((item) => item.heading.toLowerCase().includes(search.toLowerCase().trim())));
  }, [products, search]);

  const handleNavSearch = (id) => {
    const filter = query.filter((item) => item.id === id);
    if (filter) {
      nav(`/prod/${id}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={navigateHome}>
          <FaPaw className="text-3xl text-teal-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">Pets</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-teal-500" aria-label="Home">
            Home
          </Link>
          <Link to="/store" className="text-gray-600 hover:text-teal-500" aria-label="Featured">
            Featured
          </Link>
          <Link to="/adopt" className="text-gray-600 hover:text-teal-500" aria-label="Adopt">
            Adopt
          </Link>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* Mapped filtered items */}
            {query.length > 0 && search.length > 0 && (
              <div className="absolute top-12 mt-1 w-full max-h-60 bg-white shadow-lg rounded-lg overflow-y-auto border border-gray-200 z-50">
                {query.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer transition duration-200"
                    onClick={() => handleNavSearch(item.id)}
                  >
                    <span className="text-sm font-medium text-gray-800">{item.heading}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-600 hover:text-teal-500" aria-label="View Cart">
            <FaShoppingCart className="inline mr-1" />
            Cart
            {cartL.length > 0 && (
              <span className="absolute top-0 right-10 bg-red-500 text-white text-xs rounded-full px-1">
                {cartL.length}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-600 hover:text-teal-500"
              aria-label="User Menu"
            >
              <FaUser className="mr-2" />
              {user ? user : "Account"}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <ul>
                  {user ? (
                    <li
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  ) : (
                    <li
                      onClick={handleLogIn}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      Login
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
