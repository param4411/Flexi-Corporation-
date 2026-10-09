const PRODUCTS=[
{slug:"fibc-jumbo-bags",name:"FIBC / Jumbo Bags",summary:"500–2000 kg bulk bags: U-panel, baffle, circular and tunnel-loop designs.",color:"#e4d9c6",shade:"#b8a98f",image:"images/stock-bulk-bag.jpg",alt:"Illustrative stock photo of a worker handling a large industrial bulk bag",overview:"Our FIBC bulk bags are configurable for the material being handled, the filling process and the way the load is lifted and transported. Choose a suitable bag construction and discuss dimensions, safe working load and discharge requirements with our team.",applications:["Bulk minerals and industrial materials","Agricultural products, grains and feed","Construction materials and powders"],benefits:["Multiple bag constructions, including U-panel and baffle styles","Lifting-loop and filling options to suit handling needs","Specifications discussed around your intended safe working load"]},
{slug:"pp-woven-sacks",name:"PP Woven Sacks",summary:"Laminated and non-laminated sacks for grains, fertiliser and cement.",color:"#d9d2c4",shade:"#8f8472",image:"images/stock-cement-sacks.jpg",alt:"Illustrative stock photo of bagged construction materials stacked on a pallet",overview:"Our PP woven sacks are built for dependable packaging in agricultural, construction and industrial supply chains where structural integrity and print quality matter. Choose laminated or non-laminated options to suit your product and storage conditions.",applications:["Fertiliser and cement packaging","Grain and animal-feed storage","Construction material distribution"],benefits:["Strong woven polypropylene construction","Laminated options for added surface protection","Custom branding and size flexibility"]},
{slug:"bag-liners",name:"Bag Liners",summary:"LDPE/HDPE liners for moisture and contamination protection.",color:"#eee8dd",shade:"#c4b8a3",image:"images/stock-plastic-film.jpg",alt:"Illustrative stock photo of translucent plastic film material",overview:"Flexible liners fit inside an outer bag to add a layer between the packaged product and its surroundings. Material and fit can be selected around product compatibility, moisture concerns and the filling and discharge process.",applications:["Products that need separation from the outer bag","Materials with moisture or contamination concerns","Bulk packaging where an inner liner is specified"],benefits:["LDPE and HDPE material options","Can be matched to bag dimensions and filling needs","Helps provide an additional product-contact barrier"]},
{slug:"conductive-bags",name:"Conductive Bags",summary:"Type B, C and D bags for flammable and powder applications.",color:"#cfc6b4",shade:"#6f6556",image:"images/stock-bulk-bag.jpg",alt:"Illustrative stock photo of an industrial bulk bag in a production facility",overview:"Conductive FIBCs are specialist packaging for applications where electrostatic hazards must be considered. Bag type and use conditions matter: share the material, filling environment and site requirements so the correct construction can be reviewed with a qualified safety professional.",applications:["Powder handling in controlled industrial settings","Operations where electrostatic risk assessment specifies conductive packaging","Bulk material transfer under defined grounding procedures"],benefits:["Type C and other conductive construction options","Designed to be used with suitable grounding procedures","Selection should follow site risk assessment and applicable standards"]},
{slug:"builder-bags",name:"Builder Bags",summary:"Reusable bulk bags for sand, aggregates and construction waste.",color:"#dccfb8",shade:"#a39478",image:"images/stock-bulk-bag.jpg",alt:"Illustrative stock photo of a large woven bulk bag used for industrial material handling",overview:"Builder bags provide practical bulk handling for construction and landscaping materials. Dimensions, fabric and lifting configuration can be discussed to match the intended material, loading method and site handling requirements.",applications:["Sand, gravel and aggregates","Construction and renovation materials","Landscaping and site-clearance materials"],benefits:["Heavy-duty woven construction for bulk handling","Lifting-loop styles suited to common site equipment","Order specifications tailored to material and load"]},
{slug:"custom-printed-bags",name:"Custom Printed Bags",summary:"Branded bags with flexo printing and custom sizing.",color:"#e9e1d3",shade:"#9d907a",image:"images/stock-sack-worker.jpg",alt:"Illustrative stock photo of a warehouse worker handling printed sacks",overview:"Custom-printed packaging combines a bag specification with product and brand information. We can discuss print layout, colour requirements, bag dimensions and construction together, so the finished packaging fits your order and presentation needs.",applications:["Branding and product identification","Agricultural, construction and industrial packaging","Customer-specific sizes and bag configurations"],benefits:["Flexographic printing options","Custom sizing and bag construction discussions","Brand and product information displayed on-pack"]}
];
const $=i=>document.getElementById(i),grid=$("pgrid"),sel=$("psel");
PRODUCTS.forEach(product=>{
if(grid)grid.insertAdjacentHTML("beforeend",`<article class="card"><div class="tile" style="--c1:${product.color};--c2:${product.shade}"><a class="product-image-link" href="product.html?product=${product.slug}" aria-label="View ${product.name} details"><img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy"></a></div><h3><a class="product-name-link" href="product.html?product=${product.slug}">${product.name}</a></h3></article>`);
if(sel)sel.insertAdjacentHTML("beforeend",`<option>${product.name}</option>`)
});
if(grid&&sel)grid.addEventListener("click",e=>{const p=e.target.dataset.p;if(p)sel.value=p});
if(sel){const requestedProduct=new URLSearchParams(location.search).get("product");const selectedProduct=PRODUCTS.find(product=>product.slug===requestedProduct||product.name===requestedProduct);if(selectedProduct)sel.value=selectedProduct.name}
const detail=$("product-detail");
if(detail){
const product=PRODUCTS.find(item=>item.slug===new URLSearchParams(location.search).get("product"));
if(product){
document.title=`${product.name} | Felix corporation`;
$("detail-name").textContent=product.name;
$("detail-summary").textContent=product.summary;
$("detail-overview").textContent=product.overview;
$("detail-quote").href=`contact.html?product=${encodeURIComponent(product.slug)}#quote`;
$("detail-image").src=product.image;
$("detail-image").alt=product.alt;
$("detail-applications").innerHTML=product.applications.map(item=>`<li>${item}</li>`).join("");
$("detail-benefits").innerHTML=product.benefits.map(item=>`<li>${item}</li>`).join("");
}else{
detail.innerHTML='<section class="page-content"><div class="wrap narrow"><h1>Product not found</h1><p class="lead">Choose a product from our collection to view its details.</p><a class="btn" href="products.html">Browse products</a></div></section>';
}
}
const menu=$("menu"),burger=$("burger");
if(menu&&burger){
burger.onclick=()=>{const open=menu.classList.toggle("open");burger.setAttribute("aria-expanded",String(open));burger.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu")};
menu.onclick=()=>{menu.classList.remove("open");burger.setAttribute("aria-expanded","false");burger.setAttribute("aria-label","Open navigation menu")};
}
if($("yr"))$("yr").textContent=new Date().getFullYear();
const rv=new IntersectionObserver(es=>es.forEach((e,i)=>{if(e.isIntersecting){e.target.style.transitionDelay=(i%4)*90+"ms";e.target.classList.add("in");rv.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(el=>rv.observe(el));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
const t=+e.target.dataset.n;let c=0;const s=Math.ceil(t/60),id=setInterval(()=>{c=Math.min(t,c+s);e.target.textContent=c.toLocaleString()+(t>=500&&t<2e6?"+":"");if(c>=t)clearInterval(id)},25)}));
document.querySelectorAll("[data-n]").forEach(el=>io.observe(el));
const f=$("qf"),m=$("msg");
if(f&&m)f.addEventListener("submit",async e=>{e.preventDefault();m.className="";m.textContent="Sending…";
const b=Object.fromEntries(new FormData(f));
try{const r=await fetch("/api/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});
const j=await r.json();if(!j.ok)throw new Error(j.error);
m.className="ok";m.textContent="Thank you! Your request #"+j.id+" has been received.";f.reset()}
catch(x){m.className="err";m.textContent=x.message||"Something went wrong."}});
