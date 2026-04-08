// src/pages/lab/lab-report-public.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { findReportByPublicId } from "../../data/lab-reports.store.js";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

export default function LabReportPublic() {
    const nav = useNavigate();
    const { state } = useLocation();
    const { slug } = useParams();

    const rep = React.useMemo(() => {
        if (state?.report?.publicId === slug) return state.report;
        return findReportByPublicId(slug) || null;
    }, [state, slug]);

    if (!rep) {
        return (
            <div className="min-h-screen grid place-items-center p-10">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Report not found</h1>
                    <p className="text-gray-600 mt-2">
                        The link may be invalid or the report is not issued.
                    </p>
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

    // Normalize fields so it works with either key naming used by the editor/store
    const patientName = rep.patientName || "Username";
    const testName = rep.testName || "test type";
    const date = rep.date || "11/11/1111";
    const doctorName = rep.doctorName || "Doctor name";
    const urgency = rep.urgency || "Urgent";
    const description = rep.description || "";
    const notes = rep.content || rep.notes || "";
    const images = rep.attachments || rep.images || [];
    const avatar = rep.avatar || "/avatar.png";

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <style>{`
        .soft-glass { background: rgba(15,33,57,0.80); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
        .panel-glass { background: rgba(255,255,255,0.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10); }
        .mint-border { border-color: rgba(74,222,128,.55); }
      `}</style>

            {/* Header (fixed) */}
            <header className="shrink-0 flex items-center justify-between px-10 py-3">
                <div className="flex items-center gap-3">
                    <img src="/3.png" alt="MedReach" className="h-9" />
                </div>
                <button
                    onClick={() => nav(-1)}
                    className="rounded-lg bg-[#0E1A33] text-white px-5 py-2 text-[14px] font-medium hover:opacity-95"
                >
                    Go Back
                </button>
            </header>

            {/* Main (fills remaining height) */}
            <main className="flex-1 min-h-0 px-8 pb-6 pt-2">
                <div className="h-full mx-auto max-w-[1200px] rounded-[22px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                    <div className="soft-glass h-full rounded-[18px] p-6 text-white">
                        {/* Three fixed-height columns; only right content scrolls */}
                        <div className="grid h-full min-h-0 gap-5 grid-cols-1 lg:grid-cols-[300px_320px_1fr]">
                            {/* LEFT: Patient */}
                            <section className="panel-glass rounded-2xl p-6 flex flex-col items-center justify-center">
                                <div className="h-28 w-28 rounded-full overflow-hidden ring-2 ring-white/15">
                                    <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
                                </div>
                                <h2 className="mt-6 text-[32px] leading-none font-extrabold text-center">
                                    {patientName}
                                </h2>
                                {!!rep.phone && (
                                    <div className="mt-3 text-slate-200 text-center text-sm">{rep.phone}</div>
                                )}
                                {!!rep.email && (
                                    <div className="text-slate-300 text-center text-sm">{rep.email}</div>
                                )}
                            </section>

                            {/* MIDDLE: Info */}
                            <section className="panel-glass rounded-2xl p-5">
                                <div className="space-y-3">
                                    <div className="text-xl font-extrabold">info</div>

                                    <div className="text-blue-100/90 space-y-1.5 text-[14px]">
                                        <div>{date}</div>
                                        <div>{rep.time || "18:30 PM"}</div>
                                        <div>{rep.appointmentId ? `Appointment ID: ${rep.appointmentId}` : "Appointment ID"}</div>
                                        <div>{doctorName}</div>
                                        <div className="text-blue-200/90">Status: {rep.status || "issued"}</div>
                                    </div>

                                    <div className="mt-3 rounded-2xl px-4 py-3 border mint-border">
                                        <div className="flex items-center gap-2 text-blue-100">
                                            <span className="font-medium">{testName}</span>
                                            <span className="text-[11px] leading-tight px-2 py-0.5 rounded-full border mint-border">
                        {urgency}
                      </span>
                                        </div>
                                        <div className="mt-2 text-sm text-blue-100/90">
                                            {description || "description"}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* RIGHT: Report info (scrollable body) */}
                            <section className="panel-glass rounded-2xl p-5 flex flex-col min-h-0 overflow-hidden">
                                <div className="text-2xl font-extrabold mb-2">Report info</div>

                                {/* Small identifiers row (read-only) */}
                                <div className="grid gap-3 grid-cols-1 md:grid-cols-3 mb-2">
                                    <div className="rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                                        <div className="text-[11px] text-blue-100/70">Patient</div>
                                        <div className="text-sm">{patientName}</div>
                                    </div>
                                    <div className="rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                                        <div className="text-[11px] text-blue-100/70">Test</div>
                                        <div className="text-sm">{testName}</div>
                                    </div>
                                    <div className="rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                                        <div className="text-[11px] text-blue-100/70">Date</div>
                                        <div className="text-sm">{date}</div>
                                    </div>
                                </div>

                                {/* Scrollable content area */}
                                <div className="flex-1 min-h-0 overflow-auto pr-2 space-y-4">
                                    {/* Notes */}
                                    {notes && (
                                        <div>
                                            <div className="text-sm text-blue-100/90 mb-1">Notes</div>
                                            <div className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 whitespace-pre-wrap">
                                                {notes}
                                            </div>
                                        </div>
                                    )}

                                    {/* Images */}
                                    {images.length > 0 && (
                                        <div>
                                            <div className="text-sm text-blue-100/90 mb-1">Images</div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {images.map((src, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={src}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="relative rounded-lg overflow-hidden border border-white/15 bg-white/5"
                                                        title="Open full image"
                                                    >
                                                        <img
                                                            src={src}
                                                            alt={`img-${idx}`}
                                                            className="w-full h-32 object-cover"
                                                        />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* No actions here — view-only */}
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
