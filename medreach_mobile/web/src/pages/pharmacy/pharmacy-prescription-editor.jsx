  
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPrescriptionById,
    updatePrescription,
} from "../../data/pharmacy-prescriptions.store.js";
  
import {
    patientKeyFrom,
    listReports,
} from "../../data/doctor-patient-store.js";

export default function PharmacyPrescriptionEditor() {
    const nav = useNavigate();
    const { id } = useParams();
  
    const [rx, setRx] = React.useState(() => getPrescriptionById(id));
    React.useEffect(() => {
        setRx(getPrescriptionById(id));
    }, [id]);
  
    const pid = React.useMemo(() => {
        if (!rx) return null;
  
        return patientKeyFrom({
            patient: rx.patientName || "",
            phone: rx.phone || "",
            email: rx.email || "",
        });
    }, [rx]);
  
    const [prefilled, setPrefilled] = React.useState(false);
    const [prescriptionText, setPrescriptionText] = React.useState("");
    const [total, setTotal] = React.useState("");

    React.useEffect(() => {
        if (!rx || !pid || prefilled) return;
        const reports = listReports(pid); // newest first or last? (we’ll pick most recent by createdAt)
        if (reports && reports.length) {
  
            const latest = [...reports].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))[0];
            const fromReport = latest?.data?.prescriptions || "";
            setPrescriptionText(fromReport);
        }
        setPrefilled(true);
    }, [rx, pid, prefilled]);

    if (!rx) {
        return (
            <div className="min-h-screen grid place-items-center p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Prescription not found</h1>
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

    const onIssue = () => {
  
        updatePrescription(rx.id, {
            status: "issued",
            issuedAt: Date.now(),
            text: prescriptionText,
            total: total,
        });
  
        nav("/pharmacy/prescriptions");
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-white flex flex-col">
             
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

             
            <main className="flex-1 min-h-0 px-12 pb-8">
                <div className="h-full w-full flex items-stretch justify-center">
                    <div className="h-full w-full max-w-[1200px] rounded-[28px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                        <div className="h-full rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] p-8 text-white">
                            <div className="grid h-full min-h-0 gap-6 grid-cols-1 lg:grid-cols-[340px_320px_1fr]">
                                 
                                <section className="rounded-3xl bg-white/6 border border-white/10 p-8 flex flex-col items-center justify-center">
                                    <div className="h-32 w-32 rounded-full overflow-hidden ring-2 ring-white/15">
                                        {rx.avatar ? (
                                            <img
                                                src={rx.avatar}
                                                alt={rx.patientName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-white/20" />
                                        )}
                                    </div>

                                    <h2 className="mt-8 text-[40px] leading-none font-extrabold text-white text-center">
                                        {rx.patientName || "Username"}
                                    </h2>
                                    {!!rx.phone && (
                                        <div className="mt-5 text-slate-200 text-center">{rx.phone}</div>
                                    )}
                                    {!!rx.email && (
                                        <div className="text-slate-300 text-center">{rx.email}</div>
                                    )}
                                </section>

                                 
                                <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col">
                                    <h3 className="text-2xl font-extrabold mb-4">info</h3>
                                    <div className="space-y-2 text-blue-100/90">
                                        <div>{rx.date || "11/11/1111"}</div>
                                        <div>Prescription ID: {rx.id}</div>
                                        <div>Doctor: {rx.doctorName || rx.prescriberName || "Doctor name"}</div>
                                    </div>
                                </section>

                                 
                                <section className="rounded-3xl bg-white/6 border border-white/10 p-6 flex flex-col">
                                    <h3 className="text-3xl font-extrabold mb-4">prescription</h3>

                                     
                                    <textarea
                                        value={prescriptionText}
                                        onChange={(e) => setPrescriptionText(e.target.value)}
                                        placeholder="(Auto-filled from doctor's report)"
                                        className="flex-1 rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-blue-50 placeholder:text-blue-200/50 outline-none"
                                    />

                                     
                                    <div className="mt-4 flex items-center justify-end gap-4">
                                        <input
                                            value={total}
                                            onChange={(e) => setTotal(e.target.value)}
                                            placeholder="Enter Total..."
                                            className="w-56 rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 outline-none"
                                        />
                                        <button
                                            onClick={onIssue}
                                            className="rounded-xl bg-white text-[#0E1A33] px-8 py-2.5 font-semibold hover:opacity-95"
                                        >
                                            issue
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
