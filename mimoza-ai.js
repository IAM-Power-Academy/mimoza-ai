/* Mimoza AI · IAM Power Academy · ngarkohet nga GitHub */
(function(){
  if (document.getElementById('mz-root')) return;
  var st = document.createElement('style'); st.textContent = "#mz-btn{position:fixed;right:20px;bottom:20px;z-index:99999;background:#6b3fa0;color:#fff;border:0;border-radius:30px;padding:14px 20px;font:600 15px system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}\n#mz-box{position:fixed;right:20px;bottom:80px;width:360px;max-width:calc(100vw - 24px);height:520px;max-height:calc(100vh - 110px);z-index:99999;background:#fff;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,.28);display:none;flex-direction:column;overflow:hidden;font:15px/1.45 system-ui,sans-serif;color:#222}\n#mz-box.open{display:flex}\n#mz-head{background:#6b3fa0;color:#fff;padding:14px 16px;font-weight:600;display:flex;justify-content:space-between}\n#mz-head span{cursor:pointer}\n#mz-msgs{flex:1;overflow-y:auto;padding:12px;background:#f7f4fb}\n.mz-m{margin:8px 0;padding:10px 12px;border-radius:12px;max-width:88%;white-space:pre-wrap;word-wrap:break-word}\n.mz-b{background:#fff;border:1px solid #e6dff0}\n.mz-u{background:#6b3fa0;color:#fff;margin-left:auto}\n.mz-m a{color:inherit;text-decoration:underline}\n#mz-q{padding:6px 10px;display:flex;flex-wrap:wrap;gap:6px;background:#f7f4fb}\n#mz-q button{border:1px solid #6b3fa0;background:#fff;color:#6b3fa0;border-radius:16px;padding:6px 10px;font-size:13px;cursor:pointer}\n#mz-form{display:flex;border-top:1px solid #e6dff0}\n#mz-in{flex:1;border:0;padding:12px;font:15px system-ui,sans-serif;outline:none}\n#mz-send{border:0;background:#6b3fa0;color:#fff;padding:0 16px;cursor:pointer}";
  document.head.appendChild(st);
  var r = document.createElement('div'); r.id = 'mz-root'; document.body.appendChild(r);
})();
(function () {
  var CONFIG = {
    // Adresa e shërbimit që thërret modelin. Lëre bosh për modalitetin pa AI.
    // Pret POST {messages:[{role,content}]} dhe kthen {reply:"..."}.
    endpoint: "",
    whatsapp: "https://wa.me/38976432315",
    email: "info@iampower.al",
    // Opsionale: adresa ku dërgohet njoftimi kur klienti është gati për blerje.
    notifyUrl: ""
  };

  var OFFERS = "Paketat aktuale në iampower.al (çmimi i ofertës sipas faqes, në kllapa çmimi normal):\n\n" +
    "PAKOT KRYESORE\n" +
    "• Pako 1: Paratë Rrjedhin, 20 € (normal 29 €), qasje 5 vjet\nhttps://iampower.al/product/parate-rrjedhin/\n\n" +
    "• Pako 2: Masterclass IAM Power, 69 € (normal 99 €), qasje 1 vit, Zoom live 2 herë në muaj me Mimozën\nhttps://iampower.al/product/masterclass-iam-power/\n\n" +
    "• Pako 3: 40 Ditë Çlirim Shpirtëror, 105 € (normal 150 €), 40 ditë + 5 vjet qasje\nhttps://iampower.al/product/40-dite-clirim-shpirteror/\n\n" +
    "PAKOT E THELLA\n" +
    "• Fuqia Brenda Teje, 240 € (normal 349 €), 18 kurse\nhttps://iampower.al/product/fuqia-brenda-teje/\n\n" +
    "• Qetësia e Shpirtit, 275 € (normal 397 €), 16 kurse\nhttps://iampower.al/product/qetesia-e-shpirtit/\n\n" +
    "• Biznesi Yt, 485 € (normal 697 €), 10 kurse\nhttps://iampower.al/product/biznesi-yt/\n\n" +
    "CERTIFIKIM\n" +
    "• Life Coach i Certifikuar · Porta 01, 720 € (normal 800 €)\nhttps://iampower.al/product/life-coach-i-certifikuar-%c2%b7-porta-01/\n\n" +
    "• Arkitekti i Universit 1:1 me Mimozën, nga 1,200 €, vetëm me aplikim\nhttps://iampower.al/aplikim-arkitekti-i-universit/\n" +
    "Bonus 27–29 nëntor: kush pranohet merr falas Life Coach i Certifikuar (vlerë 800 €). Vetëm 10 vende.\n\n" +
    "FALAS: Niveli 0 dhe një meditim.\n\n" +
    "Më trego çfarë po të bllokon tani, dhe të them cila paketë të përshtatet.";

  var REGISTER = "Si blihet hap pas hapi:\n\n" +
    "1. Zgjidh paketën (shih ofertat) dhe hape faqen e saj.\n" +
    "2. Ndiq blerjen në faqe ose përmes lidhjes Ko-fi të paketës.\n" +
    "3. Llogari e re: https://iampower.al/regjistrimi/ · ke llogari: https://iampower.al/logohu/\n" +
    "4. Arkitekti i Universit nuk blihet direkt, vetëm me aplikim: https://iampower.al/aplikim-arkitekti-i-universit/\n\n" +
    "Një klikim në WhatsApp nuk është regjistrim i përfunduar. Për pyetje: " + CONFIG.whatsapp;

  var FREE = "Falas mund të marrësh Nivelin 0 dhe një meditim, pa pagesë. Gjeje në https://iampower.al/ ose më shkruaj në WhatsApp " + CONFIG.whatsapp + " dhe ekipi ta dërgon.\n\nNë cilën fushë do ta ndiesh veten më të bllokuar tani?";

  var TEAM = "Për pagesë me këste flet me një anëtar të skuadrës sonë, që ta rregullojë me ty. Zgjidh sipas vendit ku jeton:\n\n" +
    "• Shqipëri: Anila +355 67 615 1349 https://wa.me/355676151349\n" +
    "• Kosovë: Teuta +383 44 236 427 https://wa.me/38344236427 · Zejnepe +383 44 586 153 https://wa.me/38344586153\n" +
    "• Itali: Alda +39 371 622 6702 https://wa.me/393716226702\n" +
    "• Francë: Leonora +33 6 69 11 67 93 https://wa.me/33669116793\n\n" +
    "Nëse jeton gjetkë, shkruaj Anilës.";

  // Anëtarët e skuadrës në radhë. Çdo pyetje pa përgjigje shkon te anëtari tjetër.
  var MEMBERS = [
    { name: "Alda", phone: "+39 371 622 6702", wa: "https://wa.me/393716226702" },
    { name: "Anila", phone: "+355 67 615 1349", wa: "https://wa.me/355676151349" },
    { name: "Leonora", phone: "+33 6 69 11 67 93", wa: "https://wa.me/33669116793" },
    { name: "Teuta", phone: "+383 44 236 427", wa: "https://wa.me/38344236427" },
    { name: "Zejnepe", phone: "+383 44 586 153", wa: "https://wa.me/38344586153" }
  ];
  // Radha ruhet në shfletuesin e vizitorit, me fillim të rastësishëm, që ngarkesa të shpërndahet.
  var turn = Math.floor(Math.random() * MEMBERS.length);
  try {
    var saved = parseInt(localStorage.getItem("mz_turn"), 10);
    if (!isNaN(saved)) turn = saved;
  } catch (e) {}
  function nextMember() {
    var m = MEMBERS[turn % MEMBERS.length];
    turn = (turn + 1) % MEMBERS.length;
    try { localStorage.setItem("mz_turn", String(turn)); } catch (e) {}
    return m;
  }
  function fallback() {
    var m = nextMember();
    return "Këtë pyetje po ta lidh menjëherë me " + m.name + " nga skuadra jonë, që të përgjigjet saktë:\n" + m.phone + "\n" + m.wa;
  }

  // Tema të ndjeshme shëndetësore: gjithmonë njoftim i qartë, pa shitje dhe pa rrotullim te skuadra.
  var CRISIS_RE = /vetëvra|vetevra|vetëlënd|vetelend|dua t[eë] vdes|mos jetoj|t[eë] mbyt veten|mbyt veten/i;
  var SENSITIVE_RE = /depresion|ankth|ankthi|panik|trauma|çrregullim|crregullim|mendor|psikik|psikolog|psikiatr|dëshpër|deshper|stres i r[eë]nd|burnout/i;
  var NOTICE = "Të falënderoj që e ndave këtë me mua.\n\n" +
    "Së pari, siç kërkon ligji: IAM Power nuk është shërbim mjekësor apo psikologjik. Nuk bën diagnoza, nuk trajton çrregullime dhe nuk zëvendëson mjekun, psikologun ose psikiatrin.\n\n" +
    "IAM Power është ndihmë për zhvillim personal. Sipas udhëzimeve përkatëse të psikologut, ajo mund të jetë vetëm një ndihmë shtesë në këtë rrugëtim, jo zgjidhja kryesore. Nëse ke diagnozë ose je në trajtim, ndiq udhëzimet e specialistit tënd.\n\n" +
    "Nëse ndihesh keq ose gjendja po të rëndohet, flit sa më shpejt me mjekun ose psikologun tënd. Në rast urgjence telefono 112.\n\n" +
    "Nëse dëshiron, të tregoj diçka falas për zhvillim personal, ose të lidh me ekipin për pyetje.";
  var CRISIS = "Më vjen keq që po kalon kaq vështirë, dhe mirë që e the. Shëndeti dhe siguria jote vijnë para çdo gjëje tjetër.\n\n" +
    "Të lutem telefono tani 112 (urgjenca) ose shko te mjeku më i afërt, dhe thuaji një personi të afërt që të rrijë me ty. Mos qëndro vetëm.\n\n" +
    "IAM Power nuk është shërbim mjekësor apo psikologjik dhe nuk mund ta zëvendësojë ndihmën urgjente profesionale.";

  var root = document.getElementById("mz-root");
  root.innerHTML =
    '<button id="mz-btn">Fol me Mimozën AI</button>' +
    '<div id="mz-box"><div id="mz-head">Mimoza AI · IAM Power <span id="mz-x">✕</span></div>' +
    '<div id="mz-msgs"></div><div id="mz-q"></div>' +
    '<form id="mz-form"><input id="mz-in" placeholder="Shkruaj pyetjen tënde..." autocomplete="off"><button id="mz-send">Dërgo</button></form></div>';

  var box = document.getElementById("mz-box"), msgs = document.getElementById("mz-msgs"),
      q = document.getElementById("mz-q"), input = document.getElementById("mz-in");
  var history = [], greeted = false;

  function linkify(t) {
    var s = t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return s.replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }
  function add(role, text) {
    var d = document.createElement("div");
    d.className = "mz-m " + (role === "user" ? "mz-u" : "mz-b");
    d.innerHTML = linkify(text);
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }
  function bot(text) { history.push({ role: "assistant", content: text }); add("bot", text); }

  function quick() {
    q.innerHTML = "";
    [["Gjej paketën për mua", "match"], ["Ofertat aktuale", "offers"], ["Si regjistrohem?", "reg"], ["Pagesë me këste", "installments"], ["Diçka falas", "free"], ["Fol me ekipin", "team"]].forEach(function (b) {
      var x = document.createElement("button"); x.textContent = b[0];
      x.onclick = function () { handle(b[1], b[0]); };
      q.appendChild(x);
    });
  }

  function handle(key, label) {
    add("user", label); history.push({ role: "user", content: label });
    if (key === "match") bot("Me kënaqësi! Tregomë me fjalët e tua: çfarë po të bllokon ose çfarë dëshiron të ndryshosh tani (para, emocione, vetëbesim, qetësi, biznes, certifikim)? Sipas asaj që më thua, të tregoj cila paketë të përshtatet.");
    else if (key === "offers") bot(OFFERS);
    else if (key === "reg") bot(REGISTER);
    else if (key === "installments") bot(TEAM);
    else if (key === "free") bot(FREE);
    else bot(fallback());
  }

  function ask(text) {
    add("user", text); history.push({ role: "user", content: text });
    if (CRISIS_RE.test(text)) { bot(CRISIS); return; }
    if (SENSITIVE_RE.test(text)) { bot(NOTICE); return; }
    if (!CONFIG.endpoint) { bot(/k[eë]st|me rata|paguaj.*pjes/i.test(text) ? TEAM : fallback()); return; }
    var wait = document.createElement("div"); wait.className = "mz-m mz-b"; wait.textContent = "…"; msgs.appendChild(wait);
    fetch(CONFIG.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-12), nextMember: MEMBERS[turn % MEMBERS.length] }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        wait.remove();
        var reply = (d && d.reply) || fallback();
        if (reply.indexOf("[LIDH_ME_SKUADREN]") > -1) {
          reply = reply.replace("[LIDH_ME_SKUADREN]", "").trim();
          nextMember(); // radha ecën para pyetjes tjetër
        }
        if (reply.indexOf("[GATI_PER_BLERJE]") > -1) {
          reply = reply.replace("[GATI_PER_BLERJE]", "").trim();
          if (CONFIG.notifyUrl) {
            try { fetch(CONFIG.notifyUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "gati_per_blerje", page: location.href, transcript: history.slice(-12) }) }); } catch (e) {}
          }
        }
        bot(reply);
      })
      .catch(function () { wait.remove(); bot(fallback()); });
  }

  function open() {
    box.classList.add("open");
    if (!greeted) {
      greeted = true;
      bot("Përshëndetje! Jam Mimoza AI, asistentja virtuale e IAM Power Academy. Të ndihmoj të gjesh paketën që të përshtatet, të tregoj ofertat dhe si të regjistrohesh. Çfarë të sjell këtu sot?");
      quick();
    }
  }
  document.getElementById("mz-btn").onclick = function () { box.classList.contains("open") ? box.classList.remove("open") : open(); };
  document.getElementById("mz-x").onclick = function () { box.classList.remove("open"); };
  document.getElementById("mz-form").onsubmit = function (e) {
    e.preventDefault(); var t = input.value.trim(); if (!t) return; input.value = ""; ask(t);
  };
})();
