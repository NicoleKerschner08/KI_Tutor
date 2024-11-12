window.onload = () => {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    const particles = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    function setCanvasSize() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const heroHeight = document.getElementById('HeroSection').offsetHeight;
        canvas.width = document.body.offsetWidth;
        canvas.height = headerHeight + heroHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
    }

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const heroSection = document.getElementById('HeroSection');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    function addParticles(e, container) {
        const rect = container.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                lifespan: 100 
            });
        }
    }

    header.addEventListener('mousemove', (e) => addParticles(e, header));
    nav.addEventListener('mousemove', (e) => addParticles(e, nav));
    heroSection.addEventListener('mousemove', (e) => addParticles(e, heroSection));

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(7, 198, 250, ${particle.lifespan / 100})`; 
            ctx.fill();

            particle.lifespan--;
            if (particle.lifespan <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    const arrow = document.getElementById('scrollArrow');
    arrow.addEventListener('click', () => {
        document.getElementById('ScrollTarget').scrollIntoView({ behavior: 'smooth' });
    });
});

function redirectingFunc() {
    window.location.href = "TutorPage.html";
}
