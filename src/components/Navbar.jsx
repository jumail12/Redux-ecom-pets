import { useEffect, useState, useRef } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaPaw, FaHeart, FaTimes, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { logOut } from "../sliceLogic/userAuth";
import { fetchCart } from "../sliceLogic/cartSlice";
import { SerachPro } from "../sliceLogic/ProductSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = Cookies.get("name");
  const token = Cookies.get("token");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const { cart } = useSelector((state) => state.cartItems);
  const Searchproducts = useSelector((state) => state.pro.search);

  useEffect(() => {
    if (token) dispatch(fetchCart());
  }, [dispatch, token]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    dispatch(SerachPro(value || ""));
  };

  const handleSearchNav = (productId) => {
    navigate(`/product/${productId}`);
    setSearch("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

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
        Object.keys(Cookies.get()).forEach((cookieName) => Cookies.remove(cookieName));
        localStorage.clear();
        dispatch(logOut());
        toast.warn("Logged Out");
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate("/");
      }
    });
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setSearchOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown and search on outside click
  useEffect(() => {
    const closeOnOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearch("");
      }
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  // Close mobile menu on route navigation
  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const SearchBar = ({ className = "" }) => (
    <div ref={searchRef} className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        value={search}
        onChange={handleSearch}
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

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
                className="w-10 h-10 object-cover rounded-md border border-gray-300 flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-800 truncate">
                {item.productName}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => { navigate("/"); handleNavClick(); }}
          >
            <FaPaw className="text-2xl text-teal-500 mr-2" />
            <span className="text-xl font-bold text-gray-800">Pets</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-5 flex-1 mx-6">
            <Link to="/" className="text-gray-600 hover:text-teal-500 whitespace-nowrap text-sm font-medium">Home</Link>
            <Link to="/store" className="text-gray-600 hover:text-teal-500 whitespace-nowrap text-sm font-medium">Featured</Link>
            <Link to="/hot" className="text-gray-600 hover:text-teal-500 whitespace-nowrap text-sm font-medium">Hot Deals</Link>

            {/* Desktop Search */}
            <SearchBar className="flex-1 max-w-xs" />
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-600 hover:text-teal-500 flex items-center text-sm font-medium">
              <FaShoppingCart className="mr-1" />
              Cart
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-600 hover:text-teal-500 text-sm font-medium"
              >
                <FaUser className="mr-1" />
                <span className="max-w-[80px] truncate">{user || "Account"}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {user ? (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <FaUser className="mr-2 text-xs" /> Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/wishlist"
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <FaHeart className="mr-2 text-xs" /> Wishlist
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogOut}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          onClick={() => { navigate("/login"); setDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          Login
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right: Cart + Hamburger */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="text-gray-600 hover:text-teal-500 p-1"
              aria-label="Search"
            >
              <FaSearch className="text-lg" />
            </button>

            {/* Mobile Cart */}
            <Link to="/cart" className="relative text-gray-600 hover:text-teal-500 p-1" onClick={handleNavClick}>
              <FaShoppingCart className="text-lg" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-teal-500 p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-3 px-1">
            <SearchBar />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            <Link
              to="/"
              className="block px-2 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-50 rounded-md font-medium"
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              to="/store"
              className="block px-2 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-50 rounded-md font-medium"
              onClick={handleNavClick}
            >
              Featured
            </Link>
            <Link
              to="/hot"
              className="block px-2 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-50 rounded-md font-medium"
              onClick={handleNavClick}
            >
              Hot Deals
            </Link>

            <div className="border-t border-gray-100 pt-2 mt-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-2 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-50 rounded-md font-medium"
                    onClick={handleNavClick}
                  >
                    <FaUser className="mr-2 text-sm" /> Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center px-2 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-50 rounded-md font-medium"
                    onClick={handleNavClick}
                  >
                    <FaHeart className="mr-2 text-sm" /> Wishlist
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center w-full px-2 py-2 text-red-500 hover:bg-gray-50 rounded-md font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate("/login"); handleNavClick(); }}
                  className="flex items-center w-full px-2 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-50 rounded-md font-medium"
                >
                  <FaUser className="mr-2 text-sm" /> Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
