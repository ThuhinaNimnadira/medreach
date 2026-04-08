import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

const roles = ["doctor", "receptionist", "admin", "lab", "pharmacist"];

export default function AdminAddNewStaff() {
    const nav = useNavigate();
    const [form, setForm] = React.useState({
        username: "",
        email: "",
        role: "",
        password: "",
        confirm: "",
    });
    const [errors, setErrors] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);

    function update(k, v) {
        setForm((f) => ({ ...f, [k]: v }));
    }

    function validate() {
        const e = {};
        if (!form.username.trim()) e.username = "Username is required.";
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
        if (!form.role) e.role = "Select a role.";
        if (!form.password) e.password = "Password is required.";
        else if (form.password.length < 6) e.password = "Min 6 characters.";
        if (!form.confirm) e.confirm = "Confirm your password.";
        else if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        try {
            // 1️⃣ Create staff in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            const user = userCredential.user;

            // 2️⃣ Create user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: form.username,
                email: form.email,
                role: form.role,
                createdAt: serverTimestamp(),
            });

            setSubmitted(true);

            // Optional: reset form or navigate after creation
            setForm({ username: "", email: "", role: "", password: "", confirm: "" });
            // nav("/staff"); // if you have a staff list page
        } catch (error) {
            console.error(error);
            setErrors({ firebase: error.message });
        }
    }

    function onDiscard() {
        nav(-1);
    }

    return (
        <div className="min-h-[calc(100vh-80px)] grid place-items-center p-4 mt-10">

            <div className="relative w-full max-w-5xl rounded-[28px] p-1 bg-gradient-to-br from-sky-600/70 via-blue-700/70 to-slate-900/70">
                <div className="rounded-[24px] bg-slate-900/70 p-8 md:p-12 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-lg">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white">Add New Staff</h1>
                    <p className="text-slate-300 mt-1">Create a staff account </p>

                    <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
                        {/* left column */}
                        <div className="space-y-4">
                            <div>
                                <input
                                    value={form.username}
                                    onChange={(e) => update("username", e.target.value)}
                                    placeholder="username"
                                    className="w-full rounded-lg bg-white/5 text-white placeholder-slate-300 px-4 py-2.5 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/60"
                                />
                                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                            </div>

                            <div>
                                <input
                                    value={form.email}
                                    onChange={(e) => update("email", e.target.value)}
                                    placeholder="email"
                                    className="w-full rounded-lg bg-white/5 text-white placeholder-slate-300 px-4 py-2.5 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/60"
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => update("password", e.target.value)}
                                    placeholder="password"
                                    className="w-full rounded-lg bg-white/5 text-white placeholder-slate-300 px-4 py-2.5 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/60"
                                />
                                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={form.confirm}
                                    onChange={(e) => update("confirm", e.target.value)}
                                    placeholder="confirm password"
                                    className="w-full rounded-lg bg-white/5 text-white placeholder-slate-300 px-4 py-2.5 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/60"
                                />
                                {errors.confirm && <p className="text-red-400 text-sm mt-1">{errors.confirm}</p>}
                            </div>
                        </div>

                        {/* right column */}
                        <div className="space-y-4">
                            <div>
                                <select
                                    value={form.role}
                                    onChange={(e) => update("role", e.target.value)}
                                    className="w-full rounded-lg bg-white/5 text-white px-4 py-2.5 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/60"
                                >
                                    <option value="" className="text-slate-700">Role</option>
                                    {roles.map((r) => (
                                        <option key={r} value={r} className="text-slate-800">
                                            {r.charAt(0).toUpperCase() + r.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                            </div>

                            <div className="pt-1 flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2.5 font-medium shadow hover:opacity-95 active:opacity-90"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    onClick={onDiscard}
                                    className="flex-1 rounded-lg bg-gradient-to-r from-slate-600 to-blue-600/80 text-white px-4 py-2.5 font-medium shadow hover:opacity-95 active:opacity-90"
                                >
                                    Discard
                                </button>
                            </div>

                            {submitted && (
                                <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-emerald-200 text-sm">
                                    ✓ Staff account created successfully.
                                </div>
                            )}

                            {errors.firebase && (
                                <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-red-200 text-sm">
                                    ✗ {errors.firebase}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
