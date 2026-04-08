  
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    findReportById,
    updateReport,
    addReportImage,
    removeReportImage,
    issueReport,
    requestLabReport as createReport,
} from "../../data/lab-reports.store.js";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

export default function LabReportEditor() {
    const nav = useNavigate();
    const { id } = useParams();

    const [record, setRecord] = React.useState(() => {
        if (id === "new") return createReport({});
        return findReportById(id) || createReport({});
    });

    const [patientName, setPatientName] = React.useState(record.patientName || "");
    const [testName, setTestName] = React.useState(record.testName || "");
    const [date, setDate] = React.useState(record.date || "");
    const [notes, setNotes] = React.useState(record.content || record.notes || "");
    const [images, setImages] = React.useState(record.attachments || record.images || []);
    const isIssued = record.status === "issued";

    const doctorName = record.doctorName || "Doctor name";
    const urgency = record.urgency || "Urgent";
    const description = record.description || "";

    function sync(partial) {
        const next = updateReport(record.id, partial);
        setRecord(next);
    }

    function saveDraft() {
        sync({
            patientName,
            testName,
            date,
            content: notes,
            attachments: images,
        });
        alert("Draft saved.");
    }

    async function onAddImages(e) {
        const files = Array.from(e.target.files || []);
        for (const f of files) {
            if (!f.type.startsWith("image/")) continue;
            const dataUrl = await fileToDataUrl(f);
            addReportImage(record.id, dataUrl);
        }
        const next = findReportById(record.id);
        setImages(next.attachments || next.images || []);
        setRecord(next);
    }

    function delImage(idx) {
        removeReportImage(record.id, idx);
        const next = findReportById(record.id);
        setImages(next.attachments || next.images || []);
        setRecord(next);
    }

    function handleIssue() {
        sync({
            patientName,
            testName,
            date,
            content: notes,
            attachments: images,
        });
        const issued = issueReport(record.id);
        setRecord(issued);
        if (issued.publicId) {
            alert("Report issued.");
            nav(`/report/${encodeURIComponent(issued.publicId)}`);
        }
    }

    const fileInputRef = React.useRef(null);

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <style>{`
        .soft-glass { background: rgba(15,33,57,0.80); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
        .panel-glass { background: rgba(255,255,255,0.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10); }
        .mint-border { border-color: rgba(74,222,128,.55); }
      `}</style>

             
            <header className="shrink-0 flex items-center justify-between px-10 py-3">
                <div className="flex items-center gap-3">
                    <img src="/3.png" alt="MedReach" className="h-9" />
                </div>
                <div className="flex gap-2">
                    {!isIssued && (
                        <button
                            onClick={saveDraft}
                            className="rounded-lg border border-[#0E1A33] text-[#0E1A33] px-4 py-2 text-[13px] font-medium hover:bg-[#0E1A33]/5"
                        >
                            Save draft
                        </button>
                    )}
                    <button
                        onClick={() => nav(-1)}
                        className="rounded-lg bg-[#0E1A33] text-white px-5 py-2 text-[14px] font-medium hover:opacity-95"
                    >
                        Go Back
                    </button>
                </div>
            </header>

             
            <main className="flex-1 min-h-0 px-8 pb-6 pt-2">
                <div className="h-full mx-auto max-w-[1200px] rounded-[22px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                    <div className="soft-glass h-full rounded-[18px] p-6 text-white">
                         
                        <div className="grid h-full min-h-0 gap-5 grid-cols-1 lg:grid-cols-[300px_320px_1fr]">
                             
                            <section className="panel-glass rounded-2xl p-6 flex flex-col items-center justify-center">
                                <div className="h-28 w-28 rounded-full overflow-hidden ring-2 ring-white/15">
                                    <img
                                        src={record.avatar || "/avatar.png"}
                                        alt="avatar"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h2 className="mt-6 text-[32px] leading-none font-extrabold text-center">
                                    {patientName || "Username"}
                                </h2>
                                {!!record.phone && (
                                    <div className="mt-3 text-slate-200 text-center text-sm">{record.phone}</div>
                                )}
                                {!!record.email && (
                                    <div className="text-slate-300 text-center text-sm">{record.email}</div>
                                )}
                            </section>

                             
                            <section className="panel-glass rounded-2xl p-5">
                                <div className="space-y-3">
                                    <div className="text-xl font-extrabold">info</div>

                                    <div className="text-blue-100/90 space-y-1.5 text-[14px]">
                                        <div>{date || "24ᵗʰ July 2024"}</div>
                                        <div>{record.time || "18:30 PM"}</div>
                                        <div>Appointment ID</div>
                                        <div>{doctorName}</div>
                                    </div>

                                    <div className="mt-3 rounded-2xl px-4 py-3 border mint-border">
                                        <div className="flex items-center gap-2 text-blue-100">
                                            <span className="font-medium">{testName || "test type"}</span>
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

                             
                            <section className="panel-glass rounded-2xl p-5 flex flex-col min-h-0 overflow-hidden">
                                <div className="text-2xl font-extrabold mb-2">Report info</div>

                                 
                                <div className="grid gap-3 grid-cols-1 md:grid-cols-3 mb-2">
                                    <input
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        disabled={isIssued}
                                        className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 outline-none"
                                        placeholder="Patient name"
                                    />
                                    <input
                                        value={testName}
                                        onChange={(e) => setTestName(e.target.value)}
                                        disabled={isIssued}
                                        className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 outline-none"
                                        placeholder="Test name"
                                    />
                                    <input
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        disabled={isIssued}
                                        placeholder="11/11/1111"
                                        className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 outline-none"
                                    />
                                </div>

                                 
                                <div className="flex-1 min-h-0 overflow-auto pr-2 space-y-4">
                                     
                                    <div>
                                        <label className="block text-sm text-blue-100/90 mb-1">Notes</label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            disabled={isIssued}
                                            rows={6}
                                            className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 outline-none text-white placeholder:text-blue-100/60"
                                            placeholder="Write observations, measurements and conclusions…"
                                        />
                                    </div>

                                     
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-sm text-blue-100/90">Images</div>
                                            {!isIssued && (
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-[12px] px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/10"
                                                >
                                                    Add images
                                                </button>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={onAddImages}
                                            />
                                        </div>

                                        {images.length === 0 ? (
                                            <div className="text-sm text-blue-100/70">No images yet.</div>
                                        ) : (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {images.map((src, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="relative rounded-lg overflow-hidden border border-white/15 bg-white/5"
                                                    >
                                                        <img src={src} alt={`img-${idx}`} className="w-full h-32 object-cover" />
                                                        {!isIssued && (
                                                            <button
                                                                onClick={() => delImage(idx)}
                                                                className="absolute top-2 right-2 text-[11px] bg-white/90 text-slate-900 px-2 py-0.5 rounded border"
                                                                title="Remove"
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                 
                                <div className="pt-3 flex justify-end">
                                    {!isIssued ? (
                                        <button
                                            onClick={handleIssue}
                                            className="px-7 py-2.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
                                        >
                                            issue
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => nav(`/report/${encodeURIComponent(record.publicId)}`)}
                                            className="px-7 py-2.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
                                        >
                                            View issued
                                        </button>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function fileToDataUrl(file) {
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = rej;
        r.readAsDataURL(file);
    });
}
