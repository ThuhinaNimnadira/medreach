// src/data/pharmacy-prescriptions.store.js
// Local store for pharmacy prescriptions (demo) aligned with our other mock DBs.

const LS_KEY = "pharmacy_prescriptions_v2"; // bump key to reseed with the new schema
const AVATAR =
    "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=200&auto=format&fit=crop";

function seed() {
    const now = Date.now();
    const daysAgo = (d) => now - d * 24 * 60 * 60 * 1000;

    const out = [];
    // 20 demo rows, alternating status like our appointments mock
    for (let i = 1; i <= 20; i++) {
        const status = i % 2 === 0 ? "new" : "issued"; // alternate for the UI
        const createdAt = daysAgo(i);
        out.push({
            id: `rx-${String(i).padStart(3, "0")}`,
            publicId: status === "issued" ? `RX-PUB-${String(i).padStart(3, "0")}` : null,
            patientName: `Username ${i}`,
            phone: `+94 77 ${String(4300000 + i * 121).slice(0, 7)} ${String(
                100 + (i % 900)
            ).padStart(3, "0")}`,
            doctorName: "Doctorname",
            date: "11/11/1111",
            status, // "new" | "issued"
            createdAt, // for consistent "newest/oldest" sorts across pages
            issuedAt: status === "issued" ? createdAt - 60 * 60 * 1000 : null, // 1h before for variety
            avatar: AVATAR,
        });
    }
    return out;
}

function readRaw() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function writeRaw(list) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch {
        // ignore write failures in demo
    }
}

/* --------------------------------- API ---------------------------------- */

export function loadPrescriptions() {
    let list = readRaw();
    if (!list) {
        list = seed();
        writeRaw(list);
    }
    // normalize numeric timestamps
    return list.map((p) => ({
        ...p,
        createdAt: Number(p.createdAt ?? Date.now()),
        issuedAt: p.issuedAt == null ? null : Number(p.issuedAt),
    }));
}

export function savePrescriptions(list) {
    writeRaw(list);
}

/** Create a new prescription (defaults to "new") */
export function addPrescription(data = {}) {
    const list = loadPrescriptions();
    const id = `rx-${Math.random().toString(36).slice(2, 8)}`;
    const now = Date.now();
    const status = data.status || "new";

    const item = {
        id,
        publicId:
            status === "issued"
                ? data.publicId || id.toUpperCase().replace("RX-", "RX-PUB-")
                : null,
        patientName: data.patientName || "Username",
        phone:
            data.phone ||
            `+94 77 ${String(4300000 + Math.floor(Math.random() * 9000)).slice(0, 7)} ${String(
                100 + Math.floor(Math.random() * 900)
            ).padStart(3, "0")}`,
        doctorName: data.doctorName || "Doctorname",
        date: data.date || "11/11/1111",
        status, // "new" | "issued"
        createdAt: now,
        issuedAt: status === "issued" ? now : null,
        avatar: data.avatar || AVATAR,
    };

    list.unshift(item);
    savePrescriptions(list);
    return item;
}

/** Patch/update by id */
export function updatePrescription(id, patch) {
    const list = loadPrescriptions();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const prev = list[idx];
    const next = { ...prev, ...patch };

    if ("status" in patch) {
        if (patch.status === "issued") {
            if (!next.publicId) {
                next.publicId = prev.publicId || prev.id.toUpperCase().replace("RX-", "RX-PUB-");
            }
            if (next.issuedAt == null) next.issuedAt = Date.now();
        } else {
            // going back to "new"
            next.issuedAt = null;
            next.publicId = null;
        }
    }

    list[idx] = next;
    savePrescriptions(list);
    return next;
}

/** Convenience getters */
export function getPrescriptionById(id) {
    return loadPrescriptions().find((p) => p.id === id) || null;
}

export function getPrescriptionByPublicId(publicId) {
    return loadPrescriptions().find((p) => p.publicId === publicId) || null;
}
