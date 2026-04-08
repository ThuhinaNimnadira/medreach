// src/pages/doctor/doctor-ongoingappointments.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
    doc,
    getDoc,
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";

// Small icons (unchanged)
const Eye = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
            fill="currentColor"
            d="M12 5C5 5 2 12 2 12s3 7 10 7 10-7 10-7-3-7-10-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
        />
    </svg>
);
const Trash = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
            fill="currentColor"
            d="M9 3h6a1 1 0 0 1 1 1v1h4v2H4V5h4V4a1 1 0 0 1 1-1m1 5h2v10h-2V8m4 0h2v10h-2V8M8 8h2v10H8V8Z"
        />
    </svg>
);
const ClipboardIcon = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <path fill="#2b3a9e" d="M9 2h6a2 2 0 0 1 2 2h3v16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4h3a2 2 0 0 1 2-2Z" opacity=".12" />
        <rect x="9" y="3" width="6" height="3" rx="1" fill="#2b3a9e" />
        <rect x="5" y="6" width="14" height="14" rx="2.5" fill="#eef0ff" />
        <path d="M9 12h6M9 15h6M9 18h4" stroke="#2b3a9e" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

const FALLBACK = {
    id: "ap-0",
    patient: "Username",
    phone: "+94 77 433 8885",
    email: "example@gmail.com",
    date: "11/11/1111",
    time: "6.30 PM",
    avatar:
        "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=400&auto=format&fit=crop",
};

export default function DoctorOngoingAppointment() {
    const nav = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();

    const [appt, setAppt] = React.useState(state?.appt || null);
    const [reports, setReports] = React.useState([]);
    const [labs, setLabs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [form, setForm] = React.useState({
        symptoms: "",
        diagnosis: "",
        remarks: "",
        treatment: "",
        prescriptions: "",
        findings: "",
        prognosis: "",
    });

    const [labForm, setLabForm] = React.useState({
        title: "X-Ray",
        description: "",
        urgency: "Urgent",
    });

    const [viewing, setViewing] = React.useState(null);

    // Fetch appointment from Firestore
    React.useEffect(() => {
        async function fetchAppt() {
            if (state?.appt) {
                setAppt(state.appt);
                setLoading(false);
            } else {
                try {
                    const docRef = doc(db, "appointments", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) setAppt({ id: docSnap.id, ...docSnap.data() });
                    else setAppt({ ...FALLBACK, id });
                } catch (e) {
                    console.error(e);
                    setAppt({ ...FALLBACK, id });
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchAppt();
    }, [id, state]);

    // Listen to reports
    React.useEffect(() => {
        if (!appt) return;
        const reportsRef = collection(db, "appointments", appt.id, "reports");
        const unsub = onSnapshot(reportsRef, (snapshot) => {
            setReports(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, [appt]);

    // Listen to labs
    React.useEffect(() => {
        if (!appt) return;
        const labsRef = collection(db, "appointments", appt.id, "labs");
        const unsub = onSnapshot(labsRef, (snapshot) => {
            setLabs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, [appt]);

    const refresh = () => {}; // no-op, Firestore is live

    const resetForm = () =>
        setForm({
            symptoms: "",
            diagnosis: "",
            remarks: "",
            treatment: "",
            prescriptions: "",
            findings: "",
            prognosis: "",
        });

    const saveReport = async () => {
        if (!appt) return;
        try {
            await addDoc(collection(db, "appointments", appt.id, "reports"), {
                title: "Report 1",
                doctorName: "Doctor name",
                date: new Date().toLocaleDateString(),
                data: { ...form },
                createdAt: serverTimestamp(),
            });
            resetForm();
        } catch (e) {
            console.error(e);
        }
    };

    const sendLab = async () => {
        if (!appt || !labForm.title) return;
        try {
            await addDoc(collection(db, "appointments", appt.id, "labs"), {
                ...labForm,
                status: "requested",
                date: new Date().toLocaleDateString(),
                createdAt: serverTimestamp(),
            });
            setLabForm((f) => ({ ...f, description: "" }));
        } catch (e) {
            console.error(e);
        }
    };

    const markLabUploaded = async (labId) => {
        if (!appt) return;
        try {
            const labRef = doc(db, "appointments", appt.id, "labs", labId);
            await updateDoc(labRef, { status: "completed" });
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!appt) return <div>Appointment not found</div>;

    // The JSX below is **exactly your original UI**, unchanged
    return (
        <div className="min-h-screen bg-[#F5F6F8]">
            {/* top bar */}
            <header className="flex items-center justify-between px-10 py-5">
                <div className="flex items-center gap-3">
                    <img src="/3.png" alt="MedReach" className="h-10" />
                </div>
                <button
                    onClick={() => nav(-1)}
                    className="rounded-xl bg-[#0E1A33] text-white px-6 py-2.5 text-[14px]"
                >
                    Go Back
                </button>
            </header>

            {/* top two cards */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,520px)_minmax(0,1fr)] px-6 md:px-10">
                {/* Left: patient + previous reports (glass-ish) */}
                <div className="rounded-2xl p-5 bg-gradient-to-br from-sky-800/60 via-blue-900/70 to-[#0d1b2a]">
                    <div className="rounded-xl p-5 bg-white/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] flex gap-5">
                        {/* patient card */}
                        <div className="min-w-[210px] max-w-[210px] rounded-xl bg-white/6 border border-white/10 p-5 text-white flex flex-col items-center">
                            <div className="h-28 w-28 rounded-full overflow-hidden">
                                <img src={appt.avatar} alt={appt.patient} className="h-full w-full object-cover" />
                            </div>
                            <div className="mt-4 text-2xl font-extrabold text-center">{appt.patient}</div>
                            <div className="mt-4 text-sm text-slate-200 text-center">{appt.phone}</div>
                            <div className="text-sm text-slate-300 text-center">{appt.email}</div>
                        </div>

                        {/* previous reports list */}
                        <div className="flex-1 rounded-xl bg-white/6 border border-white/10 p-5 text-white flex flex-col">
                            <div className="text-lg font-semibold mb-3">Previous Reports</div>
                            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                                {reports.length === 0 ? (
                                    <div className="text-slate-300">No reports yet.</div>
                                ) : (
                                    reports.map((r) => (
                                        <div key={r.id} className="rounded-xl bg-blue-900/40 border border-white/10 px-4 py-3 flex items-center gap-3">
                                            <div className="grid place-items-center w-10 h-10 bg-white/70 rounded-lg">
                                                <ClipboardIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[11px] tracking-wide text-blue-200/90">{r.date}</div>
                                                <div className="text-xl font-semibold text-blue-100 leading-tight">{r.title}</div>
                                                <div className="text-sm text-blue-200/80">{r.doctorName}</div>
                                            </div>
                                            <button onClick={() => setViewing(r)} className="p-2 rounded-md hover:bg-white/10" title="View">
                                                <Eye />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (confirm("Delete this report?")) {
                                                        await deleteDoc(doc(db, "appointments", appt.id, "reports", r.id));
                                                    }
                                                }}
                                                className="p-2 rounded-md hover:bg-white/10"
                                                title="Delete"
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: lab reports & request new */}
                <div className="rounded-2xl bg-white shadow-md p-6">
                    <h3 className="text-xl font-bold text-[#0C164F]">Lab reports & Tests</h3>
                    <div className="mt-4 space-y-3">
                        {labs.length === 0 ? (
                            <div className="text-gray-500">Nothing yet.</div>
                        ) : (
                            labs.map((l) => (
                                <div key={l.id} className="flex items-center gap-3 bg-[#EEF0FF] rounded-2xl px-4 py-3">
                                    <div className="grid place-items-center w-10 h-10 bg-white/70 rounded-lg">
                                        <ClipboardIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[15px] font-semibold text-[#0C164F]">{l.title}</div>
                                        <div className="text-sm text-gray-600">{l.date} • {l.urgency}</div>
                                    </div>
                                    <span className={`text-sm mr-2 ${l.status === "completed" ? "text-blue-700" : "text-green-600"}`}>
                    {l.status}
                  </span>
                                    {l.status === "requested" && (
                                        <button
                                            onClick={() => markLabUploaded(l.id)}
                                            className="text-xs px-3 py-1 rounded-md border border-[#0C164F] text-[#0C164F] hover:bg-[#0C164F] hover:text-white"
                                            title="Mock: mark uploaded"
                                        >
                                            Upload
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <h4 className="mt-6 text-lg font-semibold text-[#0C164F]">Request new</h4>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3">
                        <select
                            value={labForm.title}
                            onChange={(e) => setLabForm((f) => ({ ...f, title: e.target.value }))}
                            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        >
                            <option>X-Ray</option>
                            <option>Lab report 1</option>
                            <option>Blood test</option>
                            <option>Urine test</option>
                        </select>
                        <input
                            value={labForm.description}
                            onChange={(e) => setLabForm((f) => ({ ...f, description: e.target.value }))}
                            placeholder="description"
                            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        />
                        <select
                            value={labForm.urgency}
                            onChange={(e) => setLabForm((f) => ({ ...f, urgency: e.target.value }))}
                            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        >
                            <option>Urgent</option>
                            <option>Normal</option>
                        </select>
                        <div className="flex justify-end">
                            <button onClick={sendLab} className="px-6 py-2 rounded-md bg-[#0E1A33] text-white">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom: new report form */}
            <div className="px-6 md:px-10 mt-8">
                <div className="rounded-2xl bg-white shadow-md p-6">
                    <h3 className="text-xl font-bold text-[#0C164F]">Report</h3>
                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                        {["symptoms","diagnosis","remarks","findings","treatment","prescriptions","prognosis"].map((f, idx) => (
                            <textarea
                                key={f}
                                placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
                                value={form[f]}
                                onChange={(e) => setForm((prev) => ({ ...prev, [f]: e.target.value }))}
                                className={`rounded-lg border border-emerald-300 px-3 py-2 h-28 ${f==="prognosis"?"lg:col-span-3":""}`}
                            />
                        ))}
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-3">
                        <button onClick={resetForm} className="px-6 py-2 rounded-md bg-red-500 text-white">Reset</button>
                        <button onClick={saveReport} className="px-6 py-2 rounded-md bg-[#0E1A33] text-white">Update</button>
                    </div>
                </div>
            </div>

            {/* simple modal for viewing a report */}
            {viewing && (
                <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
                        <div className="flex justify-between items-center mb-3">
                            <div className="text-lg font-semibold">{viewing.title}</div>
                            <button onClick={() => setViewing(null)} className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
                                Close
                            </button>
                        </div>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div><b>Date:</b> {viewing.date}</div>
                            <div><b>Doctor:</b> {viewing.doctorName}</div>
                            {viewing.data && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {Object.entries(viewing.data).map(([k,v]) => (
                                        <div key={k}>
                                            <span className="font-medium capitalize">{k}:</span>{" "}
                                            <span className="text-gray-600 whitespace-pre-wrap">{String(v||"")}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
