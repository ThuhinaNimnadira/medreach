// src/pages/admin/admin-managepatients.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png"; // adjust path
// ---- Small UI bits ----
function InfoIcon() {
    return (
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border-2 border-[#0E1A33] text-[#0E1A33] font-semibold">
      i
    </span>
    );
}
function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-600">
            <path
                fill="currentColor"
                d="M9 3h6a1 1 0 0 1 1 1v1h4v2H4V5h4V4a1 1 0 0 1 1-1m1 5h2v10h-2V8m4 0h2v10h-2V8M8 8h2v10H8V8Z"
            />
        </svg>
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

const DEFAULT_AVATAR =
    "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=200&auto=format&fit=crop";

export default function AdminManagePatients() {
    const nav = useNavigate();
    const [patients, setPatients] = React.useState([]);
    const [q, setQ] = React.useState("");
    const [sort, setSort] = React.useState("name-asc");
    const [page, setPage] = React.useState(1);
    const perPage = 5;

    // fetch patients from users collection where role == 'patient'
    React.useEffect(() => {
        const qRef = query(collection(db, "users"), where("role", "==", "patient"));
        const unsub = onSnapshot(
            qRef,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name || "Unknown",
                    email: doc.data().email || "-",
                    phone: doc.data().phone || "-",
                    createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
                    avatar: doc.data().avatar || DEFAULT_AVATAR,
                }));
                setPatients(data);
            },
            (err) => console.error(err)
        );
        return () => unsub();
    }, []);

    // derived: search + sort
    const filtered = React.useMemo(() => {
        const t = q.trim().toLowerCase();
        let arr = patients.filter(
            (p) =>
                !t ||
                p.name.toLowerCase().includes(t) ||
                p.email.toLowerCase().includes(t) ||
                p.phone.toLowerCase().includes(t)
        );

        switch (sort) {
            case "newest":
                arr = [...arr].sort((a, b) => b.createdAt - a.createdAt);
                break;
            case "oldest":
                arr = [...arr].sort((a, b) => a.createdAt - b.createdAt);
                break;
            default:
                arr = [...arr].sort((a, b) => a.name.localeCompare(b.name));
        }
        return arr;
    }, [patients, q, sort]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const clampedPage = Math.min(page, totalPages);
    const start = (clampedPage - 1) * perPage;
    const end = Math.min(start + perPage, total);
    const pageData = filtered.slice(start, end);

    React.useEffect(() => setPage(1), [q, sort]);

    function deletePatient(id) {
        const p = patients.find((x) => x.id === id);
        if (!p) return;
        if (confirm(`Delete ${p.name}?`)) {
            deleteDoc(doc(db, "users", id))
                .then(() => console.log(`Deleted ${p.name}`))
                .catch((err) => console.error(err));
        }
    }

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
                        <h1 className="text-xl font-semibold">All Patients</h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Magnifier />
                </span>
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search"
                                    className="w-56 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 outline-none focus:border-gray-300 text-sm"
                                />
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                                <label className="mr-1 text-gray-500">Sort by :</label>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="bg-transparent outline-none font-semibold"
                                >
                                    <option value="name-asc">Name A–Z</option>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex-1 overflow-auto">
                        <ul className="divide-y divide-gray-200">
                            {pageData.map((p) => (
                                <li key={p.id} className="flex items-center gap-4 px-5 py-3">
                                    <img src={p.avatar} alt={p.name} className="h-9 w-9 rounded-full object-cover" />
                                    <div className="w-60 text-gray-900 text-[15px]">{p.name}</div>
                                    <div className="w-60 text-gray-700 text-[15px]">{p.phone}</div>
                                    <div className="flex-1 text-gray-700 text-[15px]">{p.email}</div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            title="View info"
                                            onClick={() => nav(`/admin/patient/${p.id}`, { state: { patient: p } })}
                                            className="hover:opacity-90"
                                        >
                                            <InfoIcon />
                                        </button>
                                        <button title="Delete" onClick={() => deletePatient(p.id)} className="hover:opacity-80">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </li>
                            ))}

                            {pageData.length === 0 && (
                                <li className="px-5 py-10 text-center text-gray-500">No patients match your search.</li>
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-3 px-5 py-4 md:flex-row md:justify-between">
                        <div className="text-xs text-gray-500">
                            Showing data {total === 0 ? 0 : start + 1} to {end} of {total} entries
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="rounded-md border border-gray-300 px-2.5 py-1 text-gray-600 disabled:opacity-40"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={clampedPage === 1}
                                aria-label="Previous page"
                            >
                                ‹
                            </button>

                            {pageNums().map((n, i) =>
                                    n === "…" ? (
                                        <span key={`e-${i}`} className="px-1.5 text-gray-400 select-none">
                    …
                  </span>
                                    ) : (
                                        <button
                                            key={n}
                                            onClick={() => setPage(n)}
                                            className={`h-7 w-7 rounded-md border text-sm ${
                                                clampedPage === n
                                                    ? "bg-[#0E1A33] text-white border-[#0E1A33]"
                                                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                                            }`}
                                        >
                                            {n}
                                        </button>
                                    )
                            )}

                            <button
                                className="rounded-md border border-gray-300 px-2.5 py-1 text-gray-600 disabled:opacity-40"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={clampedPage === totalPages}
                                aria-label="Next page"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
