// src/pages/pharmacy/pharmacy-dashboard.jsx
import React from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import "./../admin.css" ;
import { loadPrescriptions } from "../../data/pharmacy-prescriptions.store.js";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

const ClipboardIcon = ({ className = "w-7 h-7" }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <path fill="#2b3a9e" d="M9 2h6a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2Zm6 2H9v2h6V4Z" opacity=".15"/>
        <rect x="9" y="3" width="6" height="3" rx="1" fill="#2b3a9e" />
        <rect x="5" y="5" width="14" height="16" rx="3" fill="#e7eafe" />
        <path d="M9 11h6M9 14h6M9 17h4" stroke="#2b3a9e" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
);

export default function PharmacyDashboard() {
    const prescriptions = React.useMemo(() => loadPrescriptions(), []);
    const issued = React.useMemo(
        () =>
            prescriptions
                .filter((p) => p.status === "issued")
                .sort((a, b) => (b.issuedAt || 0) - (a.issuedAt || 0))
                .slice(0, 10),
        [prescriptions]
    );
    const SUMMARY = { prescriptions: prescriptions.length, notifications: 12 };

    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden"
             style={{ backgroundImage: `url(${bg})` }}
        >
            <style>{`
        .docs-scroll { scrollbar-width: thin; scrollbar-color: #0C164F #EEF0FF; }
        .docs-scroll::-webkit-scrollbar { width: 10px; }
        .docs-scroll::-webkit-scrollbar-track { background: #EEF0FF; border-radius: 9999px; }
        .docs-scroll::-webkit-scrollbar-thumb { background: #0C164F; border-radius: 9999px; }
      `}</style>

            <header className="flex justify-between items-center px-12 py-4  shrink-0">
                <div className="flex items-center gap-3 mr-10">
                    <img src={logo} alt="MedReach" className="h-10 mr-6 mt-2" />
                </div>
                <nav className="flex items-center gap-1 text-[#ffffff] font-medium">
                    <Link to="/pharmacy/notifications" className="mt-1 pr-4" title="Notifications">
                        <Bell className="w-5 h-5 text-white cursor-pointer" />
                    </Link>
                    <Link
                        to="/pharmacy/prescriptions"
                        className="w-32 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all"
                    >
                        Prescriptions
                    </Link>
                    <Link
                        to="/pharmacy/settings"
                        className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all"
                    >
                        Settings
                    </Link>
                    <Link
                        to="/login"
                        className="w-28 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all"
                    >
                        Log Out
                    </Link>
                </nav>
            </header>

            <main className="flex flex-1 min-h-0 px-12 py-10 gap-8">
                <aside className="w-[255px] h-[273px]">
                    <h1 className="text-2xl font-bold mb-2 text-white">
                        Hello,<br />
                        <span className="text-[#ffffff] text-4xl">Pharmacist!</span>
                    </h1>
                    <p className="text-sm text-white mb-6">Stay In Control, Stay Connected.</p>
                    <div className="bg-white rounded-xl shadow-md p-10 space-y-2 h-full">
                        <h2 className="text-2xl font-semibold text-gray-800 pb-3">
                            What’s <br />New?
                        </h2>
                        <p className="text-gray-700">
                            <span className="font-semibold">{SUMMARY.prescriptions}</span> Prescriptions
                        </p>
                        <p className="text-green-600">
                            <span className="font-semibold">{SUMMARY.notifications}</span> Notifications
                        </p>
                    </div>
                </aside>

                <section className="flex-1 grid grid-cols-2 gap-8 min-h-0">
                    <div className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-between w-[439px] h-[400px]">
                        <div>
                            <div className="w-[100px] h-[100px] bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <ClipboardIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 mt-4 text-[#0C164F]">New prescriptions</h3>
                            <p className="text-gray-500 mb-6">Access all new &amp; dispensed prescriptions.</p>
                        </div>
                        <Link to="/pharmacy/prescriptions" className="text-gray-600 font-semibold hover:text-[#0C164F]">
                            View &raquo;
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-10 w-[439px] h-[400px] flex flex-col overflow-hidden">
                        <div className="shrink-0">
                            <h3 className="text-3xl font-bold mb-2 text-[#0C164F]">Recently issued</h3>
                            <p className="text-gray-500">recent prescription records.</p>
                        </div>
                        <div className="docs-scroll flex-1 overflow-y-auto mt-6 space-y-4 pr-2">
                            {issued.map((p) => (
                                <div key={p.id} className="flex items-center gap-3 bg-[#EEF0FF] rounded-2xl px-4 py-4">
                                    <div className="grid place-items-center w-12 h-12 bg-white/70 rounded-lg">
                                        <ClipboardIcon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[15px] font-semibold text-[#0C164F]">{p.patientName}</div>
                                        <div className="text-sm text-gray-600">{p.date}</div>
                                    </div>
                                    <Link
                                        to={`/prescription/${encodeURIComponent(p.publicId)}`}
                                        className="px-4 py-1 rounded-full border border-[#0C164F] text-[#0C164F] text-sm hover:bg-[#0C164F] hover:text-white transition"
                                    >
                                        Info
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
