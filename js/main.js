document.addEventListener("DOMContentLoaded",()=>{
  const t=document.querySelector(".menu-toggle"),
        n=document.querySelector(".nav-center")||document.querySelector(".nav-left");
  if(t&&n)t.onclick=()=>n.classList.toggle("open");

  document.querySelectorAll(".dropdown > a").forEach(link=>{
    link.addEventListener("click",e=>{
      if(window.innerWidth<=900){
        e.preventDefault();
        link.parentElement.classList.toggle("active");
      }
    });
  });
  
  document.querySelectorAll("[data-bowl]").forEach(b=>b.onclick=()=>{
    const x=document.querySelector("#bowl-label");
    if(x)x.textContent=b.dataset.bowl;
  });

  document.querySelectorAll(".builder-opt").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".builder-opt").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      
      const img=document.querySelector("#builder-img"),
            tag=document.querySelector("#builder-recipe-tag"),
            pVal=document.querySelector("#builder-val-protein"),
            pBar=document.querySelector("#builder-bar-protein"),
            fVal=document.querySelector("#builder-val-fat"),
            fBar=document.querySelector("#builder-bar-fat"),
            fiVal=document.querySelector("#builder-val-fibre"),
            fiBar=document.querySelector("#builder-bar-fibre");
      
      if(img)img.src=btn.dataset.img;
      if(tag)tag.textContent=btn.dataset.name;
      if(pVal)pVal.textContent=btn.dataset.protein;
      if(pBar)pBar.style.width=btn.dataset.proteinPct;
      if(fVal)fVal.textContent=btn.dataset.fat;
      if(fBar)fBar.style.width=btn.dataset.fatPct;
      if(fiVal)fiVal.textContent=btn.dataset.fibre;
      if(fiBar)fiBar.style.width=btn.dataset.fibrePct;
    });
  });
  
  document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{
    const f=document.querySelector(".flash");
    if(f){
      f.textContent=b.dataset.add+" added to your bag";
      f.style.display="block";
      setTimeout(()=>f.style.display="none",2200);
    }
  });
  
  document.querySelectorAll("form[data-demo], form.newsletter-form").forEach(f=>f.onsubmit=e=>{
    e.preventDefault();
    const x=document.querySelector(".flash");
    if(x){
      x.textContent="Thanks — your submission has been received!";
      x.style.display="block";
      setTimeout(()=>x.style.display="none",2400);
    }
    f.reset();
  });

  // FAQ Accordion Toggle
  document.querySelectorAll(".faq-question").forEach(q=>{
    q.addEventListener("click",()=>{
      const item=q.parentElement;
      item.classList.toggle("active");
    });
  });

  // Size Selector Toggle
  document.querySelectorAll(".size-btn").forEach(sb=>{
    sb.addEventListener("click",()=>{
      const parent=sb.parentElement;
      parent.querySelectorAll(".size-btn").forEach(b=>b.classList.remove("active"));
      sb.classList.add("active");
      const priceDisplay=document.querySelector("#recipe-price");
      if(priceDisplay && sb.dataset.price){
        priceDisplay.textContent=sb.dataset.price;
      }
    });
  });

  // Portion Calculator Update
  const calcWeightInput = document.querySelector("#calc-weight");
  const calcActivitySelect = document.querySelector("#calc-activity");
  const calcResultDisplay = document.querySelector("#calc-cups-result");
  const calcWeightLabel = document.querySelector("#weight-num-label");

  function updateCalculator() {
    if(!calcWeightInput || !calcResultDisplay) return;
    const weight = parseFloat(calcWeightInput.value) || 20;
    const activity = calcActivitySelect ? parseFloat(calcActivitySelect.value) : 1.0;
    if(calcWeightLabel) {
      calcWeightLabel.textContent = weight + " lbs";
    }
    // Base formula: approx 0.05 cups per lb * activity multiplier
    let cups = (weight * 0.048 * activity).toFixed(1);
    if(cups < 0.5) cups = 0.5;
    calcResultDisplay.textContent = cups + " Cups / Day";
  }

  if(calcWeightInput) {
    calcWeightInput.addEventListener("input", updateCalculator);
  }
  if(calcActivitySelect) {
    calcActivitySelect.addEventListener("change", updateCalculator);
  }

  // Back to Top Button Handler
  let backToTopBtn = document.querySelector("#back-to-top");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "back-to-top";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.setAttribute("title", "Back to top");
    backToTopBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
    document.body.appendChild(backToTopBtn);
  }

  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});