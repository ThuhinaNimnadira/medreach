import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import "./Contact.css";
import bg from "../assets/bgforlandingpage.png"; // Gradient animation

export default function Contact() {
    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <Navbar /> {/* Add Navbar here */}

            <div className="relative mx-auto mt-8 rounded-xl px-6 h-[calc(80vh-4rem)] w-[90%] overflow-hidden animated-gradient">

                {/* Inner content */}
                <div className="relative flex w-full max-w-6xl justify-between items-center gap-8 px-4 h-full">

                    {/* Left: Info text */}
                    <div className="flex-1 flex flex-col justify-center items-center p-6 text-left">
                        <h3 className="text-4xl font-poppins font-bold text-white mb-3 text-center">
                            Have Questions? <br/>
                            Let's Connect.
                        </h3>
                        <p className="text-white text-sm text-center">
                            Whether you're a patient, doctor, or partner, <br/>
                            we're just a message away.
                        </p>
                    </div>

                    {/* Right: Form only */}
                    <div className="flex-1 flex flex-col justify-center p-6 text-left">
                        <form className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border rounded-md px-4 py-2 text-[#FFFFFF] placeholder-white"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border rounded-md px-4 py-2 text-[#FFFFFF] placeholder-white"
                            />
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full border rounded-md px-4 py-2 text-[#FFFFFF] placeholder-white"
                            ></textarea>
                            <button className="bg-[#0C164F] text-white px-6 py-2 rounded-md font-semibold w-35 h-12">
                                Submit
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
