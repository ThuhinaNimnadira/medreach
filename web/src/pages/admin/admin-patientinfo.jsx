// src/pages/admin/admin-patientinfo.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path

// ---------- tiny icons ----------
const EyeIcon = ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 5C6.5 5 2 12 2 12s4.5 7 10 7 10-7 10-7-4.5-7-10-7Zm0 11a4 4 0 1 1 .001-8.001A4 4 0 0 1 12 16Z" />
    </svg>
);
const TrashIcon = ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M9 3h6a1 1 0 0 1 1 1v1h4v2H4V5h4V4a1 1 0 0 1 1-1m1 5h2v10h-2V8m4 0h2v10h-2V8M8 8h2v10H8V8Z" />
    </svg>
);

// ---------- small cards ----------
function ReportCard({ r, onView, onDelete }) {
    return (
        <div className="relative rounded-2xl bg-blue-900/30 border border-white/10 px-5 py-4">
            <div className="text-[11px] tracking-wide text-blue-200/90">{r.date}</div>
            <div className="mt-1 text-[28px] md:text-[32px] leading-none font-extrabold text-blue-100">{r.title}</div>
            <div className="mt-2 text-sm text-blue-200/85">{r.doctor}</div>
            <div className="absolute right-3 bottom-3 flex items-center gap-3 text-blue-100/90">
                <button
                    onClick={() => onView?.(r)}
                    className="grid h-7 w-7 place-items-center rounded-md bg-white/10 hover:bg-white/20"
                    title="View"
                >
                    <EyeIcon />
                </button>
                <button
                    onClick={() => onDelete?.(r)}
                    className="grid h-7 w-7 place-items-center rounded-md bg-white/10 hover:bg-white/20"
                    title="Delete"
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
}
function AppointmentCard({ a }) {
    return (
        <div className="rounded-2xl bg-blue-900/30 border border-white/10 px-4 py-3">
            <div className="text-[11px] tracking-wide text-blue-200/90">{a.date}</div>
            <div className="mt-0.5 text-lg font-semibold text-blue-100 leading-tight">{a.title}</div>
            <div className="text-sm text-blue-200/80">{a.doctor}</div>
        </div>
    );
}

export default function AdminPatientInfo() {
    const nav = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const [patient, setPatient] = React.useState(null);
    const [reports, setReports] = React.useState([]);
    const [appts, setAppts] = React.useState([]);

    React.useEffect(() => {
        if (location.state?.patient) {
            const p = location.state.patient;
            setPatient(p);
            setReports(p.reports || []);
            setAppts(p.appointments || []);
        } else {
            // Fetch from Firestore
            const fetchPatient = async () => {
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPatient({ id: docSnap.id, ...data });
                    setReports(data.reports || []);
                    setAppts(data.appointments || []);
                } else {
                    alert("Patient not found!");
                    nav(-1);
                }
            };
            fetchPatient();
        }
    }, [id, location.state, nav]);

    function handleViewReport(r) {
        alert(`Preview "${r.title}" (UI-only)`);
    }
    function handleDeleteReport(r) {
        if (confirm(`Delete ${r.title}?`)) {
            setReports((prev) => prev.filter((x) => x.id !== r.id));
        }
    }

    if (!patient) return null;

    return (
        <div className="h-screen w-screen overflow-hidden bg-white flex flex-col">
            <style>{`
        .med-scroll { scrollbar-width: thin; scrollbar-color: #ffffff rgba(255,255,255,0.22); }
        .med-scroll::-webkit-scrollbar { width: 10px; }
        .med-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.22); border-radius: 9999px; }
        .med-scroll::-webkit-scrollbar-thumb { background: #ffffff; border-radius: 9999px; border: 2px solid rgba(255,255,255,0.22); }
      `}</style>

            <header className="flex items-center justify-between px-12 py-6">
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

            <div className="px-10 pb-8 h-[calc(100vh-96px)] min-h-0">
                <div className="h-full rounded-[28px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                    <div className="h-full rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] p-6 md:p-10">
                        <div className="grid h-full min-h-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)_minmax(0,0.95fr)]">
                            {/* LEFT: Profile */}
                            <div className="rounded-3xl bg-white/5 border border-white/10 p-10 text-white shadow-inner flex flex-col items-center justify-center">
                                <img
                                    src={patient.avatar}
                                    alt={patient.name}
                                    className="h-36 w-36 rounded-full object-cover ring-2 ring-white/20"
                                />
                                <div className="mt-8 text-center">
                                    <div className="text-[44px] leading-none font-extrabold">{patient.name}</div>
                                    {patient.phone && <div className="mt-5 text-slate-300 text-[15px]">{patient.phone}</div>}
                                    {patient.email && <div className="text-slate-300 text-[15px]">{patient.email}</div>}
                                </div>
                            </div>

                            {/* MIDDLE: Reports */}
                            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-white shadow-inner flex min-h-0 flex-col">
                                <h2 className="text-2xl md:text-[24px] font-semibold mb-4">Reports</h2>
                                <div className="med-scroll flex-1 overflow-y-auto pr-3">
                                    {reports.length === 0 ? (
                                        <div className="h-full grid place-items-center text-white/70">No reports yet.</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {reports.map((r) => (
                                                <ReportCard key={r.id} r={r} onView={handleViewReport} onDelete={handleDeleteReport} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT: Appointments */}
                            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-white shadow-inner flex min-h-0 flex-col">
                                <h2 className="text-2xl md:text-[24px] font-semibold mb-4">Appointments</h2>
                                <div className="med-scroll flex-1 overflow-y-auto pr-3">
                                    {appts.length === 0 ? (
                                        <div className="h-full grid place-items-center text-white/70">No appointments yet.</div>
                                    ) : (
                                        <div className="grid gap-4">{appts.map((a) => <AppointmentCard key={a.id} a={a} />)}</div>
                                    )}
                                </div>
                            </div>
                            {/* END RIGHT */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
