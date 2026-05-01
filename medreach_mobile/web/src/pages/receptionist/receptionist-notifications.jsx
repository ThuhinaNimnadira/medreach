import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

  
const LS_KEY = "reception_notifications_v1";

function seed() {
    const now = Date.now();
    const h = (n) => now - n * 60 * 60 * 1000;
    return [
        { id: "n1", title: "New appointment booked", body: "Patient: Username 4 at 6.30 PM", ts: h(1), read: false },
        { id: "n2", title: "Appointment cancelled", body: "Patient: Username 9 (tomorrow slot)", ts: h(3), read: false },
        { id: "n3", title: "Doctor updated hours", body: "Dr. Perera changed Friday schedule", ts: h(8), read: true },
    ];
}
function readAll() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : seed();
    } catch {
        return seed();
    }
}
function writeAll(list) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch {}
}

  
function timeAgo(ts) {
    const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
}
function isToday(ts) {
    const d = new Date(ts);
    const t = new Date();
    return d.getFullYear() === t.getFullYear() &&
        d.getMonth() === t.getMonth() &&
        d.getDate() === t.getDate();
}

  
export default function ReceptionNotifications() {
    const nav = useNavigate();
    const [items, setItems] = React.useState(() => readAll());

    function setAndSave(next) {
        setItems(next);
        writeAll(next);
    }
    function toggleRead(id) {
        setAndSave(items.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
    }
    function removeOne(id) {
        setAndSave(items.filter((n) => n.id !== id));
    }
    function markAllRead() {
        setAndSave(items.map((n) => ({ ...n, read: true })));
    }
    function clearRead() {
        setAndSave(items.filter((n) => !n.read));
    }

    const today = items.filter((n) => isToday(n.ts)).sort((a, b) => b.ts - a.ts);
    const earlier = items.filter((n) => !isToday(n.ts)).sort((a, b) => b.ts - a.ts);

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
                <div className="mx-auto max-w-[1040px] rounded-2xl bg-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.25)] flex flex-col">
                     
                    <div className="flex items-center justify-between p-5 pb-3">
                        <h1 className="text-xl font-semibold">Notifications</h1>
                        <div className="flex gap-2">
                            <button
                                onClick={markAllRead}
                                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Mark all read
                            </button>
                            <button
                                onClick={clearRead}
                                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Clear read
                            </button>
                        </div>
                    </div>
                    <hr className="border-gray-200" />

                     
                    <div className="max-h-[520px] overflow-auto p-5">
                         
                        {today.length > 0 && (
                            <>
                                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Today</div>
                                <ul className="mb-5">
                                    {today.map((n) => (
                                        <li key={n.id} className="flex items-start justify-between gap-4 py-3">
                                            <div className="flex items-start gap-3">
                        <span
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${
                                n.read ? "bg-gray-300" : "bg-emerald-500"
                            }`}
                        />
                                                <div>
                                                    <div className="text-[15px] font-medium text-gray-900">{n.title}</div>
                                                    <div className="text-[14px] text-gray-600">{n.body}</div>
                                                    <div className="text-xs text-gray-400 mt-1">{timeAgo(n.ts)}</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={() => toggleRead(n.id)}
                                                    className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {n.read ? "Mark unread" : "Mark read"}
                                                </button>
                                                <button
                                                    onClick={() => removeOne(n.id)}
                                                    className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                         
                        {earlier.length > 0 && (
                            <>
                                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Earlier</div>
                                <ul>
                                    {earlier.map((n) => (
                                        <li key={n.id} className="flex items-start justify-between gap-4 py-3">
                                            <div className="flex items-start gap-3">
                        <span
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${
                                n.read ? "bg-gray-300" : "bg-emerald-500"
                            }`}
                        />
                                                <div>
                                                    <div className="text-[15px] font-medium text-gray-900">{n.title}</div>
                                                    <div className="text-[14px] text-gray-600">{n.body}</div>
                                                    <div className="text-xs text-gray-400 mt-1">{timeAgo(n.ts)}</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={() => toggleRead(n.id)}
                                                    className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {n.read ? "Mark unread" : "Mark read"}
                                                </button>
                                                <button
                                                    onClick={() => removeOne(n.id)}
                                                    className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {today.length === 0 && earlier.length === 0 && (
                            <div className="text-center text-gray-500 py-16">No notifications.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
