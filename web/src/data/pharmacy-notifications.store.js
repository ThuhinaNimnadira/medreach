// src/data/pharmacy-notifications.store.js
// Local (demo) notifications store for Pharmacy

const LS_KEY = "pharmacy_notifications_v1";

function seed() {
    const now = Date.now();
    const ago = (d) => now - d * 24 * 60 * 60 * 1000;

    return [
        {
            id: "pn-001",
            title: "New prescription request",
            message: "Doctor requested a prescription for Patient 4.",
            createdAt: ago(0.5),
            unread: true,
            url: "/pharmacy/prescriptions", // open list
        },
        {
            id: "pn-002",
            title: "Prescription issued",
            message: "Patient 1 prescription was issued.",
            createdAt: ago(2),
            unread: false,
            url: "/pharmacy/prescriptions",
        },
        {
            id: "pn-003",
            title: "Reminder",
            message: "Review pending prescriptions.",
            createdAt: ago(3),
            unread: true,
            url: "/pharmacy/prescriptions",
        },
    ];
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
    } catch {}
}

export function loadPharmacyNotifications() {
    let list = readRaw();
    if (!list) {
        list = seed();
        writeRaw(list);
    }
    return list
        .map((n) => ({ ...n, createdAt: Number(n.createdAt) || Date.now() }))
        .sort((a, b) => b.createdAt - a.createdAt);
}

export function savePharmacyNotifications(list) {
    writeRaw(list);
}

export function markNotifRead(id, unread = false) {
    const list = loadPharmacyNotifications();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
        list[idx] = { ...list[idx], unread: !unread ? false : true };
        savePharmacyNotifications(list);
        return list[idx];
    }
    return null;
}

export function deleteNotif(id) {
    const list = loadPharmacyNotifications().filter((n) => n.id !== id);
    savePharmacyNotifications(list);
    return list;
}

export function markAllRead() {
    const list = loadPharmacyNotifications().map((n) => ({ ...n, unread: false }));
    savePharmacyNotifications(list);
    return list;
}

export function addNotif(data) {
    const list = loadPharmacyNotifications();
    const item = {
        id: `pn-${Math.random().toString(36).slice(2, 8)}`,
        title: data.title || "Notification",
        message: data.message || "",
        createdAt: data.createdAt || Date.now(),
        unread: data.unread ?? true,
        url: data.url || "/pharmacy/prescriptions",
    };
    list.unshift(item);
    savePharmacyNotifications(list);
    return item;
}
