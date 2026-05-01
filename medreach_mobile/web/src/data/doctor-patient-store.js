
const KEY = "doctor.patients.v1";

const read = () => JSON.parse(localStorage.getItem(KEY) || "{}");
const write = (db) => localStorage.setItem(KEY, JSON.stringify(db));

export const patientKeyFrom = (apptOrName) => {
    const name =
        typeof apptOrName === "string"
            ? apptOrName
            : apptOrName?.patient || apptOrName?.patientName || "unknown";
    return name.toLowerCase().replace(/\s+/g, "-");
};

export const getRecord = (pid) => {
    const db = read();
    return db[pid] || { reports: [], labs: [] };
};

export const ensureRecord = (pid, seed) => {
    const db = read();
    if (!db[pid]) db[pid] = seed || { reports: [], labs: [] };
    write(db);
    return db[pid];
};

export const saveRecord = (pid, rec) => {
    const db = read();
    db[pid] = rec;
    write(db);
};

export const listReports = (pid) => getRecord(pid).reports;
export const listLabs = (pid) => getRecord(pid).labs;

export const addReport = (pid, report) => {
    const rec = getRecord(pid);
    const r = {
        id: report.id || `rep-${Date.now()}`,
        date: report.date || new Date().toLocaleDateString(),
        title: report.title || `Report ${rec.reports.length + 1}`,
        doctorName: report.doctorName || "Doctor name",
        data: report.data || {},
    };
    rec.reports.unshift(r);
    saveRecord(pid, rec);
    return r;
};

export const deleteReport = (pid, reportId) => {
    const rec = getRecord(pid);
    rec.reports = rec.reports.filter((r) => r.id !== reportId);
    saveRecord(pid, rec);
};

export const requestLab = (pid, item) => {
    const rec = getRecord(pid);
    const lab = {
        id: item.id || `lab-${Date.now()}`,
        title: item.title,
        date: item.date || new Date().toLocaleDateString(),
        description: item.description || "",
        urgency: item.urgency || "Normal",
        status: item.status || "requested", // requested | completed
    };
    rec.labs.unshift(lab);
    saveRecord(pid, rec);
    return lab;
};

export const completeLab = (pid, labId, resultToReport) => {
    const rec = getRecord(pid);
    const lab = rec.labs.find((l) => l.id === labId);
    if (lab) {
        lab.status = "completed";
        saveRecord(pid, rec);
  
        if (resultToReport) {
            addReport(pid, {
                title: lab.title,
                date: lab.date,
                data: resultToReport,
            });
        }
    }
};
