// src/pages/doctor/doctor-profile.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const SPECIALTIES = [
    "General Medicine","Cardiology","Dermatology","ENT","Gynecology",
    "Neurology","Orthopedics","Pediatrics","Psychiatry","Radiology","Urology"
];
const GENDERS = ["Male","Female","Non-binary","Prefer not to say"];

export default function DoctorProfile() {
    const nav = useNavigate();

    const [loading, setLoading] = React.useState(true);

    // Display-only values
    const [display, setDisplay] = React.useState({
        name: "",
        phone: "",
        email: "",
        avatarUrl: "",
    });

    // Editable form values
    const [form, setForm] = React.useState({
        bio: "",
        slmc: "",
        charges: "",
        specialty: "",
        gender: "",
        timeFrom: "",
        timeTo: "",
        dayFrom: "",
        dayTo: "",
        languages: [],
    });

    const [message, setMessage] = React.useState("");

    // ------------------------------------------------------------
    // LOAD ONLY CURRENT USER DATA
    // ------------------------------------------------------------
    React.useEffect(() => {
        async function loadData() {
            try {
                if (!auth.currentUser) return;

                const uid = auth.currentUser.uid;
                const ref = doc(db, "users", uid);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    console.error("User does not exist in Firestore");
                    setLoading(false);
                    return;
                }

                const data = snap.data();

                // LEFT PANEL DISPLAY
                setDisplay({
                    name: data.name || "Not set",
                    phone: data.phone || "",
                    email: data.email || "",
                    avatarUrl:
                        data.avatarUrl ||
                        "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=400",
                });

                // RIGHT PANEL FORM
                setForm({
                    bio: data.bio || "",
                    slmc: data.slmc || "",
                    charges: data.charges || "",
                    specialty: data.specialty || "",
                    gender: data.gender || "",
                    timeFrom: data.timeFrom || "18:30",
                    timeTo: data.timeTo || "22:30",
                    dayFrom: data.dayFrom || "Monday",
                    dayTo: data.dayTo || "Saturday",
                    languages: data.languages || ["English"],
                });

            } catch (err) {
                console.error("Error loading doctor profile:", err);
            }

            setLoading(false);
        }

        loadData();
    }, []);

    // ------------------------------------------------------------
    // SAVE PROFILE — ALWAYS FOR LOGGED-IN USER
    // ------------------------------------------------------------
    async function save() {
        try {
            if (!auth.currentUser) return;

            const uid = auth.currentUser.uid;
            const ref = doc(db, "users", uid);

            await updateDoc(ref, {
                ...form,
                avatarUrl: display.avatarUrl,
            });

            setMessage("Profile saved!");
            setTimeout(() => setMessage(""), 1200);
        } catch (err) {
            console.error("Save error:", err);
            setMessage("Error saving!");
        }
    }

    // ------------------------------------------------------------
    // AVATAR PREVIEW
    // ------------------------------------------------------------
    function onAvatarChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () =>
            setDisplay((d) => ({ ...d, avatarUrl: String(reader.result) }));
        reader.readAsDataURL(file);
    }

    // ------------------------------------------------------------
    // LANGUAGES
    // ------------------------------------------------------------
    function addLanguage() {
        const v = prompt("Add language:");
        if (!v) return;
        const t = v.trim();
        if (!t || form.languages.includes(t)) return;

        setForm((f) => ({ ...f, languages: [...f.languages, t] }));
    }

    function removeLanguage(lang) {
        setForm((f) => ({
            ...f,
            languages: f.languages.filter((l) => l !== lang),
        }));
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-white text-xl">
                Loading...
            </div>
        );
    }

    // ------------------------------------------------------------
    // FULL UI (UNCHANGED)
    // ------------------------------------------------------------
    return (
        <div
            className="h-screen w-screen overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <style>{`
                .soft-glass { background: rgba(15,33,57,0.80); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
                .panel-glass { background: rgba(255,255,255,0.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10); }
                .mint-border { border-color: rgba(74, 222, 128, .55); }
                .mint-focus:focus { box-shadow: 0 0 0 3px rgba(74,222,128,.2); }
                .area-scroll{scrollbar-width:thin;scrollbar-color:#9ec3ff transparent;}
                .area-scroll::-webkit-scrollbar{width:8px}
                .area-scroll::-webkit-scrollbar-thumb{background:#9ec3ff;border-radius:9999px}
            `}</style>

            {/* NAV */}
            <header className="shrink-0 flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="MedReach" className="h-9" />
                </div>
                <button
                    onClick={() => nav(-1)}
                    className="rounded-lg text-white px-5 py-2.5 text-[14px] font-medium hover:opacity-95 hover:bg-[#40E0D0] hover:scale-105 transition-all duration-300"
                >
                    Go Back
                </button>
            </header>

            {/* MAIN */}
            <main className="flex-1 min-h-0 px-8 pb-4">
                <div className="h-full w-full flex flex-col">
                    <div className="flex-1 min-h-0 rounded-[22px] p-1 bg-gradient-to-br from-sky-white/70 via-white-900/70 to-[#ffffff]">
                        <div className="soft-glass h-full rounded-[18px] p-6 text-white overflow-hidden">
                            <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">

                                {/* LEFT PANEL */}
                                <section className="panel-glass rounded-2xl p-6 flex flex-col items-center justify-center">

                                    <div className="relative">
                                        <div className="h-38 w-38 rounded-full overflow-hidden ring-1 ring-white/20">
                                            <img
                                                src={display.avatarUrl}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <label
                                            htmlFor="avatar"
                                            className="absolute right-5 -bottom-0 grid h-6 w-6 place-items-center rounded-full bg-[#2B4B8C] text-white shadow-lg ring-2 ring-white cursor-pointer hover:opacity-95"
                                        >
                                            ✎
                                        </label>

                                        <input
                                            id="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={onAvatarChange}
                                            className="hidden"
                                        />
                                    </div>

                                    <h2 className="mt-6 text-3xl font-extrabold text-center">
                                        {display.name}
                                    </h2>
                                    <div className="mt-3 text-slate-200 text-center">{display.phone}</div>
                                    <div className="text-slate-300 text-center">{display.email}</div>
                                </section>

                                {/* RIGHT PANEL */}
                                <section className="min-h-0 flex flex-col">
                                    <div className="area-scroll min-h-0 flex-1 overflow-y-auto pr-1">

                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-2">

                                            {/* COLUMN 1 */}
                                            <div className="panel-glass rounded-2xl p-5">
                                                <div className="space-y-4">

                                                    <div>
                                                        <label className="block text-sm mb-1.5">
                                                            Bio
                                                        </label>
                                                        <textarea
                                                            value={form.bio}
                                                            onChange={(e) =>
                                                                setForm((f) => ({ ...f, bio: e.target.value }))
                                                            }
                                                            rows={4}
                                                            className="w-full rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm mb-1.5">
                                                            Specialty
                                                        </label>
                                                        <select
                                                            value={form.specialty}
                                                            onChange={(e) =>
                                                                setForm((f) => ({ ...f, specialty: e.target.value }))
                                                            }
                                                            className="w-full rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                        >
                                                            <option value="" disabled>Select</option>
                                                            {SPECIALTIES.map((s) => (
                                                                <option key={s}>{s}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm mb-1.5">
                                                            Gender
                                                        </label>
                                                        <select
                                                            value={form.gender}
                                                            onChange={(e) =>
                                                                setForm((f) => ({ ...f, gender: e.target.value }))
                                                            }
                                                            className="w-full rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                        >
                                                            <option value="" disabled>Select</option>
                                                            {GENDERS.map((g) => (
                                                                <option key={g}>{g}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* COLUMN 2 */}
                                            <div className="panel-glass rounded-2xl p-5">
                                                <div className="space-y-5">

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-sm mb-1.5">
                                                                SLMC Reg. No.
                                                            </label>
                                                            <input
                                                                value={form.slmc}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({ ...f, slmc: e.target.value }))
                                                                }
                                                                className="w-full rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm mb-1.5">
                                                                Charges
                                                            </label>
                                                            <input
                                                                value={form.charges}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({ ...f, charges: e.target.value }))
                                                                }
                                                                className="w-full rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Visiting Hours */}
                                                    <div>
                                                        <div className="text-[15px] font-semibold mb-1.5">
                                                            Visiting Hours
                                                        </div>

                                                        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-2">
                                                            <input
                                                                type="time"
                                                                value={form.timeFrom}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({ ...f, timeFrom: e.target.value }))
                                                                }
                                                                className="rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                            />
                                                            <span className="text-slate-200 text-xs">to</span>
                                                            <input
                                                                type="time"
                                                                value={form.timeTo}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({ ...f, timeTo: e.target.value }))
                                                                }
                                                                className="rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                                                            <select
                                                                value={form.dayFrom}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({ ...f, dayFrom: e.target.value }))
                                                                }
                                                                className="rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                            >
                                                                {DAYS.map((d) => (
                                                                    <option key={d}>{d}</option>
                                                                ))}
                                                            </select>

                                                            <span className="text-slate-200 text-xs">to</span>

                                                            <select
                                                                value={form.dayTo}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({ ...f, dayTo: e.target.value }))
                                                                }
                                                                className="rounded-xl bg-white/5 border mint-border px-3 py-2"
                                                            >
                                                                {DAYS.map((d) => (
                                                                    <option key={d}>{d}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Languages */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <div className="font-semibold text-[15px]">
                                                                Languages
                                                            </div>
                                                            <button
                                                                onClick={addLanguage}
                                                                className="w-6 h-6 grid place-items-center rounded-full border mint-border hover:bg-white/10"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {form.languages.map((lang) => (
                                                                <span
                                                                    key={lang}
                                                                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border mint-border text-sm"
                                                                >
                                                                    {lang}
                                                                    <button
                                                                        onClick={() => removeLanguage(lang)}
                                                                        className="hover:text-white text-white/80"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>

                    {/* Save Buttons */}
                    <div className="flex justify-end gap-3 pt-3 text-white">
                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-lg border border-white px-7 py-2.5 text-[14px]"
                        >
                            Discard
                        </button>
                        <button
                            onClick={save}
                            className="rounded-lg bg-[#0E1A33] px-7 py-2.5 text-[14px]"
                        >
                            Save
                        </button>
                    </div>

                    {message && (
                        <div className="text-right text-sm text-emerald-500 mt-1">
                            {message}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
