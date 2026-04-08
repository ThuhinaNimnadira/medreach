  
const KEY = "mr_doctor_appts_v1";

export const AVATAR_URL =
    "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=200&auto=format&fit=crop";

const STATUSES = ["scheduled", "completed"];

function genAppointments(n = 20) {
    const out = [];
    for (let i = 1; i <= n; i++) {
        const status = STATUSES[i % 2]; // i=1 => completed, i=2 => scheduled, etc (seed only)
        out.push({
            id: `ap-${i}`,
            patient: `Username ${i}`,
            phone: `+94 77 ${String(4300000 + i * 121).slice(0, 7)} ${String(
                100 + (i % 900)
            ).padStart(3, "0")}`,
            email: `example${i}@gmail.com`,
            date: "11/11/1111",
            time: "6.30 PM",
            status,
            createdAt: new Date(Date.now() - i * 86400000).toISOString(),
            avatar: AVATAR_URL,
        });
    }
    return out;
}

export function loadAppts() {
    const raw = localStorage.getItem(KEY);
    if (raw) {
        try {
            const arr = JSON.parse(raw);
  
            return arr.map((a) => ({ ...a, createdAt: new Date(a.createdAt) }));
        } catch {}
    }
    const seeded = genAppointments(20);
    localStorage.setItem(KEY, JSON.stringify(seeded));
    return seeded.map((a) => ({ ...a, createdAt: new Date(a.createdAt) }));
}

export function saveAppts(appts) {
    const toSave = appts.map((a) => ({
        ...a,
        createdAt:
            typeof a.createdAt === "string" ? a.createdAt : a.createdAt.toISOString?.() ?? a.createdAt,
    }));
    localStorage.setItem(KEY, JSON.stringify(toSave));
}

export function findApptById(id) {
    return loadAppts().find((a) => a.id === id) || null;
}

export function upsertAppt(appt) {
    const arr = loadAppts();
    const i = arr.findIndex((x) => x.id === appt.id);
    if (i >= 0) arr[i] = { ...arr[i], ...appt };
    else arr.push(appt);
    saveAppts(arr);
    return arr;
}
