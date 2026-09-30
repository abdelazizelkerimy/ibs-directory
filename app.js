'use strict';
console.log('%c IBS app.js — الإصدار 4 (تم التحميل) ','background:#EA580C;color:#fff;padding:2px 8px;border-radius:4px');

/* ═══ 1) الإعدادات — عدّل هنا فقط ═══ */

// const FIREBASE_CONFIG={ apiKey:"", authDomain:"", projectId:"", storageBucket:"", messagingSenderId:"", appId:"" };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkX_u__0QvGZCwynB9uWLR1SOSmH77uUA",
  authDomain: "lbs-directory.firebaseapp.com",
  projectId: "lbs-directory",
  storageBucket: "lbs-directory.firebasestorage.app",
  messagingSenderId: "417372592003",
  appId: "1:417372592003:web:af23362e6b2d92941f08b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);






const LOGO_URL="https://z-cdn-media.chatglm.cn/files/d3e13fb7-a117-4bf4-bfc3-0905964a3295.png";
const SCHOOL_AR="مدارس التعلم ثنائي اللغة للتعليم";
const SCHOOL_EN="Bilingual Learning Schools";
const SESSION_HOURS=12;
const PBKDF2_ITER=100000;
// const CONFIG_OK=!!FIREBASE_CONFIG.apiKey&&!/ضع|YOUR|xxx/i.test(FIREBASE_CONFIG.apiKey);

/* ═══ 2) الهيكل ═══ */
const SECTIONS={
  general:{name:"الإدارة العامة",color:"#F97316",stages:["general"]},
  boys:{name:"قسم البنين",color:"#0E7490",stages:["boys.lower","boys.upper","boys.ms"]},
  girls:{name:"قسم البنات",color:"#BE185D",stages:["girls.kg","girls.primary","girls.ms"]}
};
const STAGES={
  "general":{name:"الإدارة العامة",short:"الإدارة العامة",sec:"general"},
  "boys.lower":{name:"الابتدائي – الصفوف الأولية (بنين)",short:"الصفوف الأولية",sec:"boys"},
  "boys.upper":{name:"الابتدائي – الصفوف العليا (بنين)",short:"الصفوف العليا",sec:"boys"},
  "boys.ms":{name:"المتوسط والثانوي (بنين)",short:"المتوسط والثانوي",sec:"boys"},
  "girls.kg":{name:"رياض الأطفال (بنات)",short:"رياض الأطفال",sec:"girls"},
  "girls.primary":{name:"الابتدائي (بنات)",short:"الابتدائي",sec:"girls"},
  "girls.ms":{name:"المتوسط والثانوي (بنات)",short:"المتوسط والثانوي",sec:"girls"}
};
const TYPES={general:{name:"إدارة عامة"},teaching:{name:"كادر تعليمي"},admin:{name:"كادر إداري"}};
const ALL_STAGE_KEYS=Object.keys(STAGES);
const DEFAULT_SETTINGS={
  generalJobs:["المدير العام","السكرتير التنفيذي","مدير الشؤون التعليمية","مدير الخدمات المساندة","مسؤول الموارد البشرية","مسؤول القبول والتسجيل","المسؤول الإعلامي","مسؤول حركة النقل والمخازن","المحاسب","مسؤول المقصف"],
  adminJobs:["مدير المرحلة","وكيل الشؤون التعليمية","وكيل شؤون الطلاب","الموجه الطلابي","رائد النشاط","مساعد إداري"],
  specialties:["معلم قرآن كريم","معلم لغة عربية","معلم لغة إنجليزية","معلم رياضيات","معلم علوم","معلم اجتماعيات","معلم حاسب آلي","معلم تربية فنية","معلم تربية بدنية"]
};
/* [الاسم، الوظيفة، المرحلة، النوع، الجوال، البريد] */
const DEMO_STAFF=[
["عبدالله محمد الهادي","المدير العام","general","general","0551000001","dg@ibs-school.edu"],
["فيصل العتيبي","السكرتير التنفيذي","general","general","0551000002","faisal@ibs-school.edu"],
["سارة الدوسري","مدير الشؤون التعليمية","general","general","0551000003","sara@ibs-school.edu"],
["نورة الغامدي","مدير الخدمات المساندة","general","general","0551000004","noura@ibs-school.edu"],
["ريم العسيري","مسؤول الموارد البشرية","general","general","0551000005","reem@ibs-school.edu"],
["محمد الشهري","مسؤول القبول والتسجيل","general","general","0551000006","m.shahri@ibs-school.edu"],
["خالد العمري","المسؤول الإعلامي","general","general","0551000007","khaled@ibs-school.edu"],
["أحمد الزهراني","المحاسب","general","general","0551000009","ahmed@ibs-school.edu"],
["عبدالعزيز السلمي","مدير المرحلة","boys.lower","admin","0552000001","aziz@ibs-school.edu"],
["معاذ جابر","معلم قرآن كريم","boys.lower","teaching","0552000003","moath@ibs-school.edu"],
["ماجد بخيت","معلم رياضيات","boys.lower","teaching","0552000005","majed@ibs-school.edu"],
["سلمان العماري","مدير المرحلة","boys.upper","admin","0552000006","salman@ibs-school.edu"],
["ناصر الدوسري","مساعد إداري","boys.upper","admin","0552000007","nasser@ibs-school.edu"],
["عمر الفيفي","معلم لغة إنجليزية","boys.upper","teaching","0552000009","omar@ibs-school.edu"],
["إبراهيم النعمي","مدير المرحلة","boys.ms","admin","0552000010","ibrahim@ibs-school.edu"],
["نايف الحمد","وكيل شؤون الطلاب","boys.ms","admin","0552000011","naif@ibs-school.edu"],
["زياد الشمري","معلم حاسب آلي","boys.ms","teaching","0552000012","ziad@ibs-school.edu"],
["هند العسيري","مدير المرحلة","girls.kg","admin","0553000001","hind@ibs-school.edu"],
["حصة المالكي","معلمة رياض أطفال","girls.kg","teaching","0553000002","hessa@ibs-school.edu"],
["أمل الحربي","مدير المرحلة","girls.primary","admin","0553000004","amal@ibs-school.edu"],
["شهد البقمي","معلمة لغة عربية","girls.primary","teaching","0553000005","shahad@ibs-school.edu"],
["رهف الرويلي","معلمة رياضيات","girls.primary","teaching","0553000006","rahaf@ibs-school.edu"],
["غادة الفارس","وكيل شؤون الطلاب","girls.ms","admin","0553000007","ghada@ibs-school.edu"],
["رنا سويدان","معلمة علوم","girls.ms","teaching","0553000009","rana@ibs-school.edu"],
["أسماء الحمد","معلمة لغة إنجليزية","girls.ms","teaching","0553000010","asma@ibs-school.edu"]
];
const DEMO_USERS=[
  {u:"m.boys",p:"123456",n:"أ. سلطان الحربي",st:["boys.lower","boys.upper","boys.ms"],ac:{add:true,edit:true,delete:false,data:true}},
  {u:"g.primary",p:"123456",n:"أ. منى القحطاني",st:["girls.kg","girls.primary"],ac:{add:true,edit:true,delete:false,data:true}}
];

/* ═══ 3) الحالة والأدوات ═══ */
let db=null,unsubC=null,publicLimit=60,staffPageBuilt=false,logsTab="in";
const state={
  user:null,logId:null,settings:null,
  staff:[],contacts:{},users:[],loginLogs:null,actLogs:null,
  page:"dashboard",viewMode:"cards",
  pf:{q:"",sec:"all",stage:"all",type:"all"},
  af:{q:"",sec:"all",stage:"all",type:"all"}
};
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
const icon=n=>`<svg class="ic" aria-hidden="true"><use href="#i-${n}"/></svg>`;
function showErrPanel(msg){if(window.__ibsShowErr)window.__ibsShowErr(String(msg));else console.warn(String(msg));}
function debounce(fn,ms){let t;return function(){const a=arguments,s=this;clearTimeout(t);t=setTimeout(()=>fn.apply(s,a),ms);};}
function hexToRgba(h,a){const n=parseInt(h.slice(1),16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;}
function fmtDT(ms){try{return new Date(ms).toLocaleString("ar-SA-u-ca-gregory",{dateStyle:"medium",timeStyle:"short"});}catch(e){return new Date(ms).toLocaleString();}}
function fmtD(ms){try{return new Date(ms).toLocaleDateString("ar-SA-u-ca-gregory",{dateStyle:"long"});}catch(e){return "";}}
function fmtDur(ms){const m=Math.floor(ms/60000);if(m<60)return m+" دقيقة";return Math.floor(m/60)+" س "+(m%60)+" د";}
function norm(s){return String(s||"").replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/\s+/g," ").trim().toLowerCase();}
function validPhone(p){return /^[059]\d{8,14}$/.test(String(p).replace(/\D/g,""));}
function validEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);}
function toast(msg,type){
  type=type||"ok";
  const t=document.createElement("div");
  t.className="toast "+type;
  t.innerHTML=`${icon(type==="err"?"alert":type==="info"?"clock":"check")}<span>${esc(msg)}</span>`;
  $("#toastRoot").appendChild(t);
  setTimeout(()=>{t.style.transition=".3s";t.style.opacity="0";setTimeout(()=>t.remove(),320);},3400);
}
function toastErr(e){toast("حدث خطأ: "+((e&&e.code)||e.message||e),"err");}
function errBox(e){return `<div class="errbox">${icon("alert")}<b>تعذر تحميل البيانات</b><div class="muted small">${esc((e&&e.code)||e.message||e)}</div><div class="muted small">تأكد من اتصالك بالإنترنت ومن قواعد أمان Firestore.</div></div>`;}
function emptyPerm(){return `<div class="empty">${icon("lock")}<h4>لا تملك صلاحية الوصول</h4><p>هذه الصفحة متاحة لمدير النظام أو تتطلب صلاحيات إضافية.</p></div>`;}
function loadScript(src){return new Promise((res,rej)=>{
  if(document.querySelector(`script[src="${src}"]`))return res();
  const s=document.createElement("script");s.src=src;s.onload=res;
  s.onerror=()=>rej(new Error("فشل تحميل "+src));
  document.head.appendChild(s);
});}
const LIBS={
  xlsx:["XLSX","https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"],
  jspdf:["jspdf","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],
  h2c:["html2canvas","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"]
};
async function needLib(k){if(window[LIBS[k][0]])return;await loadScript(LIBS[k][1]);}

/* ═══ 4) النوافذ المنبثقة ═══ */
let modalStack=[];
function openModal(o){
  o=Object.assign({title:"",body:"",foot:"",wide:false,small:false},o);
  const el=document.createElement("div");
  el.className="modal";
  el.innerHTML=`<div class="modal-card ${o.wide?"wide":""} ${o.small?"small":""}">
    <div class="modal-head"><h3>${o.title}</h3><button class="icon-btn mclose" aria-label="إغلاق">${icon("x")}</button></div>
    <div class="modal-body">${o.body}</div>
    ${o.foot?`<div class="modal-foot">${o.foot}</div>`:""}
  </div>`;
  $("#modalRoot").appendChild(el);
  const close=()=>{el.remove();modalStack=modalStack.filter(x=>x.el!==el);};
  modalStack.push({el,close});
  el.addEventListener("click",e=>{if(e.target===el)close();});
  el.querySelector(".mclose").onclick=close;
  el.querySelectorAll("[data-close]").forEach(b=>b.onclick=close);
  return {el,close};
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modalStack.length)modalStack[modalStack.length-1].close();});
function confirmDlg(title,msg,okTxt,danger){
  return new Promise(res=>{
    const m=openModal({title:`${icon("alert")} ${esc(title)}`,body:`<p style="font-size:15px;line-height:1.9">${msg}</p>`,
      foot:`<button class="btn btn-ghost" data-r="0">إلغاء</button><button class="btn ${danger===false?"btn-primary":"btn-dgr"}" data-r="1">${okTxt||"تأكيد الحذف"}</button>`,small:true});
    m.el.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{res(b.dataset.r==="1");m.close();});
  });
}
function askDlg(title,value){
  return new Promise(res=>{
    const m=openModal({title:esc(title),body:`<input id="askInp" class="inp" value="${esc(value||"")}">`,
      foot:`<button class="btn btn-ghost" data-r="0">إلغاء</button><button class="btn btn-primary" data-r="1">حفظ</button>`,small:true});
    const inp=m.el.querySelector("#askInp");inp.focus();inp.select();
    const done=v=>{res(v);m.close();};
    m.el.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>done(b.dataset.r?inp.value.trim():null));
    inp.onkeydown=e=>{if(e.key==="Enter")done(inp.value.trim());};
  });
}

/* ═══ 5) التشفير (مع بديل عند غياب crypto.subtle) ═══ */
function randHex(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return Array.from(a).map(x=>x.toString(16).padStart(2,"0")).join("");}
function hexBuf(h){const a=new Uint8Array(h.length/2);for(let i=0;i<a.length;i++)a[i]=parseInt(h.substr(i*2,2),16);return a;}
function bufHex(b){return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,"0")).join("");}
function simpleHash(input,rounds){
  let s=String(input);
  for(let r=0;r<rounds;r++){
    let h=0x811c9dc5;
    for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}
    s=("00000000"+h.toString(16)).slice(-8)+s.slice(0,23);
  }
  return s.slice(0,64);
}
async function deriveKey(pass,salt,iter){
  if(window.crypto&&crypto.subtle){
    try{
      const km=await crypto.subtle.importKey("raw",new TextEncoder().encode(pass),"PBKDF2",false,["deriveBits"]);
      const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:hexBuf(salt),iterations:iter,hash:"SHA-256"},km,256);
      return bufHex(bits);
    }catch(e){/* ننتقل للبديل */}
  }
  return simpleHash(salt+"|"+pass,Math.min(iter||PBKDF2_ITER,20000));
}

/* ═══ 6) الصور ═══ */
function pickPhoto(file){
  return new Promise((res,rej)=>{
    if(!file||!file.type||file.type.indexOf("image/")!==0)return rej("اختر ملف صورة صحيح");
    const img=new Image();
    img.onload=()=>{
      const S=260,r=Math.min(S/img.width,S/img.height,1);
      const c=document.createElement("canvas");
      c.width=Math.max(1,Math.round(img.width*r));
      c.height=Math.max(1,Math.round(img.height*r));
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);
      res(c.toDataURL("image/jpeg",.82));
      URL.revokeObjectURL(img.src);
    };
    img.onerror=()=>rej("تعذر قراءة الصورة");
    img.src=URL.createObjectURL(file);
  });
}
function avatarHTML(s,size){
  const ph=(s&&s.photo)||"";
  const nm=esc((s&&s.name)||"؟");
  if(ph)return `<img class="avatar ${size||""}" src="${ph}" alt="${nm}" loading="lazy">`;
  const hue=Array.from((s&&s.name)||"x").reduce((a,c)=>a+c.charCodeAt(0),0)%360;
  return `<div class="avatar ${size||""}" style="background:linear-gradient(135deg,hsl(${hue} 70% 90%),hsl(${(hue+40)%360} 70% 80%));color:hsl(${hue} 55% 32%)">${esc(((s&&s.name)||"؟").trim().charAt(0))}</div>`;
}

/* ═══ 7) قاعدة محلية للوضع التجريبي (محاكاة واجهة Firestore) ═══ */
function autoId(){return Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,10);}
function makeLocalDB(){
  const KEY="ibs_local_db_v4";
  let data=null;
  try{data=JSON.parse(localStorage.getItem(KEY)||"null");}catch(e){data=null;}
  if(!data||typeof data!=="object"||Array.isArray(data)){
    data={settings:{},staff:{},contacts:{},accounts:{},loginLogs:{},activityLogs:{}};
  }
  const colL=[],docL=[];
  let pendingCols=null,notifyTimer=null;
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){}};
  const docSnap=(col,id)=>{const v=(data[col]||{})[id];return{id,exists:!!v,data:()=>v?Object.assign({},v):undefined};};
  const wrapDocs=(col,ids)=>ids.map(id=>({id,data:()=>Object.assign({},data[col][id])}));
  const querySnap=(col,docs)=>({docs,size:docs.length,empty:docs.length===0,forEach:cb=>docs.forEach((d,i)=>cb(d,i))});
  function queueCol(col){
    pendingCols=pendingCols||{};
    pendingCols[col]=true;
    if(notifyTimer)return;
    notifyTimer=setTimeout(()=>{
      notifyTimer=null;
      const cols=Object.keys(pendingCols);
      pendingCols=null;
      cols.forEach(c=>colL.forEach(l=>{if(l.col===c)l.fire();}));
    },0);
  }
  function changed(col,path){
    docL.forEach(l=>{if(l.path===path)l.fire();});
    queueCol(col);
  }
  function makeDocRef(col,id){
    const path=col+"/"+id;
    return {
      id,
      get:()=>Promise.resolve(docSnap(col,id)),
      set:(d,opts)=>{
        data[col]=data[col]||{};
        const cur=data[col][id];
        data[col][id]=(opts&&opts.merge&&cur)?Object.assign({},cur,d):Object.assign({},d);
        persist();changed(col,path);
        return Promise.resolve();
      },
      update:(d)=>{
        data[col]=data[col]||{};
        if(!data[col][id])return Promise.reject({code:"not-found",message:"المستند غير موجود"});
        data[col][id]=Object.assign({},data[col][id],d);
        persist();changed(col,path);
        return Promise.resolve();
      },
      "delete":()=>{
        if(data[col]&&data[col][id]){delete data[col][id];persist();changed(col,path);}
        return Promise.resolve();
      },
      onSnapshot(cb){
        const l={path,fire:()=>cb(docSnap(col,id))};
        docL.push(l);
        cb(docSnap(col,id));
        return ()=>{docL.splice(docL.indexOf(l),1);};
      }
    };
  }
  function makeColRef(col){
    const fireAll=cb=>cb(querySnap(col,wrapDocs(col,Object.keys(data[col]||{}))));
    return {
      doc:id=>makeDocRef(col,id||autoId()),
      add:(d)=>{const r=makeDocRef(col,autoId());return r.set(d).then(()=>r);},
      get:()=>Promise.resolve(querySnap(col,wrapDocs(col,Object.keys(data[col]||{})))),
      onSnapshot(cb){
        const l={col,fire:()=>fireAll(cb)};
        colL.push(l);
        fireAll(cb);
        return ()=>{colL.splice(colL.indexOf(l),1);};
      },
      orderBy:(field,dir)=>({
        limit:(n)=>({
          get:()=>{
            const sign=(dir==="desc")?-1:1;
            const ids=Object.keys(data[col]||{});
            ids.sort((a,b)=>{
              const av=(data[col][a]&&data[col][a][field])||0;
              const bv=(data[col][b]&&data[col][b][field])||0;
              return (av<bv?-1:av>bv?1:0)*sign;
            });
            return Promise.resolve(querySnap(col,wrapDocs(col,ids.slice(0,n))));
          }
        })
      })
    };
  }
  return {
    doc:path=>{const i=path.indexOf("/");return makeDocRef(path.slice(0,i),path.slice(i+1));},
    collection:col=>makeColRef(col),
    batch(){
      const ops=[];
      return {
        set:(r,d,o)=>ops.push(()=>r.set(d,o)),
        update:(r,d)=>ops.push(()=>r.update(d)),
        "delete":r=>ops.push(()=>r.delete()),
        commit:()=>{let p=Promise.resolve();ops.forEach(op=>{p=p.then(op);});ops.length=0;return p;}
      };
    },
    _reset:()=>{try{localStorage.removeItem(KEY);localStorage.removeItem("ibs_session");}catch(e){}location.reload();}
  };
}

/* ═══ 8) التشغيل ═══ */
async function init(){
  try{
    $("#year").textContent=String(new Date().getFullYear());
    setupLogos();
    wireStaticUI();
    if(!CONFIG_OK){
      db=makeLocalDB();
      try{await ensureSeed();await seedDemoData();}catch(e){showErrPanel("تعذر تجهيز البيانات التجريبية: "+((e&&e.message)||e));}
      $("#demoBanner").classList.remove("hidden");
      $("#demoHint").classList.remove("hidden");
      listenCore();
      await restoreSession();
      toast("وضع العرض التجريبي — سجّل الدخول: admin / admin123","info");
      return;
    }
    if(typeof firebase==="undefined"){fatal("تعذر تحميل مكتبات Firebase — تحقق من اتصال الإنترنت ثم أعد المحاولة.");return;}
    firebase.initializeApp(FIREBASE_CONFIG);
    db=firebase.firestore();
    await ensureSeed();
    listenCore();
    await restoreSession();
  }catch(e){
    fatal(`خطأ أثناء التشغيل:<br><span class="small">${esc((e&&e.message)||String(e))}</span>`);
  }
}
function listenCore(){
  db.doc("settings/app").onSnapshot(s=>{
    state.settings=Object.assign(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),s.exists?s.data():{});
  },e=>console.warn(e));
  db.collection("staff").onSnapshot(snap=>{
    state.staff=snap.docs.map(d=>Object.assign({id:d.id},d.data()));
    state.staff.sort((a,b)=>String(a.name||"").localeCompare(String(b.name||""),"ar"));
    renderCurrent();
  },e=>{console.error(e);fatal("تعذر قراءة بيانات المنسوبين: "+esc((e&&e.code)||e.message||""));});
}
async function ensureSeed(){
  const sRef=db.doc("settings/app");
  if(!(await sRef.get()).exists)await sRef.set(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));
  const aRef=db.doc("accounts/admin");
  if(!(await aRef.get()).exists){
    const salt=randHex(16);
    const hash=await deriveKey("admin123",salt,PBKDF2_ITER);
    await aRef.set({username:"admin",name:"مدير النظام",hash,salt,iter:PBKDF2_ITER,role:"admin",stages:[],actions:{add:true,edit:true,delete:true,data:true},photo:"",active:true,createdAt:Date.now(),lastLogin:null});
  }
}
async function seedDemoData(){
  const snap=await db.collection("staff").get();
  if(!snap.docs.length){
    for(const row of DEMO_STAFF){
      const ref=db.collection("staff").doc();
      await ref.set({name:row[0],job:row[1],stage:row[2],type:row[3],ts:Date.now(),by:"بيانات تجريبية"});
      await db.doc("contacts/"+ref.id).set({phone:row[4],email:row[5]});
    }
  }
  for(const u of DEMO_USERS){
    if((await db.doc("accounts/"+u.u).get()).exists)continue;
    const salt=randHex(16);
    const hash=await deriveKey(u.p,salt,PBKDF2_ITER);
    await db.doc("accounts/"+u.u).set({username:u.u,name:u.n,hash,salt,iter:PBKDF2_ITER,role:"manager",stages:u.st,actions:u.ac,photo:"",active:true,createdAt:Date.now(),lastLogin:null});
  }
}
function setupLogos(){
  ["pubLogo","loginLogo","sideLogo"].forEach(id=>{
    const img=document.getElementById(id);
    if(!img)return;
    img.src=LOGO_URL;
    img.onerror=()=>{img.style.display="none";const fb=img.parentElement.querySelector(".logo-fb");if(fb)fb.classList.remove("hidden");};
  });
  $("#brandName").textContent=SCHOOL_AR;
  $("#loginSchool").textContent=SCHOOL_AR;
  $("#sideSchool").textContent=SCHOOL_AR;
  $("#footSchool").textContent=SCHOOL_AR+" — "+SCHOOL_EN;
  document.title="دليل منسوبي "+SCHOOL_AR;
}
function fatal(msg){
  let el=$("#fatalBox");
  if(!el){el=document.createElement("div");el.id="fatalBox";el.className="overlay";document.body.appendChild(el);}
  el.classList.remove("hidden");
  el.innerHTML=`<div class="login-card"><span class="logo-fb" style="justify-content:center;margin-bottom:12px"><i></i><i></i><i></i></span>
    <h2>تعذّر تشغيل التطبيق</h2><p class="lg-sub">${msg}</p>
    <button class="btn btn-primary btn-block" onclick="location.reload()">إعادة المحاولة</button></div>`;
}

/* ═══ 9) الدخول والخروج ═══ */
function saveSession(u,logId){try{localStorage.setItem("ibs_session",JSON.stringify({u,logId,exp:Date.now()+SESSION_HOURS*3600000}));}catch(e){}}
async function restoreSession(){
  try{
    const s=JSON.parse(localStorage.getItem("ibs_session")||"null");
    if(!s||s.exp<Date.now())return;
    const snap=await db.doc("accounts/"+s.u).get();
    if(!snap.exists){localStorage.removeItem("ibs_session");return;}
    const acc=snap.data();
    if(acc.active===false){localStorage.removeItem("ibs_session");return;}
    state.user=Object.assign({},acc,{username:s.u});
    state.logId=s.logId;
    enterApp();
  }catch(e){console.warn(e);}
}
async function doLogin(u,p){
  u=(u||"").trim().toLowerCase();
  const btn=$("#loginSubmit");
  btn.disabled=true;btn.textContent="جارٍ التحقق...";
  try{
    const snap=await db.doc("accounts/"+u).get();
    if(!snap.exists)throw new Error("اسم المستخدم غير موجود");
    const acc=snap.data();
    if(acc.active===false)throw new Error("هذا الحساب موقوف — تواصل مع مدير النظام");
    const hash=await deriveKey(p,acc.salt,acc.iter||PBKDF2_ITER);
    if(hash!==acc.hash)throw new Error("كلمة المرور غير صحيحة");
    const now=Date.now();
    const logRef=db.collection("loginLogs").doc();
    await logRef.set({u,n:acc.name,in:now,out:null,dev:navigator.userAgent.slice(0,140)});
    await db.doc("accounts/"+u).update({lastLogin:now});
    state.user=Object.assign({},acc,{username:u});
    state.logId=logRef.id;
    saveSession(u,logRef.id);
    closeLogin();enterApp();
    toast("مرحباً "+acc.name,"ok");
  }catch(e){
    const el=$("#loginErr");
    el.textContent=e.message;
    el.classList.remove("hidden");
  }finally{
    btn.disabled=false;
    btn.innerHTML=icon("lock")+" دخول";
  }
}
function enterApp(){
  $("#view-public").classList.add("hidden");
  $("#view-app").classList.remove("hidden");
  if(!unsubC){
    unsubC=db.collection("contacts").onSnapshot(s=>{
      state.contacts={};
      s.forEach(d=>{state.contacts[d.id]=d.data()||{};});
      renderCurrent();
    });
  }
  go("dashboard");
}
async function logout(){
  try{if(state.logId)await db.doc("loginLogs/"+state.logId).update({out:Date.now()});}catch(e){}
  try{localStorage.removeItem("ibs_session");}catch(e){}
  state.user=null;state.logId=null;
  if(unsubC){unsubC();unsubC=null;}
  state.contacts={};
  closeDrawer();
  $("#view-app").classList.add("hidden");
  $("#view-public").classList.remove("hidden");
  buildPublicFilters();
  renderPublicGrid();
  toast("تم تسجيل الخروج","info");
}
window.addEventListener("pagehide",()=>{if(state.logId){try{db.doc("loginLogs/"+state.logId).update({out:Date.now()});}catch(e){}}});

/* ═══ 10) الصلاحيات والتنقل ═══ */
function isAdmin(){return !!state.user&&state.user.role==="admin";}
function myStages(){if(!state.user)return[];if(isAdmin())return ALL_STAGE_KEYS;return (state.user.stages||[]).filter(k=>STAGES[k]);}
function can(action){return !!state.user&&(isAdmin()||!!(state.user.actions||{})[action]);}
function inScope(s){return myStages().indexOf(s.stage)>-1;}
const NAV=[
  {id:"dashboard",t:"لوحة المعلومات",i:"home",all:true},
  {id:"staff",t:"المنسوبون",i:"users",all:true},
  {id:"data",t:"البيانات والتقارير",i:"db",perm:"data"},
  {id:"users",t:"المستخدمون والصلاحيات",i:"shield",admin:true},
  {id:"logs",t:"سجل الدخول والعمليات",i:"list",admin:true},
  {id:"jobs",t:"إعدادات الوظائف",i:"gear",admin:true},
  {id:"profile",t:"ملفي الشخصي",i:"id",all:true}
];
function buildNav(){
  const nav=$("#sideNav");
  nav.innerHTML="";
  NAV.forEach(n=>{
    if(n.admin&&!isAdmin())return;
    if(n.perm&&!can(n.perm))return;
    const b=document.createElement("button");
    b.className="slink"+(state.page===n.id?" on":"");
    b.innerHTML=`${icon(n.i)}<span>${n.t}</span>`;
    b.onclick=()=>{go(n.id);closeDrawer();};
    nav.appendChild(b);
  });
}
function go(page){
  state.page=page;
  $$(".pg").forEach(p=>p.classList.add("hidden"));
  const el=$("#page-"+page);
  if(el)el.classList.remove("hidden");
  const meta=NAV.find(n=>n.id===page);
  $("#pageTitle").textContent=meta?meta.t:"";
  buildNav();
  renderUserChip();
  const fn={dashboard:renderDashboard,staff:renderStaffPage,data:renderDataPage,users:renderUsersPage,logs:renderLogsPage,jobs:renderJobsPage,profile:renderProfilePage}[page];
  if(fn)fn();
  window.scrollTo({top:0});
}
function renderCurrent(){
  if(!$("#view-public").classList.contains("hidden"))renderPublicGrid();
  if(!$("#view-app").classList.contains("hidden")){
    if(state.page==="staff")renderStaffList();
    if(state.page==="dashboard")renderDashboard();
  }
}
function renderUserChip(){
  const u=state.user;
  if(!u||!$("#userChip"))return;
  $("#userChip").innerHTML=`${avatarHTML(u,"sm")}<div class="uc-t"><b>${esc(u.name)}</b><small>${u.role==="admin"?"مدير النظام":"مدير قسم"}</small></div>`;
}

/* ═══ 11) الواجهة العامة ═══ */
function wireStaticUI(){
  $("#btnOpenLogin").onclick=openLoginModal;
  $("#loginClose").onclick=closeLogin;
  $("#loginOverlay").addEventListener("click",e=>{if(e.target.id==="loginOverlay")closeLogin();});
  $("#loginForm").onsubmit=e=>{e.preventDefault();$("#loginErr").classList.add("hidden");doLogin($("#loginUser").value,$("#loginPass").value);};
  $("#pwEye").onclick=()=>{const p=$("#loginPass"),show=p.type==="password";p.type=show?"text":"password";$("#pwEye").innerHTML=icon(show?"eyeoff":"eye");};
  $("#btnLogout").onclick=logout;
  $("#btnBurger").onclick=()=>{$("#sidebar").classList.add("open");$("#sideBack").classList.remove("hidden");};
  $("#sideBack").onclick=closeDrawer;
  $("#userChip").onclick=()=>go("profile");
  $("#demoReset").onclick=()=>{if(db&&db._reset)db._reset();};
  $("#demoHelp").onclick=()=>{
    openModal({title:`${icon("db")} ربط الموقع بقاعدة Firebase حقيقية`,body:`<ol class="notes">
      <li>أنشئ مشروعاً جديداً في <b>console.firebase.google.com</b></li>
      <li>فعّل <b>Firestore Database</b> من Build ← Firestore ← Create Database</li>
      <li>من تبويب Rules الصق قاعدة السماح ثم Publish</li>
      <li>من ⚙️ Project settings ← Your apps ← أيقونة الويب انسخ firebaseConfig</li>
      <li>افتح ملف <b>app.js</b> والصق القيم مكان الفراغات في FIREBASE_CONFIG أعلى الملف</li>
      <li>ارفع المجلد على Firebase Hosting أو Netlify — سيتحول الموقع تلقائياً للقاعدة المشتركة</li></ol>`,
      foot:`<button class="btn btn-primary" data-close>فهمت</button>`});
  };
  $$("#demoHint .chip").forEach(b=>b.onclick=()=>{$("#loginUser").value=b.dataset.u;$("#loginPass").value=b.dataset.p;});
  const onPub=debounce(v=>{state.pf.q=v.trim();publicLimit=60;renderPublicGrid();},180);
  $("#pubSearch").addEventListener("input",function(){
    $("#pubClear").classList.toggle("hidden",!this.value);
    onPub(this.value);
  });
  $("#pubClear").onclick=()=>{$("#pubSearch").value="";state.pf.q="";$("#pubClear").classList.add("hidden");publicLimit=60;renderPublicGrid();};
  $("#pubType").onchange=e=>{state.pf.type=e.target.value;publicLimit=60;renderPublicGrid();};
  $("#publicMore").onclick=()=>{publicLimit+=60;renderPublicGrid(true);};
  $("#publicGrid").addEventListener("click",e=>{if(e.target.closest(".locked"))openLoginModal();});
  buildPublicFilters();
}
function closeDrawer(){$("#sidebar").classList.remove("open");$("#sideBack").classList.add("hidden");}
function openLoginModal(){$("#loginOverlay").classList.remove("hidden");$("#loginUser").focus();}
function closeLogin(){$("#loginOverlay").classList.add("hidden");$("#loginForm").reset();$("#loginErr").classList.add("hidden");}
function buildPublicFilters(){
  const sp=$("#pubSectionPills");
  sp.innerHTML=`<button class="pill ${state.pf.sec==="all"?"on":""}" data-sec="all">الكل</button>`+
    Object.keys(SECTIONS).map(k=>`<button class="pill ${state.pf.sec===k?"on":""}" data-sec="${k}">${SECTIONS[k].name}</button>`).join("");
  sp.onclick=e=>{const b=e.target.closest(".pill");if(!b)return;state.pf.sec=b.dataset.sec;state.pf.stage="all";publicLimit=60;buildPublicFilters();renderPublicGrid();};
  const el=$("#pubStagePills");
  if(state.pf.sec==="all"){el.innerHTML="";el.classList.add("hidden");return;}
  el.classList.remove("hidden");
  const sec=SECTIONS[state.pf.sec];
  el.innerHTML=`<button class="pill ${state.pf.stage==="all"?"on":""}" data-st="all">كل المراحل</button>`+
    sec.stages.map(k=>`<button class="pill ${state.pf.stage===k?"on":""}" data-st="${k}">${STAGES[k].short}</button>`).join("");
  el.onclick=e=>{const b=e.target.closest(".pill");if(!b)return;state.pf.stage=b.dataset.st;publicLimit=60;buildPublicFilters();renderPublicGrid();};
}
function publicFiltered(){
  const pf=state.pf,ql=norm(pf.q);
  return state.staff.filter(s=>{
    const st=STAGES[s.stage]||{};
    if(pf.sec!=="all"&&st.sec!==pf.sec)return false;
    if(pf.stage!=="all"&&s.stage!==pf.stage)return false;
    if(pf.type!=="all"&&s.type!==pf.type)return false;
    if(pf.q){
      const hay=norm([s.name,s.job,st.name,st.short,(TYPES[s.type]||{}).name].join(" "));
      if(hay.indexOf(ql)<0)return false;
    }
    return true;
  });
}
function renderPublicStats(){
  const c=k=>state.staff.filter(s=>(STAGES[s.stage]||{}).sec===k).length;
  $("#pubStats").innerHTML=`<span class="hstat">${icon("users")} ${state.staff.length} منسوباً</span>
    <span class="hstat">${icon("shield")} الإدارة العامة ${c("general")}</span>
    <span class="hstat">${icon("users")} قسم البنين ${c("boys")}</span>
    <span class="hstat">${icon("users")} قسم البنات ${c("girls")}</span>`;
}
function renderPublicGrid(keep){
  if(!keep)publicLimit=60;
  renderPublicStats();
  const list=publicFiltered();
  $("#publicGrid").innerHTML=list.slice(0,publicLimit).map(s=>staffCard(s,"public")).join("");
  $("#publicCount").textContent=list.length?list.length+" منسوباً":"";
  $("#publicEmpty").classList.toggle("hidden",list.length>0);
  const more=$("#publicMore");
  more.classList.toggle("hidden",list.length<=publicLimit);
  if(list.length>publicLimit)more.textContent=`عرض المزيد (${list.length-publicLimit} متبقٍ)`;
}

/* ═══ 12) كارت المنسوب ═══ */
function waLink(p){
  let d=String(p).replace(/\D/g,"");
  if(d.indexOf("00")===0)d=d.slice(2);
  if(d.indexOf("0")===0)d="966"+d.slice(1);
  if(d.length===9&&d.indexOf("5")===0)d="966"+d;
  return "https://wa.me/"+d;
}
function copyTxt(t,label){
  const done=()=>toast("تم نسخ "+label,"ok");
  const fail=()=>toast("تعذر النسخ","err");
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fail);return;}
  try{
    const ta=document.createElement("textarea");
    ta.value=t;ta.style.position="fixed";ta.style.opacity="0";
    document.body.appendChild(ta);ta.select();
    const ok=document.execCommand("copy");
    ta.remove();
    ok?done():fail();
  }catch(e){fail();}
}
function staffCard(s,mode){
  const st=STAGES[s.stage]||{};
  const sc=(SECTIONS[st.sec]||{}).color||"#F97316";
  let acts="";
  if(mode==="app"&&inScope(s)&&(can("edit")||can("delete"))){
    acts=`<div class="scard-acts">
      ${can("edit")?`<button class="icon-btn" title="تعديل" onclick="editStaff('${s.id}')">${icon("edit")}</button>`:""}
      ${can("delete")?`<button class="icon-btn danger" title="حذف" onclick="delStaff('${s.id}')">${icon("trash")}</button>`:""}
    </div>`;
  }
  let contact="";
  if(mode==="app"){
    const c=state.contacts[s.id]||{};
    const phone=String(c.phone||"").trim();
    const email=String(c.email||"").trim();
    const digits=phone.replace(/[^\d+]/g,"");
    let btns="";
    if(phone){
      btns+=`<a class="cbtn" href="tel:${digits}">${icon("phone")}<span>اتصال</span></a>
        <a class="cbtn" href="${waLink(phone)}" target="_blank" rel="noopener">${icon("chat")}<span>واتساب</span></a>
        <button class="cbtn" onclick="copyTxt('${digits}','رقم الجوال')">${icon("copy")}<span>نسخ</span></button>`;
    }
    if(email)btns+=`<a class="cbtn" href="mailto:${esc(email)}">${icon("mail")}<span>بريد</span></a>`;
    contact=((phone||email)
      ?`<div class="phone-line">${icon("phone")}<bdi>${esc(phone||"—")}</bdi>${email?`<a class="mail-mini" href="mailto:${esc(email)}" title="${esc(email)}">${icon("mail")}</a>`:""}</div>`
      :`<div class="phone-line muted">لا توجد بيانات تواصل</div>`)
      +(btns?`<div class="contact">${btns}</div>`:"");
  }else{
    contact=`<div class="locked">${icon("lock")} بيانات التواصل متاحة للمسجّلين — اضغط لتسجيل الدخول</div>`;
  }
  return `<article class="scard" style="--sc:${sc}">
    <div class="scard-head">${avatarHTML(s)}
      <div class="sc-t"><h4>${esc(s.name||"بدون اسم")}</h4><div class="scard-job">${esc(s.job||"")}</div></div>${acts}</div>
    <div class="badges">
      <span class="bdg" style="color:${sc};background:${hexToRgba(sc,.1)}">${esc(st.short||"")}</span>
      <span class="bdg" style="color:#78716C;background:#F5F5F4">${esc((TYPES[s.type]||{}).name||"")}</span>
    </div>${contact}</article>`;
}
function editStaff(id){openStaffModal(id);}
async function delStaff(id){
  const s=state.staff.find(x=>x.id===id);
  if(!s)return;
  if(!can("delete")||!inScope(s))return toast("لا تملك صلاحية الحذف هنا","err");
  if(!await confirmDlg("حذف منسوب",`هل تريد حذف <b>${esc(s.name)}</b> نهائياً؟ لا يمكن التراجع.`))return;
  try{
    const b=db.batch();
    b.delete(db.doc("staff/"+id));
    b.delete(db.doc("contacts/"+id));
    await b.commit();
    logAct("حذف منسوب",s.name);
    toast("تم الحذف","ok");
  }catch(e){toastErr(e);}
}
function logAct(a,t){
  if(!state.user)return;
  db.collection("activityLogs").add({u:state.user.username,n:state.user.name,a,t:t||"",at:Date.now()}).catch(()=>{});
}

/* ═══ 13) صفحة المنسوبين ═══ */
function renderStaffPage(){
  const el=$("#page-staff");
  if(!staffPageBuilt){
    staffPageBuilt=true;
    el.innerHTML=`
    <div class="toolbar-app">
      <div class="search-wrap">${icon("search")}
        <input id="appSearch" class="inp" placeholder="ابحث بالاسم أو الوظيفة أو الجوال أو البريد...">
        <button class="xclear hidden" id="appClear" aria-label="مسح">✕</button></div>
      <div class="pills" id="appSecPills"></div>
      <div class="pills hidden" id="appStgPills"></div>
      <select id="appType" class="inp sel-sm" aria-label="نوع الكادر">
        <option value="all">كل الكوادر</option><option value="teaching">كادر تعليمي</option>
        <option value="admin">كادر إداري</option><option value="general">إدارة عامة</option>
      </select>
      <div class="tb-end">
        <div class="seg">
          <button class="seg-b on" data-vm="cards" title="عرض بطاقات">${icon("grid")}</button>
          <button class="seg-b" data-vm="table" title="عرض جدول">${icon("table")}</button>
        </div>
        <button class="btn btn-primary btn-sm" id="btnAddStaff">${icon("plus")} إضافة منسوب</button>
      </div>
    </div>
    <div class="list-meta"><span id="appCount"></span><span class="muted small">تحديث لحظي من قاعدة البيانات</span></div>
    <div id="appStaffWrap"></div>`;
    const onApp=debounce(v=>{state.af.q=v.trim();renderStaffList();},180);
    $("#appSearch").addEventListener("input",function(){
      $("#appClear").classList.toggle("hidden",!this.value);
      onApp(this.value);
    });
    $("#appClear").onclick=()=>{$("#appSearch").value="";state.af.q="";$("#appClear").classList.add("hidden");renderStaffList();};
    $("#appType").onchange=e=>{state.af.type=e.target.value;renderStaffList();};
    $$(".seg-b[data-vm]").forEach(b=>b.onclick=()=>{
      state.viewMode=b.dataset.vm;
      $$(".seg-b[data-vm]").forEach(x=>x.classList.toggle("on",x===b));
      renderStaffList();
    });
    $("#btnAddStaff").onclick=()=>openStaffModal();
  }
  $("#btnAddStaff").classList.toggle("hidden",!can("add"));
  $("#appType").value=state.af.type||"all";
  buildAppFilters();
  renderStaffList();
}
function buildAppFilters(){
  const my=myStages();
  const secs=Object.keys(SECTIONS).filter(k=>SECTIONS[k].stages.some(st=>my.indexOf(st)>-1));
  if(state.af.sec!=="all"&&secs.indexOf(state.af.sec)<0)state.af.sec="all";
  if(state.af.stage!=="all"&&my.indexOf(state.af.stage)<0)state.af.stage="all";
  if(state.af.sec!=="all"&&STAGES[state.af.stage]&&STAGES[state.af.stage].sec!==state.af.sec)state.af.stage="all";
  const sp=$("#appSecPills");
  sp.innerHTML=(secs.length>1?`<button class="pill ${state.af.sec==="all"?"on":""}" data-sec="all">الكل</button>`:"")+
    secs.map(k=>`<button class="pill ${state.af.sec===k?"on":""}" data-sec="${k}">${SECTIONS[k].name}</button>`).join("");
  sp.onclick=e=>{const b=e.target.closest(".pill");if(!b)return;state.af.sec=b.dataset.sec;state.af.stage="all";buildAppFilters();renderStaffList();};
  const stg=$("#appStgPills");
  if(state.af.sec==="all"){stg.innerHTML="";stg.classList.add("hidden");}
  else{
    stg.classList.remove("hidden");
    const sec=SECTIONS[state.af.sec];
    stg.innerHTML=`<button class="pill ${state.af.stage==="all"?"on":""}" data-st="all">كل المراحل</button>`+
      sec.stages.filter(k=>my.indexOf(k)>-1).map(k=>`<button class="pill ${state.af.stage===k?"on":""}" data-st="${k}">${STAGES[k].short}</button>`).join("");
    stg.onclick=e=>{const b=e.target.closest(".pill");if(!b)return;state.af.stage=b.dataset.st;buildAppFilters();renderStaffList();};
  }
}
function applyAppFilters(s){
  const af=state.af,st=STAGES[s.stage]||{};
  if(af.sec!=="all"&&st.sec!==af.sec)return false;
  if(af.stage!=="all"&&s.stage!==af.stage)return false;
  if(af.type!=="all"&&s.type!==af.type)return false;
  if(af.q){
    const c=state.contacts[s.id]||{};
    const hay=norm([s.name,s.job,st.name,(TYPES[s.type]||{}).name,c.phone,c.email].join(" "));
    if(hay.indexOf(norm(af.q))<0)return false;
  }
  return true;
}
function renderStaffList(){
  const wrap=$("#appStaffWrap");
  if(!wrap)return;
  const list=state.staff.filter(inScope).filter(applyAppFilters);
  $("#appCount").textContent=list.length+" منسوباً";
  if(!list.length){
    wrap.innerHTML=`<div class="empty">${icon("users")}<h4>لا توجد نتائج</h4><p>جرّب تعديل البحث أو الفلاتر${can("add")?"، أو أضف منسوباً جديداً":""}.</p></div>`;
    return;
  }
  wrap.innerHTML=(state.viewMode==="cards")
    ?`<div class="grid">${list.map(s=>staffCard(s,"app")).join("")}</div>`
    :staffTableHTML(list);
}
function staffTableHTML(list){
  const canActs=can("edit")||can("delete");
  return `<div class="tblwrap"><table class="tbl"><thead><tr>
    <th>المنسوب</th><th>الوظيفة</th><th>المرحلة</th><th>الكادر</th><th>الجوال</th><th>البريد</th>${canActs?"<th></th>":""}
  </tr></thead><tbody>${list.map(s=>{
    const st=STAGES[s.stage]||{};
    const sc=(SECTIONS[st.sec]||{}).color||"#F97316";
    const c=state.contacts[s.id]||{};
    const acts=(inScope(s)&&canActs)?`<div class="row-acts">
      ${can("edit")?`<button class="icon-btn" onclick="editStaff('${s.id}')" title="تعديل">${icon("edit")}</button>`:""}
      ${can("delete")?`<button class="icon-btn danger" onclick="delStaff('${s.id}')" title="حذف">${icon("trash")}</button>`:""}
    </div>`:"";
    return `<tr>
      <td><div class="ucell">${avatarHTML(s,"sm")}<b>${esc(s.name)}</b></div></td>
      <td>${esc(s.job||"")}</td>
      <td><span class="bdg" style="color:${sc};background:${hexToRgba(sc,.1)}">${esc(st.short||"")}</span></td>
      <td>${esc((TYPES[s.type]||{}).name||"")}</td>
      <td class="ltr">${c.phone?`<a class="tel-link" href="tel:${esc(String(c.phone).replace(/[^\d+]/g,""))}">${esc(c.phone)}</a>`:'<span class="muted">—</span>'}</td>
      <td class="ltr small">${c.email?`<a class="tel-link" href="mailto:${esc(c.email)}">${esc(c.email)}</a>`:'<span class="muted">—</span>'}</td>
      ${canActs?`<td>${acts}</td>`:""}</tr>`;
  }).join("")}</tbody></table></div>`;
}

/* ═══ 14) إضافة / تعديل منسوب ═══ */
async function openStaffModal(id){
  if(id&&!can("edit"))return toast("لا تملك صلاحية التعديل","err");
  if(!id&&!can("add"))return toast("لا تملك صلاحية الإضافة","err");
  const s=id?state.staff.find(x=>x.id===id):null;
  const c=id?(state.contacts[id]||{}):{};
  const my=myStages();
  const secs=Object.keys(SECTIONS).filter(k=>SECTIONS[k].stages.some(st=>my.indexOf(st)>-1));
  if(!secs.length)return toast("لا توجد مراحل ضمن صلاحيتك","err");
  const m=openModal({
    title:`${icon(id?"edit":"plus")} ${id?"تعديل بيانات منسوب":"إضافة منسوب جديد"}`,
    body:`<form class="form-grid" onsubmit="return false">
      <div class="field full"><label>الصورة الشخصية (اختياري)</label>
        <div class="photo-pick">
          <div id="pvAvatar">${avatarHTML(s||{name:"؟"})}</div>
          <div class="pp-btns">
            <label class="btn btn-soft btn-sm">${icon("cam")} اختيار صورة<input type="file" id="fPhoto" accept="image/*" class="hidden-file"></label>
            <button type="button" class="btn btn-ghost btn-sm" id="pvRemove">إزالة الصورة</button>
          </div>
          <small class="hint">تُصغَّر وتُخزَّن تلقائياً</small>
        </div></div>
      <div class="field"><label>الاسم الكامل <span class="req">*</span></label><input id="fName" class="inp" required value="${esc(s?s.name:"")}"></div>
      <div class="field"><label>القسم <span class="req">*</span></label>
        <select id="fSec" class="inp">${secs.map(k=>`<option value="${k}">${SECTIONS[k].name}</option>`).join("")}</select></div>
      <div class="field"><label>المرحلة <span class="req">*</span></label><select id="fStage" class="inp"></select></div>
      <div class="field"><label>نوع الكادر <span class="req">*</span></label><select id="fType" class="inp"></select></div>
      <div class="field"><label id="fJobLabel">الوظيفة / التخصص <span class="req">*</span></label>
        <input id="fJob" class="inp" list="fJobList" required value="${esc(s?s.job:"")}"><datalist id="fJobList"></datalist></div>
      <div class="field"><label>رقم الجوال <span class="req">*</span></label><input id="fPhone" class="inp ltr" inputmode="tel" placeholder="05XXXXXXXX" value="${esc(c.phone||"")}"></div>
      <div class="field"><label>البريد الإلكتروني</label><input id="fEmail" class="inp ltr" inputmode="email" placeholder="name@school.edu" value="${esc(c.email||"")}"></div>
    </form>`,
    foot:`<button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-primary" data-a="save">${icon("check")} حفظ البيانات</button>`
  });
  let photo=(s&&s.photo)||"";
  const secSel=m.el.querySelector("#fSec"),stgSel=m.el.querySelector("#fStage"),typeSel=m.el.querySelector("#fType"),
        jobInp=m.el.querySelector("#fJob"),jobList=m.el.querySelector("#fJobList");
  if(s&&STAGES[s.stage]&&secs.indexOf(STAGES[s.stage].sec)>-1)secSel.value=STAGES[s.stage].sec;
  function fillStages(){
    const opts=SECTIONS[secSel.value].stages.filter(k=>my.indexOf(k)>-1);
    stgSel.innerHTML=opts.map(k=>`<option value="${k}">${STAGES[k].name}</option>`).join("");
    if(s&&STAGES[s.stage]&&STAGES[s.stage].sec===secSel.value&&my.indexOf(s.stage)>-1)stgSel.value=s.stage;
    fillTypes();
  }
  function fillTypes(){
    const g=(secSel.value==="general");
    typeSel.innerHTML=g?'<option value="general">إدارة عامة</option>':'<option value="teaching">كادر تعليمي</option><option value="admin">كادر إداري</option>';
    if(s&&STAGES[s.stage]&&STAGES[s.stage].sec===secSel.value)typeSel.value=s.type;
    fillJobs();
  }
  function fillJobs(){
    const t=typeSel.value,set=state.settings||DEFAULT_SETTINGS;
    const list=(t==="general")?set.generalJobs:(t==="admin"?set.adminJobs:set.specialties);
    jobList.innerHTML=(list||[]).map(j=>`<option value="${esc(j)}">`).join("");
    m.el.querySelector("#fJobLabel").innerHTML=(t==="teaching"?"التخصص التعليمي":t==="admin"?"الوظيفة الإدارية":"الوظيفة")+' <span class="req">*</span>';
  }
  secSel.onchange=fillStages;
  typeSel.onchange=fillJobs;
  fillStages();
  m.el.querySelector("#fPhoto").onchange=async e=>{
    const f=e.target.files[0];
    if(!f)return;
    try{photo=await pickPhoto(f);m.el.querySelector("#pvAvatar").innerHTML=`<img class="avatar" src="${photo}" alt="">`;}
    catch(err){toast(String(err),"err");}
  };
  m.el.querySelector("#pvRemove").onclick=()=>{
    photo="";
    m.el.querySelector("#pvAvatar").innerHTML=avatarHTML({name:m.el.querySelector("#fName").value||"؟"});
  };
  m.el.querySelector('[data-a="save"]').onclick=async ev=>{
    const b=ev.currentTarget;
    const name=m.el.querySelector("#fName").value.trim();
    const job=jobInp.value.trim();
    const stage=stgSel.value,type=typeSel.value;
    const phone=m.el.querySelector("#fPhone").value.trim();
    const email=m.el.querySelector("#fEmail").value.trim();
    if(!name||!job||!stage)return toast("أكمل الحقول المطلوبة","err");
    if(!validPhone(phone))return toast("رقم الجوال غير صالح (مثال: 05XXXXXXXX)","err");
    if(email&&!validEmail(email))return toast("البريد الإلكتروني غير صالح","err");
    if(myStages().indexOf(stage)<0)return toast("لا تملك صلاحية على هذه المرحلة","err");
    b.disabled=true;
    try{
      await saveStaff(id,{name,job,stage,type,photo},phone,email);
      toast(id?"تم تحديث البيانات بنجاح":"تمت إضافة المنسوب بنجاح","ok");
      m.close();
    }catch(e){toastErr(e);b.disabled=false;}
  };
}
async function saveStaff(id,core,phone,email){
  const b=db.batch();
  const ref=id?db.doc("staff/"+id):db.collection("staff").doc();
  b.set(ref,Object.assign({},core,{ts:Date.now(),by:(state.user&&state.user.name)||""}),{merge:!!id});
  const cref=db.doc("contacts/"+ref.id);
  const contact={};
  if(phone)contact.phone=phone;
  if(email)contact.email=email;
  if(Object.keys(contact).length)b.set(cref,contact);
  else if(id)b.delete(cref);
  await b.commit();
  logAct(id?"تعديل منسوب":"إضافة منسوب",core.name);
}

/* ═══ 15) لوحة المعلومات ═══ */
function renderDashboard(){
  const el=$("#page-dashboard");
  if(!state.user)return;
  const scoped=state.staff.filter(inScope);
  const cnt={teaching:0,admin:0,general:0};
  scoped.forEach(s=>{cnt[s.type]=(cnt[s.type]||0)+1;});
  const perStage=myStages().map(k=>({k,n:scoped.filter(s=>s.stage===k).length}));
  const max=perStage.reduce((a,p)=>Math.max(a,p.n),0)||1;
  el.innerHTML=`
  <div class="stats">
    <div class="stat"><div class="sicon">${icon("users")}</div><div><b>${scoped.length}</b><span>إجمالي المنسوبين (نطاقك)</span></div></div>
    <div class="stat"><div class="sicon" style="background:#E8F6F9;color:#0E7490">${icon("id")}</div><div><b>${cnt.teaching||0}</b><span>كادر تعليمي</span></div></div>
    <div class="stat"><div class="sicon" style="background:#FCE9F2;color:#BE185D">${icon("shield")}</div><div><b>${cnt.admin||0}</b><span>كادر إداري</span></div></div>
    <div class="stat"><div class="sicon" style="background:#FEF3C7;color:#B45309">${icon("home")}</div><div><b>${cnt.general||0}</b><span>إدارة عامة</span></div></div>
  </div>
  <div class="panel"><h3>${icon("chart")} التوزيع حسب المرحلة</h3>
    <div class="bars">${perStage.map(p=>{
      const col=(SECTIONS[STAGES[p.k].sec]||{}).color||"#F97316";
      return `<div class="bar-row"><span>${STAGES[p.k].name}</span><div class="bar"><i style="width:${Math.round(p.n/max*100)}%;background:${col}"></i></div><b>${p.n}</b></div>`;
    }).join("")}</div></div>
  ${isAdmin()?`<div class="panel" id="dashLogins"><h3>${icon("clock")} آخر عمليات الدخول</h3><div class="mini-loading">جارٍ التحميل...</div></div>`:""}
  <div class="panel"><h3>${icon("check")} إجراءات سريعة</h3>
    <div class="quick-row">
      ${can("add")?`<button class="btn btn-soft" onclick="openStaffModal()">${icon("plus")} إضافة منسوب</button>`:""}
      <button class="btn btn-soft" onclick="go('staff')">${icon("users")} إدارة المنسوبين</button>
      ${can("data")?`<button class="btn btn-soft" onclick="go('data')">${icon("db")} الاستيراد والتصدير والتقارير</button>`:""}
    </div></div>`;
  if(isAdmin())loadRecentLogins();
}
async function loadRecentLogins(){
  try{
    const q=await db.collection("loginLogs").orderBy("in","desc").limit(6).get();
    const box=$("#dashLogins");
    if(!box)return;
    const rows=q.docs.map(d=>d.data());
    box.innerHTML=`<h3>${icon("clock")} آخر عمليات الدخول</h3><div class="minilist">${
      rows.map(r=>`<div class="mini-row"><b>${esc(r.n||r.u||"")}</b><span>${fmtDT(r.in)}</span></div>`).join("")||'<div class="mini-row">لا سجلات بعد</div>'}</div>`;
  }catch(e){console.warn(e);}
}

/* ═══ 16) الاستيراد / التصدير / التقارير ═══ */
function renderDataPage(){
  const el=$("#page-data");
  if(!can("data")){el.innerHTML=emptyPerm();return;}
  el.innerHTML=`
  <div class="data-grid">
    <div class="panel dc"><div class="dc-ic">${icon("dl")}</div><h3>قالب الاستيراد المعتمد</h3>
      <p>حمّل القالب الرسمي (Excel) واملأه ببيانات المنسوبين ثم استورده. لا تغيّر أسماء الأعمدة، والقيم المسموحة في ورقة "الدليل".</p>
      <button class="btn btn-ghost" onclick="downloadTemplate()">${icon("dl")} تحميل القالب (xlsx)</button></div>
    <div class="panel dc"><div class="dc-ic">${icon("ul")}</div><h3>استيراد بيانات المنسوبين</h3>
      <p>استورد ملف Excel/CSV ضمن نطاق صلاحيتك، مع معاينة وتدقيق تلقائي قبل الحفظ. مطابقة الجوال تُحدّث السجل الموجود بدل تكراره.</p>
      <label class="btn btn-primary">${icon("ul")} اختيار ملف واستيراد<input type="file" id="impFile" accept=".xlsx,.xls,.csv" class="hidden-file"></label></div>
    <div class="panel dc"><div class="dc-ic">${icon("file")}</div><h3>تصدير Excel</h3>
      <p>صدّر بيانات المنسوبين مع أرقام التواصل إلى ملف Excel منسّق (يصلح كنسخة احتياطية).</p>
      <div class="dc-btns">
        <select id="expScope" class="inp sel-sm">
          <option value="mine">نطاق صلاحيتي</option>
          <option value="filtered">نتيجة البحث/الفلاتر الحالية</option>
          ${isAdmin()?'<option value="all">جميع منسوبي المدرسة</option>':""}
        </select>
        <button class="btn btn-ghost" onclick="exportExcel()">${icon("dl")} تصدير</button>
      </div></div>
    <div class="panel dc"><div class="dc-ic">${icon("print")}</div><h3>تقارير PDF والطباعة</h3>
      <p>أنشئ تقريراً رسمياً مخصّصاً (النطاق والأعمدة) بتنسيق A4 متعدد الصفحات، وصدّره PDF أو اطبعه مباشرة.</p>
      <button class="btn btn-primary" onclick="openReportBuilder()">${icon("file")} إنشاء تقرير</button></div>
  </div>
  <div class="panel"><h3>${icon("alert")} ملاحظات مهمة</h3>
    <ul class="notes">
      <li>الاستيراد يضيف الجدد، ويُحدّث من يطابق رقمُ جواله سجلاً قائماً.</li>
      <li>يُنصح بتصدير "جميع المنسوبين" شهرياً والاحتفاظ به كنسخة احتياطية.</li>
      <li>كل عمليات الاستيراد والتصدير تُسجَّل في "سجل العمليات" باسم المستخدم.</li>
    </ul></div>`;
  $("#impFile").onchange=e=>{const f=e.target.files[0];if(f)importFile(f);e.target.value="";};
}
const IMP_HEADERS=["الاسم الكامل","الوظيفة / التخصص","القسم","المرحلة","نوع الكادر","رقم الجوال","البريد الإلكتروني"];
function currentExportList(scope){
  if(scope==="all"&&isAdmin())return state.staff;
  if(scope==="filtered")return state.staff.filter(inScope).filter(applyAppFilters);
  return state.staff.filter(inScope);
}
async function downloadTemplate(){
  try{
    await needLib("xlsx");
    const ex=[
      ["أحمد محمد العلي","معلم رياضيات","بنين","الصفوف الأولية","تعليمي","0551234567","a.ahmed@school.edu"],
      ["نورة سعد الغامدي","وكيل شؤون الطلاب","بنات","المتوسط والثانوي","إداري","0557654321","n.saad@school.edu"],
      ["خالد العمري","محاسب","الإدارة العامة","الإدارة العامة","إداري","0555555555","k.amri@school.edu"]
    ];
    const ws=XLSX.utils.aoa_to_sheet([IMP_HEADERS].concat(ex));
    ws["!cols"]=[{wch:26},{wch:24},{wch:16},{wch:20},{wch:12},{wch:15},{wch:26}];
    const G=[["الدليل — القيم المسموحة (لا تعدّل أسماء الأعمدة في الورقة الأولى)"],[],
      ["القسم","المرحلة"],
      ["الإدارة العامة","الإدارة العامة"],
      ["بنين","الصفوف الأولية"],["بنين","الصفوف العليا"],["بنين","المتوسط والثانوي"],
      ["بنات","رياض الأطفال"],["بنات","الابتدائي"],["بنات","المتوسط والثانوي"],[],
      ["نوع الكادر",""],
      ["تعليمي","المعلمون والمعلمات بجميع التخصصات — اكتب التخصص في عمود الوظيفة"],
      ["إداري","مدير مرحلة، وكيل شؤون تعليمية، وكيل شؤون طلاب، موجه طلابي، رائد نشاط، مساعد إداري"],
      ["ملاحظات","الجوال بصيغة 05XXXXXXXX • الأعمدة الإلزامية: الاسم، الوظيفة، القسم، المرحلة، الجوال • يمكنك إضافة أسطر بلا حد"]];
    const gs=XLSX.utils.aoa_to_sheet(G);
    gs["!cols"]=[{wch:18},{wch:70}];
    const wb=XLSX.utils.book_new();
    wb.Workbook={Views:[{RTL:true}]};
    XLSX.utils.book_append_sheet(wb,ws,"المنسوبون");
    XLSX.utils.book_append_sheet(wb,gs,"الدليل");
    XLSX.writeFile(wb,"قالب-استيراد-المنسوبين.xlsx");
    toast("تم تحميل القالب","ok");
  }catch(e){toastErr(e);}
}
async function importFile(f){
  try{
    await needLib("xlsx");
    let rows=[];
    if(/\.csv$/i.test(f.name)){
      const txt=(await f.text()).replace(/^\uFEFF/,"");
      const wb1=XLSX.read(txt,{type:"string"});
      rows=XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[0]],{defval:""});
    }else{
      const wb2=XLSX.read(await f.arrayBuffer(),{type:"array"});
      rows=XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[0]],{defval:""});
    }
    if(!rows.length)return toast("الملف فارغ","err");
    showImportPreview(rows.map((r,i)=>mapImportRow(r,i+1)),f.name);
  }catch(e){toast("تعذر قراءة الملف: "+(e.message||e),"err");}
}
function pickField(r,words){
  const keys=Object.keys(r);
  for(let i=0;i<keys.length;i++){
    const nk=norm(keys[i]);
    for(let j=0;j<words.length;j++){
      if(nk.indexOf(norm(words[j]))>-1)return r[keys[i]];
    }
  }
  return "";
}
function resolveStage(sec,stage){
  const t=norm(sec+" "+stage);
  if(!t)return "";
  if(t.indexOf("اداره")>-1&&t.indexOf("عام")>-1)return "general";
  if(t.indexOf("اولي")>-1)return "boys.lower";
  if(t.indexOf("عليا")>-1)return "boys.upper";
  if(t.indexOf("روض")>-1||t.indexOf("رياض")>-1)return "girls.kg";
  const boys=t.indexOf("بنين")>-1||t.indexOf("ذكور")>-1;
  const girls=t.indexOf("بنات")>-1||t.indexOf("اناث")>-1;
  if(t.indexOf("ابتدائ")>-1&&girls)return "girls.primary";
  if(t.indexOf("متوسط")>-1||t.indexOf("ثانو")>-1){
    if(girls)return "girls.ms";
    if(boys)return "boys.ms";
    return "";
  }
  return "";
}
function mapImportRow(r,i){
  const name=String(pickField(r,["الاسم"])||"").trim();
  const job=String(pickField(r,["الوظيف","التخصص"])||"").trim();
  const sec=String(pickField(r,["القسم"])||"").trim();
  const stage=String(pickField(r,["المرحل"])||"").trim();
  const type=String(pickField(r,["الكادر","نوع"])||"").trim();
  const phone=String(pickField(r,["الجوال","الهاتف","رقم"])||"").trim();
  const email=String(pickField(r,["البريد","الايميل","email","الميل"])||"").trim();
  const o={i,name,job,sec,stage,type,phone,email,err:"",stageKey:"",typeKey:""};
  if(!name)o.err="الاسم مفقود";
  else if(!job)o.err="الوظيفة/التخصص مفقود";
  else{
    const sk=resolveStage(sec,stage);
    if(!sk)o.err="تعذر تحديد القسم/المرحلة (راجع ورقة الدليل)";
    else if(myStages().indexOf(sk)<0)o.err="خارج نطاق صلاحيتك";
    else{
      o.stageKey=sk;
      o.typeKey=(sk==="general")?"general":(norm(type).indexOf("ادار")>-1?"admin":"teaching");
      if(!validPhone(phone))o.err="رقم الجوال مفقود أو غير صالح";
      else if(email&&!validEmail(email))o.err="البريد غير صالح";
    }
  }
  return o;
}
function showImportPreview(rows,fname){
  const ok=rows.filter(r=>!r.err),bad=rows.filter(r=>r.err);
  const m=openModal({
    title:`${icon("ul")} معاينة الاستيراد قبل الحفظ`,wide:true,
    body:`
    <div class="imp-meta">
      <span class="badge-pill ok">${icon("check")} ${ok.length} صف صالح</span>
      ${bad.length?`<span class="badge-pill err">${icon("alert")} ${bad.length} صف سيُستثنى</span>`:""}
      <span class="muted small">${esc(fname)}</span>
    </div>
    ${bad.length?`<details class="imp-errs" open><summary>الصفوف التي لن تُستورد (${bad.length})</summary>
      <ul>${bad.map(r=>`<li>صف ${r.i}: <b>${esc(r.name||"—")}</b> — ${esc(r.err)}</li>`).join("")}</ul></details>`:""}
    <div class="tblwrap"><table class="tbl"><thead><tr><th>#</th><th>الاسم</th><th>الوظيفة</th><th>المرحلة</th><th>الكادر</th><th>الجوال</th><th>البريد</th><th>الحالة</th></tr></thead>
    <tbody>${rows.slice(0,150).map(r=>`<tr class="${r.err?"row-err":""}">
      <td>${r.i}</td><td>${esc(r.name)}</td><td>${esc(r.job)}</td>
      <td>${esc(r.stageKey?STAGES[r.stageKey].name:(r.sec+" "+r.stage).trim())}</td>
      <td>${esc((TYPES[r.typeKey]||{}).name||r.type)}</td>
      <td class="ltr">${esc(r.phone)}</td><td class="ltr">${esc(r.email)}</td>
      <td>${r.err?`<span class="badge-pill err">${esc(r.err)}</span>`:'<span class="badge-pill ok">جاهز</span>'}</td></tr>`).join("")}
    </tbody></table></div>
    ${rows.length>150?`<p class="muted small" style="margin-top:8px">تُعرض أول 150 صف فقط — سيتم استيراد كل الصفوف الصالحة (${ok.length}).</p>`:""}`,
    foot:`<button class="btn btn-ghost" data-close>إلغاء</button>
      <button class="btn btn-primary" data-a="go"${ok.length?"":" disabled"}>${icon("check")} استيراد ${ok.length} صف</button>`
  });
  m.el.querySelector('[data-a="go"]').onclick=async ev=>{
    const btn=ev.currentTarget;
    btn.disabled=true;btn.textContent="جارٍ الاستيراد...";
    try{
      const res=await commitImport(ok);
      toast(`تم الاستيراد: إضافة ${res.created}${res.updated?" وتحديث "+res.updated:""}`,"ok");
      m.close();
    }catch(e){toastErr(e);btn.disabled=false;btn.innerHTML=icon("check")+" إعادة المحاولة";}
  };
}
async function commitImport(rows){
  const inList=state.staff.filter(inScope);
  const byPhone={};
  inList.forEach(s=>{
    const p=String((state.contacts[s.id]||{}).phone||"").replace(/\D/g,"");
    if(p)byPhone[p]=s.id;
  });
  const writes=[];
  let created=0,updated=0;
  rows.forEach(r=>{
    const core={name:r.name,job:r.job,stage:r.stageKey,type:r.typeKey,ts:Date.now(),by:(state.user&&state.user.name)||""};
    const contact={};
    if(r.phone)contact.phone=r.phone;
    if(r.email)contact.email=r.email;
    const exId=byPhone[String(r.phone).replace(/\D/g,"")];
    if(exId){writes.push({id:exId,core,contact});updated++;}
    else{writes.push({id:null,core,contact});created++;}
  });
  const CHUNK=200;
  for(let i=0;i<writes.length;i+=CHUNK){
    const b=db.batch();
    writes.slice(i,i+CHUNK).forEach(w=>{
      const ref=w.id?db.doc("staff/"+w.id):db.collection("staff").doc();
      b.set(ref,w.core,{merge:!!w.id});
      if(Object.keys(w.contact).length)b.set(db.doc("contacts/"+ref.id),w.contact,{merge:true});
    });
    await b.commit();
  }
  logAct("استيراد بيانات","إضافة "+created+" وتحديث "+updated);
  return{created,updated};
}
async function exportExcel(){
  try{
    await needLib("xlsx");
    const sel=$("#expScope");
    const list=currentExportList(sel?sel.value:"mine");
    if(!list.length)return toast("لا توجد بيانات للتصدير","err");
    const aoa=[IMP_HEADERS].concat(list.map(s=>{
      const c=state.contacts[s.id]||{},st=STAGES[s.stage]||{};
      return [s.name,s.job,(SECTIONS[st.sec]||{}).name||"",st.name||"",(TYPES[s.type]||{}).name||"",c.phone||"",c.email||""];
    }));
    const ws=XLSX.utils.aoa_to_sheet(aoa);
    ws["!cols"]=[{wch:26},{wch:24},{wch:16},{wch:26},{wch:12},{wch:15},{wch:26}];
    const wb=XLSX.utils.book_new();
    wb.Workbook={Views:[{RTL:true}]};
    XLSX.utils.book_append_sheet(wb,ws,"المنسوبون");
    XLSX.writeFile(wb,"منسوبو-المدرسة-"+new Date().toISOString().slice(0,10)+".xlsx");
    logAct("تصدير Excel",list.length+" سجل");
    toast("تم تصدير "+list.length+" سجلاً","ok");
  }catch(e){toastErr(e);}
}

/* التقارير */
const REPORT_CSS=`
.rep-page{width:794px;height:1123px;display:flex;flex-direction:column;background:#fff;color:#222;font-family:'Tajawal',sans-serif}
.rep-head{display:flex;align-items:center;gap:16px;padding:16px 20px;border-bottom:4px solid #F97316;margin-bottom:12px}
.rep-dias{display:flex;gap:9px}
.rep-dias span{width:32px;height:32px;transform:rotate(45deg);background:linear-gradient(135deg,#FB923C,#EA580C);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:6px}
.rep-dias span i{transform:rotate(-45deg);font-style:normal;font-weight:800;font-size:14px}
.rep-title{font-size:21px;font-weight:800}.rep-sub{font-size:12px;color:#8A7A6D;margin-top:2px}
.rep-cont{padding:10px 20px;font-weight:800;color:#EA580C;border-bottom:2px solid #F1E2D2;margin-bottom:8px}
table.rep{width:100%;border-collapse:collapse;font-size:12px;flex:1}
table.rep th{background:#EA580C;color:#fff;padding:9px 10px;font-weight:800;border:1px solid #E8D5C2;text-align:right;white-space:nowrap}
table.rep td{padding:8px 10px;border:1px solid #EFDCC8;text-align:right;white-space:nowrap;max-width:230px;overflow:hidden;text-overflow:ellipsis}
table.rep tbody tr:nth-child(even) td{background:#FFF9F2}
.rep-foot{display:flex;justify-content:space-between;padding:10px 20px;font-size:11px;color:#98897C;border-top:2px solid #F1E2D2;margin-top:8px}`;
const RPP=22;
function collectReportRows(scope){
  if(STAGES[scope])return state.staff.filter(s=>s.stage===scope);
  return currentExportList(scope);
}
function buildReportPages(list,cols,title){
  const total=Math.max(1,Math.ceil(list.length/RPP));
  const pages=[];
  for(let p=0;p<total;p++){
    const slice=list.slice(p*RPP,(p+1)*RPP);
    const colsArr=[["الاسم",true],["الوظيفة",cols.job],["المرحلة",cols.stage],["الكادر",cols.type],["الجوال",cols.phone],["البريد",cols.email]].filter(c=>c[1]);
    const trs=slice.map((s,i)=>{
      const c=state.contacts[s.id]||{},st=STAGES[s.stage]||{};
      let tds=`<td>${p*RPP+i+1}. ${esc(s.name)}</td>`;
      if(cols.job)tds+=`<td>${esc(s.job||"")}</td>`;
      if(cols.stage)tds+=`<td>${esc(st.name||"")}</td>`;
      if(cols.type)tds+=`<td>${esc((TYPES[s.type]||{}).name||"")}</td>`;
      if(cols.phone)tds+=`<td dir="ltr">${esc(c.phone||"—")}</td>`;
      if(cols.email)tds+=`<td dir="ltr">${esc(c.email||"—")}</td>`;
      return `<tr>${tds}</tr>`;
    }).join("");
    pages.push(`<div class="rep-page">
      ${p===0?`<div class="rep-head">
        <div class="rep-dias"><span><i>I</i></span><span><i>B</i></span><span><i>S</i></span></div>
        <div><div class="rep-title">${esc(title||"تقرير منسوبي المدرسة")}</div>
        <div class="rep-sub">${esc(SCHOOL_AR)} — ${esc(SCHOOL_EN)} • ${fmtD(Date.now())} • عدد السجلات: ${list.length}</div></div></div>`
      :`<div class="rep-cont">${esc(title||"تقرير منسوبي المدرسة")} — تابع</div>`}
      <table class="rep"><thead><tr>${colsArr.map(c=>`<th>${c[0]}</th>`).join("")}</tr></thead><tbody>${trs}</tbody></table>
      <div class="rep-foot"><span>${p===0?`نُشئ بواسطة: ${esc((state.user&&state.user.name)||"")} • ${fmtD(Date.now())}`:""}</span><span>صفحة ${p+1} من ${total}</span></div>
    </div>`);
  }
  return pages;
}
function openReportBuilder(){
  const my=myStages();
  const m=openModal({
    title:`${icon("file")} إنشاء تقرير رسمي`,wide:true,
    body:`<div class="form-grid">
      <div class="field"><label>نطاق التقرير</label>
        <select id="rpScope" class="inp">
          <option value="mine">كل منسوبي نطاق صلاحيتي</option>
          <option value="filtered">نتيجة البحث/الفلاتر الحالية بصفحة المنسوبين</option>
          ${isAdmin()?'<option value="all">جميع منسوبي المدرسة</option>':""}
          ${my.map(k=>`<option value="${k}">${STAGES[k].name}</option>`).join("")}
        </select></div>
      <div class="field"><label>عنوان التقرير (اختياري)</label><input id="rpTitle" class="inp" placeholder="مثال: كادر المرحلة الابتدائية"></div>
      <div class="field full"><label>الأعمدة المعروضة</label>
        <div class="chk-row">
          <label class="chk"><input type="checkbox" id="rpC1" checked> الوظيفة</label>
          <label class="chk"><input type="checkbox" id="rpC2" checked> المرحلة</label>
          <label class="chk"><input type="checkbox" id="rpC3" checked> نوع الكادر</label>
          <label class="chk"><input type="checkbox" id="rpC4" checked> الجوال</label>
          <label class="chk"><input type="checkbox" id="rpC5" checked> البريد</label>
        </div></div>
    </div>
    <p class="hint" style="margin-top:10px">التقرير بتنسيق A4 رسمي بشعار المدرسة وترويسة وترقيم صفحات، ويشمل بيانات التواصل حسب نطاقك.</p>`,
    foot:`<button class="btn btn-ghost" data-close>إلغاء</button>
      <button class="btn btn-primary" data-a="pdf">${icon("dl")} حفظ PDF</button>
      <button class="btn btn-soft" data-a="print">${icon("print")} طباعة</button>`
  });
  const gather=()=>{
    const scope=m.el.querySelector("#rpScope").value;
    const title=m.el.querySelector("#rpTitle").value.trim();
    const g=id=>!!m.el.querySelector(id).checked;
    return{list:collectReportRows(scope),cols:{job:g("#rpC1"),stage:g("#rpC2"),type:g("#rpC3"),phone:g("#rpC4"),email:g("#rpC5")},title};
  };
  m.el.querySelector('[data-a="pdf"]').onclick=async ev=>{
    const r=gather();
    if(!r.list.length)return toast("لا توجد بيانات في هذا النطاق","err");
    const btn=ev.currentTarget;
    btn.disabled=true;btn.textContent="جارٍ إنشاء PDF...";
    try{
      await makePDF(buildReportPages(r.list,r.cols,r.title));
      toast("تم إنشاء ملف PDF","ok");
    }catch(e){toast("تعذر إنشاء PDF: "+(e.message||e),"err");}
    btn.disabled=false;btn.innerHTML=icon("dl")+" حفظ PDF";
  };
  m.el.querySelector('[data-a="print"]').onclick=()=>{
    const r=gather();
    if(!r.list.length)return toast("لا توجد بيانات في هذا النطاق","err");
    printReport(buildReportPages(r.list,r.cols,r.title));
    logAct("طباعة تقرير",r.list.length+" سجل");
  };
}
async function makePDF(pages){
  await needLib("jspdf");
  await needLib("h2c");
  const node=$("#reportNode");
  const pdf=new window.jspdf.jsPDF("p","mm","a4");
  toast("جارٍ تجهيز التقرير ("+pages.length+" صفحة)...","info");
  for(let i=0;i<pages.length;i++){
    node.innerHTML=`<style>${REPORT_CSS}</style>${pages[i]}`;
    await new Promise(r=>setTimeout(r,50));
    const canvas=await html2canvas(node,{scale:2,backgroundColor:"#FFFFFF",logging:false});
    if(i>0)pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/jpeg",.92),"JPEG",0,0,210,297);
  }
  pdf.save("تقرير-المنسوبين-"+new Date().toISOString().slice(0,10)+".pdf");
  node.innerHTML="";
  logAct("تصدير تقرير PDF",pages.length+" صفحة");
}
function printReport(pages){
  const node=$("#reportNode");
  node.innerHTML=pages.join("");
  const w=window.open("","_blank","width=900,height=700");
  if(!w)return toast("المتصفح منع فتح نافذة الطباعة — اسمح بالنوافذ المنبثقة","err");
  w.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>طباعة التقرير</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap" rel="stylesheet">
    <style>${REPORT_CSS}
      @page{size:A4;margin:0}
      body{margin:0;background:#fff}
      .rep-page{page-break-after:always}
      .rep-page:last-child{page-break-after:auto}
    </style></head><body>${node.innerHTML}</body></html>`);
  w.document.close();
  setTimeout(()=>{try{w.focus();w.print();}catch(e){}},800);
  node.innerHTML="";
}

/* ═══ 17) المستخدمون والصلاحيات ═══ */
async function renderUsersPage(){
  const el=$("#page-users");
  if(!isAdmin()){el.innerHTML=emptyPerm();return;}
  el.innerHTML=`<div class="tb-head">
    <h3>${icon("shield")} حسابات الدخول والصلاحيات</h3>
    <button class="btn btn-primary btn-sm" id="btnAddUser">${icon("plus")} مستخدم جديد</button>
  </div>
  <div id="usersHost"><div class="mini-loading">جارٍ التحميل...</div></div>`;
  $("#btnAddUser").onclick=()=>openUserModal();
  try{
    const q=await db.collection("accounts").get();
    state.users=q.docs.map(d=>Object.assign({username:d.id},d.data()));
    state.users.sort((a,b)=>((b.role==="admin")-(a.role==="admin"))||String(a.name).localeCompare(String(b.name),"ar"));
    renderUsersTable();
  }catch(e){$("#usersHost").innerHTML=errBox(e);}
}
function scopeChips(stages){
  const arr=(stages||[]).filter(k=>STAGES[k]);
  if(!arr.length)return '<span class="muted">—</span>';
  if(arr.length===ALL_STAGE_KEYS.length)return '<span class="bdg" style="color:#B45309;background:#FEF3C7">جميع المراحل</span>';
  return arr.map(k=>{
    const col=(SECTIONS[STAGES[k].sec]||{}).color||"#F97316";
    return `<span class="bdg" style="color:${col};background:${hexToRgba(col,.1)}">${STAGES[k].short}</span>`;
  }).join(" ");
}
function renderUsersTable(){
  $("#usersHost").innerHTML=`<div class="tblwrap"><table class="tbl">
  <thead><tr><th>المستخدم</th><th>اسم الدخول</th><th>الصلاحية</th><th>النطاق</th><th>آخر دخول</th><th>الحالة</th><th></th></tr></thead>
  <tbody>${state.users.map(u=>`<tr>
    <td><div class="ucell">${avatarHTML(u,"sm")}<b>${esc(u.name)}</b></div></td>
    <td class="ltr">${esc(u.username)}</td>
    <td>${u.role==="admin"?'<span class="bdg" style="color:#B45309;background:#FEF3C7">مدير النظام — كاملة</span>':'<span class="bdg" style="color:#0E7490;background:#E8F6F9">مدير قسم — مجزّئة</span>'}</td>
    <td>${u.role==="admin"?'<span class="bdg" style="color:#B45309;background:#FEF3C7">كل الأقسام</span>':scopeChips(u.stages)}</td>
    <td>${u.lastLogin?fmtDT(u.lastLogin):'<span class="muted">لم يدخل بعد</span>'}</td>
    <td>${u.active!==false?'<span class="bdg" style="color:#059669;background:#D1FAE5">نشط</span>':'<span class="bdg" style="color:#DC2626;background:#FEE2E2">موقوف</span>'}</td>
    <td><div class="row-acts">
      <button class="icon-btn" title="تعديل الصلاحيات" onclick="editUser('${esc(u.username)}')">${icon("edit")}</button>
      <button class="icon-btn" title="${u.active!==false?"إيقاف الحساب":"تفعيل الحساب"}" onclick="toggleUser('${esc(u.username)}')">${icon(u.active!==false?"lock":"check")}</button>
      <button class="icon-btn danger" title="حذف" onclick="delUser('${esc(u.username)}')">${icon("trash")}</button>
    </div></td></tr>`).join("")}
  </tbody></table></div>`;
}
function editUser(u){openUserModal(u);}
async function toggleUser(u){
  const usr=state.users.find(x=>x.username===u);
  if(!usr)return;
  const active=usr.active===false;
  try{
    await db.doc("accounts/"+u).update({active});
    toast(active?"تم تفعيل الحساب":"تم إيقاف الحساب","ok");
    logAct(active?"تفعيل مستخدم":"إيقاف مستخدم",usr.name);
    renderUsersPage();
  }catch(e){toastErr(e);}
}
async function delUser(u){
  const usr=state.users.find(x=>x.username===u);
  if(!usr)return;
  if(u==="admin")return toast("لا يمكن حذف حساب مدير النظام الأساسي","err");
  if(state.user&&u===state.user.username)return toast("لا يمكنك حذف حسابك الحالي","err");
  if(!await confirmDlg("حذف مستخدم",`سيُحذف حساب <b>${esc(usr.name)}</b> (${esc(u)}) نهائياً مع صلاحياته.`))return;
  try{
    await db.doc("accounts/"+u).delete();
    toast("تم حذف الحساب","ok");
    logAct("حذف مستخدم",usr.name);
    renderUsersPage();
  }catch(e){toastErr(e);}
}
function buildTree(sel){
  const S=new Set(sel||[]);
  return Object.keys(SECTIONS).map(sk=>{
    const sv=SECTIONS[sk];
    if(sk==="general"){
      return `<div class="tree-sec"><label class="chk tree-head"><input type="checkbox" data-k="general"${S.has("general")?" checked":""}> <b style="color:${sv.color}">${sv.name}</b></label></div>`;
    }
    return `<div class="tree-sec">
      <label class="chk tree-head"><input type="checkbox" data-sec="${sk}"${sv.stages.every(k=>S.has(k))?" checked":""}> <b style="color:${sv.color}">${sv.name}</b></label>
      <div class="tree-kids">${sv.stages.map(k=>`<label class="chk"><input type="checkbox" data-k="${k}"${S.has(k)?" checked":""}> ${STAGES[k].name}</label>`).join("")}</div>
    </div>`;
  }).join("");
}
function wireTree(tree){
  tree.querySelectorAll("input[data-sec]").forEach(h=>h.onchange=()=>{
    const sec=h.dataset.sec;
    tree.querySelectorAll("input[data-k]").forEach(c=>{if(SECTIONS[sec].stages.indexOf(c.dataset.k)>-1)c.checked=h.checked;});
  });
  tree.querySelectorAll("input[data-k]").forEach(c=>c.onchange=()=>{
    const sec=STAGES[c.dataset.k].sec;
    if(sec==="general")return;
    const hd=tree.querySelector(`input[data-sec="${sec}"]`);
    if(hd)hd.checked=SECTIONS[sec].stages.every(k=>tree.querySelector(`input[data-k="${k}"]`).checked);
  });
}
async function openUserModal(username){
  const u=username?state.users.find(x=>x.username===username):null;
  const m=openModal({
    title:`${icon("shield")} ${u?"تعديل مستخدم وصلاحياته":"مستخدم جديد"}`,wide:true,
    body:`<div class="form-grid">
      <div class="field full"><div class="photo-pick">
        <div id="uvAvatar">${avatarHTML(u||{name:"؟"})}</div>
        <div class="pp-btns">
          <label class="btn btn-soft btn-sm">${icon("cam")} صورة شخصية<input type="file" id="uPhoto" accept="image/*" class="hidden-file"></label>
          <button type="button" class="btn btn-ghost btn-sm" id="uvRemove">إزالة</button>
        </div>
        <small class="hint">تظهر عند تسجيل الدخول وفي جدول الصلاحيات</small></div></div>
      <div class="field"><label>الاسم <span class="req">*</span></label><input id="uName" class="inp" value="${esc(u?u.name:"")}"></div>
      <div class="field"><label>اسم المستخدم (إنجليزي) <span class="req">*</span></label>
        <input id="uUser" class="inp ltr"${u?" readonly":""} placeholder="مثال: ahmed.s" value="${esc(u?u.username:"")}"></div>
      <div class="field full"><label>${u?"كلمة مرور جديدة (اتركها فارغة للإبقاء على الحالية)":"كلمة المرور"}</label>
        <input id="uPass" type="text" class="inp ltr" placeholder="6 أحرف على الأقل" autocomplete="new-password"></div>
      <div class="field full"><label>نوع الصلاحية <span class="req">*</span></label>
        <div class="radio-col">
          <label class="radio-row"><input type="radio" name="uRole" value="admin"${u&&u.role==="admin"?" checked":""}><div><b>مدير النظام</b><small>صلاحية كاملة على كل الأقسام والمراحل والإعدادات والمستخدمين</small></div></label>
          <label class="radio-row"><input type="radio" name="uRole" value="manager"${!u||u.role!=="admin"?" checked":""}><div><b>مدير قسم / مرحلة</b><small>صلاحية مجزّئة — يُحدَّد النطاق والعمليات أدناه</small></div></label>
        </div></div>
      <div class="field full" id="uScopeBox"><label>نطاق الصلاحية (الأقسام والمراحل)</label>
        <div class="scope-tree" id="uTree"></div>
        <label class="chk small" style="margin-top:8px"><input type="checkbox" id="uAllStages"> تحديد كل المراحل</label></div>
      <div class="field full" id="uActBox"><label>العمليات المسموحة</label>
        <div class="chk-row">
          <label class="chk"><input type="checkbox" class="uact" value="add"${u&&u.actions&&u.actions.add?" checked":""}> إضافة منسوبين</label>
          <label class="chk"><input type="checkbox" class="uact" value="edit"${u&&u.actions&&u.actions.edit?" checked":""}> تعديل البيانات</label>
          <label class="chk"><input type="checkbox" class="uact" value="delete"${u&&u.actions&&u.actions.delete?" checked":""}> حذف</label>
          <label class="chk"><input type="checkbox" class="uact" value="data"${u&&u.actions&&u.actions.data?" checked":""}> الاستيراد/التصدير/التقارير</label>
        </div>
        <small class="hint">كل مستخدم مسجَّل يرى بيانات التواصل للمنسوبين داخل نطاقه فقط.</small></div>
    </div>`,
    foot:`<button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-primary" data-a="save">${icon("check")} حفظ المستخدم</button>`
  });
  let photo=(u&&u.photo)||"";
  const tree=m.el.querySelector("#uTree");
  tree.innerHTML=buildTree(u?u.stages:[]);
  wireTree(tree);
  const roleBtns=m.el.querySelectorAll("input[name=uRole]");
  const syncRole=()=>{
    const admin=roleBtns[0].checked;
    m.el.querySelector("#uScopeBox").style.display=admin?"none":"";
    m.el.querySelector("#uActBox").style.display=admin?"none":"";
  };
  roleBtns.forEach(r=>r.onchange=syncRole);
  syncRole();
  m.el.querySelector("#uAllStages").onchange=e=>tree.querySelectorAll("input[type=checkbox]").forEach(c=>c.checked=e.target.checked);
  m.el.querySelector("#uPhoto").onchange=async e=>{
    const f=e.target.files[0];
    if(!f)return;
    try{photo=await pickPhoto(f);m.el.querySelector("#uvAvatar").innerHTML=`<img class="avatar" src="${photo}" alt="">`;}
    catch(err){toast(String(err),"err");}
  };
  m.el.querySelector("#uvRemove").onclick=()=>{
    photo="";
    m.el.querySelector("#uvAvatar").innerHTML=avatarHTML({name:m.el.querySelector("#uName").value||"؟"});
  };
  m.el.querySelector('[data-a="save"]').onclick=async ev=>{
    const b=ev.currentTarget;
    const name=m.el.querySelector("#uName").value.trim();
    const uname=m.el.querySelector("#uUser").value.trim().toLowerCase();
    const pass=m.el.querySelector("#uPass").value;
    const roleR=m.el.querySelector("input[name=uRole]:checked");
    const role=roleR?roleR.value:"manager";
    const stages=Array.from(tree.querySelectorAll("input[data-k]:checked")).map(c=>c.dataset.k);
    const actions={};
    m.el.querySelectorAll(".uact").forEach(c=>{actions[c.value]=c.checked;});
    if(!name||!uname)return toast("أكمل الاسم واسم المستخدم","err");
    if(!/^[a-z0-9._-]{3,20}$/.test(uname))return toast("اسم المستخدم: حروف إنجليزية/أرقام (3-20) بدون مسافات","err");
    if(role==="manager"&&!stages.length)return toast("حدد مرحلة واحدة على الأقل لمدير القسم","err");
    if(!u&&pass.length<6)return toast("كلمة المرور: 6 أحرف على الأقل","err");
    if(u&&pass&&pass.length<6)return toast("كلمة المرور الجديدة قصيرة","err");
    if(!u&&state.users.some(x=>x.username===uname))return toast("اسم المستخدم مستخدم مسبقاً","err");
    b.disabled=true;
    try{
      const patch={name,role,stages:role==="admin"?[]:stages,
        actions:role==="admin"?{add:true,edit:true,delete:true,data:true}:actions,
        photo,active:u?(u.active!==false):true};
      if(pass){patch.salt=randHex(16);patch.iter=PBKDF2_ITER;patch.hash=await deriveKey(pass,patch.salt,PBKDF2_ITER);}
      if(u){
        await db.doc("accounts/"+uname).update(patch);
        logAct("تعديل مستخدم وصلاحياته",name);
      }else{
        await db.doc("accounts/"+uname).set(Object.assign({username:uname},patch,{createdAt:Date.now(),lastLogin:null}));
        logAct("إضافة مستخدم",name);
      }
      if(state.user&&state.user.username===uname){Object.assign(state.user,patch);renderUserChip();}
      toast("تم حفظ بيانات المستخدم","ok");
      m.close();
      renderUsersPage();
    }catch(e){toastErr(e);b.disabled=false;}
  };
}

/* ═══ 18) سجل الدخول والعمليات ═══ */
async function renderLogsPage(){
  const el=$("#page-logs");
  if(!isAdmin()){el.innerHTML=emptyPerm();return;}
  el.innerHTML=`
  <div class="tb-head">
    <div class="seg">
      <button class="seg-b ${logsTab==="in"?"on":""}" data-t="in">${icon("clock")} تواريخ الدخول</button>
      <button class="seg-b ${logsTab==="act"?"on":""}" data-t="act">${icon("list")} سجل العمليات</button>
    </div>
    <input id="logSearch" class="inp" style="max-width:280px" placeholder="بحث في السجلات...">
    <button class="icon-btn" id="logRefresh" title="تحديث">${icon("refresh")}</button>
  </div>
  <div id="logsHost"><div class="mini-loading">جارٍ التحميل...</div></div>`;
  el.querySelectorAll(".seg-b[data-t]").forEach(b=>b.onclick=()=>{logsTab=b.dataset.t;renderLogsPage();});
  $("#logSearch").oninput=debounce(()=>renderLogsTable(),200);
  $("#logRefresh").onclick=async()=>{await loadLogs();toast("تم تحديث السجلات","info");};
  if(state.loginLogs===null)await loadLogs();
  else renderLogsTable();
}
async function loadLogs(){
  try{
    const lq=await db.collection("loginLogs").orderBy("in","desc").limit(300).get();
    const aq=await db.collection("activityLogs").orderBy("at","desc").limit(300).get();
    state.loginLogs=lq.docs.map(d=>Object.assign({id:d.id},d.data()));
    state.actLogs=aq.docs.map(d=>Object.assign({id:d.id},d.data()));
    renderLogsTable();
  }catch(e){
    const h=$("#logsHost");
    if(h)h.innerHTML=errBox(e);
  }
}
function devShort(ua){
  ua=ua||"";
  const os=/Windows/.test(ua)?"Windows":/Android/.test(ua)?"Android":/iPhone|iPad|Mac/.test(ua)?"Apple":/Linux/.test(ua)?"Linux":"جهاز آخر";
  const br=/Edg\//.test(ua)?"Edge":/Chrome\//.test(ua)?"Chrome":/Firefox\//.test(ua)?"Firefox":/Safari\//.test(ua)?"Safari":"متصفح";
  return os+" • "+br;
}
function renderLogsTable(){
  const H=$("#logsHost");
  if(!H)return;
  const q=($("#logSearch")&&$("#logSearch").value||"").trim();
  if(logsTab==="in"){
    let rows=state.loginLogs||[];
    if(q)rows=rows.filter(r=>norm(r.n+" "+(r.u||"")).indexOf(norm(q))>-1);
    H.innerHTML=`<div class="tblwrap"><table class="tbl">
      <thead><tr><th>المستخدم</th><th>اسم الدخول</th><th>وقت الدخول</th><th>وقت الخروج</th><th>المدة</th><th>الجهاز</th></tr></thead>
      <tbody>${rows.map(r=>`<tr>
        <td><b>${esc(r.n||"")}</b></td><td class="ltr">${esc(r.u||"")}</td>
        <td>${fmtDT(r.in)}</td>
        <td>${r.out?fmtDT(r.out):'<span class="muted">جلسة مفتوحة / غير محدد</span>'}</td>
        <td>${r.out&&r.in?fmtDur(r.out-r.in):"—"}</td>
        <td class="muted small">${esc(devShort(r.dev))}</td></tr>`).join("")||'<tr><td colspan="6" class="muted" style="text-align:center;padding:26px">لا سجلات دخول بعد</td></tr>'}
      </tbody></table></div>`;
  }else{
    let rows=state.actLogs||[];
    if(q)rows=rows.filter(r=>norm(r.n+" "+(r.a||"")+" "+(r.t||"")).indexOf(norm(q))>-1);
    H.innerHTML=`<div class="tblwrap"><table class="tbl">
      <thead><tr><th>المستخدم</th><th>العملية</th><th>التفاصيل</th><th>التاريخ</th></tr></thead>
      <tbody>${rows.map(r=>`<tr>
        <td><b>${esc(r.n||"")}</b></td><td>${esc(r.a||"")}</td><td>${esc(r.t||"")}</td><td>${fmtDT(r.at)}</td></tr>`).join("")||'<tr><td colspan="4" class="muted" style="text-align:center;padding:26px">لا سجلات عمليات بعد</td></tr>'}
      </tbody></table></div>`;
  }
}

/* ═══ 19) إعدادات الوظائف ═══ */
function renderJobsPage(){
  const el=$("#page-jobs");
  if(!isAdmin()){el.innerHTML=emptyPerm();return;}
  const set=state.settings||DEFAULT_SETTINGS;
  el.innerHTML=`<p class="page-desc">أدر قوائم المسميات الوظيفية التي تظهر في نماذج إضافة/تعديل المنسوبين — أي تعديل هنا ينعكس فوراً في القوائم المنسدلة.</p>
  <div class="jobs-grid">
    ${jobsPanel("generalJobs","وظائف الإدارة العامة","shield",set.generalJobs)}
    ${jobsPanel("adminJobs","الوظائف الإدارية للمراحل","users",set.adminJobs)}
    ${jobsPanel("specialties","تخصصات الكادر التعليمي","id",set.specialties)}
  </div>`;
  wireJobsPanels();
}
function jobsPanel(key,title,icn,list){
  return `<div class="panel jp" data-key="${key}">
    <h3>${icon(icn)} ${title} <span class="cnt">${(list||[]).length}</span></h3>
    <div class="jp-list">${(list||[]).map((j,i)=>`<div class="jp-item"><span>${esc(j)}</span>
      <span class="jp-acts">
        <button class="icon-btn" data-op="edit" data-i="${i}" title="تعديل">${icon("edit")}</button>
        <button class="icon-btn danger" data-op="del" data-i="${i}" title="حذف">${icon("trash")}</button>
      </span></div>`).join("")||'<div class="muted small">لا عناصر بعد</div>'}</div>
    <div class="jp-add"><input class="inp" placeholder="أضف مسمى جديداً..."><button class="btn btn-soft btn-sm" data-op="add">${icon("plus")} إضافة</button></div>
  </div>`;
}
function wireJobsPanels(){
  $$(".jp").forEach(p=>{
    const key=p.dataset.key;
    const getList=()=>((state.settings||DEFAULT_SETTINGS)[key]||[]);
    p.querySelectorAll(".icon-btn[data-op]").forEach(b=>b.onclick=async()=>{
      const i=+b.dataset.i,list=getList().slice();
      if(b.dataset.op==="del"){
        if(!await confirmDlg("حذف مسمى وظيفي",`حذف <b>${esc(list[i])}</b> من القائمة؟`))return;
        list.splice(i,1);
      }else{
        const nv=await askDlg("تعديل المسمى الوظيفي",list[i]);
        if(nv===null||nv==="")return;
        list[i]=nv;
      }
      await saveJobs(key,list);
    });
    p.querySelector('[data-op="add"]').onclick=async()=>{
      const inp=p.querySelector(".jp-add input");
      const t=inp.value.trim();
      if(!t)return toast("اكتب المسمى أولاً","err");
      const list=getList().slice();
      if(list.indexOf(t)>-1)return toast("هذا المسمى موجود مسبقاً","err");
      list.push(t);
      inp.value="";
      await saveJobs(key,list);
    };
  });
}
async function saveJobs(key,list){
  try{
    const upd={};
    upd[key]=list;
    await db.doc("settings/app").update(upd);
    state.settings=Object.assign({},state.settings,upd);
    toast("تم حفظ القائمة","ok");
    logAct("تعديل قائمة الوظائف",key);
    renderJobsPage();
  }catch(e){toastErr(e);}
}

/* ═══ 20) الملف الشخصي ═══ */
function renderProfilePage(){
  const u=state.user;
  if(!u)return;
  const el=$("#page-profile");
  el.innerHTML=`<div class="profile-grid">
    <div class="panel pc">
      ${avatarHTML(u,"xl")}
      <h3 style="font-size:19px;font-weight:900">${esc(u.name)}</h3>
      <div class="muted ltr">${esc(u.username)}</div>
      <div style="margin:8px 0">${u.role==="admin"?'<span class="bdg" style="color:#B45309;background:#FEF3C7">مدير النظام — صلاحية كاملة</span>':scopeChips(u.stages)}</div>
      <div class="pc-rows">
        <div><span>آخر دخول</span><b>${u.lastLogin?fmtDT(u.lastLogin):"—"}</b></div>
        <div><span>عدد المنسوبين في نطاقك</span><b>${state.staff.filter(inScope).length}</b></div>
      </div>
    </div>
    <div class="panel">
      <h3>${icon("lock")} تغيير كلمة المرور</h3>
      <form id="pwForm" class="form-grid">
        <div class="field full"><label>كلمة المرور الحالية</label><input type="password" id="pwOld" class="inp" required autocomplete="current-password"></div>
        <div class="field"><label>الجديدة (6+ أحرف)</label><input type="password" id="pwNew" class="inp" required minlength="6" autocomplete="new-password"></div>
        <div class="field"><label>تأكيد الجديدة</label><input type="password" id="pwNew2" class="inp" required autocomplete="new-password"></div>
        <div class="full"><button class="btn btn-primary" type="submit">${icon("check")} تحديث كلمة المرور</button></div>
      </form>
      <hr class="sep">
      <h3>${icon("cam")} الصورة الشخصية</h3>
      <div class="photo-pick"><div id="prAvatar">${avatarHTML(u)}</div>
        <div class="pp-btns"><label class="btn btn-soft btn-sm">${icon("cam")} تغيير الصورة<input type="file" id="prPhoto" accept="image/*" class="hidden-file"></label></div>
      </div>
    </div>
  </div>`;
  $("#pwForm").onsubmit=async e=>{
    e.preventDefault();
    const old=$("#pwOld").value,nw=$("#pwNew").value,nw2=$("#pwNew2").value;
    if(nw!==nw2)return toast("كلمة التأكيد غير مطابقة","err");
    try{
      const h=await deriveKey(old,u.salt,u.iter||PBKDF2_ITER);
      if(h!==u.hash)return toast("كلمة المرور الحالية غير صحيحة","err");
      const salt=randHex(16);
      const hash=await deriveKey(nw,salt,PBKDF2_ITER);
      await db.doc("accounts/"+u.username).update({salt,iter:PBKDF2_ITER,hash});
      Object.assign(state.user,{salt,iter:PBKDF2_ITER,hash});
      logAct("تغيير كلمة المرور","");
      toast("تم تحديث كلمة المرور بنجاح","ok");
      $("#pwForm").reset();
    }catch(err){toastErr(err);}
  };
  $("#prPhoto").onchange=async e=>{
    const f=e.target.files[0];
    if(!f)return;
    try{
      const photo=await pickPhoto(f);
      await db.doc("accounts/"+u.username).update({photo});
      state.user.photo=photo;
      renderUserChip();
      $("#prAvatar").innerHTML=`<img class="avatar" src="${photo}" alt="">`;
      toast("تم تحديث الصورة","ok");
    }catch(err){toast(String(err),"err");}
  };
}

/* ═══ 21) انطلاق التطبيق ═══ */
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
console.log("%c✔ app.js v4 — الكود سليم ومكتمل التحميل","color:#059669;font-weight:bold");