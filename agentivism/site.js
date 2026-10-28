"use strict";
const values={
  citation:"Yan, L., & Gašević, D. (2026). Agentivism: a learning theory for the age of artificial intelligence. Computers and Education: Artificial Intelligence, 11, 100684. https://doi.org/10.1016/j.caeai.2026.100684",
  bibtex:"@article{yan2026agentivism,\n  title={Agentivism: a learning theory for the age of artificial intelligence},\n  author={Yan, Lixiang and Gašević, Dragan},\n  journal={Computers and Education: Artificial Intelligence},\n  volume={11},\n  pages={100684},\n  year={2026},\n  doi={10.1016/j.caeai.2026.100684}\n}"
};
const feedback=document.querySelector("#copy-feedback");
document.querySelectorAll("[data-copy]").forEach(button=>{
  button.addEventListener("click",async()=>{
    const value=values[button.dataset.copy];
    if(!value)return;
    try{
      if(navigator.clipboard&&window.isSecureContext){
        await navigator.clipboard.writeText(value);
      }else{
        const helper=document.createElement("textarea");
        helper.value=value;helper.style.position="fixed";helper.style.opacity="0";
        document.body.appendChild(helper);helper.select();
        const copied=document.execCommand("copy");helper.remove();
        if(!copied)throw new Error("Copy unavailable");
      }
      if(feedback)feedback.textContent=button.dataset.copy==="bibtex"?"BibTeX copied":"Citation copied";
      const original=button.textContent;button.textContent="Copied ✓";
      window.setTimeout(()=>{button.textContent=original},1700);
    }catch(error){
      if(feedback)feedback.textContent="Could not copy automatically. Please select and copy the citation above.";
    }
  });
});