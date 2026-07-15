/* ============================================================
   ADVANCED PORTFOLIO EFFECTS
   Premium constellation, spotlight, back-to-top, logo
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // ---- CONSTELLATION CANVAS ----
    const canvas = document.getElementById('constellation-canvas');
    if (canvas) {
        const ctx2 = canvas.getContext('2d');
        let W, H, particles = [], mouse = { x: -1000, y: -1000 };
        const COUNT = 75, CONNECT_DIST = 130, MOUSE_DIST = 150;

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        function getAccentRGB() {
            return document.body.classList.contains('dark') ? '249,115,22' : '180,83,9';
        }
        function mkP() {
            return {
                x: Math.random() * W, y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
                r: 1.5 + Math.random() * 1.5
            };
        }
        for (let i = 0; i < COUNT; i++) particles.push(mkP());

        window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

        function drawConst() {
            ctx2.clearRect(0, 0, W, H);
            const activeAccent = getAccentRGB();
            // update
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < -20) p.x = W + 20;
                if (p.x > W + 20) p.x = -20;
                if (p.y < -20) p.y = H + 20;
                if (p.y > H + 20) p.y = -20;
            });
            // connect lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx*dx + dy*dy);
                    if (d < CONNECT_DIST) {
                        const alpha = (1 - d / CONNECT_DIST) * 0.35;
                        ctx2.beginPath();
                        ctx2.strokeStyle = `rgba(${activeAccent},${alpha})`;
                        ctx2.lineWidth = 0.8;
                        ctx2.moveTo(particles[i].x, particles[i].y);
                        ctx2.lineTo(particles[j].x, particles[j].y);
                        ctx2.stroke();
                    }
                }
            }
            // draw dots + mouse repulsion
            particles.forEach(p => {
                const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
                const md = Math.sqrt(mdx*mdx + mdy*mdy);
                if (md < MOUSE_DIST) {
                    const force = (MOUSE_DIST - md) / MOUSE_DIST * 0.8;
                    p.vx += (mdx / md) * force * 0.06;
                    p.vy += (mdy / md) * force * 0.06;
                }
                p.vx *= 0.99; p.vy *= 0.99;
                ctx2.beginPath();
                ctx2.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx2.fillStyle = `rgba(${activeAccent},0.55)`;
                ctx2.fill();
            });
            requestAnimationFrame(drawConst);
        }
        drawConst();
    }

    // ---- SPOTLIGHT CURSOR ----
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
        let sx = window.innerWidth/2, sy = window.innerHeight/2;
        let stx = sx, sty = sy;
        document.addEventListener('mousemove', e => { stx = e.clientX; sty = e.clientY; });
        (function animSpot() {
            sx += (stx - sx) * 0.08;
            sy += (sty - sy) * 0.08;
            spotlight.style.left = sx + 'px';
            spotlight.style.top  = sy + 'px';
            requestAnimationFrame(animSpot);
        })();
    }

    // ---- BACK TO TOP ----
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            btt.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ---- NAV LOGO ----
    const logoA = document.querySelector('.logo-wrapper a');
    if (logoA && !logoA.innerHTML.includes('logo-bracket')) {
        logoA.innerHTML = '<span class="logo-bracket">&lt;</span><span class="logo-text">SB</span><span class="logo-bracket">/&gt;</span>';
    }

    // ---- ACTIVE NAV HIGHLIGHT ON SCROLL ----
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    function updateActiveNav() {
        const scrollMid = window.scrollY + window.innerHeight / 3;
        let active = sections[0];
        sections.forEach(sec => { if (sec.offsetTop <= scrollMid) active = sec; });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + active?.id);
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ---- SMOOTH SCROLL FOR NAV LINKS ----
    navLinks.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

});