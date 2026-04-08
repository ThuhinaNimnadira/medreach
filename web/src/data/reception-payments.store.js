  
const LS_KEY = "reception_payments_v1";

function readDB() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEY)) || {};
    } catch {
        return {};
    }
}
function writeDB(db) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(db));
    } catch {}
}

export function isPaid(apptId) {
    const db = readDB();
    return Boolean(db[apptId]);
}

export function markPaid(apptId, payload) {
    const db = readDB();
    db[apptId] = { ...payload, paidAt: Date.now() };
    writeDB(db);
    return db[apptId];
}

export function getReceipt(apptId) {
    const db = readDB();
    return db[apptId] || null;
}
