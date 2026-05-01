const LS_KEY = "doctor_notifications_v1";

function seed() {
    const now=Date.now(), ago=(d)=> now - d*24*60*60*1000;
    return [
        { id:"dn-001", title:"Appointment scheduled", message:"New appointment added to your list.", createdAt:ago(0.1), unread:true,  url:"/doctor/appointments" },
        { id:"dn-002", title:"Lab uploaded",          message:"A requested lab report is ready.",    createdAt:ago(1),   unread:true,  url:"/doctor/appointments" },
        { id:"dn-003", title:"Patient review",        message:"You received a new review.",          createdAt:ago(2),   unread:false, url:"/doctor/dashboard" },
    ];
}

function readRaw(){ try{const r=localStorage.getItem(LS_KEY); return r?JSON.parse(r):null;}catch{return null;} }
function writeRaw(list){ try{localStorage.setItem(LS_KEY, JSON.stringify(list));}catch{} }

export function loadDoctorNotifications(){
    let list=readRaw(); if(!list){ list=seed(); writeRaw(list); }
    return list.map(n=>({...n, createdAt:Number(n.createdAt)||Date.now()})).sort((a,b)=>b.createdAt-a.createdAt);
}
export function markNotifRead(id, unread=false){ const list=loadDoctorNotifications(); const i=list.findIndex(n=>n.id===id); if(i!==-1){ list[i]={...list[i], unread: !unread?false:true}; writeRaw(list);} return list[i]||null; }
export function deleteNotif(id){ const next=loadDoctorNotifications().filter(n=>n.id!==id); writeRaw(next); return next; }
export function markAllRead(){ const next=loadDoctorNotifications().map(n=>({...n, unread:false})); writeRaw(next); return next; }
