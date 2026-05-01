import React from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, where, orderBy, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

const db = getFirestore();
const auth = getAuth();

const Magnifier = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400">
        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-1.06 1.06l.27.28h.79l4.25 4.25 1.49-1.49Z" />
    </svg>
);

export default function DoctorNotifications() {
    const nav = useNavigate();
    const [rows, setRows] = React.useState([]);
    const [q, setQ] = React.useState("");
    const [sort, setSort] = React.useState("newest");
    const [page, setPage] = React.useState(1);
    const perPage = 6;

    const userId = auth.currentUser?.uid;
  
    React.useEffect(() => {
        if (!userId) return;
        const loadNotifications = async () => {
            const notifCol = collection(db, "notifications");
            const qSnap = query(notifCol, where("userId", "==", userId), orderBy("createdAt", "desc"));
            const snap = await getDocs(qSnap);
            const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setRows(docs);
        };
        loadNotifications();
    }, [userId]);

    const filtered = React.useMemo(() => {
        const t = q.trim().toLowerCase();
        let arr = rows.filter(n => !t || n.title.toLowerCase().includes(t) || n.message.toLowerCase().includes(t));
        if (sort === "oldest") arr = [...arr].sort((a,b)=>a.createdAt?.toMillis() - b.createdAt?.toMillis());
        else if (sort === "unread") arr = arr.filter(n=>n.unread);
        else arr = [...arr].sort((a,b)=>b.createdAt?.toMillis() - a.createdAt?.toMillis());
        return arr;
    }, [rows, q, sort]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const clampedPage = Math.min(page, totalPages);
    const start = (clampedPage - 1) * perPage;
    const end = Math.min(start + perPage, total);
    const pageData = filtered.slice(start, end);
    React.useEffect(()=>setPage(1), [q, sort]);

    const markRead = async (n, value) => {
        const docRef = doc(db, "notifications", n.id);
        await updateDoc(docRef, { unread: !value });
        setRows(rows.map(r => r.id===n.id ? {...r, unread: !value} : r));
    };

    const deleteNotification = async (n) => {
        const docRef = doc(db, "notifications", n.id);
        await deleteDoc(docRef);
        setRows(rows.filter(r => r.id !== n.id));
    };

    const markAll = async () => {
        await Promise.all(rows.map(r => {
            if (r.unread) return updateDoc(doc(db, "notifications", r.id), { unread: false });
            return Promise.resolve();
        }));
        setRows(rows.map(r => ({...r, unread:false})));
    };

    const onOpen = async (n) => {
        if (n.unread) await markRead(n, false);
        if (n.url) nav(n.url);
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-white flex flex-col"
             style={{ backgroundImage: `url(${bg})` }}>
             
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
                <div className="mx-auto max-w-[1040px] max-h-[560px] overflow-hidden rounded-2xl bg-white shadow flex flex-col">
                    <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                        <h1 className="text-xl font-semibold">Notifications</h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"><Magnifier/></span>
                                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="w-56 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 outline-none focus:border-gray-300 text-sm"/>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                                <label className="mr-1 text-gray-500">Sort by :</label>
                                <select value={sort} onChange={e=>setSort(e.target.value)} className="bg-transparent outline-none font-semibold">
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="unread">Unread only</option>
                                </select>
                            </div>
                            <button onClick={markAll} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100">Mark all read</button>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex-1 overflow-auto">
                        <ul className="divide-y divide-gray-200">
                            {pageData.map(n=>(
                                <li key={n.id} className="flex items-center gap-4 px-5 py-3">
                                    <div className={`h-2.5 w-2.5 rounded-full ${n.unread ? "bg-teal-500":"bg-gray-300"}`} />
                                    <div className="flex-1">
                                        <div className="text-[15px] text-gray-900 font-medium">{n.title}</div>
                                        <div className="text-[13px] text-gray-600">{n.message}</div>
                                    </div>
                                    <div className="w-40 text-[13px] text-gray-600">{n.createdAt?.toDate()?.toLocaleString()}</div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={()=>onOpen(n)} className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100">Open</button>
                                        <button onClick={()=>markRead(n, n.unread)} className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100">{n.unread ? "Read":"Unread"}</button>
                                        <button onClick={()=>deleteNotification(n)} className="rounded-md border border-gray-300 px-2 py-1 text-xs text-red-600 hover:bg-gray-100">Delete</button>
                                    </div>
                                </li>
                            ))}
                            {pageData.length===0 && <li className="px-5 py-10 text-center text-gray-500">No notifications.</li>}
                        </ul>
                    </div>

                     
                </div>
            </main>
        </div>
    );
}
