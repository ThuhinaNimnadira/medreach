// src/pages/doctor/doctor-completedappointment.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from "../../assets/3 - Copy.png";
import bg from "../../assets/bgforlandingpage.png";

const FALLBACK = {
    id: "ca-0",
    patientName: "Username",
    phone: "+94 77 433 8885",
    email: "example@gmail.com",
    date: "11/11/1111",
    time: "6.30 PM",
    status: "completed",
    doctorName: "Doctor name",
    reportTitle: "Report 1",
    avatar:
        "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=400&auto=format&fit=crop",
    review:
        "I am very satisfied with the care and attention I received. I would highly recommend this hospital and Dr. Perera to anyone looking for professional and compassionate medical care.",
};

function StarRow() {
    return (
        <div className="flex gap-2 text-cyan-400 text-xl">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
    );
}

export default function DoctorCompletedAppointment() {
    const nav = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();

    const [appt, setAppt] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const displayName = appt?.patient ?? appt?.patientName ?? "Username";

    React.useEffect(() => {
        async function fetchAppt() {
            if (state?.appt) {
                setAppt({ ...FALLBACK, ...state.appt });
                setLoading(false);
            } else {
                try {
                    const docRef = doc(db, "appointments", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setAppt({
                            ...FALLBACK,
                            id: docSnap.id,
                            patient: data.patientName || data.patient,
                            patientName: data.patientName || data.patient,
                            phone: data.phone,
                            email: data.email,
                            date: data.date,
                            time: data.time,
                            status: data.status,
                            avatar: data.avatar,
                            doctorName: data.doctorName,
                            reportTitle: data.reportTitle,
                            review: data.review,
                        });
                    } else {
                        setAppt({ ...FALLBACK, id });
                    }
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

    if (loading) return <div>Loading...</div>;
    if (!appt) return <div>Appointment not found</div>;

    return (
        <div
            className="h-screen w-screen overflow-hidden bg-white flex flex-col"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* page chrome */}
            <header className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="MedReach" className="h-9" />
                    <span className="sr-only">MedReach</span>
                </div>
                <button
                    onClick={() => nav(-1)}
                    className="rounded-lg text-white px-5 py-2.5 text-[14px] font-medium hover:opacity-95 hover:bg-[#40E0D0] hover:scale-105 transition-all duration-300"
                >
                    Go Back
                </button>
            </header>

            {/* main glass container */}
            <main className="flex-1 min-h-0 px-12 pb-8">
                <div className="h-full w-full flex items-stretch justify-center">
                    <div className="h-full w-full max-w-[1200px] rounded-[28px] p-1 bg-gradient-to-br from-white-800/70 via-white-900/70 to-[#ffffff]">
                        <div className="h-full rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] p-8 text-white">
                            {/* 3 columns */}
                            <div className="grid h-full min-h-0 gap-6 grid-cols-1 lg:grid-cols-[340px_320px_1fr]">
                                {/* LEFT: patient card */}
                                <section className="rounded-3xl bg-white/6 border border-white/10 p-8 flex flex-col items-center justify-center">
                                    <div className="h-32 w-32 rounded-full overflow-hidden ring-2 ring-white/15">
                                        <img
                                            src={appt.avatar}
                                            alt={displayName}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <h2 className="mt-8 text-[40px] leading-none font-extrabold text-white text-center">
                                        {displayName}
                                    </h2>
                                    <div className="mt-5 text-slate-200 text-center">{appt.phone}</div>
                                    <div className="text-slate-300 text-center">{appt.email}</div>
                                </section>

                                {/* MIDDLE: report + info */}
                                <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col">
                                    <h3 className="text-2xl font-extrabold mb-4">Report</h3>

                                    {/* small report tile */}
                                    <div className="rounded-2xl bg-blue-900/40 border border-white/10 px-5 py-4 mb-6">
                                        <div className="text-[11px] tracking-wide text-blue-200/90">
                                            {appt.date}
                                        </div>
                                        <div className="mt-1 text-3xl font-extrabold text-blue-100">
                                            {appt.reportTitle}
                                        </div>
                                        <div className="mt-1 flex items-center justify-between text-sm text-blue-200/80">
                                            <span>{appt.doctorName}</span>
                                            <div className="flex items-center gap-3 text-blue-100/80">
                                                {/* eye + trash (UI only) */}
                                                <svg viewBox="0 0 24 24" className="h-5 w-5">
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
                                                    />
                                                </svg>
                                                <svg viewBox="0 0 24 24" className="h-5 w-5">
                                                    <path
                                                        fill="currentColor"
                                                        d="M9 3h6a1 1 0 0 1 1 1v1h4v2H4V5h4V4a1 1 0 0 1 1-1m1 5h2v10h-2V8m4 0h2v10h-2V8M8 8h2v10H8V8Z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* info */}
                                    <div>
                                        <h4 className="text-xl font-extrabold mb-3">info</h4>
                                        <div className="space-y-2 text-blue-100/90">
                                            <div>{appt.date}</div>
                                            <div>{appt.time}</div>
                                            <div>Appointment ID: {appt.id}</div>
                                        </div>
                                    </div>
                                </section>

                                {/* RIGHT: reviews */}
                                <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col">
                                    <h3 className="text-3xl font-extrabold mb-4">Reviews</h3>
                                    <StarRow />
                                    <p className="mt-6 text-blue-100/90 leading-relaxed">
                                        {appt.review}
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
