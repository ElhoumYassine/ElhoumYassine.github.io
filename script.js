/* Dashboard script — theme toggle + particles */
(function () {
    'use strict';

    // Theme
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');

    function setTheme(t) {
        html.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        toggle.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    if (stored) setTheme(stored);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');

    toggle.addEventListener('click', () => {
        setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // Particles
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];
        const N = 40, DIST = 120;

        function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize); resize();

        for (let i = 0; i < N; i++)
            particles.push({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.5+.5 });

        (function draw() {
            ctx.clearRect(0,0,w,h);
            const rgb = getComputedStyle(html).getPropertyValue('--particle-color').trim();
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x<0||p.x>w) p.vx*=-1;
                if (p.y<0||p.y>h) p.vy*=-1;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle='rgba('+rgb+',.3)'; ctx.fill();
                for (let j = i+1; j < particles.length; j++) {
                    const q = particles[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
                    if (d < DIST) {
                        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
                        ctx.strokeStyle='rgba('+rgb+','+ (.1*(1-d/DIST)) +')';
                        ctx.lineWidth=.5; ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        })();
    }
})();
