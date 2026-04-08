import { Link } from "react-router-dom";
import logo from "../assets/3 - Copy.png";

export default function Navbar() {
    return (
        <header className="flex justify-between items-center px-12 py-6">
            {/* Logo */}
            <div className="flex items-center gap-3 mr-10">
                <img src={logo} alt="MedReach" className="h-10 mr-6" />
            </div>

            {/* Links */}
            <nav className="flex items-center gap-1 text-[#FFFFFF] font-medium">
                <Link
                    to="/"
                    className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                >
                    About
                </Link>
                <Link
                    to="/contact"
                    className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                >
                    Contact
                </Link>
                <Link
                    to="/login"
                    className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                >
                    Log in
                </Link>
            </nav>
        </header>
    );
}
