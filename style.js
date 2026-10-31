document.addEventListener('DOMContentLoaded', () =>{
    const trigger = document.getElementById('profile-Trigger');
    const dropdwon = document.getElementById('profileDropdown');
    const elements = document.querySelectorAll(".cards");
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
            }else{
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.1
    });
    /*logout button */
    trigger.addEventListener('click', (event) =>{
        event.stopPropagation();
        dropdwon.classList.toggle('show');
    });

    window.addEventListener('click', (event) =>{
        if(!dropdwon.contains(event.target) && event.target !== trigger){
            dropdwon.classList.remove('show');
        }
    });

    /*fade on scroll*/
    elements.forEach(el => observer.observe(el));
});