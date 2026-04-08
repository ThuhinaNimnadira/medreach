import React from "react";
import Navbar from "../components/Navbar";
import bg from "../assets/bgforlandingpage.png"; // Import the Navbar

export default function About() {
    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <Navbar />  

            <div
                className="
                mx-auto mt-8 rounded-xl flex justify-center items-center px-6
               bg-white/10 backdrop-blur-lg
                opacity-90
                "
                style={{
                    width: "90%",
                    height: "calc(80vh - 4rem)",
                }}
            >

             
                <div className="flex w-full max-w-6xl justify-between items-center gap-4 px-4">

                     
                    <div className="flex-1 max-w-[30%] h-[90%] flex flex-col bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6 text-left">
                        <h1 className="font-poppins font-bold text-2xl text-white mb-3">About Us</h1>
                        <p className="text-white text-xs">
                            At MedReach, we connect patients directly with their hospital — bringing doctors, pharmacies, and administrative staff into one simple platform. Our goal is to make hospital services more accessible, organized, and patient-friendly through digital solutions.
                            <br /><br />
                            With the MedReach mobile app, patients can easily book appointments, receive updates, and stay connected with their hospital care team. On the other side, hospital staff — including doctors, pharmacists, and administrators — use the MedReach web portal to manage appointments, records, and communication efficiently.
                        </p>
                    </div>

                     
                    <div className="flex-shrink-0">
                        <img src="6.png" alt="Logo" className="h-92 w-auto" />
                    </div>

                     
                    <div className="flex-1 max-w-[30%] h-[90%] flex flex-col bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6 text-left">
                        <h1 className="font-poppins font-bold text-2xl text-white mb-3">Our Edge</h1>
                        <p className="text-white text-xs">
                            MedReach offers patients a dedicated mobile app to manage appointments, prescriptions, and hospital updates with ease. At the same time, hospital staff — including doctors, pharmacists, and administrators — can access a secure web portal to coordinate care and manage services efficiently. Designed with simplicity in mind, MedReach ensures that both patients and staff can focus on what truly matters: delivering and receiving quality care without unnecessary complexity.<br /><br /><br /><br />
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
