import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaPaw, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { logOut } from "../sliceLogic/userAuth";
import { fetchCart, addedToCart } from "../sliceLogic/cartSlice";
import { SerachPro } from "../sliceLogic/ProductSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = Cookies.get("name");
  const token = Cookies.get("token");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { cart } = useSelector((state) => state.cartItems);
  const Searchproducts = useSelector((state) => state.pro.search);

  // Load the cart data on first render if token is present
  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  // Search product handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    dispatch(SerachPro(value || ""));
  };

  // Navigate to searched product details
  const handleSearchNav = (productId) => {
    navigate(`/product/${productId}`);
    setSearch("");
  };

  // Log out handler
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
        Cookies.remove("token");
        Cookies.remove("name");
        localStorage.clear();
        dispatch(logOut());
        toast.warn("Logged Out");
        setDropdownOpen(false);
        navigate("/");
      }
    });
  };

  // Toggle dropdown state
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".relative")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaPaw className="text-3xl text-teal-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">Pets</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-teal-500">
            Home
          </Link>
          <Link to="/store" className="text-gray-600 hover:text-teal-500">
            Featured
          </Link>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={search}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* Search Results */}
            {Searchproducts.length > 0 && search && (
              <div className="absolute top-12 mt-1 w-full max-h-60 bg-white shadow-lg rounded-lg overflow-y-auto border border-gray-200 z-50">
                {Searchproducts.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3 hover:bg-gray-100 cursor-pointer transition duration-200 flex items-center gap-3"
                    onClick={() => handleSearchNav(item.productId)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-md border border-gray-300"
                    />
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
          >
            <FaShoppingCart className="inline mr-1" />
            Cart
            {cart?.length > 0 && (
              <span className="absolute top-0 right-10 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-600 hover:text-teal-500"
            >
              <FaUser className="mr-2" />
              {user || "Account"}
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
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/wishlist"
                          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          <FaHeart className="mr-2" />
                          Wishlist
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={() => navigate("/login")}
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
