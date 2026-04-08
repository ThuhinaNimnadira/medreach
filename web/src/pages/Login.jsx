import React, { useState } from "react";
import Logobar from "../components/Logobar";
import bg from "../assets/bgforlandingpage.png";

import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Firebase Login Function
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            // 1️⃣ Login with email/password
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // 2️⃣ Fetch user role from Firestore (users collection)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                setErrorMsg("User profile not found in database.");
                return;
            }

            const role = docSnap.data().role;

            // 3️⃣ Redirect user based on role
            if (role === "admin") {
                window.location.href = "/admin/dashboard";
            }
            else if (role === "doctor") {
                window.location.href = "/doctor/dashboard";
            }
            else if (role === "pharmacist") {
                window.location.href = "/pharmacy/dashboard";
            }
            else if (role === "lab") {
                window.location.href = "/lab/dashboard";
            }
            else if (role === "receptionist") {
                window.location.href = "/reception/dashboard";
            }
            else {
                setErrorMsg("Unknown role. Contact administrator.");
            }

        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <Logobar />

            <div className="flex justify-center items-center flex-1 ">
                <div className="flex w-full max-w-6xl justify-center items-center gap-30 px-4">

                    {/* Left: Logo */}
                    <div className="flex-1 flex justify-center items-center max-w-94">
                        <img src="/1.png" alt="Logo" className="h-92 w-auto" />
                    </div>

                    {/* Right: Sign In Form */}
                    <div className="flex-1 flex flex-col justify-center p-6 text-left max-w-md w-full mb-12">
                        <h2 className="text-3xl font-poppins font-bold text-white mb-6">
                            Sign In
                        </h2>

                        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-300"
                                required
                            />

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-300 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <a href="#" className="text-gray-400 text-sm hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Error Msg */}
                            {errorMsg && (
                                <p className="text-red-400 text-sm">{errorMsg}</p>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#0C164F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#40E0D0] hover:text-black hover:scale-105 transition-all duration-300"
                            >
                                Log In
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
