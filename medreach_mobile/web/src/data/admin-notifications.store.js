const LS_KEY = "admin_notifications_v1";

function seed() {
    const now = Date.now(), ago = (d)=> now - d*24*60*60*1000;
    return [
        { id:"an-001", title:"New user registered", message:"A new user joined the system.", createdAt:ago(0.2), unread:true,  url:"/admin/manageusers" },
        { id:"an-002", title:"Guide updated",       message:"Offline guide was updated.",   createdAt:ago(1),   unread:false, url:"/admin/manageguides" },
        { id:"an-003", title:"Lab result uploaded", message:"A lab report is available.",   createdAt:ago(2),   unread:true,  url:"/admin/managepatients" },
    ];
}

function readRaw(){ try{const r=localStorage.getItem(LS_KEY); return r?JSON.parse(r):null;}catch{return null;} }
function writeRaw(list){ try{localStorage.setItem(LS_KEY, JSON.stringify(list));}catch{} }

export function loadAdminNotifications(){
    let list = readRaw(); if(!list){ list=seed(); writeRaw(list); }
    return list.map(n=>({ ...n, createdAt: Number(n.createdAt)||Date.now() })).sort((a,b)=>b.createdAt-a.createdAt);
}
export function markNotifRead(id, unread=false){ const list=loadAdminNotifications(); const i=list.findIndex(n=>n.id===id); if(i!==-1){ list[i]={...list[i], unread: !unread?false:true}; writeRaw(list);} return list[i]||null; }
export function deleteNotif(id){ const next=loadAdminNotifications().filter(n=>n.id!==id); writeRaw(next); return next; }
export function markAllRead(){ const next=loadAdminNotifications().map(n=>({...n, unread:false})); writeRaw(next); return next; }
