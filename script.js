/*
  =========================================
  PORTFOLIO INTERACTIVE LOGIC & ANIMATIONS
  =========================================
  Author: Snehal Baranwal
  Theme: Professional Developer | Systems Engineering
*/

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 0. PAGE LOADER
    // =========================================
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        // Hide loader after page has time to render
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 900);
    }

    // =========================================
    // CANVAS ENGINE INITIALIZATION (TOP SCOPE)
    // =========================================
    const canvas = document.getElementById('compute-canvas');
    const ctx = canvas?.getContext('2d');
    
    const resizeCanvas = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // =========================================
    // 0. CORE SYNTHESIZER ENGINE (WEB AUDIO API)
    // =========================================
    class SystemSynthesizer {
        constructor() {
            this.ctx = null;
            this.muted = true;
            this.masterVolume = null;
        }

        init() {
            if (this.ctx) return;
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
            this.masterVolume = this.ctx.createGain();
            this.masterVolume.gain.value = this.muted ? 0 : 0.4;
            this.masterVolume.connect(this.ctx.destination);
        }

        toggleMute() {
            this.muted = !this.muted;
            if (this.ctx) {
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
                this.masterVolume.gain.setValueAtTime(this.muted ? 0 : 0.4, this.ctx.currentTime);
            }
            return this.muted;
        }

        playCharging() {
            if (this.muted) return null;
            this.init();
            
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(160, this.ctx.currentTime + 3);
            
            gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 3);
            
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(300, this.ctx.currentTime);
            filter.frequency.linearRampToValueAtTime(1000, this.ctx.currentTime + 3);
            filter.Q.value = 5;

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterVolume);
            osc.start();
            
            return { osc, gainNode };
        }

        playConsoleDeploy() {
            if (this.muted) return;
            this.init();
            
            const bufferSize = this.ctx.sampleRate * 0.25;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            const gainNode = this.ctx.createGain();
            gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterVolume);
            noise.start();
        }

        playThermalEngine() {
            if (this.muted) return;
            this.init();
            
            const bufferSize = this.ctx.sampleRate * 1.5;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 1.2);

            const gainNode = this.ctx.createGain();
            gainNode.gain.setValueAtTime(0.4, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.4);

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterVolume);
            noise.start();
        }

        playNeuralLink() {
            if (this.muted) return null;
            this.init();
            
            const osc = this.ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.value = 1500;
            
            const modulator = this.ctx.createOscillator();
            modulator.type = 'sine';
            modulator.frequency.value = 45;
            
            const modGain = this.ctx.createGain();
            modGain.gain.value = 400;

            const gainNode = this.ctx.createGain();
            gainNode.gain.value = 0.12;

            modulator.connect(modGain);
            modGain.connect(osc.frequency);
            osc.connect(gainNode);
            gainNode.connect(this.masterVolume);
            
            osc.start();
            modulator.start();
            
            return { osc, modulator, gainNode };
        }

        playGravityAttractor() {
            if (this.muted) return null;
            this.init();
            
            const carrier = this.ctx.createOscillator();
            carrier.type = 'sine';
            carrier.frequency.value = 220;

            const modulator = this.ctx.createOscillator();
            modulator.type = 'sine';
            modulator.frequency.value = 15;
            
            const modGain = this.ctx.createGain();
            modGain.gain.value = 80;

            const gainNode = this.ctx.createGain();
            gainNode.gain.value = 0.25;

            modulator.connect(modGain);
            modGain.connect(carrier.frequency);
            carrier.connect(gainNode);
            gainNode.connect(this.masterVolume);
            
            carrier.start();
            modulator.start();

            return { carrier, modulator, gainNode };
        }

        playOverrideActive() {
            if (this.muted) return null;
            this.init();
            
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            osc1.type = 'sine';
            osc2.type = 'sawtooth';
            osc1.frequency.value = 110;
            osc2.frequency.value = 110.5;

            const lowpass = this.ctx.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.value = 180;

            const gainNode = this.ctx.createGain();
            gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 6.0);

            osc1.connect(lowpass);
            osc2.connect(lowpass);
            lowpass.connect(gainNode);
            gainNode.connect(this.masterVolume);

            osc1.start();
            osc2.start();

            return { osc1, osc2, gainNode };
        }

        playModuleClick() {
            if (this.muted) return;
            this.init();
            
            const bufferSize = this.ctx.sampleRate * 0.4;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const bandpass = this.ctx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = 1200;
            bandpass.Q.value = 3;

            const gainNode = this.ctx.createGain();
            gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

            noise.connect(bandpass);
            bandpass.connect(gainNode);
            gainNode.connect(this.masterVolume);
            noise.start();
        }
        
        playReset() {
            if (this.muted) return;
            this.init();
            
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.25);
            
            gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

            osc.connect(gainNode);
            gainNode.connect(this.masterVolume);
            osc.start();
        }
    }

    const synthesizer = new SystemSynthesizer();

    // =========================================
    // 1. CUSTOM CURSOR — Professional ring + dot
    // =========================================
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.getElementById('clone-1'); // outer ring
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    let targetX = 0, targetY = 0;
    let isCursorVisible = false;
    let clonesActive = false;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursor) {
        // Style the dot cursor
        cursor.style.cssText = 'width:10px;height:10px;background:var(--accent);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);will-change:transform;transition:width 0.2s ease,height 0.2s ease,background 0.2s ease;opacity:0;';

        // Style the outer ring
        if (cursorRing) {
            cursorRing.style.cssText = 'width:36px;height:36px;border:1.5px solid var(--accent);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);will-change:transform;opacity:0;transition:width 0.3s ease,height 0.3s ease,border-color 0.3s ease,opacity 0.3s ease;';
        }

        // Hide unused clones
        ['clone-2','clone-3'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            // Move dot instantly
            cursor.style.left = targetX + 'px';
            cursor.style.top = targetY + 'px';
            if (!isCursorVisible) {
                cursor.style.opacity = '1';
                if (cursorRing) cursorRing.style.opacity = '1';
                isCursorVisible = true;
            }
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            if (cursorRing) cursorRing.style.opacity = '0';
            isCursorVisible = false;
        });

        // Ring follows with smooth lag
        const updateRing = () => {
            ringX += (targetX - ringX) * 0.10;
            ringY += (targetY - ringY) * 0.10;
            if (cursorRing) {
                cursorRing.style.left = ringX + 'px';
                cursorRing.style.top = ringY + 'px';
            }
            requestAnimationFrame(updateRing);
        };
        requestAnimationFrame(updateRing);

        // Hover state
        const interactiveSelectors = 'a, button, .skill, .project, .stat-card, .cert-card, .timeline-content';
        const bindCursorEvents = () => {
            document.querySelectorAll(interactiveSelectors).forEach(el => {
                if (el.dataset.cursorBound) return;
                el.dataset.cursorBound = 'true';
                el.addEventListener('mouseenter', () => {
                    document.body.classList.add('hover-link');
                    if (cursorRing) { cursorRing.style.width = '52px'; cursorRing.style.height = '52px'; cursorRing.style.borderColor = 'var(--accent-cyan)'; }
                    cursor.style.width = '6px'; cursor.style.height = '6px';
                });
                el.addEventListener('mouseleave', () => {
                    document.body.classList.remove('hover-link');
                    if (cursorRing) { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; cursorRing.style.borderColor = 'var(--accent)'; }
                    cursor.style.width = '10px'; cursor.style.height = '10px';
                });
            });
        };
        bindCursorEvents();
        const obs = new MutationObserver(bindCursorEvents);
        obs.observe(document.body, { childList: true, subtree: true });
    }

    // =========================================
    // 2. HIGH-PERFORMANCE CANVAS PARTICLE SYSTEM
    // =========================================
    let canvasParticles = [];
    let isCanvasLoopRunning = false;
    let isCharging = false;
    let neuralLinkActive = false;
    let neuralLinkNodes = [];

    class CanvasParticle {
        constructor(x, y, type) {
            this.x = x; // Page relative coordinates
            this.y = y;
            this.type = type;
            this.spawnTime = performance.now();
            this.duration = (type === 'fire' || type === 'rasengan') ? (1200 + Math.random() * 600) : (type === 'smoke' ? 600 : 800 + Math.random() * 400);
            
            // Initial angle & velocities
            this.angle = Math.random() * Math.PI * 2;
            const speedMultiplier = type === 'fire' ? (4 + Math.random() * 8) : (type === 'smoke' ? (0.5 + Math.random() * 1.5) : (2.5 + Math.random() * 4));
            this.vx = Math.cos(this.angle) * speedMultiplier;
            this.vy = Math.sin(this.angle) * speedMultiplier;

            // Spiral variables for Rasengan vortex
            this.startAngle = Math.random() * Math.PI * 2;
            this.startRadius = 50 + Math.random() * 50;
        }

        update(time) {
            const elapsed = time - this.spawnTime;
            const progress = elapsed / this.duration;
            if (progress >= 1) return false;

            this.progress = progress;
            this.elapsed = elapsed;

            if (this.type === 'rasengan') {
                // Spiral inward toward the LIVE target coordinates of the cursor (page space)
                const currentRadius = Math.max(0, this.startRadius * (1 - progress));
                const currentAngle = this.startAngle + (elapsed / 70); // Rotating speed
                const targetPageX = targetX + window.scrollX;
                const targetPageY = targetY + window.scrollY;

                this.currentX = targetPageX + Math.cos(currentAngle) * currentRadius;
                this.currentY = targetPageY + Math.sin(currentAngle) * currentRadius;
            } else {
                // Gravity downward drop effect for fire embers, float upward for pulse aura, drift for smoke
                const gravity = this.type === 'fire' ? 0.08 * elapsed : 0;
                let ascent = 0;
                if (this.type === 'pulse') {
                    ascent = 0.05 * elapsed;
                } else if (this.type === 'smoke') {
                    ascent = 0.02 * elapsed;
                } else if (this.type === 'fire') {
                    ascent = 0.03 * elapsed;
                }
                
                this.currentX = this.x + this.vx * (elapsed / 10);
                this.currentY = this.y + this.vy * (elapsed / 10) + gravity - ascent;
            }
            return true;
        }

        draw(ctx) {
            const drawX = this.currentX - window.scrollX;
            const drawY = this.currentY - window.scrollY;

            ctx.save();
            ctx.globalAlpha = 1 - this.progress;

            let size = 1;
            if (this.type === 'fire') {
                size = Math.max(0.1, 8 * (1.5 - this.progress * 1.2));
                ctx.fillStyle = '#FF4500';
                ctx.shadowColor = '#FF8C00';
                ctx.shadowBlur = 10;
            } else if (this.type === 'rasengan') {
                size = Math.max(0.1, 6 * (1.2 - this.progress * 0.8));
                ctx.fillStyle = '#06B6D4';
                ctx.shadowColor = '#0284C7';
                ctx.shadowBlur = 8;
            } else if (this.type === 'smoke') {
                size = Math.max(0.1, 80 * (0.2 + this.progress * 1.6));
                let grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, size / 2);
                grad.addColorStop(0, `rgba(220, 220, 220, ${(1 - this.progress) * 0.5})`);
                grad.addColorStop(0.5, `rgba(180, 180, 180, ${(1 - this.progress) * 0.2})`);
                grad.addColorStop(1, 'rgba(180, 180, 180, 0)');
                ctx.fillStyle = grad;
            } else { // pulse
                size = Math.max(0.1, 6 * (1 - this.progress * 0.5));
                ctx.fillStyle = '#00E5FF';
                ctx.shadowColor = '#06B6D4';
                ctx.shadowBlur = 8;
            }

            ctx.beginPath();
            ctx.arc(drawX, drawY, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const addCanvasParticles = (x, y, particleType = 'pulse') => {
        if (isTouchDevice) return;
        const count = (particleType === 'fire' || particleType === 'rasengan') ? 45 : (particleType === 'smoke' ? 25 : 10);
        
        if (canvas && canvas.style.display !== 'block') {
            canvas.style.display = 'block';
        }

        for (let i = 0; i < count; i++) {
            canvasParticles.push(new CanvasParticle(x, y, particleType));
        }

        if (!isCanvasLoopRunning) {
            isCanvasLoopRunning = true;
            requestAnimationFrame(updateAndDrawCanvas);
        }
    };

    const updateAndDrawCanvas = (time) => {
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Neural Link lightning drawing inside loop
        if (neuralLinkActive) {
            let closestNodes = [];
            neuralLinkNodes.forEach(node => {
                const nx = node.x - window.scrollX;
                const ny = node.y - window.scrollY;
                const d = Math.hypot(nx - targetX, ny - targetY);
                if (d < 450) {
                    closestNodes.push({x: nx, y: ny});
                }
            });
            
            if (closestNodes.length === 0) {
                closestNodes.push({x: Math.random() * canvas.width, y: 0});
            }
            
            closestNodes.forEach(node => {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = '#E0F7FA';
                ctx.shadowColor = '#00E5FF';
                ctx.shadowBlur = 15;
                ctx.lineWidth = 1.5 + Math.random() * 2;
                
                let curX = node.x;
                let curY = node.y;
                ctx.moveTo(curX, curY);
                
                const steps = 8;
                for (let s = 0; s < steps; s++) {
                    const p = s / steps;
                    const nextX = curX + (targetX - curX) * p + (Math.random() - 0.5) * 50;
                    const nextY = curY + (targetY - curY) * p + (Math.random() - 0.5) * 40;
                    ctx.lineTo(nextX, nextY);
                    curX = nextX;
                    curY = nextY;
                }
                ctx.lineTo(targetX, targetY);
                ctx.stroke();
                ctx.restore();
            });
        }

        canvasParticles = canvasParticles.filter(p => {
            const active = p.update(time);
            if (active) {
                p.draw(ctx);
            }
            return active;
        });

        if (canvasParticles.length > 0 || neuralLinkActive || isCharging) {
            requestAnimationFrame(updateAndDrawCanvas);
        } else {
            isCanvasLoopRunning = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
        }
    };

    document.addEventListener('mousedown', (e) => {
        // Prevent click particle trigger on dashboard buttons/form controls
        if (e.target.closest('button, a, input, textarea')) return;
        addCanvasParticles(e.pageX, e.pageY, 'pulse');
    });

    // =========================================
    // 3. THEME TOGGLE (WITH LOCAL STORAGE)
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark');
        const icon = themeToggle.querySelector('i');
        const isDark = body.classList.contains('dark');
        
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');

        if (icon) {
            if (isDark) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        }

        // Trigger a core pulse wave on theme change
        if (isCursorVisible) {
            addCanvasParticles(targetX + window.scrollX, targetY + window.scrollY, 'pulse');
        }
    });

    // Audio Toggle Listener
    const audioToggle = document.getElementById('audio-toggle');
    audioToggle?.addEventListener('click', () => {
        const isMuted = synthesizer.toggleMute();
        const icon = audioToggle.querySelector('i');
        if (icon) {
            if (isMuted) {
                icon.className = 'fas fa-volume-mute';
            } else {
                icon.className = 'fas fa-volume-up';
                synthesizer.playReset();
            }
        }
    });

    // =========================================
    // 4. HERO SECTION TYPING EFFECT (CYCLES PHRASES)
    // =========================================
    const heroNameEl = document.querySelector('.hero-name');
    const heroWorkEl = document.querySelector('.hero-work');
    const logoEl = document.querySelector('.logo .logo-name');
    
    // Cycle taglines in the hero-work heading
    const taglines = [
        "Java Full Stack Dev.",
        "Spring Boot Dev.",
        "Competitive Programmer.",
        "Problem Solver & Builder."
    ];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    const typeTaglines = () => {
        if (!heroWorkEl) return;

        const currentPhrase = taglines[taglineIndex];
        
        if (isDeleting) {
            heroWorkEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30; // Faster deleting
        } else {
            heroWorkEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70; // Normal typing
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeTaglines, typingSpeed);
    };

    // Simple typewriter for navbar logo
    let logoCharIndex = 0;
    const logoName = "Snehal Baranwal";
    const typeLogo = () => {
        if (!logoEl) return;
        if (logoCharIndex < logoName.length) {
            logoEl.textContent += logoName.charAt(logoCharIndex);
            logoCharIndex++;
            setTimeout(typeLogo, 100);
        }
    };

    // Run Typing Effects
    typeLogo();
    setTimeout(typeTaglines, 1200);

    // =========================================
    // 5. INTERSECTION OBSERVER FOR SCROLL VISIBILITY
    // =========================================
    const scrollRevealElements = document.querySelectorAll(
        '.section, .timeline-item, .skills-category, .project, .stat-card, .cert-card, .contact-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve once animated in to keep performance optimal
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => {
        // Pre-setup elements for reveal
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Add inline class trigger when reveal occurs
    document.addEventListener('transitionend', (e) => {
        const target = e.target;
        if (target.style.opacity === '1') {
            target.style.transform = '';
            target.style.opacity = '';
            target.style.transition = '';
        }
    });

    // CSS injection for reveal active class
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .section.visible, .timeline-item.visible, .skills-category.visible, 
        .project.visible, .stat-card.visible, .cert-card.visible, .contact-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // =========================================
    // 6. STATS COUNTER ANIMATION
    // =========================================
    const statsSection = document.querySelector('#stats');
    let hasCountersRun = false;

    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(numEl => {
            const target = parseInt(numEl.getAttribute('data-target'), 10) || 0;
            let current = 0;
            const duration = 1500; // 1.5 seconds
            const steps = 40;
            const increment = target / steps;
            const stepDuration = duration / steps;

            const counterInterval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    numEl.textContent = target;
                    clearInterval(counterInterval);
                } else {
                    numEl.textContent = Math.floor(current);
                }
            }, stepDuration);
        });
    };

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCountersRun) {
                    animateCounters();
                    hasCountersRun = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        statsObserver.observe(statsSection);
    }

    // =========================================
    // 7. BACK TO TOP BUTTON & HEADER SCROLL
    // =========================================
    const backToTop = document.getElementById('backToTop');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =========================================
    // 8. CONTACT FORM HANDLING
    // =========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const btnSubmit = document.getElementById('btn-submit');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('contact-name').value.trim();
        const emailVal = document.getElementById('contact-email').value.trim();
        const subjectVal = document.getElementById('contact-subject').value.trim();
        const messageVal = document.getElementById('contact-message').value.trim();

        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            showFormStatus("Please fill in all fields before sending.", "error");
            return;
        }

        btnSubmit.disabled = true;
        const btnText = btnSubmit.querySelector('.btn-text');
        const btnIcon = btnSubmit.querySelector('.btn-icon');
        const originalText = btnText ? btnText.textContent : 'Send Message';
        
        if (btnText) btnText.textContent = "Transmitting Data Packet...";
        if (btnIcon) btnIcon.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Play deploy sound
        synthesizer.playConsoleDeploy();

        // Spawn a CSS smoke bomb over the form
        const rect = contactForm.getBoundingClientRect();
        const smoke = document.createElement('div');
        smoke.className = 'smoke-burst';
        smoke.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
        smoke.style.top = `${window.scrollY + rect.top + rect.height / 2}px`;
        document.body.appendChild(smoke);
        setTimeout(() => smoke.remove(), 600);

        // Spawn flying digital packet messenger
        const bird = document.createElement('div');
        bird.className = 'data-packet';
        bird.innerHTML = '✉️';
        bird.style.left = `${rect.left + rect.width / 2}px`;
        bird.style.top = `${rect.top + rect.height / 2}px`;
        bird.style.setProperty('--start-x', `${rect.left + rect.width / 2}px`);
        bird.style.setProperty('--start-y', `${rect.top + rect.height / 2}px`);
        bird.style.setProperty('--mid-x', `${window.innerWidth / 2}px`);
        bird.style.setProperty('--mid-y', `100px`);
        bird.style.setProperty('--end-x', `${window.innerWidth + 100}px`);
        bird.style.setProperty('--end-y', `300px`);
        document.body.appendChild(bird);
        setTimeout(() => bird.remove(), 2500);

        setTimeout(() => {
            btnSubmit.disabled = false;
            if (btnText) btnText.textContent = originalText;
            if (btnIcon) btnIcon.innerHTML = `<i class="fas fa-paper-plane"></i>`;

            showFormStatus("Transmission Successful! Your message was dispatched successfully.", "success");
            contactForm.reset();
        }, 1800);
    });

    const showFormStatus = (message, statusClass) => {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status ${statusClass}`;
        
        // Auto fade status message after 6 seconds
        setTimeout(() => {
            formStatus.style.transition = 'opacity 1s ease';
            formStatus.style.opacity = '0';
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.style.opacity = '1';
                formStatus.className = 'form-status';
            }, 1000);
        }, 6000);
    };

    // =========================================
    // 8b. CONTACT FORM ENHANCEMENTS
    // =========================================
    // Character counter for message textarea
    const messageTextarea = document.getElementById('contact-message');
    const charCounter = document.getElementById('char-counter');
    const MAX_CHARS = 500;

    messageTextarea?.addEventListener('input', () => {
        const len = messageTextarea.value.length;
        if (charCounter) {
            charCounter.textContent = `${len} / ${MAX_CHARS}`;
            charCounter.classList.remove('near-limit', 'at-limit');
            if (len >= MAX_CHARS) {
                charCounter.classList.add('at-limit');
            } else if (len >= MAX_CHARS * 0.8) {
                charCounter.classList.add('near-limit');
            }
        }
        // Cap at MAX_CHARS
        if (len > MAX_CHARS) {
            messageTextarea.value = messageTextarea.value.substring(0, MAX_CHARS);
        }
    });

    // Input validation visual feedback
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        // Add checkmark icon span if not present
        const group = input.closest('.form-group');
        if (group && !group.querySelector('.input-valid-check')) {
            const check = document.createElement('span');
            check.className = 'input-valid-check';
            check.innerHTML = '<i class="fas fa-check-circle"></i>';
            group.appendChild(check);
        }

        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (!group) return;
            if (input.checkValidity() && input.value.trim().length > 0) {
                group.classList.add('is-valid');
            } else {
                group.classList.remove('is-valid');
            }
        });
    });

    // Button ripple effect
    const submitBtn = document.getElementById('btn-submit');
    submitBtn?.addEventListener('click', (e) => {
        const ripple = submitBtn.querySelector('.btn-ripple');
        if (!ripple) return;
        const rect = submitBtn.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        ripple.classList.remove('active');
        // Force reflow to restart animation
        void ripple.offsetWidth;
        ripple.classList.add('active');
    });

    // =========================================
    // 9. DETECT ACTIVE MENU LINKS ON SCROLL
    // =========================================
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveNav = () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 120; // Account for headers and padding

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;
            if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        // Force highlight last section if scrolled to the very bottom of the page
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
            if (sections.length > 0) {
                currentSectionId = sections[sections.length - 1].getAttribute('id');
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // =========================================
    // 10. SCROLL PROGRESS INDICATOR
    // =========================================
    const scrollProgressEl = document.getElementById('scroll-progress');
    const updateScrollProgress = () => {
        if (!scrollProgressEl) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgressEl.style.width = `${scrollPercent}%`;
    };
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // =========================================
    // 11. TIMELINE SCROLL PATH & DRAWER TOGGLE
    // =========================================
    const timeline = document.querySelector('.timeline');
    const lineFill = document.querySelector('.timeline-line-fill');
    
    const animateTimelineLine = () => {
        if (!timeline || !lineFill) return;
        const rect = timeline.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        const startTrigger = viewHeight * 0.8;
        const endTrigger = viewHeight * 0.4;
        
        let progress = 0;
        if (rect.top < startTrigger) {
            const totalHeight = rect.height;
            const scrolledAmount = startTrigger - rect.top;
            progress = Math.min(100, Math.max(0, (scrolledAmount / (totalHeight + startTrigger - endTrigger)) * 100));
        }
        lineFill.style.height = `${progress}%`;
    };
    window.addEventListener('scroll', animateTimelineLine);
    animateTimelineLine();

    // Toggle timeline items expansion details drawer
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.addEventListener('click', () => {
            content.classList.toggle('active');
            synthesizer.playModuleClick();
        });
    });

    // =========================================
    // 11b. SCROLL REVEAL ANIMATION
    // =========================================
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    // =========================================
    // 11c. NAV SCROLLED STATE
    // =========================================
    const navEl = document.querySelector('nav');
    const updateNavScrolled = () => {
        if (window.scrollY > 30) {
            navEl?.classList.add('scrolled');
        } else {
            navEl?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateNavScrolled, { passive: true });
    updateNavScrolled();

    // =========================================
    // 12. (RESERVED)
    // =========================================

    // =========================================
    // 13. PROJECTS CONSOLE TYPEWRITER LOGS
    // =========================================
    const projectsList = document.querySelectorAll('.project');
    projectsList.forEach(proj => {
        const consoleEl = proj.querySelector('.project-console');
        const projId = proj.getAttribute('data-project-id');
        let typingInterval = null;

        const linesMap = {
            '1': [
                "> Initializing Redis catalog keys...",
                "> Database query: SELECT * FROM products WHERE featured=true",
                "> Catalog cache: HIT (12ms)",
                "> Stripe API status: SECURE"
            ],
            '2': [
                "> Establishing WebSocket server on port 8080...",
                "> WS Connection pool initialized (size: 500)",
                "> JWT Security check: Snehal Baranwal token AUTHORIZED",
                "> Database sync: COMPLETE"
            ],
            '3': [
                "> Initializing GPU render pipeline...",
                "> Compiling vector matrices...",
                "> Custom cursor position logging history active",
                "> Developer portfolio deployment: ONLINE"
            ]
        };

        proj.addEventListener('mouseenter', () => {
            if (isTouchDevice || !consoleEl) return;
            consoleEl.innerHTML = '';
            const lines = linesMap[projId] || ["> System ready."];
            let lineIdx = 0;
            let charIdx = 0;

            const typeLine = () => {
                if (lineIdx >= lines.length) return;
                if (charIdx === 0) {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'console-line';
                    consoleEl.appendChild(lineDiv);
                }
                const activeLineDiv = consoleEl.lastElementChild;
                if (activeLineDiv) {
                    activeLineDiv.textContent = lines[lineIdx].substring(0, charIdx + 1);
                    charIdx++;

                    if (charIdx >= lines[lineIdx].length) {
                        lineIdx++;
                        charIdx = 0;
                        typingInterval = setTimeout(typeLine, 100);
                    } else {
                        typingInterval = setTimeout(typeLine, 25);
                    }
                }
            };
            typeLine();
        });

        proj.addEventListener('mouseleave', () => {
            if (isTouchDevice) return;
            clearTimeout(typingInterval);
            if (consoleEl) consoleEl.innerHTML = '';
        });

        // 3D tilt effect on project card hover
        if (!isTouchDevice) {
            proj.addEventListener('mousemove', (e) => {
                const rect = proj.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = ((e.clientX - centerX) / (rect.width / 2)) * 6;
                const deltaY = ((e.clientY - centerY) / (rect.height / 2)) * 6;
                proj.style.transform = `translateY(-12px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale(1.01)`;
            });

            proj.addEventListener('mouseleave', () => {
                proj.style.transform = '';
                proj.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });

            proj.addEventListener('mouseenter', () => {
                proj.style.transition = 'transform 0.08s linear';
            });
        }
    });

    // =========================================
    // 14. RESUME FILTERING LOGIC
    // =========================================
    const resumeTabs = document.querySelectorAll('.resume-tab-btn');
    const previewItems = document.querySelectorAll('.resume-preview-card [data-focus]');
    const skillPills = document.querySelectorAll('.preview-skills-list[data-focus]');

    resumeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            resumeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-target');
            synthesizer.playReset();

            previewItems.forEach(item => {
                const focus = item.getAttribute('data-focus');
                if (filter === 'all' || focus === filter) {
                    item.classList.remove('hidden-item');
                } else {
                    item.classList.add('hidden-item');
                }
            });

            skillPills.forEach(pill => {
                const focus = pill.getAttribute('data-focus');
                if (filter === 'all' || focus === filter) {
                    pill.classList.remove('hidden-item');
                } else {
                    pill.classList.add('hidden-item');
                }
            });
        });
    });

    // =========================================
    // 14b. SKILLS FILTER TABS & HONEYCOMB HUD SYNC
    // =========================================
    const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
    const hexCells = document.querySelectorAll('.hex-cell');
    const hudDisplayPanel = document.getElementById('hudDisplayPanel');

    // Honeycomb filter logic
    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            hexCells.forEach(cell => {
                const category = cell.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    cell.style.display = 'block';
                    setTimeout(() => {
                        cell.style.opacity = '1';
                        const isEven = [...hexCells].indexOf(cell) % 2 !== 0;
                        cell.style.transform = isEven ? 'translateY(15px) scale(1)' : 'scale(1)';
                    }, 50);
                } else {
                    cell.style.opacity = '0';
                    cell.style.transform = 'scale(0.7)';
                    setTimeout(() => {
                        cell.style.display = 'none';
                    }, 300);
                }
            });

            // Play system audio feedback
            try {
                if (typeof synthesizer !== 'undefined' && synthesizer.playReset) {
                    synthesizer.playReset();
                }
            } catch (err) {}
        });
    });

    // Honeycomb HUD Node Hover Sync
    hexCells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            const skill = cell.getAttribute('data-skill');
            const category = cell.getAttribute('data-category');
            const pct = cell.getAttribute('data-pct');
            const level = cell.getAttribute('data-level');
            const color = cell.getAttribute('data-color');
            const desc = cell.getAttribute('data-desc');

            if (!hudDisplayPanel) return;

            // Led pulse color indicator
            const led = hudDisplayPanel.querySelector('.hud-status-led');
            if (led) {
                led.className = 'hud-status-led pulse-glow-green';
            }

            // HUD header scanning text
            const hudTitle = hudDisplayPanel.querySelector('.hud-title');
            if (hudTitle) {
                hudTitle.textContent = `SYSTEM DIAGNOSTICS: PROBING ${skill.toUpperCase()}`;
            }

            // Populate diagnostics data
            const fieldsContainer = hudDisplayPanel.querySelector('.hud-data-fields');
            if (fieldsContainer) {
                fieldsContainer.innerHTML = `
                    <div class="hud-detail-title">${skill}</div>
                    <div class="hud-detail-category" style="--brand-color: ${color}">${category.toUpperCase()} MODULE // SYNC OK</div>
                    <div class="hud-detail-desc">${desc}</div>
                    
                    <div class="hud-proficiency-row">
                        <span class="hud-proficiency-lbl">ENGINE CAPABILITY:</span>
                        <span class="hud-proficiency-val" style="color: ${color}">${level} (${pct}%)</span>
                    </div>
                    <div class="hud-bar-track">
                        <div class="hud-bar-fill" style="--brand-color: ${color}; width: 0%;"></div>
                    </div>
                    
                    <div class="hud-extra-stats">
                        <span>LATENCY: <strong>0.12s</strong></span>
                        <span>BUS SPEED: <strong>4.8 GT/s</strong></span>
                        <span>STATUS: <strong>STABLE</strong></span>
                    </div>
                `;

                // Animate proficiency bar
                setTimeout(() => {
                    const fill = fieldsContainer.querySelector('.hud-bar-fill');
                    if (fill) fill.style.width = pct + '%';
                }, 50);
            }

            // System beep trigger
            try {
                if (typeof synthesizer !== 'undefined' && synthesizer.playReset) {
                    synthesizer.playReset();
                }
            } catch (err) {}
        });
    });

    // =========================================
    // 15. CERTIFICATIONS LIGHTBOX VAULT
    // =========================================
    const certCards = document.querySelectorAll('.cert-card');
    const lightbox = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxIssuer = document.getElementById('lightboxIssuer');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const closeLightbox = document.getElementById('closeLightbox');

    certCards.forEach(card => {
        const btnCert = card.querySelector('.btn-cert');
        const imgPath = card.getAttribute('data-cert-img');
        const desc = card.getAttribute('data-cert-desc');
        const title = card.querySelector('h4').textContent;
        const issuer = card.querySelector('.cert-issuer').textContent;

        const triggerVerification = (e) => {
            e.preventDefault();
            if (card.classList.contains('scanning')) return;

            // Trigger scanner line sweep
            card.classList.add('scanning');

            // Beep sound
            try {
                if (typeof synthesizer !== 'undefined' && synthesizer.playReset) {
                    synthesizer.playReset();
                }
            } catch (err) {}

            // Wait 1.4s matching keycardScan CSS animation before lightbox load
            setTimeout(() => {
                card.classList.remove('scanning');
                if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxIssuer || !lightboxDesc) return;

                lightboxImg.src = imgPath;
                lightboxTitle.textContent = title;
                lightboxIssuer.textContent = issuer;
                lightboxDesc.textContent = desc;

                lightbox.classList.add('active');

                // Lightbox sound
                try {
                    if (typeof synthesizer !== 'undefined' && synthesizer.playOpen) {
                        synthesizer.playOpen();
                    }
                } catch (err) {}
            }, 1400);
        };

        btnCert?.addEventListener('click', triggerVerification);
    });

    closeLightbox?.addEventListener('click', () => {
        lightbox?.classList.remove('active');
    });

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // =========================================
    // 16. CORE POWER STATE & OVERCLOCK SYSTEM
    // =========================================
    let corePowerLevel = 100;
    const corePowerFill = document.getElementById('core-power-fill');
    const corePowerText = document.getElementById('core-power-text');
    const overclockBtn = document.getElementById('overclockBtn');
    
    let chargeInterval = null;
    let chargeAudioRef = null;

    const updateCorePowerUI = () => {
        if (corePowerFill) corePowerFill.style.height = `${corePowerLevel}%`;
        if (corePowerText) corePowerText.textContent = `${Math.floor(corePowerLevel)}%`;
    };
    updateCorePowerUI();

    const deductCorePower = (amount) => {
        if (corePowerLevel >= amount) {
            corePowerLevel = Math.max(0, corePowerLevel - amount);
            updateCorePowerUI();
            return true;
        }
        return false;
    };

    const startCharging = () => {
        if (isCharging) return;
        isCharging = true;
        document.body.classList.add('charging-active-aura', 'shake-active');
        chargeAudioRef = synthesizer.playCharging();
        
        if (canvas && canvas.style.display !== 'block') {
            canvas.style.display = 'block';
        }
        if (!isCanvasLoopRunning) {
            isCanvasLoopRunning = true;
            requestAnimationFrame(updateAndDrawCanvas);
        }
        
        chargeInterval = setInterval(() => {
            if (corePowerLevel < 100) {
                corePowerLevel = Math.min(100, corePowerLevel + 2);
                updateCorePowerUI();
                
                if (isCursorVisible) {
                    addCanvasParticles(targetX + window.scrollX + (Math.random() - 0.5) * 300, targetY + window.scrollY + (Math.random() - 0.5) * 300, 'rasengan');
                }
            }
        }, 50);
    };

    const stopCharging = () => {
        if (!isCharging) return;
        isCharging = false;
        document.body.classList.remove('charging-active-aura', 'shake-active');
        clearInterval(chargeInterval);
        
        if (chargeAudioRef) {
            try {
                chargeAudioRef.osc.stop();
            } catch(e) {}
        }
    };

    overclockBtn?.addEventListener('mousedown', startCharging);
    overclockBtn?.addEventListener('mouseup', stopCharging);
    overclockBtn?.addEventListener('mouseleave', stopCharging);

    overclockBtn?.addEventListener('touchstart', (e) => { e.preventDefault(); startCharging(); });
    overclockBtn?.addEventListener('touchend', stopCharging);

    window.addEventListener('keydown', (e) => {
        if ((e.key === ' ' || e.key.toLowerCase() === 'c') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            startCharging();
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.key === ' ' || e.key.toLowerCase() === 'c') {
            stopCharging();
        }
    });

    // =========================================
    // 17. ABOUT ME TERMINAL TYPEWRITER CODE STREAM
    // =========================================
    const runBtn = document.getElementById('runTerminalCode');
    const termBody = document.getElementById('aboutTerminalBody');
    let terminalExecuting = false;

    // Auto-run terminal on scroll into view
    const aboutSection = document.querySelector('#about');
    let autoTerminalRun = false;
    if (aboutSection) {
        const autoTerminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !autoTerminalRun && !terminalExecuting) {
                    autoTerminalRun = true;
                    // Small delay then auto-trigger
                    setTimeout(() => {
                        if (runBtn) runBtn.click();
                    }, 800);
                    autoTerminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        autoTerminalObserver.observe(aboutSection);
    }

    runBtn?.addEventListener('click', () => {
        if (terminalExecuting || !termBody) return;
        terminalExecuting = true;
        synthesizer.playReset();

        termBody.innerHTML = '';
        const lines = [
            { text: "snehal@vitbhopal:~$ java DeveloperDNA.java", class: "" },
            { text: "[INFO] Initializing JVM cognitive parsing...", class: "output" },
            { text: "[DEBUG] Target dataset loaded: Snehal's GitHub repository registry", class: "output" },
            { text: "[DEBUG] Commencing full-stack security and service scan...", class: "output" },
            { text: "[SUCCESS] Full-Stack Java capabilities verified: 100% capacity", class: "output" },
            { text: "[SUCCESS] Advanced algorithm and data structure metrics: S-Rank", class: "output" },
            { text: "[STATUS] Portfolio compilation completed in 12ms.", class: "output" },
            { text: "snehal@vitbhopal:~$ ", class: "", prompt: true }
        ];

        let lineIndex = 0;
        const printLine = () => {
            if (lineIndex >= lines.length) {
                terminalExecuting = false;
                return;
            }

            const currentLine = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line' + (currentLine.class ? ' ' + currentLine.class : '');
            
            if (currentLine.prompt) {
                lineDiv.innerHTML = `<span class="terminal-prompt">${currentLine.text}</span><span class="terminal-cursor">█</span>`;
                termBody.appendChild(lineDiv);
                lineIndex++;
                printLine();
            } else {
                termBody.appendChild(lineDiv);
                let charIndex = 0;
                const typeChar = () => {
                    lineDiv.textContent = currentLine.text.substring(0, charIndex + 1);
                    charIndex++;
                    if (charIndex < currentLine.text.length) {
                        setTimeout(typeChar, 15);
                    } else {
                        lineIndex++;
                        setTimeout(printLine, 150);
                    }
                };
                typeChar();
            }
        };
        printLine();
    });

    // =========================================
    // 18. SYSTEM DIAGNOSTICS SANDBOX ENGINE
    // =========================================
    const handSignBtns = document.querySelectorAll('.sandbox-module-btn');
    const sequenceHistory = document.getElementById('sequenceHistory');
    const resetSandbox = document.getElementById('resetSandbox');
    const sandboxOutput = document.getElementById('sandboxOutput');
    
    let lightningInterval = null;
    
    let moduleSequence = [];
    let rasenganInterval = null;
    let rasenganActive = false;
    
    const diagnosticSimulations = {
        thermalEngine: {
            seq: ['thread', 'buffer', 'kernel'],
            name: "Thermal Engine Simulation 🔥",
            color: "#E52E10",
            action: (boardRect) => {
                if (!deductCorePower(30)) {
                    sandboxOutput.textContent = "Core Power depleted! Overclock system.";
                    sandboxOutput.style.color = "#FF3E3E";
                    setTimeout(resetSequence, 1500);
                    return;
                }
                synthesizer.playThermalEngine();
                
                const targetPageX = targetX + window.scrollX;
                const targetPageY = targetY + window.scrollY;
                const boardCenter = {
                    x: window.scrollX + boardRect.left + boardRect.width/2,
                    y: window.scrollY + boardRect.top + boardRect.height/2
                };
                let progress = 0;
                const drawFireball = () => {
                    if (progress >= 1) {
                        addCanvasParticles(targetPageX, targetPageY, 'fire');
                        document.body.classList.add('overclock-active', 'heatwave-active');
                        sandboxOutput.textContent = "Thermal Engine Mode Active 🔴";
                        sandboxOutput.style.color = "#FFD700";
                        
                        setTimeout(() => {
                            document.body.classList.remove('overclock-active', 'heatwave-active');
                            resetSequence();
                        }, 7000);
                        return;
                    }
                    const fireX = boardCenter.x + (targetPageX - boardCenter.x) * progress;
                    const fireY = boardCenter.y + (targetPageY - boardCenter.y) * progress;
                    addCanvasParticles(fireX, fireY, 'fire');
                    progress += 0.05;
                    requestAnimationFrame(drawFireball);
                };
                drawFireball();
            }
        },
        neuralLink: {
            seq: ['array', 'query', 'kernel'],
            name: "Neural Link Simulation ⚡",
            color: "#00DFFF",
            action: () => {
                if (!deductCorePower(45)) {
                    sandboxOutput.textContent = "Core Power depleted! Overclock system.";
                    sandboxOutput.style.color = "#FF3E3E";
                    setTimeout(resetSequence, 1500);
                    return;
                }
                const neuralLinkAudio = synthesizer.playNeuralLink();
                if (!canvas || !ctx) return;
                canvas.style.display = 'block';
                document.body.classList.add('shake-active');
                
                // Cache anchors once
                const anchors = document.querySelectorAll('h2, .project, .skills-category');
                neuralLinkNodes = Array.from(anchors).map(node => {
                    const r = node.getBoundingClientRect();
                    return {
                        x: r.left + r.width/2 + window.scrollX,
                        y: r.top + r.height/2 + window.scrollY
                    };
                });

                neuralLinkActive = true;
                if (!isCanvasLoopRunning) {
                    isCanvasLoopRunning = true;
                    requestAnimationFrame(updateAndDrawCanvas);
                }

                lightningInterval = setInterval(() => {
                    addCanvasParticles(targetX + window.scrollX, targetY + window.scrollY, 'pulse');
                }, 80);
                
                setTimeout(() => {
                    clearInterval(lightningInterval);
                    neuralLinkActive = false;
                    document.body.classList.remove('shake-active');
                    if (neuralLinkAudio) {
                        try {
                            neuralLinkAudio.osc.stop();
                            neuralLinkAudio.modulator.stop();
                        } catch(e) {}
                    }
                    resetSequence();
                }, 4500);
            }
        },
        gravityAttractor: {
            seq: ['buffer', 'array', 'thread'],
            name: "Gravity Attractor Simulation 🌀",
            color: "#06B6D4",
            action: () => {
                if (!deductCorePower(40)) {
                    sandboxOutput.textContent = "Core Power depleted! Overclock system.";
                    sandboxOutput.style.color = "#FF3E3E";
                    setTimeout(resetSequence, 1500);
                    return;
                }
                const rasenganAudio = synthesizer.playGravityAttractor();
                rasenganActive = true;
                const cursorEl = document.querySelector('.cursor');
                if (cursorEl) {
                    cursorEl.style.width = '80px';
                    cursorEl.style.height = '80px';
                    cursorEl.style.boxShadow = '0 0 35px #00E5FF, 0 0 70px rgba(6,182,212,0.6)';
                }
                
                // Cache card coordinates once
                const cards = document.querySelectorAll('.project, .skill, .stat-card');
                const cachedCards = Array.from(cards).map(card => {
                    const r = card.getBoundingClientRect();
                    return {
                        el: card,
                        x: r.left + r.width/2 + window.scrollX,
                        y: r.top + r.height/2 + window.scrollY
                    };
                });

                rasenganInterval = setInterval(() => {
                    addCanvasParticles(targetX + window.scrollX, targetY + window.scrollY, 'rasengan');
                    const targetPageX = targetX + window.scrollX;
                    const targetPageY = targetY + window.scrollY;

                    cachedCards.forEach(item => {
                        const dx = targetPageX - item.x;
                        const dy = targetPageY - item.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < 300) {
                            const force = (300 - dist) / 18;
                            item.el.style.transform = `translate3d(${dx * (force/dist)}px, ${dy * (force/dist)}px, 0) scale(0.98)`;
                            item.el.style.transition = 'transform 0.1s ease';
                        } else {
                            item.el.style.transform = '';
                        }
                    });
                }, 50);
                
                setTimeout(() => {
                    clearInterval(rasenganInterval);
                    rasenganActive = false;
                    if (cursorEl) {
                        cursorEl.style.width = '';
                        cursorEl.style.height = '';
                        cursorEl.style.boxShadow = '';
                    }
                    cachedCards.forEach(item => item.el.style.transform = '');
                    
                    if (rasenganAudio) {
                        try {
                            rasenganAudio.carrier.stop();
                            rasenganAudio.modulator.stop();
                        } catch(e) {}
                    }
                    resetSequence();
                }, 5000);
            }
        },
        nodeReplication: {
            seq: ['kernel', 'buffer', 'array'],
            name: "Node Replication Simulation 👥",
            color: "#00FF7F",
            action: () => {
                if (!deductCorePower(25)) {
                    sandboxOutput.textContent = "Core Power depleted! Overclock system.";
                    sandboxOutput.style.color = "#FF3E3E";
                    setTimeout(resetSequence, 1500);
                    return;
                }
                clonesActive = true;
                synthesizer.playConsoleDeploy();
                
                const cloneWrapper = [];
                const textContent = [
                    { title: "Worker Thread #1", desc: "Expert in compiling stack instances." },
                    { title: "Worker Thread #2", desc: "Specializes in relational database queries." },
                    { title: "Worker Thread #3", desc: "Crafts reports inside Power BI & Excel." }
                ];
                for (let i = 0; i < 3; i++) {
                    const clone = document.createElement('div');
                    clone.className = 'worker-thread-card';
                    clone.innerHTML = `<h4>${textContent[i].title}</h4><p>${textContent[i].desc}</p><strong>Click to Terminate Thread!</strong>`;
                    
                    const cloneX = targetX + (Math.random() - 0.5) * 300;
                    const cloneY = targetY + (Math.random() - 0.5) * 300;
                    clone.style.left = `${cloneX}px`;
                    clone.style.top = `${cloneY}px`;
                    
                    let dx = (Math.random() - 0.5) * 4;
                    let dy = (Math.random() - 0.5) * 4;
                    
                    document.body.appendChild(clone);
                    cloneWrapper.push({ el: clone, x: cloneX, y: cloneY, w: 250, h: 160, dx, dy });

                    // Canvas smoke particles instead of DOM elements!
                    addCanvasParticles(cloneX + window.scrollX, cloneY + window.scrollY, 'smoke');

                    clone.addEventListener('click', () => {
                        synthesizer.playConsoleDeploy();
                        
                        const cloneRect = clone.getBoundingClientRect();
                        const cloneCenterX = cloneRect.left + cloneRect.width/2 + window.scrollX;
                        const cloneCenterY = cloneRect.top + cloneRect.height/2 + window.scrollY;

                        addCanvasParticles(cloneCenterX, cloneCenterY, 'smoke');

                        const log = document.createElement('div');
                        log.className = 'thread-release-indicator';
                        log.innerHTML = '⚙️';
                        log.style.left = `${cloneCenterX}px`;
                        log.style.top = `${cloneCenterY}px`;
                        document.body.appendChild(log);
                        setTimeout(() => log.remove(), 1500);

                        clone.remove();
                        const idx = cloneWrapper.findIndex(c => c.el === clone);
                        if (idx !== -1) cloneWrapper.splice(idx, 1);
                    });
                }

                const driftLoop = () => {
                    if (!clonesActive) return;
                    cloneWrapper.forEach(c => {
                        c.x += c.dx;
                        c.y += c.dy;
                        
                        if (c.x < 20 || c.x + c.w > window.innerWidth - 20) {
                            c.dx *= -1;
                            c.x = Math.max(20, Math.min(window.innerWidth - 20 - c.w, c.x));
                        }
                        if (c.y < 80 || c.y + c.h > window.innerHeight - 20) {
                            c.dy *= -1;
                            c.y = Math.max(80, Math.min(window.innerHeight - 20 - c.h, c.y));
                        }
                        
                        c.el.style.left = `${c.x}px`;
                        c.el.style.top = `${c.y}px`;
                    });
                    requestAnimationFrame(driftLoop);
                };
                requestAnimationFrame(driftLoop);

                setTimeout(() => {
                    clonesActive = false;
                    cloneWrapper.forEach(c => {
                        const r = c.el.getBoundingClientRect();
                        addCanvasParticles(r.left + r.width/2 + window.scrollX, r.top + r.height/2 + window.scrollY, 'smoke');
                        c.el.remove();
                    });
                    resetSequence();
                }, 8000);
            }
        },
        matrixOverhaul: {
            seq: ['thread', 'shader', 'kernel'],
            name: "Matrix Overhaul Simulation 👁️",
            color: "#E50914",
            action: () => {
                if (!deductCorePower(100)) {
                    sandboxOutput.textContent = "Core Power depleted! Overclock system.";
                    sandboxOutput.style.color = "#FF3E3E";
                    setTimeout(resetSequence, 1500);
                    return;
                }
                const tsukuyomiAudio = synthesizer.playOverrideActive();
                document.body.classList.add('system-override-active');
                sandboxOutput.textContent = "MATRIX OVERRIDE ACTIVE 🔴";
                sandboxOutput.style.color = "#E50914";

                const crowInterval = setInterval(() => {
                    if (!document.body.classList.contains('system-override-active')) {
                        clearInterval(crowInterval);
                        return;
                    }
                    const crow = document.createElement('div');
                    crow.className = 'matrix-data-stream';
                    crow.style.setProperty('--start-y', `${Math.random()*80}vh`);
                    crow.style.setProperty('--mid-y', `${Math.random()*80}vh`);
                    crow.style.setProperty('--end-y', `${Math.random()*80}vh`);
                    document.body.appendChild(crow);
                    setTimeout(() => crow.remove(), 5000);
                }, 900);

                const quotes = [
                    "Override sequence initiated...",
                    "Connection locked. System override active.",
                    "Access restricted.",
                    "Initializing core memory registers..."
                ];
                let quoteIdx = 0;
                sandboxOutput.textContent = `👁️ Matrix Overhaul: "${quotes[quoteIdx]}"`;
                const quoteInterval = setInterval(() => {
                    quoteIdx = (quoteIdx + 1) % quotes.length;
                    sandboxOutput.textContent = `👁️ Matrix Overhaul: "${quotes[quoteIdx]}"`;
                }, 2500);

                setTimeout(() => {
                    document.body.classList.remove('system-override-active');
                    clearInterval(crowInterval);
                    clearInterval(quoteInterval);

                    if (tsukuyomiAudio) {
                        try {
                            tsukuyomiAudio.osc1.stop();
                            tsukuyomiAudio.osc2.stop();
                        } catch(e) {}
                    }
                    resetSequence();
                }, 10000);
            }
        },
        diagnosticsReport: {
            seq: ['array', 'shader', 'buffer'],
            name: "System Diagnostics Report 📜",
            color: "#8B5A2B",
            action: () => {
                if (!deductCorePower(50)) {
                    sandboxOutput.textContent = "Core Power depleted! Overclock system.";
                    sandboxOutput.style.color = "#FF3E3E";
                    setTimeout(resetSequence, 1500);
                    return;
                }
                synthesizer.playConsoleDeploy();
                
                const boardRect = document.querySelector('.shader-sandbox').getBoundingClientRect();
                addCanvasParticles(window.scrollX + boardRect.left + boardRect.width/2, window.scrollY + boardRect.top + boardRect.height/2, 'smoke');

                const scrollOverlay = document.getElementById('diagnostics-overlay');
                const fillBars = scrollOverlay?.querySelectorAll('.stat-bar-fill');
                
                setTimeout(() => {
                    if (scrollOverlay) {
                        scrollOverlay.classList.add('active');
                        fillBars?.forEach(bar => {
                            const targetWidth = bar.style.width;
                            bar.style.width = '0';
                            setTimeout(() => {
                                bar.style.width = targetWidth;
                            }, 400);
                        });
                    }
                }, 300);
            }
        }
    };
    
    const checkSimulation = () => {
        if (moduleSequence.length === 3) {
            const boardRect = document.querySelector('.shader-sandbox').getBoundingClientRect();
            let matchedSimulation = null;
            
            for (const key in diagnosticSimulations) {
                const j = diagnosticSimulations[key];
                const matched = moduleSequence.every((sign, idx) => sign === j.seq[idx]);
                if (matched) {
                    matchedSimulation = j;
                    break;
                }
            }
            
            if (matchedSimulation) {
                sandboxOutput.textContent = matchedSimulation.name;
                sandboxOutput.style.color = matchedSimulation.color;
                matchedSimulation.action(boardRect);
            } else {
                sandboxOutput.textContent = "Compilation Failed! Invalid Sequence.";
                sandboxOutput.style.color = "#DC143C";
                setTimeout(() => {
                    resetSequence();
                }, 1500);
            }
        }
    };
    
    const updateSequenceDisplay = () => {
        if (!sequenceHistory) return;
        sequenceHistory.innerHTML = '';
        moduleSequence.forEach(sign => {
            const span = document.createElement('span');
            let emoji = '🔮';
            if (sign === 'thread') emoji = '🧵';
            if (sign === 'buffer') emoji = '💾';
            if (sign === 'kernel') emoji = '⚙️';
            if (sign === 'array') emoji = '📊';
            if (sign === 'query') emoji = '🔍';
            if (sign === 'shader') emoji = '🎨';
            span.textContent = emoji;
            sequenceHistory.appendChild(span);
        });
    };
    
    const resetSequence = () => {
        moduleSequence = [];
        if (sandboxOutput) sandboxOutput.textContent = '';
        updateSequenceDisplay();
        
        document.body.classList.remove('overclock-active');
        document.body.classList.remove('system-override-active');
        document.body.classList.remove('shake-active');
        document.body.classList.remove('heatwave-active');
        
        if (lightningInterval) clearInterval(lightningInterval);
        if (rasenganInterval) clearInterval(rasenganInterval);
        if (canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
        }
        
        clonesActive = false;
        document.querySelectorAll('.worker-thread-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            addCanvasParticles(rect.left + rect.width/2 + window.scrollX, rect.top + rect.height/2 + window.scrollY, 'smoke');
            el.remove();
        });
        
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.width = '';
            cursor.style.height = '';
            cursor.style.boxShadow = '';
        }
    };

    // Close Diagnostics Console Modal
    const closeScroll = document.getElementById('closeScroll');
    const scrollOverlay = document.getElementById('diagnostics-overlay');
    closeScroll?.addEventListener('click', () => {
        scrollOverlay?.classList.remove('active');
        resetSequence();
    });
    scrollOverlay?.addEventListener('click', (e) => {
        if (e.target === scrollOverlay) {
            scrollOverlay.classList.remove('active');
            resetSequence();
        }
    });

    // Register Sync Credentials
    const syncBtn = document.getElementById('syncBtn');
    const syncStatus = document.getElementById('syncStatus');
    const syncName = document.getElementById('syncName');
    
    syncBtn?.addEventListener('click', () => {
        const nameVal = syncName?.value.trim();
        if (!nameVal) return;
        synthesizer.playModuleClick();
        
        if (syncStatus) {
            syncStatus.innerHTML = `🖋️ <span style="font-family:'Bebas Neue';color:#0ea5e9;font-size:1.6rem;border:2px dashed #0ea5e9;padding:0.2rem 0.6rem;transform:rotate(-6deg);display:inline-block;">COLLABORATOR SYNCED: ${nameVal}</span>`;
            syncStatus.style.transform = 'scale(1.2)';
            setTimeout(() => {
                syncStatus.style.transform = 'scale(1)';
            }, 300);
        }
    });
    
    handSignBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const moduleName = btn.getAttribute('data-module');
            if (moduleSequence.length < 3) {
                moduleSequence.push(moduleName);
                updateSequenceDisplay();
                
                const rect = btn.getBoundingClientRect();
                addCanvasParticles(window.scrollX + rect.left + rect.width/2, window.scrollY + rect.top + rect.height/2, 'pulse');
                
                checkSimulation();
            }
        });
    });
    
    resetSandbox?.addEventListener('click', () => {
        synthesizer.playReset();
        resetSequence();
    });

    // =========================================
    // ADVANCED EFFECTS — ROUND 4
    // =========================================

    // A. AMBIENT MOUSE GLOW
    const ambientGlow = document.createElement('div');
    ambientGlow.id = 'ambient-glow';
    document.body.appendChild(ambientGlow);
    let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
    let glowTargetX = glowX, glowTargetY = glowY;
    document.addEventListener('mousemove', (e) => { glowTargetX = e.clientX; glowTargetY = e.clientY; });
    (function animateGlow() {
        glowX += (glowTargetX - glowX) * 0.06;
        glowY += (glowTargetY - glowY) * 0.06;
        ambientGlow.style.left = glowX + 'px';
        ambientGlow.style.top  = glowY + 'px';
        requestAnimationFrame(animateGlow);
    })();

    // B. 3D CARD TILT
    function initTilt(selector) {
        document.querySelectorAll(selector).forEach(card => {
            if (card.dataset.tiltInit) return;
            card.dataset.tiltInit = 'true';
            card.classList.add('tilt-card');
            const shine = document.createElement('div');
            shine.className = 'tilt-shine';
            card.style.position = 'relative';
            card.appendChild(shine);
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
                const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
                card.style.transform = `perspective(900px) rotateX(${dy*-9}deg) rotateY(${dx*9}deg) scale3d(1.02,1.02,1.02)`;
                card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
                card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
            });
            card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)'; });
        });
    }
    initTilt('.project');
    initTilt('.stat-card');
    initTilt('.skills-featured-card');

    // C. MAGNETIC BUTTONS
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.classList.add('btn-magnetic');
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width/2);
            const dy = e.clientY - (r.top  + r.height/2);
            btn.style.transform = `translate(${dx*0.3}px,${dy*0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });

    // D. TEXT SCRAMBLE on hero name
    const heroNameR4 = document.querySelector('.hero-name');
    if (heroNameR4) {
        const orig = heroNameR4.textContent.trim();
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let resolved = 0, frm = 0;
        function scramble() {
            let out = '';
            for (let i = 0; i < orig.length; i++) {
                if (orig[i] === ' ') { out += ' '; continue; }
                if (i < resolved) out += orig[i];
                else out += chars[Math.floor(Math.random()*chars.length)];
            }
            heroNameR4.textContent = out;
            frm++;
            if (frm % 2 === 0 && resolved < orig.length) resolved++;
            if (resolved < orig.length) requestAnimationFrame(scramble);
            else heroNameR4.textContent = orig;
        }
        setTimeout(scramble, 800);
    }

    // E. TYPED ROLES in hero-work
    const heroWorkR4 = document.querySelector('.hero-work');
    if (heroWorkR4) {
        const roles = ['Java Full Stack Dev.', 'Spring Boot Dev.', 'Problem Solver.', 'React Engineer.'];
        let rIdx = 0, cIdx = 0, del = false;
        const typedCur = document.createElement('span');
        typedCur.className = 'typed-cursor';
        heroWorkR4.innerHTML = '';
        heroWorkR4.appendChild(typedCur);
        function type() {
            const text = roles[rIdx].substring(0, cIdx);
            heroWorkR4.childNodes[0]?.remove();
            heroWorkR4.insertBefore(document.createTextNode(text), typedCur);
            if (!del) {
                cIdx++;
                if (cIdx > roles[rIdx].length) { del = true; setTimeout(type, 2000); return; }
                setTimeout(type, 72);
            } else {
                cIdx--;
                if (cIdx < 0) { del = false; rIdx = (rIdx+1)%roles.length; cIdx=0; setTimeout(type,300); return; }
                setTimeout(type, 38);
            }
        }
        setTimeout(type, 1600);
    }

    // F. STATS COUNTER
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            obs.disconnect();
            const target = parseInt(el.getAttribute('data-target'), 10);
            const dur = 1800, t0 = performance.now();
            function tick(now) {
                const p = Math.min((now - t0)/dur, 1);
                const e = 1 - Math.pow(1-p, 3);
                el.textContent = Math.floor(e * target);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
        }, { threshold: 0.5 });
        obs.observe(el);
    });

    // G. SECTION HEADING REVEAL
    document.querySelectorAll('.section-heading').forEach(h => {
        const o = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { h.classList.add('is-visible'); o.disconnect(); }
        }, { threshold: 0.2 });
        o.observe(h);
    });

    // H. FLOATING PARTICLES
    function spawnFP() {
        const p = document.createElement('div');
        p.className = 'float-particle';
        const sz = 2 + Math.random()*3;
        const dur = 10 + Math.random()*14;
        p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}vw;bottom:-10px;background:var(--accent);animation-duration:${dur}s;`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), (dur+1)*1000);
    }
    setInterval(spawnFP, 2500);

    // I. CONTACT FLOATING LABELS
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(inp => {
        const g = inp.closest('.form-group');
        if (!g) return;
        const check = () => inp.value.trim() ? g.classList.add('has-value') : g.classList.remove('has-value');
        inp.addEventListener('input', check);
        inp.addEventListener('blur', check);
        check();
    });

    // ============================================================
    // J. INTERACTIVE INTERESTS NEXUS CORE ENGINE
    // ============================================================
    const nexusNodes = document.querySelectorAll('.nexus-node');
    const consolePanels = document.querySelectorAll('.console-panel');
    const wirePaths = document.querySelectorAll('.nexus-wire-path');

    if (nexusNodes.length > 0) {
        // Tab Selector Logic
        nexusNodes.forEach(node => {
            node.addEventListener('click', () => {
                const target = node.getAttribute('data-interest');
                
                // Toggle active node
                nexusNodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                // Toggle active panel
                consolePanels.forEach(p => {
                    p.classList.remove('active');
                    if (p.getAttribute('data-panel') === target) {
                        p.classList.add('active');
                    }
                });

                // Toggle active SVG path wire
                wirePaths.forEach(w => {
                    w.classList.remove('active');
                    if (w.getAttribute('data-interest') === target) {
                        w.classList.add('active');
                    }
                });

                // Play Audio Sweep
                if (typeof synthesizer !== 'undefined') {
                    synthesizer.playConsoleDeploy();
                }

                // Custom Tab Init Actions
                if (target === 'gaming') {
                    initGamingGame();
                } else if (target === 'music') {
                    initMusicCanvas();
                } else if (target === 'reading') {
                    loadDossier('fantasy');
                }
            });
        });

        // --- Anime Quote Database & Typewriter ---
        const animeQuotes = [
            "\"If you don't like your destiny, don't accept it. Instead, have the courage to change it.\" - Naruto Uzumaki",
            "\"The world isn't perfect. But it's there for us, doing the best it can... that's what makes it so damn beautiful.\" - Roy Mustang",
            "\"Whatever you do, enjoy it to the fullest. That is the secret of life.\" - Rider (Fate/Zero)",
            "\"If you can't find a reason to fight, then you shouldn't be fighting.\" - Akame",
            "\"People's lives don't end when they die, they end when they lose faith.\" - Itachi Uchiha",
            "\"Being weak is nothing to be ashamed of... staying weak is.\" - Fuegoleon Vermillion"
        ];
        
        const animeQuoteText = document.getElementById('animeQuoteText');
        const animeQuoteBtn = document.getElementById('animeQuoteBtn');

        function typewriteQuote(text) {
            if (!animeQuoteText) return;
            animeQuoteText.textContent = '';
            let idx = 0;
            function type() {
                if (idx < text.length) {
                    animeQuoteText.textContent += text.charAt(idx);
                    idx++;
                    setTimeout(type, 15);
                }
            }
            type();
        }

        animeQuoteBtn?.addEventListener('click', () => {
            const rand = animeQuotes[Math.floor(Math.random() * animeQuotes.length)];
            if (typeof synthesizer !== 'undefined') {
                synthesizer.playModuleClick();
            }
            typewriteQuote(rand);
        });

        // --- Gaming Reflex Decoder Mini-Game ---
        const gameGrid = document.getElementById('gameGrid');
        const gameDecryptPct = document.getElementById('gameDecryptPct');
        const gameOverOverlay = document.getElementById('gameOverOverlay');
        const gameResetBtn = document.getElementById('gameResetBtn');
        let decryptProgress = 0;
        let activeNodeIndex = -1;
        let gameTimer = null;
        let gameButtons = [];

        function initGamingGame() {
            decryptProgress = 0;
            activeNodeIndex = -1;
            if (gameTimer) clearInterval(gameTimer);
            if (gameOverOverlay) gameOverOverlay.style.display = 'none';
            if (gameDecryptPct) gameDecryptPct.textContent = 'DECRYPTING: 0%';
            
            if (gameGrid) {
                gameGrid.innerHTML = '';
                gameButtons = [];
                for (let i = 0; i < 9; i++) {
                    const btn = document.createElement('button');
                    btn.className = 'game-node-btn';
                    btn.setAttribute('aria-label', `Node ${i + 1}`);
                    btn.addEventListener('click', () => handleNodeClick(i));
                    gameGrid.appendChild(btn);
                    gameButtons.push(btn);
                }
            }
            tickGame();
            gameTimer = setInterval(tickGame, 1000);
        }

        function tickGame() {
            if (decryptProgress >= 100) {
                endGame(true);
                return;
            }
            // Deactivate old
            gameButtons.forEach(btn => {
                btn.className = 'game-node-btn';
            });
            // Choose new active node
            activeNodeIndex = Math.floor(Math.random() * 9);
            gameButtons[activeNodeIndex].classList.add('active-target');
        }

        function handleNodeClick(index) {
            if (decryptProgress >= 100) return;
            const btn = gameButtons[index];
            if (index === activeNodeIndex) {
                // Success click
                decryptProgress = Math.min(100, decryptProgress + 20);
                btn.className = 'game-node-btn'; // remove active-target
                if (typeof synthesizer !== 'undefined') {
                    synthesizer.playModuleClick();
                }
                
                // Instantly cycle
                if (decryptProgress >= 100) {
                    endGame(true);
                } else {
                    tickGame();
                }
            } else {
                // Failure click
                decryptProgress = Math.max(0, decryptProgress - 10);
                btn.classList.add('glitch', 'shake');
                setTimeout(() => {
                    btn.classList.remove('glitch', 'shake');
                }, 300);
                if (typeof synthesizer !== 'undefined') {
                    synthesizer.playConsoleDeploy(); // buzzer noise
                }
            }
            if (gameDecryptPct) {
                gameDecryptPct.textContent = `DECRYPTING: ${decryptProgress}%`;
            }
        }

        function endGame(success) {
            if (gameTimer) clearInterval(gameTimer);
            if (success && gameOverOverlay) {
                gameOverOverlay.style.display = 'flex';
                if (typeof synthesizer !== 'undefined') {
                    synthesizer.playReset(); // unlock sound
                }
            }
        }

        gameResetBtn?.addEventListener('click', () => {
            initGamingGame();
        });

        // --- Music Synth & Canvas Wave Visualizer ---
        const canvas = document.getElementById('musicVisualizer');
        const synthPads = document.querySelectorAll('.synth-pad');
        let canvasCtx = null;
        let waves = [];
        let waveTimer = null;

        function initMusicCanvas() {
            if (!canvas) return;
            canvasCtx = canvas.getContext('2d');
            waves = [];
            if (waveTimer) cancelAnimationFrame(waveTimer);
            
            function draw() {
                const isDark = document.body.classList.contains('dark');
                canvasCtx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(243, 241, 234, 0.25)';
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw central diagnostic rings
                canvasCtx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
                canvasCtx.lineWidth = 1;
                canvasCtx.beginPath();
                canvasCtx.arc(canvas.width/2, canvas.height/2, 40, 0, Math.PI * 2);
                canvasCtx.stroke();

                // Draw pulsing waves
                const activeRGB = isDark ? '249, 115, 22' : '180, 83, 9';
                waves.forEach((w, idx) => {
                    w.r += w.v;
                    w.alpha -= 0.02;
                    if (w.alpha <= 0) {
                        waves.splice(idx, 1);
                        return;
                    }
                    canvasCtx.strokeStyle = `rgba(${activeRGB}, ${w.alpha})`;
                    canvasCtx.lineWidth = 1.5;
                    canvasCtx.beginPath();
                    canvasCtx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
                    canvasCtx.stroke();
                });

                waveTimer = requestAnimationFrame(draw);
            }
            draw();
        }

        function playSynthTone(frequency) {
            if (typeof synthesizer === 'undefined') return;
            if (synthesizer.muted) return;
            synthesizer.init();
            
            const osc = synthesizer.ctx.createOscillator();
            const gainNode = synthesizer.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(frequency, synthesizer.ctx.currentTime);
            
            gainNode.gain.setValueAtTime(0.12, synthesizer.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, synthesizer.ctx.currentTime + 0.6);
            
            osc.connect(gainNode);
            gainNode.connect(synthesizer.masterVolume);
            osc.start();
            osc.stop(synthesizer.ctx.currentTime + 0.6);
        }

        // Add visualizer hover interaction
        canvas?.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (Math.random() < 0.15) {
                waves.push({ x, y, r: 2, v: 1.5, alpha: 0.8 });
            }
        });

        synthPads.forEach(pad => {
            pad.addEventListener('click', () => {
                const pitch = parseFloat(pad.getAttribute('data-pitch'));
                playSynthTone(pitch);
                
                // Add center explosion ripple
                if (canvas) {
                    waves.push({ x: canvas.width / 2, y: canvas.height / 2, r: 5, v: 3, alpha: 1.0 });
                }
                
                // CSS Trigger
                pad.classList.add('active');
                setTimeout(() => pad.classList.remove('active'), 200);
            });
        });

        // --- Reading Terminal Dossier Logic ---
        const dossierDisplay = document.getElementById('dossierDisplay');
        const dossierBtns = document.querySelectorAll('.dossier-btn');
        
        const dossierFiles = {
            fantasy: "ACCESSING: FANTASY_LORE.log ... SUCCESS\n========================================\n\"The core essence of reading fantasy is stepping into worlds where destiny is created, not followed.\"\n\n- Favorite Lore: J.R.R. Tolkien (Legendarium)\n- Influence: Building complex sandbox databases like world maps.\n- Sync Stat: Cognitive database load standard.",
            tech: "ACCESSING: TECH_DIGEST.txt ... SUCCESS\n========================================\n- Target Reads: High-Scalability architectures, WebSockets, system bottlenecks.\n- Focus Areas: Concurrency execution models, WebAudio synth designs.\n- Dev Philosophy: \"Simple code is highly advanced. Complex architectures should be hidden behind beautiful indicators.\"",
            inspiration: "ACCESSING: MOTIVATION.diz ... SUCCESS\n========================================\n\"Your time is limited, so don't waste it living someone else's life. Have the courage to follow your heart and intuition.\"\n\n- Dr. Seuss: \"The more that you read, the more things you will know.\"\n- Coding Drive: Building high-fidelity projects that look premium and function instantly."
        };

        function loadDossier(fileName) {
            if (!dossierDisplay) return;
            const text = dossierFiles[fileName] || 'File not found.';
            dossierDisplay.textContent = '';
            
            let idx = 0;
            function type() {
                if (idx < text.length) {
                    dossierDisplay.textContent += text.charAt(idx);
                    idx++;
                    setTimeout(type, 8);
                }
            }
            type();
        }

        dossierBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const file = btn.getAttribute('data-file');
                dossierBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (typeof synthesizer !== 'undefined') {
                    synthesizer.playModuleClick();
                }
                loadDossier(file);
            });
        });

        // Initial Quote Load
        typewriteQuote(animeQuotes[0]);
    }

});
