  
const KEY = "lab_reports_v3";

const AVATAR =
    "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=200&auto=format&fit=crop";

function makeSlug() {
    return (
        Math.random().toString(36).slice(2, 8) +
        "-" +
        Date.now().toString(36).slice(-4)
    );
}

function seed(n = 12) {
    const out = [];
    for (let i = 0; i < n; i++) {
        const issued = i % 3 === 0; // some issued, some new
        out.push({
            id: `lr-${i + 1}`,
            patientName: `Username ${i + 1}`,
            phone: "+94 77 433 8885",
            doctorName: "Doctorname",
            avatar: AVATAR,
            testName: i % 2 ? "Lab report" : "X-Ray",
            date: "11/11/1111",
            createdAt: Date.now() - i * 86400000,
            status: issued ? "issued" : "new", // "new" | "issued"
            issuedAt: issued ? Date.now() - i * 43200000 : null,
            publicId: issued ? makeSlug() : null,
            notes: issued ? "Sample issued notes for this report." : "",
            images: issued ? [] : [], // data URLs
        });
    }
    return out;
}

export function loadReports() {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    const seeded = seed();
    saveReports(seeded);
    return seeded;
}

export function saveReports(list) {
    try {
        localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
}

export function findReportById(id) {
    return loadReports().find((r) => r.id === id);
}

export function findReportByPublicId(publicId) {
    return loadReports().find((r) => r.publicId === publicId);
}

  
export function requestLabReport({ patientName, phone, doctorName, testName, date }) {
    const list = loadReports();
    const id = `lr-${Date.now()}`;
    const record = {
        id,
        patientName,
        phone,
        doctorName,
        testName: testName || "Lab report",
        date: date || "11/11/1111",
        avatar: AVATAR,
        createdAt: Date.now(),
        status: "new",
        issuedAt: null,
        publicId: null,
        notes: "",
        images: [],
    };
    list.unshift(record);
    saveReports(list);
    return record;
}

export function updateReport(id, patch) {
    const list = loadReports();
    const i = list.findIndex((r) => r.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...patch };
    saveReports(list);
    return list[i];
}

export function removeReportImage(id, index) {
    const rep = findReportById(id);
    if (!rep) return null;
    const imgs = [...(rep.images || [])];
    imgs.splice(index, 1);
    return updateReport(id, { images: imgs });
}

export function addReportImage(id, dataUrl) {
    const rep = findReportById(id);
    if (!rep) return null;
    return updateReport(id, { images: [...(rep.images || []), dataUrl] });
}

export function issueReport(id) {
    const rep = findReportById(id);
    if (!rep) return null;
    if (rep.status === "issued" && rep.publicId) return rep;
    return updateReport(id, {
        status: "issued",
        issuedAt: Date.now(),
        publicId: rep.publicId || makeSlug(),
    });
}
