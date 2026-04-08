import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // your existing firebase.js
import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    query,
    orderBy
} from "firebase/firestore";
import logo from "../../assets/3 - Copy.png";
import bg from "../../assets/bgforlandingpage.png";

// ---- Small UI components ----
function InfoIcon() {
    return (
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border-2 border-[#0E1A33] text-[#0E1A33] font-semibold">
      i
    </span>
    );
}

function Magnifier() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400">
            <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23C15.99 6.01 12.98 3 9.49 3S3 6.01 3 9.5 6.01 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4.25 4.25 1.49-1.49L15.5 14ZM5 9.5C5 7.01 7.01 5 9.5 5S14 7.01 14 9.5 11.99 14 9.5 14 5 11.99 5 9.5Z"
            />
        </svg>
    );
}

export default function DoctorAppointments() {
    const nav = useNavigate();

    const [rows, setRows] = useState([]);
    const [q, setQ] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const perPage = 5;

    // --- Real-time listener to Firestore ---
    useEffect(() => {
        const qRef = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(qRef, snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRows(data);
        });

        return () => unsubscribe(); // cleanup on unmount
    }, []);

    // --- Filter & Sort ---
    const filtered = useMemo(() => {
        const t = q.trim().toLowerCase();
        let arr = rows.filter(
            r =>
                !t ||
                r.patient.toLowerCase().includes(t) ||
                r.email.toLowerCase().includes(t) ||
                r.phone.toLowerCase().includes(t)
        );

        switch (sort) {
            case "oldest":
                arr = [...arr].sort((a, b) => a.createdAt - b.createdAt);
                break;
            case "name-asc":
                arr = [...arr].sort((a, b) => a.patient.localeCompare(b.patient));
                break;
            default:
                arr = [...arr].sort((a, b) => b.createdAt - a.createdAt);
        }
        return arr;
    }, [rows, q, sort]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const clampedPage = Math.min(page, totalPages);
    const start = (clampedPage - 1) * perPage;
    const end = Math.min(start + perPage, total);
    const pageData = filtered.slice(start, end);

    useEffect(() => {
        setPage(1);
    }, [q, sort]);

    function pageNums() {
        const arr = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) arr.push(i);
        } else {
            const left = Math.max(2, clampedPage - 1);
            const right = Math.min(totalPages - 1, clampedPage + 1);
            arr.push(1);
            if (left > 2) arr.push("…");
            for (let i = left; i <= right; i++) arr.push(i);
            if (right < totalPages - 1) arr.push("…");
            arr.push(totalPages);
        }
        return arr;
    }

    // --- Mark appointment as completed ---
    async function markCompleted(id) {
        const apptRef = doc(db, "appointments", id);
        await updateDoc(apptRef, { status: "completed" });
    }

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
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

            <main className="px-6 md:px-10 pb-10 pt-10">
                <div className="mx-auto max-w-[1040px] max-h-[560px] overflow-hidden rounded-2xl bg-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.25)] flex flex-col">
                    <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                        <h1 className="text-xl font-semibold">My appointments</h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Magnifier />
                </span>
                                <input
                                    value={q}
                                    onChange={e => setQ(e.target.value)}
                                    placeholder="Search"
                                    className="w-56 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 outline-none focus:border-gray-300 text-sm"
                                />
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                                <label className="mr-1 text-gray-500">Sort by :</label>
                                <select
                                    value={sort}
                                    onChange={e => setSort(e.target.value)}
                                    className="bg-transparent outline-none font-semibold"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="name-asc">Name A–Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex-1 overflow-auto">
                        <ul className="divide-y divide-gray-200">
                            {pageData.map(a => (
                                <li key={a.id} className="flex items-center gap-4 px-5 py-3">
                                    <img src={a.avatar} alt={a.patient} className="h-9 w-9 rounded-full object-cover" />
                                    <div className="w-64 text-gray-900 text-[15px]">{a.patient}</div>
                                    <div className="w-56 text-gray-700 text-[15px]">{a.phone}</div>
                                    <div className="flex-1 text-gray-700 text-[15px]">{a.email}</div>
                                    <div className="w-28 text-gray-700 text-[15px]">{a.date}</div>
                                    <div className="w-24 text-gray-700 text-[15px]">{a.time}</div>
                                    <div className={`w-28 text-[15px] font-medium ${a.status === "scheduled" ? "text-green-600" : "text-blue-700"}`}>
                                        {a.status}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {a.status === "completed" ? (
                                            <Link to={`/doctor/appointments/completed/${a.id}`} state={{ appt: a }} title="View info" className="hover:opacity-90">
                                                <InfoIcon />
                                            </Link>
                                        ) : (
                                            <Link to={`/doctor/appointments/ongoing/${a.id}`} state={{ appt: a }} title="View / update appointment" className="hover:opacity-90">
                                                <InfoIcon />
                                            </Link>
                                        )}

                                        {a.status === "scheduled" && (
                                            <button
                                                onClick={() => markCompleted(a.id)}
                                                className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                                                title="Mark as completed"
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}

                            {pageData.length === 0 && (
                                <li className="px-5 py-10 text-center text-gray-500">No appointments found.</li>
                            )}
                        </ul>
                    </div>

                    <div className="flex items-center justify-end gap-2 px-5 py-4">
                        <button
                            className="rounded-md border border-gray-300 px-2.5 py-1 text-gray-600 disabled:opacity-40"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={clampedPage === 1}
                        >
                            ‹
                        </button>

                        {pageNums().map((n, i) =>
                            n === "…" ? (
                                <span key={`e-${i}`} className="px-1.5 text-gray-400 select-none">…</span>
                            ) : (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`h-7 w-7 rounded-md border text-sm ${clampedPage === n ? "bg-[#0E1A33] text-white border-[#0E1A33]" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}`}
                                >
                                    {n}
                                </button>
                            )
                        )}

                        <button
                            className="rounded-md border border-gray-300 px-2.5 py-1 text-gray-600 disabled:opacity-40"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={clampedPage === totalPages}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
