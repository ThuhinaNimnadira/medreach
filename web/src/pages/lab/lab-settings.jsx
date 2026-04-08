// src/pages/lab/lab-settings.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

/* Small inline icons */
const Eye = ({ off }) => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
            fill="currentColor"
            d={
                off
                    ? "M2 3.27 3.28 2 22 20.72 20.73 22l-2.43-2.43A10.9 10.9 0 0 1 12 20C6 20 2 12 2 12a20.8 20.8 0 0 1 5.57-6.92L2 3.27ZM12 7a5 5 0 0 1 5 5c0 .66-.13 1.3-.36 1.88L10.12 7.36C10.7 7.13 11.34 7 12 7Zm10 5s-1.04 1.96-2.82 3.86l-1.43-1.43C18.64 13.49 19 12.77 19 12a7 7 0 0 0-7-7c-.77 0-1.49.36-2.43.25L7.14 3A21.6 21.6 0 0 1 12 4c6 0 10 8 10 8Z"
                    : "M12 4c6 0 10 8 10 8s-4 8-10 8S2 12 2 12 6 4 12 4Zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
            }
        />
    </svg>
);

const ArrowRight = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-400">
        <path fill="currentColor" d="m10 17 5-5-5-5v10Z" />
    </svg>
);

/* localStorage helpers so settings persist only for the lab user locally */
const LS_KEY = "lab_settings";
function loadSettings() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : { notifications: true };
    } catch {
        return { notifications: true };
    }
}
function saveSettings(s) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(s));
    } catch {}
}

export default function LabSettings() {
    // password (UI-only)
    const [curr, setCurr] = React.useState("");
    const [next, setNext] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [show, setShow] = React.useState({ curr: false, next: false, confirm: false });
    const [savingPass, setSavingPass] = React.useState(false);

    // notification toggle (scoped to this lab user)
    const [settings, setSettings] = React.useState(() => loadSettings());
    const [msg, setMsg] = React.useState("");

    function toggleNotif() {
        const nextSettings = { ...settings, notifications: !settings.notifications };
        setSettings(nextSettings);
        saveSettings(nextSettings);
    }

    async function onSavePassword(e) {
        e.preventDefault();
        if (!curr || !next || next.length < 6 || next !== confirm) {
            setMsg("Please check your password fields.");
            setTimeout(() => setMsg(""), 1400);
            return;
        }
        setSavingPass(true);
        await new Promise((r) => setTimeout(r, 500)); // demo delay
        setSavingPass(false);
        setCurr(""); setNext(""); setConfirm("");
        setMsg("Password updated (demo).");
        setTimeout(() => setMsg(""), 1400);
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
             style={{ backgroundImage: `url(${bg})` }}>
            {/* Top navbar */}
            <header className="flex justify-between items-center px-12 py-4  shrink-0">
                <div className="flex items-center gap-3 mr-10">
                    <img src={logo} alt="MedReach" className="h-10 mr-6 mt-2" />
                </div>
                <nav className="flex items-center gap-1 text-[#ffffff] font-medium">
                    <Link to="/lab/notifications" className="mt-1 pr-4" title="Notifications">
                        <Bell className="w-5 h-5 text-white cursor-pointer" />
                    </Link>
                    <Link to="/lab/reports" className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all">Reports</Link>
                    <Link to="/lab/dashboard" className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all">Home</Link>
                    <Link to="/login" className="w-28 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all">Log Out</Link>
                </nav>
            </header>

            {/* Page title */}
            <div className="px-6 md:px-12">
                <h1 className="text-[44px] font-extrabold text-[#ffffff] mb-6">Settings</h1>

                {/* Two columns */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left: Change password */}
                    <form
                        onSubmit={onSavePassword}
                        className="rounded-2xl bg-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.2)] p-6 md:p-8"
                    >
                        <h2 className="text-2xl font-semibold text-[#0E1A33] text-center md:text-left mb-6">
                            Change password
                        </h2>

                        {[
                            { label: "Current password", val: curr, set: setCurr, key: "curr" },
                            { label: "New password", val: next, set: setNext, key: "next" },
                            { label: "Confirm password", val: confirm, set: setConfirm, key: "confirm" },
                        ].map((f) => (
                            <div key={f.key} className="mb-4">
                                <div className="flex items-center rounded-xl bg-[#D9FFF4] px-4">
                                    <input
                                        type={show[f.key] ? "text" : "password"}
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value)}
                                        placeholder={f.label}
                                        className="w-full bg-transparent py-3 outline-none placeholder:text-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow((s) => ({ ...s, [f.key]: !s[f.key] }))}
                                        className="p-2"
                                        aria-label="toggle visibility"
                                    >
                                        <Eye off={!show[f.key]} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="text-right text-[13px] text-gray-500 mb-5">Forgot password ?</div>

                        <button
                            type="submit"
                            disabled={savingPass}
                            className="w-full rounded-xl bg-[#0E1A33] text-white py-3 font-medium shadow-[0_15px_30px_-20px_rgba(14,26,51,0.8)] disabled:opacity-60"
                        >
                            {savingPass ? "Updating..." : "Update"}
                        </button>

                        {msg && <div className="mt-3 text-center text-sm text-emerald-600">{msg}</div>}
                    </form>

                    {/* Right: Notifications + Help */}
                    <section className="rounded-2xl bg-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.2)] p-6 md:p-8">
                        {/* Enable notifications */}
                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-semibold text-[#0E1A33]">Enable Notifications</div>
                                    <div className="text-sm text-gray-500">Receive  notifications</div>
                                </div>

                                {/* Toggle */}
                                <button
                                    type="button"
                                    onClick={toggleNotif}
                                    className={`relative w-12 h-6 rounded-full transition ${
                                        settings.notifications ? "bg-teal-300" : "bg-gray-300"
                                    }`}
                                    aria-pressed={settings.notifications}
                                >
                  <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          settings.notifications ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                                </button>
                            </div>
                        </div>

                        {/* Need Help? */}
                        <button
                            type="button"
                            onClick={() => (window.location.href = "/contact")}
                            className="w-full text-left"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-semibold text-[#0E1A33]">Need  Help?</div>
                                    <div className="text-sm text-gray-500">Contact our support center</div>
                                </div>
                                <ArrowRight />
                            </div>
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
