import React from "react";
import logo from "../assets/3 - Copy.png";

export default function Navbar() {
    return (
        <header className="flex justify-start items-center px-12 py-6">
             
            <div className="flex items-center gap-3">
                <img src={logo} alt="MedReach" className="h-10" />
            </div>
        </header>
    );
}
