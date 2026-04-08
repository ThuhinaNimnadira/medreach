  
import React from "react";
import { useNavigate } from "react-router-dom";
import { loadPrescriptions } from "../../data/pharmacy-prescriptions.store.js";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

const Magnifier = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400">
        <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23C15.99 6.01 12.98 3 9.49 3S3 6.01 3 9.5 6.01 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4.25 4.25 1.49-1.49Z"
        />
    </svg>
);
const InfoIcon = () => (
    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border-2 border-[#0E1A33] text-[#0E1A33] font-semibold">
    i
  </span>
);

export default function PharmacyPrescriptions() {
    const nav = useNavigate();
  
    const [rows, setRows] = React.useState(() => loadPrescriptions());
    const [q, setQ] = React.useState("");
    const [sort, setSort] = React.useState("newest"); // newest | oldest | name-asc
    const [page, setPage] = React.useState(1);
    const perPage = 5;
  
    const filtered = React.useMemo(() => {
        const t = q.trim().toLowerCase();
        let arr = rows.filter((r) => {
            const doctor = (r.doctorName || r.prescriberName || "").toLowerCase();
            const phone = (r.phone || "").toLowerCase();
            const testOrRx = (r.testName || r.publicId || "").toLowerCase();
            return (
                !t ||
                (r.patientName || "").toLowerCase().includes(t) ||
                phone.includes(t) ||
                doctor.includes(t) ||
                testOrRx.includes(t)
            );
        });

        if (sort === "oldest")
            arr = [...arr].sort(
                (a, b) => (a.issuedAt || a.createdAt || 0) - (b.issuedAt || b.createdAt || 0)
            );
        else if (sort === "name-asc")
            arr = [...arr].sort((a, b) =>
                (a.patientName || "").localeCompare(b.patientName || "")
            );
        else
            arr = [...arr].sort(
                (a, b) => (b.issuedAt || b.createdAt || 0) - (a.issuedAt || a.createdAt || 0)
            );

        return arr;
    }, [rows, q, sort]);
  
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const clampedPage = Math.min(page, totalPages);
    const start = (clampedPage - 1) * perPage;
    const end = Math.min(start + perPage, total);
    const pageData = filtered.slice(start, end);

    React.useEffect(() => {
        setPage(1);
    }, [q, sort]);

    function pageNums() {
        const arr = [];
        if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) arr.push(i);
        else {
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
        <div className="min-h-screen "
             style={{ backgroundImage: `url(${bg})` }}
        >
             
            <header className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="MedReach" className="h-9" />
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
                        <h1 className="text-xl font-semibold">Prescriptions</h1>

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
                            {pageData.map((r) => {
                                const phoneOrId = r.phone || r.publicId || "—";
                                const prescriber = r.doctorName || r.prescriberName || "—";
                                const statusColor = r.status === "new" ? "text-green-600" : "text-blue-700";

                                return (
                                    <li key={r.id} className="flex items-center gap-4 px-5 py-3">
                                         
                                        {r.avatar ? (
                                            <img
                                                src={r.avatar}
                                                alt={r.patientName}
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-9 w-9 rounded-full bg-gray-200" />
                                        )}

                                         
                                        <div className="w-64 text-gray-900 text-[15px]">{r.patientName}</div>

                                         
                                        <div className="w-56 text-gray-700 text-[15px]">{phoneOrId}</div>

                                         
                                        <div className="w-56 text-gray-700 text-[15px]">{prescriber}</div>

                                         
                                        <div className="w-28 text-gray-700 text-[15px]">{r.date}</div>

                                         
                                        <div className={`w-28 text-[15px] font-medium ${statusColor}`}>{r.status}</div>

                                         
                                        <div className="flex items-center gap-3">
                                            <button
                                                title={r.status === "issued" ? "Open prescription" : "Open editor"}
                                                onClick={() => {
                                                    if (r.status === "issued" && r.publicId) {
                                                        nav(`/prescription/${encodeURIComponent(r.publicId)}`, {
                                                            state: { rx: r },
                                                        });
                                                    } else {
                                                        nav(
                                                            `/pharmacy/prescriptions/${encodeURIComponent(r.id)}/edit`
                                                        );
                                                    }
                                                }}
                                                className="hover:opacity-90"
                                            >
                                                <InfoIcon />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}

                            {pageData.length === 0 && (
                                <li className="px-5 py-10 text-center text-gray-500">
                                    No prescriptions found.
                                </li>
                            )}
                        </ul>
                    </div>

                     
                    <div className="flex items-center justify-between gap-3 px-5 py-4 text-sm text-gray-500">
                        <div>
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
