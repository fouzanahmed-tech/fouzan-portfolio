let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
                navLinks.forEach(links => {
                links.classList.remove('active');
                const selector = 'header nav a[href*=\"' + id + '\"]';
                const activeLink = document.querySelector(selector);
                if(activeLink) activeLink.classList.add('active');
            })
        }
    })
}
menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // IntersectionObserver reveal for better performance + stagger
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if(revealElements.length){
        const obsOptions = {
            root: null,
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.12
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const el = entry.target;
                    const delay = parseInt(el.dataset.revealDelay || '0', 10);
                    setTimeout(() => el.classList.add('in-view'), delay);
                    obs.unobserve(el);
                }
            });
        }, obsOptions);
        revealElements.forEach((el) => observer.observe(el));
    }

    // Panel minimize / restore handling (fixed blog panel)
    const blogPanel = document.querySelector('.fixed-blog-panel');
    if(blogPanel){
        const btn = blogPanel.querySelector('.panel-minimize');
        const storageKey = 'fixedBlogCollapsed';
        // restore state
        try{
            const saved = localStorage.getItem(storageKey);
            if(saved === '1') blogPanel.classList.add('collapsed');
        }catch(e){}
        if(btn){
            btn.addEventListener('click', (e)=>{
                blogPanel.classList.toggle('collapsed');
                try{
                    localStorage.setItem(storageKey, blogPanel.classList.contains('collapsed') ? '1' : '0');
                }catch(e){}
            });
        }
    }
});
window.addEventListener("scroll", () => {
    document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 50);
});
