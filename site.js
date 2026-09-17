/* Grey Wave — site behavior. The site reads fine without this file.
   Everything a volunteer might need to change lives in GW below. */
window.GW = {
  serviceTime: "",                 // e.g. "10:00 AM". Blank shows "Sunday mornings".
  previewStart: "2026-09-13",      // first preview Sunday
  previewWeeks: 12,                // Sept 13 – Nov 29, 2026
  launchNote: "Official launch date coming soon",
  formEndpoint: "",                // e.g. "https://formspree.io/f/abcd1234". Blank falls back to email.
  email: "hello@greywavechurch.org",
  phone: ""                        // e.g. "(815) 555-0100". Blank hides phone lines.
};

(function(){
  var GW=window.GW, root=document.documentElement, D=document;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s,c){return (c||D).querySelector(s)}
  function $$(s,c){return Array.prototype.slice.call((c||D).querySelectorAll(s))}
  function fmt(d,o){return d.toLocaleDateString('en-US',o||{month:'short',day:'numeric'})}
  function addDays(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x}
  function parseLocal(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2])}
  var today=new Date(); today.setHours(0,0,0,0);

  /* ---- config → page text ---- */
  var timeText=GW.serviceTime?('Sundays at '+GW.serviceTime):'Sunday mornings';
  $$('[data-gw="time"]').forEach(function(el){el.textContent=timeText});
  $$('[data-gw="email"]').forEach(function(el){el.textContent=GW.email;if(el.tagName==='A')el.href='mailto:'+GW.email});
  $$('[data-gw="phone"]').forEach(function(el){
    if(GW.phone){el.textContent=GW.phone;if(el.tagName==='A')el.href='tel:'+GW.phone.replace(/[^\d+]/g,'')}
    else{var li=el.closest('li,p,div.item');(li||el).style.display='none'}
  });
  $$('[data-gw="launch"]').forEach(function(el){el.textContent=GW.launchNote});

  /* ---- preview Sunday math ---- */
  var start=parseLocal(GW.previewStart), sundays=[];
  for(var i=0;i<GW.previewWeeks;i++) sundays.push(addDays(start,i*7));
  var last=sundays[sundays.length-1];
  var next=null; for(i=0;i<sundays.length;i++){ if(sundays[i]>=today){next=sundays[i];break} }
  var done=sundays.filter(function(s){return s<today}).length;
  if(!next){ // after the preview run: next Sunday from today
    next=new Date(today); next.setDate(next.getDate()+((7-next.getDay())%7));
  }
  var daysAway=Math.round((next-today)/864e5);

  $$('[data-gw="next-n"]').forEach(function(el){el.textContent=daysAway===0?'Today':String(daysAway)});
  $$('[data-gw="next-label"]').forEach(function(el){el.textContent=daysAway===0?'It’s today':(daysAway===1?'day away':'days away')});
  $$('[data-gw="next-date"]').forEach(function(el){el.textContent=fmt(next,{weekday:'long',month:'long',day:'numeric'})});
  $$('[data-gw="next-short"]').forEach(function(el){el.textContent=fmt(next)});
  $$('[data-gw="done"]').forEach(function(el){el.textContent=String(done)});
  $$('[data-gw="weeks"]').forEach(function(el){el.textContent=String(GW.previewWeeks)});
  $$('[data-gw="range"]').forEach(function(el){el.textContent=fmt(start,{month:'long',day:'numeric'})+' – '+fmt(last,{month:'long',day:'numeric',year:'numeric'})});

  /* tracker */
  var dots=$('[data-gw="dots"]');
  if(dots){
    dots.innerHTML='';
    sundays.forEach(function(s,idx){
      var d=D.createElement('div'); d.className='dot'+(s<today?' done':(s.getTime()===next.getTime()?' next':''));
      d.setAttribute('aria-label','Preview Sunday '+(idx+1)+', '+fmt(s)+(s<today?', done':''));
      d.innerHTML='<span>'+(idx+1)+'</span><small>'+fmt(s)+'</small>';
      dots.appendChild(d);
    });
    var bar=$('[data-gw="bar"]'); if(bar){ setTimeout(function(){bar.style.width=Math.round(done/GW.previewWeeks*100)+'%'},400); }
  }

  /* events page: generate preview Sunday list */
  var EXTRA={0:'Where it started. Twelve people, one of whom had said no to church for forty years.',3:'Bring-a-Friend Sunday (proposed). Think of one person who used to go and stopped.',5:'Baptism Sunday (proposed). It is never too late.',10:'Thanksgiving meal after the service (proposed). No cooking required.',11:'Last preview Sunday. We’ll tell you what happens next.'};
  var evList=$('[data-gw="sunday-list"]');
  if(evList){
    evList.innerHTML='';
    sundays.forEach(function(s,idx){
      var cls='event'+(s<today?' past':(s.getTime()===next.getTime()?' next':''));
      var extra=EXTRA[idx]||'';
      evList.insertAdjacentHTML('beforeend','<div class="'+cls+'"><div class="date"><span>'+fmt(s,{month:'short'})+'</span><b>'+s.getDate()+'</b></div><div><h3>Preview Sunday '+(idx+1)+(s.getTime()===next.getTime()?'<span class="tag">Next up</span>':'')+'</h3><div class="meta">'+timeText+' · Adventure Christian Church</div><p>'+(extra||'Coffee, a few songs you know, a 25-minute talk, communion, and conversation after.')+'</p></div></div>');
    });
  }

  /* ---- header ---- */
  var hdr=$('header');
  function onScroll(){ if(hdr) hdr.classList.toggle('scrolled',window.scrollY>10); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  var mb=$('.menu-btn'), nav=$('nav.main');
  if(mb&&nav){ mb.addEventListener('click',function(){ var open=nav.classList.toggle('open'); mb.setAttribute('aria-expanded',String(open)); mb.textContent=open?'Close':'Menu'; }); }
  // mark current page
  var path=location.pathname.replace(/index\.html$/,'');
  $$('nav.main a').forEach(function(a){ var h=a.getAttribute('href'); if(h&&h!=='/'&&path.indexOf(h)===0) a.setAttribute('aria-current','page'); });

  /* text size: one button that cycles normal -> large -> largest */
  var SIZES=['normal','large','xlarge'], NAMES={normal:'normal',large:'larger',xlarge:'largest'};
  var sb=$('.sizer-btn');
  function applySize(s){
    if(s==='normal'){root.removeAttribute('data-size')}else{root.setAttribute('data-size',s)}
    if(sb){ var nx=SIZES[(SIZES.indexOf(s)+1)%3]; sb.setAttribute('aria-label','Text size: '+NAMES[s]+'. Click for '+(nx==='normal'?'normal size':NAMES[nx]+' text')+'.'); sb.title=nx==='normal'?'Back to normal text':'Make text larger'; }
  }
  var cur='normal';
  try{ var saved=localStorage.getItem('gw-size'); if(SIZES.indexOf(saved)>-1){cur=saved} }catch(e){}
  applySize(cur);
  if(sb) sb.addEventListener('click',function(){ cur=SIZES[(SIZES.indexOf(cur)+1)%3]; applySize(cur); try{localStorage.setItem('gw-size',cur)}catch(e){} });

  /* ---- reveal on scroll ---- */
  var rv=$$('.rv');
  if(rv.length){
    if(reduce||!('IntersectionObserver' in window)){ rv.forEach(function(el){el.classList.add('in')}); }
    else{
      var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -8% 0px',threshold:.08});
      rv.forEach(function(el){io.observe(el)});
    }
  }

  /* ---- count-up stats ---- */
  var nums=$$('[data-count]');
  function countUp(el){
    var target=+el.dataset.count, suffix=el.dataset.suffix||'', dur=1400, t0=null;
    if(reduce){ el.firstChild.textContent=target.toLocaleString()+suffix; return; }
    function step(t){ if(!t0)t0=t; var p=Math.min((t-t0)/dur,1); var v=Math.round(target*(1-Math.pow(1-p,3))); el.firstChild.textContent=v.toLocaleString()+suffix; if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if(nums.length){
    if('IntersectionObserver' in window){
      var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); io2.unobserve(e.target);} }); },{threshold:.4});
      nums.forEach(function(el){io2.observe(el)});
    } else nums.forEach(countUp);
  }

  /* ---- "Is this for me?" cards ---- */
  $$('.fy').forEach(function(b){
    b.addEventListener('click',function(){ var on=b.getAttribute('aria-expanded')==='true'; b.setAttribute('aria-expanded',String(!on)); });
  });

  /* ---- gifts picker ---- */
  var GIFTS={
    'Cooking':['Meals for people who just got home from the hospital','A pot of soup shows up at the door and someone knows they were thought of.'],
    'Fixing things':['A handyman list for widows and neighbors','A gutter, a faucet, a ceiling fan. Forty years of know-how, one Saturday morning at a time.'],
    'Listening':['Coffee with whoever’s sitting alone','Some people haven’t been asked a real question in months. You’d be the one who asks.'],
    'Numbers':['Keeping the church’s books honest','A new church needs someone who reads a spreadsheet the way other people read a novel.'],
    'Driving':['Sunday rides for people who’ve stopped driving','Not driving is the number-one reason older adults stop going anywhere. You’d fix that for someone.'],
    'Teaching':['Leading a weekday Bible conversation','Not a lecture. A table, a passage, and good questions. You already know how to do that.'],
    'Praying':['The team that reads every prayer request','Someone reads each one and actually prays. That would be you.'],
    'Music':['Songs people can actually sing','Hymns and songs people know by heart, played at a volume that invites them in.'],
    'Gardening':['Flowers on the table, tomatoes at the door','Small, living, generous things. The kind people notice.'],
    'Organizing':['Making Sunday run without anyone noticing','Name tags, sign-ups, coffee counts, the calendar. The quiet work that makes a place feel cared for.'],
    'Telling stories':['Sharing your story on a Sunday','Sixty-some years of life is a library. Some chapters need to be read out loud.'],
    'Writing':['Notes, cards, and the weekly email','A handwritten card still lands harder than any text message. You’d write them.'],
    'Hosting':['Opening your home for a group','Eight people, your dining table, a Tuesday. It is how churches have started for two thousand years.'],
    'Building':['Setting up and tearing down every Sunday','Chairs, signs, the coffee station. A church in a borrowed room needs strong backs and steady hands.'],
    'Visiting':['Showing up for people who can’t get out','Hospital rooms, care homes, living rooms. Presence is the ministry.']
  };
  var chips=$('[data-gw="chips"]'), out=$('[data-gw="gift-out"]');
  if(chips&&out){
    var picked=[];
    Object.keys(GIFTS).forEach(function(g){
      var b=D.createElement('button'); b.type='button'; b.className='chipbtn'; b.textContent=g; b.setAttribute('aria-pressed','false');
      b.addEventListener('click',function(){
        var i=picked.indexOf(g);
        if(i>-1){picked.splice(i,1); b.setAttribute('aria-pressed','false');}
        else if(picked.length<3){picked.push(g); b.setAttribute('aria-pressed','true');}
        $$('.chipbtn',chips).forEach(function(c){ c.disabled=picked.length>=3&&c.getAttribute('aria-pressed')!=='true'; });
        render();
      });
      chips.appendChild(b);
    });
    function render(){
      if(!picked.length){ out.innerHTML='<div class="count">Pick up to three</div><h3>Here’s where that could fit.</h3><p class="empty">Choose a few things you’re good at and we’ll show you what they could look like at a brand-new church. No sign-up, no obligation. Just a picture.</p>'; return; }
      var html='<div class="count">'+picked.length+' of 3 picked</div><h3>'+(picked.length===3?'That’s a person a new church needs.':'Keep going, or stop here.')+'</h3><ul>';
      picked.forEach(function(g){ html+='<li><b>→</b><div><b>'+GIFTS[g][0]+'</b><span>'+GIFTS[g][1]+'</span></div></li>'; });
      html+='</ul><p style="color:#D3DBE8;font-size:.98rem">None of this is a job. It’s what a life looks like when it’s still needed.</p><a class="btn btn-gold btn-sm" href="/connect/#interest">Tell us about you</a>';
      out.innerHTML=html;
    }
    render();
  }

  /* ---- Sunday timeline tabs ---- */
  var tlBtns=$$('.tl-btn'), tlPanes=$$('.tl-pane');
  if(tlBtns.length){
    function show(i){ tlBtns.forEach(function(b,j){b.setAttribute('aria-selected',String(i===j)); b.tabIndex=i===j?0:-1;}); tlPanes.forEach(function(p,j){p.classList.toggle('on',i===j)}); }
    tlBtns.forEach(function(b,i){ b.addEventListener('click',function(){show(i); if(b.scrollIntoView&&window.innerWidth<=900) b.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest',inline:'center'});}); b.addEventListener('keydown',function(e){ if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();show((i+1)%tlBtns.length);tlBtns[(i+1)%tlBtns.length].focus()} if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();show((i-1+tlBtns.length)%tlBtns.length);tlBtns[(i-1+tlBtns.length)%tlBtns.length].focus()} }); });
    show(0);
  }

  /* ---- forms: Formspree if configured, otherwise email ---- */
  $$('form[data-form]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var kind=f.dataset.form||'Message', fd=new FormData(f), ok=$('.form-ok',f);
      if(GW.formEndpoint){
        var btn=$('button[type="submit"]',f); if(btn){btn.disabled=true;btn.textContent='Sending…'}
        fd.append('_subject','Grey Wave: '+kind);
        fetch(GW.formEndpoint,{method:'POST',body:fd,headers:{'Accept':'application/json'}}).then(function(r){
          if(r.ok){ f.reset(); if(ok){ok.classList.add('on');ok.focus&&ok.focus()} if(btn){btn.textContent='Sent'} }
          else throw new Error('bad');
        }).catch(function(){ if(btn){btn.disabled=false;btn.textContent='Try again'} });
      } else {
        var lines=[]; fd.forEach(function(v,k){ if(v&&k.charAt(0)!=='_') lines.push(k.replace(/[-_]/g,' ')+': '+v); });
        location.href='mailto:'+GW.email+'?subject='+encodeURIComponent('Grey Wave: '+kind)+'&body='+encodeURIComponent(lines.join('\n'));
        if(ok) ok.classList.add('on');
      }
    });
  });
})();
