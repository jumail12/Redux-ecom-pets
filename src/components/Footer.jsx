const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10">
            <div className="container mx-auto px-6">
                {/* Footer Top */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* Logo and Shop Name */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-white">Pets</h2>
                        <p className="text-gray-400 mt-2">Caring for your pets with love and dedication</p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-pinterest fa-2x"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    </div>
                </div>

               
               

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <h3 className="font-bold text-gray-200 mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2">
                                <a href="/" className="hover:text-white transition duration-300">Home</a>
                            </li>
                            <li className="mb-2">
                                <a href="/shop" className="hover:text-white transition duration-300">Shop</a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="hover:text-white transition duration-300">About Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="/contact" className="hover:text-white transition duration-300">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <h3 className="font-bold text-gray-200 mb-4">Support</h3>
                        <ul>
                            <li className="mb-2">
                                <a href="/terms" className="hover:text-white transition duration-300">Terms of Service</a>
                            </li>
                            <li className="mb-2">
                                <a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a>
                            </li>
                            <li className="mb-2">
                                <a href="/shipping" className="hover:text-white transition duration-300">Shipping</a>
                            </li>
                            <li className="mb-2">
                                <a href="/returns" className="hover:text-white transition duration-300">Returns</a>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <h3 className="font-bold text-gray-200 mb-4">Resources</h3>
                        <ul>
                            <li className="mb-2">
                                <a href="/blog" className="hover:text-white transition duration-300">Blog</a>
                            </li>
                            <li className="mb-2">
                                <a href="/faq" className="hover:text-white transition duration-300">FAQ</a>
                            </li>
                            <li className="mb-2">
                                <a href="/community" className="hover:text-white transition duration-300">Community</a>
                            </li>
                            <li className="mb-2">
                                <a href="/careers" className="hover:text-white transition duration-300">Careers</a>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <h3 className="font-bold text-gray-200 mb-4">Contact</h3>
                        <ul>
                            <li className="mb-2">
                                <a href="/support" className="hover:text-white transition duration-300">Support</a>
                            </li>
                            <li className="mb-2">
                                <a href="/locations" className="hover:text-white transition duration-300">Store Locations</a>
                            </li>
                            <li className="mb-2">
                                <a href="/feedback" className="hover:text-white transition duration-300">Feedback</a>
                            </li>
                            <li className="mb-2">
                                <a href="/partners" className="hover:text-white transition duration-300">Partners</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-500 text-sm">&copy; 2024 Pets. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
