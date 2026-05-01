  
import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // make sure this points to your firebase.js
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import "./../admin.css";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";
  
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
const MailIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-500">
        <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z" />
    </svg>
);
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-500">
        <path fill="currentColor" d="M20 15.5c-1.2 0-2.4-.2-3.5-.6a1 1 0 0 0-1 .24l-1.6 1.6a15.05 15.05 0 0 1-6.6-6.6l1.6-1.6a1 1 0 0 0 .24-1A11.6 11.6 0 0 1 8.5 4 1 1 0 0 0 7.5 3H5a2 2 0 0 0-2 2c0 9.39 7.61 17 17 17a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1Z" />
    </svg>
);

export default function AdminSettings() {
    const ADMIN_DOC_ID = "OHM93KD3NLOpJuTNLR57PKNU5m93";

    const [profile, setProfile] = useState({
        email: "",
        name: "",
        phone: "",
        avatarUrl: "",
    });

    const [savingProfile, setSavingProfile] = useState(false);
    const [msg, setMsg] = useState("");

    const [curr, setCurr] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const [show, setShow] = useState({ curr: false, next: false, confirm: false });
    const [savingPass, setSavingPass] = useState(false);
  
    useEffect(() => {
        async function fetchAdmin() {
            const docRef = doc(db, "users", ADMIN_DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfile({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    avatarUrl: data.avatar || "",
                });
            }
        }
        fetchAdmin();
    }, []);

    function onAvatarChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setProfile((p) => ({ ...p, avatarUrl: String(reader.result) }));
        reader.readAsDataURL(file);
    }

    async function onSaveProfile(e) {
        e.preventDefault();
        setSavingProfile(true);
        const docRef = doc(db, "users", ADMIN_DOC_ID);
        await updateDoc(docRef, {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            avatar: profile.avatarUrl,
        });
        setSavingProfile(false);
        setMsg("Profile updated");
        setTimeout(() => setMsg(""), 1200);
    }

    async function onSavePassword(e) {
        e.preventDefault();
        if (!curr || !next || next.length < 6 || next !== confirm) {
            setMsg("Check your password fields.");
            setTimeout(() => setMsg(""), 1500);
            return;
        }
        setSavingPass(true);
        await new Promise((r) => setTimeout(r, 350)); // demo only
        setSavingPass(false);
        setCurr(""); setNext(""); setConfirm("");
        setMsg("Password updated (demo)");
        setTimeout(() => setMsg(""), 1200);
    }

    return (
        <div className="min-h-screen bg-gray-50"
             style={{ backgroundImage: `url(${bg})` }}
        >
            <header className="flex justify-between items-center px-12 py-4 ">
                <div className="flex items-center gap-3 mr-10">
                    <img src={logo} alt="MedReach" className="h-10 mr-6 mt-2" />
                </div>
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-1 text-[#ffffff] font-medium">
                        <Link to="/admin/notifications" className="mt-1" title="Notifications">
                            <Bell className="w-5 h-5 text-white cursor-pointer bell-hover" />
                        </Link>
                        <Link to="/admin/dashboard" className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300">Home</Link>
                        <Link to="/login" className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300">Log Out</Link>
                    </nav>
                </div>
            </header>

            <div className="px-6 md:px-10">
                <h1 className="text-[32px] md:text-[36px] font-semibold text-2xl text-[#ffffff] mb-5 ml-27">Settings</h1>

                <div className="mx-auto max-w-[980px] grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                     
                    <form onSubmit={onSaveProfile} className="rounded-2xl bg-white p-5 md:p-6 shadow">
                        <h2 className="text-xl font-semibold text-[#0E1A33] text-center md:text-left mb-5">Profile info</h2>

                        <div className="grid gap-5 md:grid-cols-[1fr_200px] md:items-start">
                            <div className="grid gap-3.5">
                                <label className="text-xs text-gray-600">Your Email</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
                                    <input
                                        value={profile.email}
                                        onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                                        placeholder="xxx@gmail.com"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 outline-none focus:border-gray-300 text-[15px]"
                                    />
                                </div>

                                <label className="text-xs text-gray-600 mt-1">User name</label>
                                <input
                                    value={profile.name}
                                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="Usernamehere"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-gray-300 text-[15px]"
                                />

                                <label className="text-xs text-gray-600 mt-1">Phone Number</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2"><PhoneIcon /></span>
                                    <input
                                        value={profile.phone}
                                        onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                                        placeholder="+941234567"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 outline-none focus:border-gray-300 text-[15px]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-3">
                                <div className="relative h-36 w-36">
                                    <div className="h-full w-full rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-300">
                                        <img src={profile.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                                    </div>
                                    <label htmlFor="avatar" className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-gray-700 text-white shadow-md cursor-pointer z-10" title="Change avatar">
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                            <path d="M5 20h14v-9h2v11H3V11h2v9Zm7-3 6-6-4-4-6 6v4h4Zm7.7-10.3a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-1.3 1.3 3.4 3.4 1.3-1.3Z" />
                                        </svg>
                                    </label>
                                    <input id="avatar" type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={savingProfile} className="mt-6 w-full rounded-xl bg-[#0E1A33] text-white py-2.5 font-medium">
                            {savingProfile ? "Updating..." : "Update"}
                        </button>
                        {msg && <div className="mt-2 text-center text-sm text-emerald-600">{msg}</div>}
                    </form>

                     
                    <form onSubmit={onSavePassword} className="rounded-2xl bg-white shadow p-5 md:p-6">
                        <h2 className="text-xl font-semibold text-[#0E1A33] text-center md:text-left mb-5">Change password</h2>

                        {[{ label: "Current password", val: curr, set: setCurr, key: "curr" },
                            { label: "New password", val: next, set: setNext, key: "next" },
                            { label: "Confirm password", val: confirm, set: setConfirm, key: "confirm" }].map((f) => (
                            <div key={f.key} className="mb-3">
                                <div className="flex items-center rounded-xl bg-[#D9FFF4] px-3">
                                    <input
                                        type={show[f.key] ? "text" : "password"}
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value)}
                                        placeholder={f.label}
                                        className="w-full bg-transparent py-2.5 outline-none placeholder:text-gray-600 text-[15px]"
                                    />
                                    <button type="button" onClick={() => setShow((s) => ({ ...s, [f.key]: !s[f.key] }))} className="p-1.5" aria-label="toggle visibility">
                                        <Eye off={!show[f.key]} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="text-right text-[12px] text-gray-500 mb-25">Forgot password ?</div>
                        <button type="submit" disabled={savingPass} className="w-full rounded-xl bg-[#0E1A33] text-white py-2.5 font-medium">
                            {savingPass ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
