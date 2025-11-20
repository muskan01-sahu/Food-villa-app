import react from "react";

const Footer = () => {
    return(
        <footer className="bg-amber-900 border-t border-amber-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* About Section */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Food Villa</h3>
                    <p className="text-amber-100 text-sm leading-relaxed">
                        Discover the best restaurants in your area. Order your favorite food with just a few clicks.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/home" className="text-amber-100 hover:text-white transition-colors duration-200 text-sm">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/cart" className="text-amber-100 hover:text-white transition-colors duration-200 text-sm">
                                Cart
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="text-amber-100">
                            Email: info@foodvilla.com
                        </li>
                        <li className="text-amber-100">
                            Phone: +1 (555) 123-4567
                        </li>
                        <li className="text-amber-100">
                            Available 24/7
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-amber-800 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-amber-100 text-sm">
                        © 2024 Food Villa. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-amber-100 hover:text-white transition-colors duration-200 text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-amber-100 hover:text-white transition-colors duration-200 text-sm">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;