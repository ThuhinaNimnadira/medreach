import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { findApptById } from "../../data/doctor-appts.store.js";

const FALLBACK = {
    id: "ap-0",
    patient: "Username",
    phone: "+94 77 433 8885",
    email: "example@gmail.com",
    date: "11/11/1111",
    time: "6.30 PM",
    status: "completed",
    avatar:
        "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=400&auto=format&fit=crop",
};

export default function ReceptionAppointmentCompleted() {
    const nav = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();

    const appt = React.useMemo(() => {
        if (state?.appt) return state.appt;
        return findApptById(id) || { ...FALLBACK, id };
    }, [state, id]);

    const fees = [
        { label: "consultation fee", amount: 1000 },
        { label: "Blood Test", amount: 400 },
        { label: "Lab Test", amount: 300 },
        { label: "Medicine", amount: 500 },
    ];
    const total = fees.reduce((s, f) => s + (Number(f.amount) || 0), 0);

    return (
        <div className="h-screen bg-[#0B1B2E] text-white flex flex-col overflow-hidden">
            <header className="shrink-0 flex items-center justify-between px-12 py-6">
                <div className="flex items-center gap-3">
                    <img src="/3.png" alt="MedReach" className="h-10" />
                </div>
                <button
                    onClick={() => nav(-1)}
                    className="rounded-xl bg-[#0E1A33] text-white px-6 py-3 text-[14px] font-medium hover:opacity-95"
                >
                    Go Back
                </button>
            </header>

            <main className="flex-1 min-h-0 px-8 md:px-12 pb-8">
                <div className="h-full max-w-[1200px] mx-auto rounded-[28px] p-[4px] bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                    <div className="h-full rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] p-6 md:p-8">
                        <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[340px_minmax(0,1fr)_360px]">
                            {/* LEFT: patient */}
                            <section className="rounded-3xl bg-white/6 border border-white/10 p-8 flex flex-col items-center justify-center min-h-0">
                                <div className="h-36 w-36 rounded-full overflow-hidden ring-2 ring-white/15">
                                    <img
                                        src={appt.avatar}
                                        alt={appt.patient}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h2 className="mt-6 text-[36px] leading-none font-extrabold text-center">
                                    {appt.patient}
                                </h2>
                                <div className="mt-4 text-slate-200 text-center text-[14px]">
                                    {appt.phone}
                                </div>
                                <div className="text-slate-300 text-center text-[14px]">
                                    {appt.email}
                                </div>
                            </section>

                            {/* MIDDLE: info */}
                            <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col min-h-0">
                                <h3 className="text-[28px] font-extrabold mb-4">info</h3>

                                <div className="space-y-1 text-blue-100/90">
                                    <div className="uppercase tracking-wide text-[12px] text-blue-200/80">
                                        appointment info
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-1 max-w-md text-[15px]">
                                        <div className="text-blue-200/80">doctors name</div>
                                        <div className="text-blue-100/90">Doctor name</div>

                                        <div className="text-blue-200/80">date</div>
                                        <div className="text-blue-100/90">{appt.date}</div>

                                        <div className="text-blue-200/80">time</div>
                                        <div className="text-blue-100/90">{appt.time}</div>

                                        <div className="text-blue-200/80">appointment id</div>
                                        <div className="text-blue-100/90">{appt.id}</div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="uppercase tracking-wide text-[12px] text-blue-200/80 mb-3">
                                        reports &amp; prescriptions
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="rounded-2xl bg-blue-900/40 border border-white/10 px-5 py-3"
                                            >
                                                <div className="text-[11px] tracking-wide text-blue-200/90">
                                                    01/01/1111
                                                </div>
                                                <div className="mt-1 text-xl font-extrabold text-blue-100 leading-tight">
                                                    Report 1
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* RIGHT: paid summary */}
                            <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col min-h-0">
                                <h3 className="text-[28px] font-extrabold mb-4">Total paid</h3>

                                <div className="flex-1 overflow-y-auto pr-1">
                                    <ul className="space-y-2 text-[15px]">
                                        {fees.map((f, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center justify-between text-blue-100/90"
                                            >
                                                <span className="text-blue-200/90">{f.label}</span>
                                                <span className="font-semibold">{f.amount} LKR</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-[18px]">
                                    <span className="font-bold text-blue-100">Total</span>
                                    <span className="font-extrabold">{total} LKR</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
