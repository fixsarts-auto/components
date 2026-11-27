/* Fixs Arts - Marquee Logo (runtime) */
window.FixsMarquee=(function(){var RT=function(){
var CSS='.fxm{box-sizing:border-box;width:100%;overflow:hidden}.fxm-v{overflow:hidden;padding:12px 0}.fxm-v.e{-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}'
+'.fxm-t{display:flex;width:max-content;align-items:center;will-change:transform}.fxm-t.m{animation:fxm-m var(--dur,30s) linear infinite}.fxm-t.r{animation-direction:reverse}.fxm-t.b{animation:fxm-b var(--dur,10s) ease-in-out infinite alternate}'
+'.fxm-g{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;padding:0 24px}'
+'.fxm-i{display:inline-flex;align-items:center;flex:none;margin-right:var(--gap);text-decoration:none;color:inherit;border-radius:8px}.fxm-g .fxm-i{margin:calc(var(--gap)/2)}'
+'a.fxm-i{cursor:pointer}.fxm-sel{outline:2px dashed #8b5cf6;outline-offset:6px}'
+'.fxm-i img{height:calc(var(--h)*var(--s,1));width:auto;max-width:none;display:block;-webkit-user-drag:none}.fxm-m{display:inline-block;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center}.fxm-m img{opacity:0}'
+'.fxm-x{font-weight:700;font-size:calc(var(--h)*.55*var(--s,1));white-space:nowrap;letter-spacing:-.01em}.fxm-e{text-align:center;opacity:.6;font:14px system-ui}'
+'.fxm.wave .fxm-i,.fxm.float .fxm-i{animation:fxm-f 2.4s ease-in-out infinite var(--dl)}.fxm.fade .fxm-i{animation:fxm-fd 3s ease-in-out infinite var(--dl)}'
+'.fxm.zoom .fxm-i{animation:fxm-z 2.6s ease-in-out infinite var(--dl)}.fxm.flip .fxm-i{animation:fxm-fl 4s ease-in-out infinite var(--dl)}'
+'@keyframes fxm-m{to{transform:translateX(-50%)}}@keyframes fxm-b{to{transform:translateX(var(--x,0))}}@keyframes fxm-f{50%{transform:translateY(-10px)}}@keyframes fxm-fd{50%{opacity:.15}}@keyframes fxm-z{50%{transform:scale(1.1)}}@keyframes fxm-fl{0%,60%{transform:rotateY(0)}100%{transform:rotateY(360deg)}}';
function theme(){var n=[document.documentElement,document.body];for(var k=0;k<2;k++){var e=n[k];if(!e)continue;var t=e.getAttribute('data-theme')||e.getAttribute('data-bs-theme')||e.getAttribute('data-mode');if(t)return /dark/i.test(t)?'dark':'light';if(/(^|\s)(dark|dark-mode|theme-dark)(\s|$)/.test(e.className))return 'dark';if(/(^|\s)(light|light-mode|theme-light)(\s|$)/.test(e.className))return 'light'}return matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}
var R=function(el,c,o){
o=o||{};
if(!document.getElementById('fxm-css')&&!document.querySelector('link[href*="marquee-logo"]')){var st=document.createElement('style');st.id='fxm-css';st.textContent=CSS;document.head.appendChild(st)}
function draw(){
var dk=theme()=='dark',m=c.mode||'marquee',sp=c.speed||60;
var bg=c.bgMode=='custom'?c.bgColor:(dk?'#14141f':'#f1f2f7');
var lc=c.colorMode=='custom'?c.logoColor:c.colorMode=='auto'?(dk?'#ffffff':'#1a1a2e'):'';
var its=c.items.filter(function(i){return !i.hidden});
var mv=m=='marquee'||m=='wave',bn=m=='bounce';
el.innerHTML='';
var box=document.createElement('div');box.className='fxm '+m;
box.style.cssText='background:'+bg+';padding:'+c.pad+'px 0;border-radius:'+c.radius+'px;--gap:'+c.gap+'px;--h:'+c.h+'px;color:'+(lc||(dk?'#fff':'#1a1a2e'));
var vp=document.createElement('div');vp.className='fxm-v'+(c.fade&&(mv||bn)?' e':'');
var tr=document.createElement('div');tr.className=mv?'fxm-t m'+(c.dir=='right'?' r':''):bn?'fxm-t b':'fxm-g';
function mk(i,k){var a=document.createElement(i.useLink&&i.link?'a':'div');a.className='fxm-i'+(o.sel==i.id?' fxm-sel':'');a.style.setProperty('--dl',(k*.25)+'s');a.style.setProperty('--s',(i.scale||100)/100);
if(a.tagName=='A'){a.href=i.link;a.target='_blank';a.rel='noopener noreferrer'}
var col=i.useColor?(i.color||'#ffffff'):lc;
if(i.src){var im=document.createElement('img');im.src=i.src;im.alt=i.text||'';im.draggable=false;
if(col){var w=document.createElement('span'),u='url("'+i.src+'")';w.className='fxm-m';w.style.cssText='background:'+col+';-webkit-mask-image:'+u+';mask-image:'+u;w.appendChild(im);a.appendChild(w)}else a.appendChild(im)}
else{var t=document.createElement('span');t.className='fxm-x';t.textContent=i.text||'Logo';if(i.useColor)t.style.color=i.color||'#ffffff';a.appendChild(t)}
if(o.editor)a.addEventListener('click',function(e){e.preventDefault();o.onSelect&&o.onSelect(i.id)});
return a}
if(!its.length){tr.className='fxm-e';tr.textContent='Belum ada logo yang ditampilkan'}
else if(mv){var reps=Math.max(1,Math.ceil(12/its.length));for(var h=0;h<2;h++)for(var r=0;r<reps;r++)its.forEach(function(i,k){tr.appendChild(mk(i,k))})}
else its.forEach(function(i,k){tr.appendChild(mk(i,k))});
vp.appendChild(tr);box.appendChild(vp);el.appendChild(box);
function fit(){if(mv)tr.style.setProperty('--dur',(tr.offsetWidth/2/sp)+'s');if(bn){var d=Math.min(0,vp.clientWidth-tr.offsetWidth);tr.style.setProperty('--x',d+'px');tr.style.setProperty('--dur',(Math.abs(d)/sp||1)+'s')}}
fit();Array.prototype.forEach.call(tr.querySelectorAll('img'),function(im){im.addEventListener('load',fit)})}
o.editor=!!o.editor;el._d=draw;
if(!el._fxm){el._fxm=1;var mo=new MutationObserver(function(){el._d()});[document.documentElement,document.body].forEach(function(n){n&&mo.observe(n,{attributes:true,attributeFilter:['class','data-theme','data-bs-theme','data-mode']})});try{matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){el._d()})}catch(e){}}
draw();return draw};R.css=CSS;return R};var r=RT();return{render:r,rt:RT,css:r.css}})();
(function(){var C=window.FIXS_MARQUEE;if(!C)return;function go(){var t=document.getElementById('fixs-marquee');if(t)window.FixsMarquee.render(t,C,{})}document.readyState=='loading'?document.addEventListener('DOMContentLoaded',go):go()})();
