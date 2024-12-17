import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaPaw } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logOut } from "../sliceLogic/userAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { SerachPro } from "../sliceLogic/ProductSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();
  const user = Cookies.get("name");
  const id = Cookies.get("id");

  //-------------------------------------

  const [cartL, setCartL] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchCartL = async () => {
    if (!id) return setCartL([]); // Exit early if no ID is found
    try {
      const res = await axios.get(`http://localhost:5002/users/${id}`);
      setCartL(res.data.cart);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCartL();
  }, [id]);
  //-------------------------------------

  //logout
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
        // Remove all cookies
        const allCookies = Cookies.get(); // Get all cookies
        for (const cookie in allCookies) {
          Cookies.remove(cookie, { path: "/" }); // Remove each cookie
        }
        localStorage.clear();
        fetchCartL();
        setCartL([]);
        setDropdownOpen(false);
        dispatch(logOut());
        toast.warn("Logged Out");
        nav("/");
      }
    });
  };

  //-------------------------------------

  //log in nav
  const handleLogIn = () => {
    nav("/login"); // Redirect to the login page
    setDropdownOpen(false);
  };

  //-------------------------------------

  const navigateHome = () => nav("/");
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  //-------------------------------------

  // search
  const [search, setSearch] = useState("");
  const Searchproducts = useSelector((state) => state.pro.search);

 const handleSearch=(e)=>{
  const value = e.target.value.toLowerCase();
  setSearch(value);
  dispatch(SerachPro(value || ""));
 }

 const handleSearchNav=(it)=>{
  nav(`/product/${it}`);
  setSearch("");
}



  //-------------------------------------

  //close drop down when we click outside

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".relative")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  //-------------------------------------

  //pofile nav
  const handlePro = () => {
    nav("/profile");
    setDropdownOpen(false);
  };

  //----------------------------------------

  //----------------------------------------

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={navigateHome}
        >
          <FaPaw className="text-3xl text-teal-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">Pets</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-teal-500"
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            to="/go"
            className="text-gray-600 hover:text-teal-500"
            aria-label="Featured"
          >
            Featured
          </Link>
       

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Search"
              value={search}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* Mapped filtered items */}
            {Searchproducts.length > 0 && search.length > 0 && (
  <div className="absolute top-12 mt-1 w-full max-h-60 bg-white shadow-lg rounded-lg overflow-y-auto border border-gray-200 z-50">
    {Searchproducts.map((item) => (
      <div
        key={item.productId}
        className="p-3 hover:bg-gray-100 cursor-pointer transition duration-200 flex items-center gap-3"
        onClick={() => handleSearchNav(item.productId)}
      >
        {/* Product Image */}
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="w-12 h-12 object-cover rounded-md border border-gray-300"
        />
        
        {/* Product Name */}
        <span className="text-sm font-medium text-gray-800">
          {item.productName}
        </span>
      </div>
    ))}
  </div>
)}

             
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-teal-500"
            aria-label="View Cart"
          >
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
                    <>
                      <li
                        onClick={handleLogOut}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                          onClick={handlePro}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/wishlist"
                          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
                          onClick={handlePro}
                        >
                         
                          {/* Heart Icon */}
                          <span>Wishlist</span> 
                          <FaHeart className="ml-2 mr-2 text-md" />
                        </Link>
                      </li>
                    </>
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
