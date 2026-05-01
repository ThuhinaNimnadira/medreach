import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPrescriptionByPublicId } from "../../data/pharmacy-prescriptions.store.js";

export default function PrescriptionIssued() {
    const nav = useNavigate();
    const { state } = useLocation();
    const { slug } = useParams();
  
    const rx = React.useMemo(() => {
        if (state?.rx?.publicId === slug) return state.rx;
        return getPrescriptionByPublicId(slug);
    }, [state, slug]);

    if (!rx) {
        return (
            <div className="min-h-screen grid place-items-center p-10">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Prescription not found</h1>
                    <p className="text-gray-600 mt-2">The link may be invalid or the prescription is not issued.</p>
                    <button
                        onClick={() => nav(-1)}
                        className="mt-4 rounded-lg bg-[#0E1A33] text-white px-5 py-2.5 text-[14px] font-medium"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }
  
    const avatar = rx.avatar ||
        "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=200&auto=format&fit=crop";
    const patientName = rx.patientName || "Username";
    const phone = rx.phone || "+94 77 433 8885";
    const email = rx.email || "example@gmail.com";
    const apptDate = rx.date || "24ᵗʰ July 2024";
    const apptTime = rx.time || "18:30 PM";
    const apptId = rx.appointmentId || rx.id || "—";
    const doctorName = rx.doctorName || "Doctors name";
    const total = rx.total ?? 0;
  
    const items =
        Array.isArray(rx.items) && rx.items.length
            ? rx.items
            : (rx.text || "")
                .split(/\r?\n+/)
                .map((s) => s.trim())
                .filter(Boolean);

    return (
        <div className="min-h-screen bg-[#F5F6F8]">
             
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

             
            <main className="px-6 md:px-10 pb-10">
                <div className="mx-auto w-full max-w-[1200px] rounded-[28px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                    <div className="rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] p-8 text-white">
                         
                        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[340px_320px_1fr]">
                             
                            <section className="rounded-3xl bg-white/6 border border-white/10 p-8 flex flex-col items-center justify-center">
                                <div className="h-32 w-32 rounded-full overflow-hidden ring-2 ring-white/15">
                                    <img src={avatar} alt={patientName} className="h-full w-full object-cover" />
                                </div>

                                <h2 className="mt-8 text-[40px] leading-none font-extrabold text-white text-center">
                                    {patientName}
                                </h2>
                                <div className="mt-5 text-slate-200 text-center">{phone}</div>
                                <div className="text-slate-300 text-center">{email}</div>
                            </section>

                             
                            <section className="rounded-3xl bg-white/6 border border-white/10 p-6">
                                <h3 className="text-2xl font-extrabold mb-4">info</h3>

                                <div className="space-y-4 text-blue-100/90">
                                    <div>
                                        <div className="text-sm text-blue-200/90">Date</div>
                                        <div className="text-[15px]">{apptDate}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-blue-200/90">Time</div>
                                        <div className="text-[15px]">{apptTime}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-blue-200/90">Appointment ID</div>
                                        <div className="text-[15px]">{apptId}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-blue-200/90">Doctors name</div>
                                        <div className="text-[15px]">{doctorName}</div>
                                    </div>
                                </div>
                            </section>

                             
                            <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col">
                                <h3 className="text-4xl font-extrabold mb-6">prescription</h3>

                                <div className="flex-1">
                                    {items.length === 0 ? (
                                        <div className="text-blue-100/80">No medicines listed.</div>
                                    ) : (
                                        <ol className="list-decimal list-inside space-y-3 text-blue-100/90">
                                            {items.map((line, i) => (
                                                <li key={i} className="leading-relaxed">{line}</li>
                                            ))}
                                        </ol>
                                    )}
                                </div>

                                <div className="mt-6 text-right text-xl font-extrabold tracking-wide">
                                    <span className="mr-2">Total</span>
                                    <span className="font-bold text-blue-100/90">{String(total)}LKR</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
