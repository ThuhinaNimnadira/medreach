const LS_KEY = "lab_notifications_v1";

function seed() {
    const now=Date.now(), ago=(d)=> now - d*24*60*60*1000;
    return [
        { id:"ln-001", title:"New lab request",   message:"Doctor requested a new X-Ray.", createdAt:ago(0.2), unread:true,  url:"/lab/reports" },
        { id:"ln-002", title:"Report viewed",     message:"A doctor opened your issued report.", createdAt:ago(1), unread:false, url:"/lab/reports" },
        { id:"ln-003", title:"Reminder",          message:"Pending lab requests awaiting upload.", createdAt:ago(3), unread:true, url:"/lab/reports" },
    ];
}

function readRaw(){ try{const r=localStorage.getItem(LS_KEY); return r?JSON.parse(r):null;}catch{return null;} }
function writeRaw(list){ try{localStorage.setItem(LS_KEY, JSON.stringify(list));}catch{} }

export function loadLabNotifications(){
    let list=readRaw(); if(!list){ list=seed(); writeRaw(list); }
    return list.map(n=>({...n, createdAt:Number(n.createdAt)||Date.now()})).sort((a,b)=>b.createdAt-a.createdAt);
}
export function markNotifRead(id, unread=false){ const list=loadLabNotifications(); const i=list.findIndex(n=>n.id===id); if(i!==-1){ list[i]={...list[i], unread: !unread?false:true}; writeRaw(list);} return list[i]||null; }
export function deleteNotif(id){ const next=loadLabNotifications().filter(n=>n.id!==id); writeRaw(next); return next; }
export function markAllRead(){ const next=loadLabNotifications().map(n=>({...n, unread:false})); writeRaw(next); return next; }
