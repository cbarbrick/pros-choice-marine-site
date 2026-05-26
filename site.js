(function(){
  var boats = [
  {
    "brand": "Nitro",
    "name": "Z21 Pro Bass",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 78990,
    "length": "21'",
    "cat": [
      "fishing",
      "bass"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/711fe6a1c441231b84abf877268496ed.jpeg"
  },
  {
    "brand": "Sun Tracker",
    "name": "Party Barge 22 DLX",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 42995,
    "length": "22'",
    "cat": [
      "pontoon"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/21682452be0c650999f29785d541bb9f.jpeg"
  },
  {
    "brand": "Tracker",
    "name": "Pro Team 175 TXW",
    "tag": "BEST SELLER",
    "tagClass": "gold",
    "price": 24995,
    "length": "17'",
    "cat": [
      "fishing",
      "bass"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/068ec8a296fad6fcf2b4c952c44e3309.jpeg"
  },
  {
    "brand": "Ranger",
    "name": "Z521R Icon",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 97840,
    "length": "21'",
    "cat": [
      "fishing",
      "bass"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/5bd79423fcaec787f28e541fa6548bde.jpeg"
  },
  {
    "brand": "Tahoe",
    "name": "2150 CC",
    "tag": "CERTIFIED USED",
    "tagClass": "",
    "price": 38500,
    "length": "21'",
    "cat": [
      "ski",
      "used"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/17c089ec82d43ec638fcdfcb2857882f.jpeg"
  },
  {
    "brand": "Tahoe",
    "name": "210 S Sport",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 64995,
    "length": "21'",
    "cat": [
      "ski"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/17c089ec82d43ec638fcdfcb2857882f.jpeg"
  },
  {
    "brand": "Sun Tracker",
    "name": "SportFish 22 DLX",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 62995,
    "length": "22'",
    "cat": [
      "pontoon",
      "fishing"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/42a5c62ad1d29a0ef0a358eb62179a8d.jpeg"
  },
  {
    "brand": "Regency",
    "name": "230 LE3",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 82995,
    "length": "23'",
    "cat": [
      "pontoon",
      "ski"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/154dd567b25f73834bea8030e9bf80c0.jpeg"
  },
  {
    "brand": "Regency",
    "name": "250 LE3 Sport",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 89995,
    "length": "25'",
    "cat": [
      "pontoon",
      "ski"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/154dd567b25f73834bea8030e9bf80c0.jpeg"
  },
  {
    "brand": "Triton",
    "name": "189 TRX Bass",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 54900,
    "length": "18'",
    "cat": [
      "fishing",
      "bass"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/ba327d47040eead3e04ddcb23170f47e.jpeg"
  },
  {
    "brand": "Sun Tracker",
    "name": "Fishin Barge 22 XP3",
    "tag": "NEW",
    "tagClass": "gold",
    "price": 48995,
    "length": "22'",
    "cat": [
      "pontoon",
      "fishing"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/42a5c62ad1d29a0ef0a358eb62179a8d.jpeg"
  },
  {
    "brand": "Tracker",
    "name": "Targa V-19 Combo",
    "tag": "USED",
    "tagClass": "",
    "price": 22950,
    "length": "19'",
    "cat": [
      "fishing",
      "used"
    ],
    "img": "https://s3.amazonaws.com/buildercloud/65e2e7bf18b3ab6b8ba5d74698cf7bc2.jpeg"
  }
];
  function qs(sel, root){ return (root || document).querySelector(sel); }
  function qsa(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function money(n){ return '$' + Number(n || 0).toLocaleString(); }
  function escapeHtml(value){ return String(value).replace(/[&<>"]/g, function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]); }); }
  function budgetRange(code){
    return {
      '20-35': { min: 20000, max: 35000, label: '$20k - $35k' },
      '35-55': { min: 35000, max: 55000, label: '$35k - $55k' },
      '55-85': { min: 55000, max: 85000, label: '$55k - $85k' },
      '85+': { min: 85000, max: Infinity, label: '$85k+' }
    }[code] || null;
  }
  function typeLabel(type){
    return ({all:'All styles', fishing:'Fishing', pontoon:'Pontoons', bass:'Bass', ski:'Ski / Wake', used:'Used'})[type] || type;
  }
  function useToFilter(use){
    return ({fishing:'fishing', family:'pontoon', watersports:'ski', mixed:'all'})[use] || 'all';
  }

  var nav = qs('#siteNav');
  var mobToggle = qs('#mobToggle');
  if(mobToggle && nav){
    mobToggle.addEventListener('click', function(){ nav.classList.toggle('open'); });
    qsa('.nav-links a').forEach(function(link){ link.addEventListener('click', function(){ nav.classList.remove('open'); }); });
  }

  function initInventory(){
    var grid = qs('#boatGrid');
    if(!grid) return;
    var chips = qsa('.chip');
    var params = new URLSearchParams(window.location.search);
    var active = params.get('type') || 'all';
    var activeBrand = params.get('brand') || '';
    var activeBudget = params.get('budget') || '';
    var activeBrands = (params.get('brands') || '').split(',').map(function(b){ return b.trim(); }).filter(Boolean);
    var matchMode = params.get('match') === '1';
    function render(){
      chips.forEach(function(chip){ chip.classList.toggle('active', chip.dataset.filter === active && !activeBrand); });
      var budget = budgetRange(activeBudget);
      var brandsToMatch = activeBrand ? [activeBrand] : activeBrands;
      var list = boats.filter(function(b){
        var typeMatch = active === 'all' || b.cat.indexOf(active) !== -1;
        var brandMatch = !brandsToMatch.length || brandsToMatch.some(function(brand){ return b.brand.toLowerCase() === brand.toLowerCase(); });
        var budgetMatch = !budget || (b.price >= budget.min && b.price <= budget.max);
        return typeMatch && brandMatch && budgetMatch;
      }).sort(function(a,b){ return a.price - b.price; });
      if(activeBrand && activeBrand === 'Mercury Engines') list = [];
      var summary = qs('#inventorySummary');
      if(summary){
        var hasFilters = matchMode || active !== 'all' || activeBudget || brandsToMatch.length;
        if(hasFilters){
          var details = [];
          if(active !== 'all') details.push(typeLabel(active));
          if(budget) details.push(budget.label);
          if(brandsToMatch.length) details.push(brandsToMatch.join(', '));
          summary.classList.add('show');
          summary.innerHTML = '<strong>' + (matchMode ? 'Boats matching your Boat Finder results' : 'Filtered inventory') + '</strong><span>' + escapeHtml(details.join(' . ') || 'All featured boats') + ' . ' + list.length + ' featured match' + (list.length === 1 ? '' : 'es') + ' shown.</span>';
        } else {
          summary.classList.remove('show');
          summary.innerHTML = '';
        }
      }
      if(list.length === 0){
        grid.innerHTML = '<div class="tool full"><div class="t-eyebrow">Call For Current Stock</div><h3>' + escapeHtml(matchMode ? 'No Exact Featured Matches' : (activeBrand || 'No Featured Boats')) + '</h3><p class="sub">No featured demo boats fit every selected filter. Clear the filters or call (877) 827-2840 for the latest live availability and incoming models in that price range.</p><a class="btn btn-dark" href="tel:8778272840">Call The Store</a></div>';
        return;
      }
      grid.innerHTML = list.map(function(b){
        return '<article class="boat-card"><div class="boat-img" style="background-image:url(' + b.img + ')"><span class="boat-tag ' + b.tagClass + '">' + escapeHtml(b.tag) + '</span><button class="boat-fav" aria-label="Save ' + escapeHtml(b.name) + '">♡</button></div><div class="boat-body"><div class="boat-brand">' + escapeHtml(b.brand) + '</div><div class="boat-name">' + escapeHtml(b.name) + '</div><div class="boat-specs"><span>' + escapeHtml(b.length) + '</span><span>' + escapeHtml(b.cat.join(' / ')) + '</span></div><div class="boat-foot"><div class="boat-price">' + money(b.price) + '<small>plus tax, title, fees</small></div><a href="contact.html" class="boat-link">Ask</a></div></div></article>';
      }).join('');
    }
    chips.forEach(function(chip){
      chip.addEventListener('click', function(){
        active = chip.dataset.filter;
        activeBrand = '';
        activeBudget = '';
        activeBrands = [];
        matchMode = false;
        window.history.replaceState({}, '', 'inventory.html');
        render();
      });
    });
    render();
  }

  var finderState = {};
  var finderStep = 1;
  function updateFinder(){
    var steps = qsa('.finder-step');
    if(!steps.length) return;
    steps.forEach(function(step){ step.classList.toggle('active', Number(step.dataset.step) === finderStep); });
    var bar = qs('#finderBar');
    if(bar) bar.style.width = Math.min((finderStep - 1) / 5 * 100, 100) + '%';
    var pill = qs('#stepPill');
    if(pill) pill.textContent = finderStep <= 5 ? 'Step ' + finderStep + ' of 5' : 'Recommendation';
    var back = qs('#finderBack');
    if(back) back.style.visibility = finderStep > 1 && finderStep <= 5 ? 'visible' : 'hidden';
  }
  function getRecommendation(){
    var s = finderState;
    var type = 'Versatile Multi-Species Boat';
    var brandList = ['Tracker','Sun Tracker'];
    var size = '18-20 feet';
    var why = 'You want flexibility, easy ownership, and room to grow.';
    if(s.use === 'fishing'){
      if(s.xp === 'pro' || s.budget === '85+') { type = 'Tournament Bass Boat'; brandList = ['Ranger','Nitro','Triton']; size = '20-21 feet'; why = 'You are ready for a tournament-grade fiberglass bass boat.'; }
      else if(s.xp === 'first' || s.budget === '20-35') { type = 'Aluminum Bass / Crappie Boat'; brandList = ['Tracker','Triton']; size = '16-18 feet'; why = 'An aluminum fishing rig is durable, lighter to tow, and easier for a first owner.'; }
      else { type = 'Mid-Range Bass Boat'; brandList = ['Nitro','Triton','Tracker']; size = '18-20 feet'; why = 'This gives you strong fishing features without jumping straight to the highest tier.'; }
    } else if(s.use === 'family'){
      if(s.group === '10+' || s.budget === '85+') { type = 'Luxury Tritoon'; brandList = ['Regency','Sun Tracker']; size = '24-26 feet'; why = 'A premium tritoon is stable, spacious, and comfortable for bigger groups.'; }
      else if(s.group === '6-9') { type = 'Pontoon Boat'; brandList = ['Sun Tracker','Regency']; size = '22-24 feet'; why = 'A pontoon is the practical family lake-day answer.'; }
      else { type = 'Compact Pontoon or Deck Boat'; brandList = ['Sun Tracker','Tahoe']; size = '18-22 feet'; why = 'You get comfort and easy handling without buying more boat than you need.'; }
    } else if(s.use === 'watersports'){
      if(s.budget === '85+') { type = 'Premium Ski / Wake Boat'; brandList = ['Tahoe','Regency']; size = '21-24 feet'; why = 'You will want stronger performance and more room for riders.'; }
      else { type = 'Performance Bowrider'; brandList = ['Tahoe']; size = '19-22 feet'; why = 'A Tahoe bowrider is the sweet spot for tubing, skiing, and cruising.'; }
    } else if(s.use === 'mixed'){
      if(s.group === '6-9' || s.group === '10+') { type = 'Fish & Cruise Pontoon'; brandList = ['Sun Tracker','Regency']; size = '22-24 feet'; why = 'Fishing seats up front and lounging space in back keeps everyone happy.'; }
      else { type = 'Deck Boat / Multi-Species'; brandList = ['Tahoe','Tracker']; size = '19-22 feet'; why = 'It works for fishing in the morning and tubing after lunch.'; }
    }
    return {type:type, brands:brandList, size:size, why:why};
  }
  function showRecommendation(){
    var r = getRecommendation();
    var box = qs('#recBox');
    if(!box) return;
    box.innerHTML = '<div class="rec-h">' + escapeHtml(r.type) + '</div><p style="color:var(--ink-2);font-size:15px;line-height:1.55">' + escapeHtml(r.why) + '</p><div class="rec-grid"><div><div class="label">Best Size</div><div class="val">' + escapeHtml(r.size) + '</div></div><div><div class="label">Comfort</div><div class="val">' + escapeHtml(finderState.group || 'Flexible') + '</div></div><div><div class="label">Use</div><div class="val">' + escapeHtml(finderState.use || 'Mixed') + '</div></div></div><div class="rec-brands">' + r.brands.map(function(b){ return '<span class="rec-brand">' + escapeHtml(b) + '</span>'; }).join('') + '</div>';
    var link = qs('#matchingBoatsLink');
    if(link){
      var query = new URLSearchParams();
      query.set('match', '1');
      query.set('type', useToFilter(finderState.use));
      if(finderState.budget) query.set('budget', finderState.budget);
      if(r.brands.length) query.set('brands', r.brands.join(','));
      link.href = 'inventory.html?' + query.toString();
    }
  }
  qsa('.q-option').forEach(function(btn){
    btn.addEventListener('click', function(){
      var q = btn.dataset.q;
      qsa('.q-option[data-q="' + q + '"]').forEach(function(other){ other.classList.remove('selected'); });
      btn.classList.add('selected');
      finderState[q] = btn.dataset.v;
      if(finderStep < 5){ finderStep += 1; updateFinder(); }
      else { finderStep = 6; showRecommendation(); updateFinder(); }
    });
  });
  var back = qs('#finderBack');
  if(back){ back.addEventListener('click', function(){ if(finderStep > 1){ finderStep -= 1; updateFinder(); } }); }
  window.resetFinder = function(){ finderState = {}; finderStep = 1; qsa('.q-option').forEach(function(btn){ btn.classList.remove('selected'); }); updateFinder(); };
  function initFinderPreset(){
    if(!qsa('.finder-step').length) return;
    var params = new URLSearchParams(window.location.search);
    var presetUse = params.get('use');
    if(!presetUse) return;
    var option = qs('.q-option[data-q="use"][data-v="' + presetUse + '"]');
    if(!option) return;
    finderState.use = presetUse;
    option.classList.add('selected');
    finderStep = 2;
  }
  initFinderPreset();
  updateFinder();

  function initFinancing(){
    var price = qs('#price');
    if(!price) return;
    var down = qs('#down');
    var term = qs('#term');
    var apr = qs('#apr');
    function calc(){
      var p = Number(price.value); var d = Number(down.value); var years = Number(term.value); var rate = Number(apr.value);
      if(d > p){ d = p; down.value = p; }
      var principal = Math.max(p - d, 0);
      var months = years * 12;
      var monthlyRate = rate / 100 / 12;
      var monthly = monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
      qs('#priceVal').textContent = money(p);
      qs('#downVal').textContent = money(d);
      qs('#termVal').textContent = years + ' years';
      qs('#aprVal').textContent = rate.toFixed(2) + '%';
      qs('#monthly').textContent = money(Math.round(monthly));
      qs('#totalPaid').textContent = 'Total: ' + money(Math.round(monthly * months)) + ' over ' + months + ' mo';
    }
    [price,down,term,apr].forEach(function(input){ input.addEventListener('input', calc); });
    calc();
  }

  function initTrade(){
    var btn = qs('#tiBtn');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var year = Number(qs('#tiYear').value);
      var make = qs('#tiMake').value;
      var length = Number(qs('#tiLength').value);
      var condition = Number(qs('#tiCondition').value);
      if(!year || !make || !length || !condition){ alert('Fill out year, make, length, and condition first.'); return; }
      var baseByMake = {'Ranger':4200,'Nitro':3500,'Triton':3200,'Tracker':2200,'Sun Tracker':2400,'Regency':4000,'Tahoe':2600,'Bass Cat':4500,'Lund':2800,'Bayliner':2100,'Lowe':2000,'Other':2200};
      var age = Math.max(2026 - year, 0);
      var base = (baseByMake[make] || 2200) * length;
      var dep = Math.pow(0.91, age);
      var mid = base * dep * condition;
      var low = Math.round(mid * 0.86 / 100) * 100;
      var high = Math.round(mid * 1.14 / 100) * 100;
      qs('#tradeRange').textContent = money(low) + ' - ' + money(high);
      qs('#tradeResult').classList.add('show');
    });
  }

  var calDate = new Date();
  var selectedDate = null;
  function initCalendar(){
    var calendar = qs('#calendar');
    if(!calendar) return;
    renderCalendar();
  }
  function renderCalendar(){
    var calendar = qs('#calendar');
    var monthLabel = qs('#calMonth');
    if(!calendar || !monthLabel) return;
    var year = calDate.getFullYear();
    var month = calDate.getMonth();
    monthLabel.textContent = calDate.toLocaleString(undefined, {month:'long', year:'numeric'});
    calendar.innerHTML = '';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(function(d){ var el = document.createElement('div'); el.className = 'cal-dow'; el.textContent = d; calendar.appendChild(el); });
    var first = new Date(year, month, 1).getDay();
    var days = new Date(year, month + 1, 0).getDate();
    var today = new Date(); today.setHours(0,0,0,0);
    for(var i = 0; i < first; i++){ var blank = document.createElement('div'); blank.className = 'cal-day disabled'; calendar.appendChild(blank); }
    for(var day = 1; day <= days; day++){
      var date = new Date(year, month, day);
      var dow = date.getDay();
      var disabled = dow === 0 || dow === 1 || date < today;
      var cell = document.createElement('button');
      cell.type = 'button'; cell.className = 'cal-day' + (disabled ? ' disabled' : ''); cell.textContent = day;
      if(date.getTime() === today.getTime()) cell.classList.add('today');
      if(selectedDate && date.toDateString() === selectedDate.toDateString()) cell.classList.add('selected');
      if(!disabled){ cell.addEventListener('click', (function(d){ return function(){ selectedDate = d; renderCalendar(); }; })(date)); }
      calendar.appendChild(cell);
    }
  }
  window.navMonth = function(delta){ calDate = new Date(calDate.getFullYear(), calDate.getMonth() + delta, 1); renderCalendar(); };
  window.confirmService = function(){
    var confirm = qs('#svcConfirm');
    var error = qs('#svcError');
    if(!confirm) return;
    var name = (qs('#svcName') && qs('#svcName').value.trim()) || '';
    var phone = (qs('#svcPhone') && qs('#svcPhone').value.trim()) || '';
    var email = (qs('#svcEmail') && qs('#svcEmail').value.trim()) || '';
    function showServiceError(message, target){
      if(error){
        error.textContent = message;
        error.classList.add('show');
      } else {
        alert(message);
      }
      confirm.classList.remove('show');
      if(target) target.focus();
    }
    if(error){
      error.textContent = '';
      error.classList.remove('show');
    }
    if(!name){ showServiceError('Please enter your name so the service team knows who to confirm with.', qs('#svcName')); return; }
    if(!phone && !email){ showServiceError("Please enter a phone number or email so Pro's Choice can call, text, or email to confirm.", qs('#svcPhone')); return; }
    if(!selectedDate){ showServiceError('Pick an available Tuesday-Saturday service day first.', qs('#calendar')); return; }
    var method = phone ? 'text or call' : 'email';
    confirm.innerHTML = '<strong>Request received, ' + escapeHtml(name) + ".</strong> We'll " + method + ' within one business day to confirm.';
    confirm.classList.add('show');
  };

  function initNewsletter(){
    var form = qs('#newsletterForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var button = form.querySelector('button');
      button.textContent = 'You are subscribed';
      button.disabled = true;
    });
  }

  function initHeroVideo(){
    var frame = qs('#heroVideo');
    if(!frame || !frame.contentWindow) return;
    function command(func, args){
      try {
        frame.contentWindow.postMessage(JSON.stringify({event:'command', func:func, args:args || []}), '*');
      } catch (err) {}
    }
    frame.addEventListener('load', function(){
      command('mute');
      command('seekTo', [8, true]);
      command('playVideo');
    });
    setTimeout(function(){ command('mute'); command('seekTo', [8, true]); command('playVideo'); }, 900);
    setTimeout(function(){ command('playVideo'); }, 2500);
  }

  function initChat(){
    var chatBtn = qs('#chatBtn');
    var chatWindow = qs('#chatWindow');
    var chatClose = qs('#chatClose');
    var messages = qs('#chatMessages');
    var quick = qs('#quickReplies');
    var input = qs('#chatInput');
    var send = qs('#chatSend');
    if(!chatBtn || !chatWindow || !messages || !quick || !input || !send) return;
    var guide = {active:false, step:0, answers:{}};
    var firstReplies = ['First-time buyer guide','See inventory','Financing','Service appointment','Trade-in value'];
    function add(text, who){ var d = document.createElement('div'); d.className = 'msg ' + (who || 'bot'); d.innerHTML = text; messages.appendChild(d); messages.scrollTop = messages.scrollHeight; }
    function setReplies(items){ quick.innerHTML = ''; items.forEach(function(item){ var b = document.createElement('button'); b.type = 'button'; b.textContent = item; b.addEventListener('click', function(){ handle(item); }); quick.appendChild(b); }); }
    function openChat(){ chatWindow.classList.add('open'); if(!messages.children.length){ add('Hi. I can help first-time buyers pick a boat, show inventory, estimate payments, or route you to service and trade-in tools.'); setReplies(firstReplies); } input.focus(); }
    function route(page){ window.location.href = page; }
    function startGuide(){ guide = {active:true, step:1, answers:{}}; add('Great. First question: what do you want to do most on the water?'); setReplies(['Fishing','Family cruising','Tubing / skiing','A little of everything']); }
    function guideAnswer(text){
      if(guide.step === 1){ guide.answers.use = text; guide.step = 2; add('Who is usually coming with you?'); setReplies(['1-2 people','3-5 people','6-9 people','10+ people']); return; }
      if(guide.step === 2){ guide.answers.group = text; guide.step = 3; add('What budget feels comfortable before taxes and fees?'); setReplies(['$20k-$35k','$35k-$55k','$55k-$85k','$85k+']); return; }
      guide.answers.budget = text; guide.active = false;
      var use = guide.answers.use.toLowerCase();
      var group = guide.answers.group;
      var pick = 'Tracker multi-species boat or Tahoe deck boat';
      if(use.indexOf('fishing') !== -1) pick = text.indexOf('85') !== -1 ? 'Nitro, Ranger, or Triton bass boat' : 'Tracker or Triton aluminum fishing boat';
      if(use.indexOf('family') !== -1) pick = group.indexOf('6') !== -1 || group.indexOf('10') !== -1 ? 'Sun Tracker or Regency pontoon' : 'Sun Tracker pontoon or Tahoe deck boat';
      if(use.indexOf('tubing') !== -1) pick = 'Tahoe sport boat';
      add('Best first look: <strong>' + pick + '</strong>. The full Boat Finder can give you a tighter match by water type and experience level.');
      setReplies(['Open full finder','See inventory','Financing','Talk to someone']);
    }
    function handle(text){
      add(escapeHtml(text), 'user');
      var lower = text.toLowerCase();
      if(guide.active){ guideAnswer(text); return; }
      if(lower.indexOf('first-time') !== -1 || lower.indexOf('first boat') !== -1 || lower.indexOf('boat finder') !== -1){ startGuide(); return; }
      if(lower.indexOf('open full finder') !== -1){ route('boat-finder.html'); return; }
      if(lower.indexOf('inventory') !== -1 || lower.indexOf('boats') !== -1){ route('inventory.html'); return; }
      if(lower.indexOf('pontoon') !== -1 || lower.indexOf('family') !== -1){ add('For family days, start with <strong>Sun Tracker</strong> and <strong>Regency</strong> pontoons, or a <strong>Tahoe</strong> deck boat for more watersports.'); setReplies(['Open full finder','See pontoons','Financing']); return; }
      if(lower.indexOf('fishing') !== -1 || lower.indexOf('bass') !== -1){ add('For fishing, start with <strong>Tracker</strong>, <strong>Nitro</strong>, <strong>Triton</strong>, or <strong>Ranger</strong>.'); setReplies(['Open full finder','See bass boats','Talk to someone']); return; }
      if(lower.indexOf('financ') !== -1 || lower.indexOf('payment') !== -1){ route('financing.html'); return; }
      if(lower.indexOf('service') !== -1 || lower.indexOf('repair') !== -1 || lower.indexOf('storage') !== -1){ route('service.html'); return; }
      if(lower.indexOf('trade') !== -1 || lower.indexOf('sell') !== -1){ route('sell-trade.html'); return; }
      if(lower.indexOf('used') !== -1){ route('inventory.html?type=used'); return; }
      if(lower.indexOf('pontoons') !== -1){ route('inventory.html?type=pontoon'); return; }
      if(lower.indexOf('bass boats') !== -1){ route('inventory.html?type=bass'); return; }
      if(lower.indexOf('specialist') !== -1 || lower.indexOf('talk') !== -1){
        add('Absolutely. I can get you ready for a specialist. Tell me whether you want help with <strong>availability, payments, trade-in, or scheduling a visit</strong>. You can also call <strong><a href="tel:8778272840">(877) 827-2840</a></strong>.');
        setReplies(['Check availability','Financing','Trade-in value','Store hours']);
        return;
      }
      if(lower.indexOf('phone') !== -1 || lower.indexOf('hours') !== -1){ add('Best number is <strong><a href="tel:8778272840">(877) 827-2840</a></strong>. Store hours are Tuesday-Saturday, 8AM-5PM.'); setReplies(firstReplies); return; }
      add('I can help with the first-time buyer guide, inventory, payments, trade-in value, service, or store hours.');
      setReplies(firstReplies);
    }
    chatBtn.addEventListener('click', openChat);
    chatClose.addEventListener('click', function(){ chatWindow.classList.remove('open'); });
    send.addEventListener('click', function(){ var value = input.value.trim(); if(!value) return; input.value = ''; handle(value); });
    input.addEventListener('keydown', function(e){ if(e.key === 'Enter') send.click(); });
    qsa('[data-chat]').forEach(function(btn){ btn.addEventListener('click', function(event){ event.preventDefault(); openChat(); handle(btn.dataset.chat); }); });
  }

  initInventory();
  initFinancing();
  initTrade();
  initCalendar();
  initNewsletter();
  initHeroVideo();
  initChat();
})();
