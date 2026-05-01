  
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path as needed

const AVATAR =
    "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=400&auto=format&fit=crop";

const cap = (s = "") => (s ? s[0].toUpperCase() + s.slice(1) : s);

export default function AdminStaffInfo() {
    const nav = useNavigate();
    const { id } = useParams();

    const [staff, setStaff] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [updatingRole, setUpdatingRole] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const ROLES = ["doctor", "receptionist", "admin", "lab", "pharmacist"];
  
    React.useEffect(() => {
        const fetchStaff = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setStaff({
                        id: docSnap.id,
                        name: data.name || "Username",
                        email: data.email || "example@gmail.com",
                        role: data.role || "staff",
                        avatar: data.avatar || AVATAR,
                    });
                } else {
                    alert("Staff not found");
                    nav(-1);
                }
            } catch (err) {
                console.error("Error fetching staff:", err);
                alert("Failed to fetch staff");
                nav(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, [id, nav]);
  
    const onChangeRole = async () => {
        const nextRole = prompt(
            `Enter new role for ${staff.name}:\nOptions: ${ROLES.join(", ")}`,
            staff.role
        );
        if (!nextRole) return;
        if (!ROLES.includes(nextRole.toLowerCase())) {
            alert("Invalid role.");
            return;
        }
        try {
            setUpdatingRole(true);
            const docRef = doc(db, "users", staff.id);
            await updateDoc(docRef, { role: nextRole.toLowerCase() });
            setStaff((prev) => ({ ...prev, role: nextRole.toLowerCase() }));
            alert("Role updated successfully.");
        } catch (err) {
            console.error("Error updating role:", err);
            alert("Failed to update role.");
        } finally {
            setUpdatingRole(false);
        }
    };
  
    const onDelete = async () => {
        if (!window.confirm(`Delete ${staff.name}? This action cannot be undone.`)) return;
        try {
            setDeleting(true);
            await deleteDoc(doc(db, "users", staff.id));
            alert(`${staff.name} deleted successfully.`);
            nav(-1);
        } catch (err) {
            console.error("Error deleting staff:", err);
            alert("Failed to delete staff.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading || !staff)
        return (
            <div className="h-screen flex items-center justify-center text-gray-700 text-xl">
                Loading staff info...
            </div>
        );

    return (
        <div className="h-screen w-screen overflow-hidden bg-white flex flex-col">
             
            <header className="flex justify-between items-center px-12 py-6">
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

             
            <div className="px-10 pb-10 h-[calc(100vh-96px)] min-h-0">
                <div className="h-full rounded-[28px] p-1 bg-gradient-to-br from-sky-800/70 via-blue-900/70 to-[#0d1b2a]">
                    <div className="h-full rounded-[24px] bg-[#0f2139]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                        <div className="h-full rounded-[20px] border border-white/10 bg-white/5 p-8 md:p-14 text-white">
                            <div className="h-full w-full flex items-center justify-center">
                                <div className="flex flex-wrap items-center justify-center gap-30">
                                     
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={staff.avatar}
                                            alt={staff.name}
                                            className="h-28 w-28 rounded-full object-cover ring-2 ring-white/20"
                                        />
                                        <div className="mt-6 text-4xl md:text-[44px] leading-none font-extrabold">
                                            {cap(staff.role)}
                                        </div>
                                        <div className="mt-3 text-white/90">{staff.email}</div>
                                    </div>

                                     
                                    <div className="w-full sm:w-auto grid gap-4">
                                        <button
                                            onClick={onChangeRole}
                                            disabled={updatingRole}
                                            className="rounded-xl bg-gradient-to-b from-[#3b63c6] to-[#274c9e] text-white px-8 py-3 font-medium disabled:opacity-60"
                                        >
                                            {updatingRole ? "Updating..." : "Change role"}
                                        </button>
                                        <button
                                            onClick={onDelete}
                                            disabled={deleting}
                                            className="rounded-xl bg-gradient-to-b from-[#2f3c56] to-[#29447f] text-white px-8 py-3 font-medium disabled:opacity-60"
                                        >
                                            {deleting ? "Deleting..." : "Delete account"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
