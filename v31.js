'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
function closeMenu(returnFocus=false) { menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); if(returnFocus) menuButton.focus(); }
menuButton.addEventListener('click',()=>{ const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menu.classList.toggle('is-open',open); });
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true')closeMenu(true);});
matchMedia('(min-width:1081px)').addEventListener('change',()=>closeMenu());
const main=document.querySelector('main'),services=document.querySelector('#services'),transformation=document.querySelector('#before-after');
if(main&&services&&transformation)main.insertBefore(services,transformation);
const portfolioGrid=document.querySelector('.editorial-grid'),productShowcase=document.querySelector('.product-showcase');
if(portfolioGrid&&productShowcase)portfolioGrid.append(productShowcase);
const pages=[1,2,4,16,17];
const galleries={
 dlmz:pages.map(p=>({src:`assets/dlmz/page${p}.png`,caption:`DLMZ · Страница ${p}`})),
 store:[['brand-main.png','Основной визуал'],['novinki.jpg','Новинки'],['snacks.png','Ассортимент закусок'],['outdoor.png','Материал для наружного размещения']].map(([file,caption])=>({src:`assets/razlivnoe/${file}`,caption:`Разливное от души · ${caption}`})),
 atelier:[{"src": "assets/atelier-price-current/atelier-price-current-page-01.png", "caption": "Ателье · Страница 1"}, {"src": "assets/atelier-price-current/atelier-price-current-page-02.png", "caption": "Ателье · Страница 2"}, {"src": "assets/atelier-price-current/atelier-price-current-page-03.png", "caption": "Ателье · Страница 3"}, {"src": "assets/atelier-price-current/atelier-price-current-page-04.png", "caption": "Ателье · Страница 4"}, {"src": "assets/atelier-price-current/atelier-price-current-page-05.png", "caption": "Ателье · Страница 5"}],
 brand:[{"src": "assets/brand-case-v2/kovalev-brand-case-01-cover.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 1"}, {"src": "assets/brand-case-v2/kovalev-brand-case-02-idea.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 2"}, {"src": "assets/brand-case-v2/kovalev-brand-case-03-logo.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 3"}, {"src": "assets/brand-case-v2/kovalev-brand-case-04-system.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 4"}, {"src": "assets/brand-case-v2/kovalev-brand-case-05-social.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 5"}, {"src": "assets/brand-case-v2/kovalev-brand-case-06-applications.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 6"}, {"src": "assets/brand-case-v2/kovalev-brand-case-07-business.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 7"}, {"src": "assets/brand-case-v2/kovalev-brand-case-08-final.png", "caption": "КОВАЛЕВ ДЕЛАЕТ. · Слайд 8"}],
 atelierPromo:[{src:'assets/atelier-promo-provided.jpg',caption:'Промо-материал проекта'}],
 coffee:[['кофе4.jpg','Кофемашина · Карточка 1'],['кофе3.jpg','Кофемашина · Карточка 2'],['кофе.jpg','Кофемашина · Карточка 3'],['кофе2.jpg','Кофемашина · Карточка 4']].map(([file,caption])=>({src:`assets/images/product-cards/${file}`,caption})),
 headphones:[['наушники.jpg','Наушники · Карточка 1'],['наушники2.jpg','Наушники · Карточка 2'],['наушники3.jpg','Наушники · Карточка 3']].map(([file,caption])=>({src:`assets/images/product-cards/${file}`,caption})),
 bag:[['сумка2.jpg','Сумка · Карточка 1'],['сумка.jpg','Сумка · Карточка 2'],['сумка1.jpg','Сумка · Карточка 3']].map(([file,caption])=>({src:`assets/images/product-cards/${file}`,caption}))
};
const viewer=document.querySelector('#viewer'),viewerImage=document.querySelector('#viewer-image');
let group=[],index=0,opener;
function paintViewer(){ const item=group[index];viewerImage.src=item.src;viewerImage.alt=item.caption;document.querySelector('#viewer-caption').textContent=item.caption;document.querySelector('#viewer-counter').textContent=`${String(index+1).padStart(2,'0')} / ${String(group.length).padStart(2,'0')}`;document.querySelector('#viewer-original').href=item.src;document.querySelector('#viewer-prev').disabled=group.length<2;document.querySelector('#viewer-next').disabled=group.length<2; }
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{opener=button;group=galleries[button.dataset.gallery];index=Number(button.dataset.index||0);paintViewer();viewer.showModal();document.querySelector('#viewer-close').focus();updateSticky();}));
document.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>{opener?.focus({preventScroll:true});updateSticky();});
function move(delta){index=(index+delta+group.length)%group.length;paintViewer();}
document.querySelector('#viewer-prev').addEventListener('click',()=>move(-1));
document.querySelector('#viewer-next').addEventListener('click',()=>move(1));
viewer.addEventListener('keydown',e=>{
 if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
 if(e.key==='ArrowRight'){e.preventDefault();move(1);}
 if(e.key==='Tab'){
  const controls=[...viewer.querySelectorAll('button:not(:disabled),a[href]')];
  const first=controls[0],last=controls[controls.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
let touchStart=null;
viewerImage.addEventListener('touchstart',e=>{touchStart=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
viewerImage.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)move(dx<0?1:-1);touchStart=null;},{passive:true});
viewerImage.addEventListener('touchcancel',()=>{touchStart=null;},{passive:true});

document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>{const i=Number(button.dataset.slide),active=document.querySelector('.active-slide');active.dataset.index=String(i);active.querySelector('img').src=galleries.dlmz[i].src;active.querySelector('img').alt=galleries.dlmz[i].caption;document.querySelector('#dlmz-counter').textContent=`${i+1} / 5 · Страница ${pages[i]}`;document.querySelectorAll('[data-slide]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
const sticky=document.querySelector('.sticky-mobile'),heroCTA=document.querySelector('#hero-cta'),contact=document.querySelector('#contact'),video=document.querySelector('video');
const galleryRegions=[...document.querySelectorAll('#works,.service-grid,.video-section,.brand-banner,.dlmz-gallery,.raz-mosaic,.atelier-gallery,.atelier-promo,.product-preview-grid')];
function intersects(el){const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}
function updateSticky(){sticky.hidden=innerWidth>700||heroCTA.getBoundingClientRect().bottom>0||intersects(contact)||intersects(video)||galleryRegions.some(intersects)||viewer.open;}
new IntersectionObserver(updateSticky,{threshold:[0,1]}).observe(heroCTA);
const observer=new IntersectionObserver(updateSticky,{threshold:0});observer.observe(contact);observer.observe(video);
galleryRegions.forEach(region=>observer.observe(region));
window.addEventListener('resize',updateSticky);window.addEventListener('scroll',updateSticky,{passive:true});updateSticky();
const caseDetailsMedia=matchMedia('(min-width:701px)');
function setCaseDetailsLayout(){document.querySelectorAll('.case-details').forEach(details=>{details.open=caseDetailsMedia.matches;});}
caseDetailsMedia.addEventListener('change',setCaseDetailsLayout);setCaseDetailsLayout();
document.querySelector('.copy-brief')?.addEventListener('click',async()=>{
 const message='Олег, здравствуйте! Хочу обсудить оформление материалов.\n\nЗадача: …\nКакие материалы уже есть: …\nЖелаемый срок: …\n\nПодскажите, какой формат подойдёт и что нужно для начала работы.';
 const status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText(message);status.textContent='Текст скопирован. Вставьте его в сообщение и заполните детали.';}
 catch{status.textContent='Укажите в сообщении задачу, имеющиеся материалы и желаемый срок.';}
});
