window.onload = () => {

    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    const particles = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const heroSection = document.getElementById('HeroSection');
    heroSection.appendChild(canvas);

    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; 

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            particles.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                lifespan: 100 
            });
        }
    });

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
function redirectingFunc(){
    window.location.href = "TutorPage.html";
}
