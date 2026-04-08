// src/pages/admin/admin-doctorsinfo.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // your firebase.js

const DEFAULT_AVATAR =
    "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=400&auto=format&fit=crop";

function cap(s = "") {
    return s ? s[0].toUpperCase() + s.slice(1) : "";
}

function makeAppointments(n = 12, withName = "Patient name") {
    return Array.from({ length: n }).map((_, i) => ({
        id: `a-${i + 1}`,
        date: "01/01/1111",
        title: "Appointment1",
        with: withName,
    }));
}

function buildFallback(id) {
    return {
        id,
        name: "Doctor",
        role: "doctor",
        email: "example@gmail.com",
        avatar: DEFAULT_AVATAR,
        appointments: makeAppointments(10),
    };
}

function AppointmentCard({ a }) {
    return (
        <div className="rounded-2xl bg-blue-900/30 border border-white/10 px-4 py-3">
            <div className="text-[11px] tracking-wide text-blue-200/90">{a.date}</div>
            <div className="mt-0.5 text-lg font-semibold text-blue-100 leading-tight">
                {a.title}
            </div>
            <div className="text-sm text-blue-200/80">{a.with}</div>
        </div>
    );
}

export default function AdminDoctorsInfo() {
    const nav = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();

    const [doctor, setDoctor] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // Fetch doctor from Firestore
    React.useEffect(() => {
        const fetchDoctor = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "staff", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDoctor(docSnap.data());
                } else {
                    setDoctor(buildFallback(id));
                }
            } catch (err) {
                console.error("Error fetching doctor:", err);
                setDoctor(buildFallback(id));
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    const [appointments, setAppointments] = React.useState([]);

    React.useEffect(() => {
        if (doctor) setAppointments(doctor.appointments || []);
    }, [doctor]);

    // Example: Change doctor role in Firestore
    const handleChangeRole = async () => {
        const newRole = prompt("Enter new role:", doctor.role);
        if (!newRole) return;
        setDoctor((prev) => ({ ...prev, role: newRole }));
        try {
            const docRef = doc(db, "staff", id);
            await updateDoc(docRef, { role: newRole });
            alert("Role updated!");
        } catch (err) {
            console.error(err);
            alert("Failed to update role.");
        }
    };

    // Delete doctor account (just a placeholder)
    const handleDeleteAccount = () => {
        alert("Delete doctor account feature (implement Firestore deletion here).");
    };

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-gray-500">
                Loading doctor info...
            </div>
        );
    }

    return (
        <div className="h-screen w-screen overflow-hidden bg-white flex flex-col">
            {/* Page-scoped scrollbar for appointments */}
            <style>{`
        .med-scroll { scrollbar-width: thin; scrollbar-color: #ffffff rgba(255,255,255,0.22); }
        .med-scroll::-webkit-scrollbar { width: 10px; }
        .med-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.22); border-radius: 9999px; }
        .med-scroll::-webkit-scrollbar-thumb { background: #ffffff; border-radius: 9999px; border: 2px solid rgba(255,255,255,0.22); }
      `}</style>

            {/* Navbar */}
            <header className="shrink-0 flex items-center justify-between px-12 py-6">
                <div className="flex items-center gap-3">
                    <img src="/3.png" alt="MedReach" className="h-10" />
                </div>
                <button
                    onClick={() => nav(-1)}
                    className="rounded-xl bg-[#0E1A33] text-white px-6 py-3 text-[15px] font-medium hover:opacity-95"
                >
                    Go Back
                </button>
            </header>

            {/* Main container */}
            <main className="flex-1 min-h-0 px-12 pb-8">
                <div className="h-full w-full flex items-stretch justify-center">
                    <div className="h-full w-full max-w-[1200px] rounded-[28px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                        <div className="h-full rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] p-10">
                            <div className="grid h-full min-h-0 gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
                                {/* LEFT: profile card */}
                                <div className="rounded-3xl bg-white/5 border border-white/10 p-10 text-white shadow-inner">
                                    <div className="flex flex-col items-start md:items-center md:text-center">
                                        <img
                                            src={doctor.avatar || DEFAULT_AVATAR}
                                            alt={`${doctor.name} avatar`}
                                            className="h-28 w-28 rounded-full object-cover ring-2 ring-white/20"
                                        />

                                        <div className="mt-10">
                                            <div className="text-4xl md:text-[44px] leading-none font-extrabold">
                                                {"Dr. "}{doctor.name || "Name"}
                                            </div>
                                            <div className="mt-3 text-slate-300">{doctor.email}</div>
                                            <div className="mt-1 text-slate-300 font-medium">Role: {doctor.role}</div>
                                        </div>

                                        <div className="mt-10 w-full md:max-w-xs grid gap-4">
                                            <button
                                                className="rounded-xl bg-gradient-to-b from-[#3b63c6] to-[#274c9e] text-white px-5 py-3 font-medium"
                                                onClick={handleChangeRole}
                                            >
                                                Change role
                                            </button>
                                            <button
                                                className="rounded-xl bg-gradient-to-b from-[#2f3c56] to-[#29447f] text-white px-5 py-3 font-medium"
                                                onClick={handleDeleteAccount}
                                            >
                                                Delete account
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: appointments */}
                                <div className="rounded-3xl bg-white/5 border border-white/10 p-10 text-white shadow-inner flex min-h-0 flex-col">
                                    <h2 className="text-2xl md:text-[24px] font-semibold mb-4">
                                        Appointments
                                    </h2>

                                    <div className="med-scroll flex-1 overflow-y-auto pr-3">
                                        <div className="grid gap-4">
                                            {appointments.map((a) => (
                                                <AppointmentCard key={a.id} a={a} />
                                            ))}
                                            {appointments.length === 0 && (
                                                <p className="text-gray-400 text-center">No appointments</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* END RIGHT */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
