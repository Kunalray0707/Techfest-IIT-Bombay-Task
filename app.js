/* 
   NEURAL_CORE // Core Application Logic
   Designed for the Year 2050 Cybernetic Interface
*/

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. DYNAMIC THEME TOGGLE
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        // Trigger a digital glitch effect by briefly adding a flash class
        body.classList.add('glitch-flash');
        setTimeout(() => body.classList.remove('glitch-flash'), 150);

        if (body.classList.contains('cyber-theme-dark')) {
            body.classList.remove('cyber-theme-dark');
            body.classList.add('cyber-theme-light');
            themeToggle.innerHTML = '<span class="toggle-icon">☾</span>';
        } else {
            body.classList.remove('cyber-theme-light');
            body.classList.add('cyber-theme-dark');
            themeToggle.innerHTML = '<span class="toggle-icon">☼</span>';
        }
    });

    // ----------------------------------------------------
    // 2. SYSTEM BOOT LOADER & TERMINAL CONSOLE LOGS
    // ----------------------------------------------------
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    const loaderStatus = document.getElementById('loader-status');
    const loaderConsole = document.getElementById('loader-console');

    const bootLines = [
        "&gt;&gt; HOST_OS: CYBERNETIC_BOOTLOAD v9.81...",
        "&gt;&gt; ESTABLISHING LINK ON PORTS [80, 443, 662]...",
        "&gt;&gt; INJECTING DIRECT CORTICAL DECRYPTORS...",
        "&gt;&gt; RUNNING NEURAL SCANNER (COMPLIANCE=100%)...",
        "&gt;&gt; MEMORY BUFFER SYNC: 1024 YB OK.",
        "&gt;&gt; ALLOCATING VIRTUAL EXCITE CORE IMPLANTS...",
        "&gt;&gt; SECURITY INTEGRITY CHECK: STABLE.",
        "&gt;&gt; BIOMECHANICAL HARDWARE DETECTED: DECK_V3.42",
        "&gt;&gt; INITIATING SYNAPSE FLOW OVERLAY COMPILER...",
        "&gt;&gt; ALL COGNITIVE MODULES STABILIZED. WELCOME BACK COMPILER."
    ];

    let progress = 0;
    let consoleLineIndex = 0;

    // Simulate loader progress
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            loaderStatus.innerText = "LINK ESTABLISHED. INJECTING INTERFACE...";
            
            // Fade out loader screen
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transform = 'translateY(-100vh)';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Show custom cursor after loader fades
                    const customCursor = document.getElementById('custom-cursor');
                    if (customCursor) customCursor.style.display = 'block';
                }, 800);
            }, 600);
        }
        progressBar.style.width = `${progress}%`;
    }, 70);

    // Print hacker terminal messages in loader console
    function printBootConsole() {
        if (consoleLineIndex < bootLines.length) {
            const line = document.createElement('div');
            line.className = 'loader-console-line';
            line.innerHTML = bootLines[consoleLineIndex];
            loaderConsole.appendChild(line);
            loaderConsole.scrollTop = loaderConsole.scrollHeight;
            consoleLineIndex++;
            setTimeout(printBootConsole, Math.random() * 150 + 80);
        }
    }
    setTimeout(printBootConsole, 200);

    // ----------------------------------------------------
    // 3. CUSTOM NEON CURSOR TRAIL & MAGNETIC BUTTONS
    // ----------------------------------------------------
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor trail with lerp (linear interpolation) for smooth lag effect
    function animateCursor() {
        const ease = 0.15;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor on hovering interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .showcase-card, .theme-toggle-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering-link'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering-link'));
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const bound = btn.getBoundingClientRect();
            const x = e.clientX - bound.left - bound.width / 2;
            const y = e.clientY - bound.top - bound.height / 2;
            
            // Move button slightly towards cursor
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
            
            // Move inside inner text even more for visual depth
            const inner = btn.querySelector('span');
            if (inner) {
                inner.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            }
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            const inner = btn.querySelector('span');
            if (inner) {
                inner.style.transform = 'translate(0px, 0px)';
            }
        });
    });

    // ----------------------------------------------------
    // 4. BACKGROUND PARTICLE NETWORK CANVAS
    // ----------------------------------------------------
    const particleCanvas = document.getElementById('particle-canvas');
    const ctx = particleCanvas.getContext('2d');

    let particles = [];
    const maxParticles = 60;
    const connectionDist = 120;

    function resizeParticleCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeParticleCanvas);
    resizeParticleCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;

            // Slight gravitational pull towards mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                this.x += dx * 0.001;
                this.y += dy * 0.001;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // Fetch neon cyan from root CSS variable
            const isLight = body.classList.contains('cyber-theme-light');
            ctx.fillStyle = isLight ? 'rgba(0, 135, 163, 0.4)' : 'rgba(0, 243, 255, 0.4)';
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        const isLight = body.classList.contains('cyber-theme-light');
        const lineColor = isLight ? 'rgba(0, 135, 163, ' : 'rgba(0, 243, 255, ';

        particles.forEach((p, idx) => {
            p.update();
            p.draw();

            // Connect nearby particles
            for (let j = idx + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    const alpha = (1 - dist / connectionDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = lineColor + alpha + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);

    // ----------------------------------------------------
    // 5. THREE.JS 3D HOLOGRAM NETWORK COGNITIVE GLOBE
    // ----------------------------------------------------
    const container3d = document.querySelector('.hologram-viewport');
    const canvas3d = document.getElementById('canvas-3d');
    
    // Check if Three is loaded
    if (typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        
        // Transparent renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, alpha: true, antialias: true });
        renderer.setSize(container3d.clientWidth, container3d.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 22;

        // Create Holographic Brain Sphere (concentric grids and node spheres)
        const group = new THREE.Group();
        scene.add(group);

        // Core Wireframe Sphere
        const coreGeo = new THREE.SphereGeometry(4, 24, 24);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x00f3ff,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        group.add(coreMesh);

        // Outer Node Network (Points)
        const outerGeo = new THREE.SphereGeometry(6.5, 36, 36);
        // Extract vertices to draw point nodes
        const pointsMat = new THREE.PointsMaterial({
            color: 0xbd00ff,
            size: 0.15,
            transparent: true,
            opacity: 0.8
        });
        const outerNetwork = new THREE.Points(outerGeo, pointsMat);
        group.add(outerNetwork);

        // Orbiting Torus Rings
        const ringGeo = new THREE.TorusGeometry(8, 0.05, 8, 48);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xff007f,
            transparent: true,
            opacity: 0.3
        });
        const ring1 = new THREE.Mesh(ringGeo, ringMat);
        ring1.rotation.x = Math.PI / 3;
        group.add(ring1);

        const ring2 = new THREE.Mesh(ringGeo, ringMat);
        ring2.rotation.y = Math.PI / 3;
        group.add(ring2);

        // Responsive Resizing for 3D Canvas
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = entry.contentRect.width || container3d.clientWidth;
                const height = entry.contentRect.height || container3d.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        });
        resizeObserver.observe(container3d);

        // Animation loop
        let clock = new THREE.Clock();
        function tick() {
            const elapsed = clock.getElapsedTime();

            // Automatic rotations
            coreMesh.rotation.y = elapsed * 0.1;
            coreMesh.rotation.x = elapsed * 0.05;
            
            outerNetwork.rotation.y = -elapsed * 0.15;
            outerNetwork.rotation.x = -elapsed * 0.08;

            ring1.rotation.z = elapsed * 0.2;
            ring2.rotation.z = -elapsed * 0.25;

            // Pulsate sphere size based on sine wave
            const scale = 1 + Math.sin(elapsed * 2) * 0.03;
            coreMesh.scale.set(scale, scale, scale);

            // Parallax camera rotation tracking mouse coordinates
            const targetX = (mouseX / window.innerWidth - 0.5) * 4;
            const targetY = -(mouseY / window.innerHeight - 0.5) * 4;
            
            group.rotation.y += (targetX - group.rotation.y) * 0.05;
            group.rotation.x += (targetY - group.rotation.x) * 0.05;

            // Apply light vs dark theme mesh colors dynamically
            const isLight = body.classList.contains('cyber-theme-light');
            if (isLight) {
                coreMat.color.setHex(0x0087a3);
                pointsMat.color.setHex(0x8600c8);
                ringMat.color.setHex(0xd1005d);
            } else {
                coreMat.color.setHex(0x00f3ff);
                pointsMat.color.setHex(0xbd00ff);
                ringMat.color.setHex(0xff007f);
            }

            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        }
        tick();
    }

    // ----------------------------------------------------
    // 6. DASHBOARD CONSOLE LIVE SIMULATOR
    // ----------------------------------------------------
    const consoleLogs = document.getElementById('console-logs');
    const sysLogs = [
        "CORTICAL_LINK: Connected to proxy node_6A",
        "SYNC_FLOW: Core memory sync rate is 982.4 PB/s",
        "CPU_TEMP: Quantum logic cores stable at 4.2 K",
        "NET_INTRUSION: Flagged 2 trace packets. Blocking...",
        "SYS_LOAD: Offloaded logic matrices to exo-grid",
        "MEM_BUFFER: Synaptic buffer cache flushed successfully",
        "UPGRADE_SYS: Sub-dermal deck firmware upgrade STABLE",
        "BIO_METRIC: Heart rate: 72 bpm. Sync affinity: 99.8%",
        "BACKLASH_SHIELD: Firewall integrity running at 100%"
    ];

    function addConsoleLine() {
        if (!consoleLogs) return;
        const lineText = sysLogs[Math.floor(Math.random() * sysLogs.length)];
        
        // Generate time marker
        const now = new Date();
        const timeMarker = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}.${(now.getMilliseconds()).toString().padStart(3,'0')}`;
        
        const line = document.createElement('div');
        line.className = 'console-line';
        line.innerHTML = `<span class="console-time">[${timeMarker}]</span> ${lineText}`;
        consoleLogs.appendChild(line);

        // Keep maximum 40 lines to save DOM space
        while (consoleLogs.childElementCount > 40) {
            consoleLogs.removeChild(consoleLogs.firstChild);
        }

        consoleLogs.scrollTop = consoleLogs.scrollHeight;
        
        // Loop randomly
        setTimeout(addConsoleLine, Math.random() * 2000 + 800);
    }
    // Seed initial lines
    for(let i=0; i<6; i++) {
        setTimeout(addConsoleLine, i * 150);
    }

    // ----------------------------------------------------
    // 7. FREQUENCY BARS VISUALIZER & DASHBOARD INTERACTIVE CONTROLS
    // ----------------------------------------------------
    const freqBarsContainer = document.getElementById('freq-wave-bars');
    const barCount = 18;
    const bars = [];

    if (freqBarsContainer) {
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'freq-bar';
            freqBarsContainer.appendChild(bar);
            bars.push(bar);
        }
    }

    // Interactive switches state affecting telemetry
    const synapseToggle = document.getElementById('toggle-synapse');
    const protectionToggle = document.getElementById('toggle-protection');
    const backchannelToggle = document.getElementById('toggle-backchannel');
    
    const mappingStatus = document.getElementById('mapping-status');
    const cognitiveLoadFill = document.getElementById('cognitive-load-fill');
    const cognitiveLoadTxt = document.getElementById('cognitive-load-txt');
    const freqAlpha = document.getElementById('freq-alpha');
    const freqBeta = document.getElementById('freq-beta');

    let currentLoad = 45;

    function updateFrequencyWaves() {
        bars.forEach((bar, index) => {
            // Generate heights using sinusoids and randomness
            let multiplier = currentLoad / 50;
            let time = Date.now() * 0.004;
            let waveHeight = (Math.sin(index * 0.4 + time) + 1.2) * 40 * multiplier;
            waveHeight += Math.random() * 15;
            waveHeight = Math.min(Math.max(waveHeight, 10), 100);
            bar.style.height = `${waveHeight}%`;
        });
        requestAnimationFrame(updateFrequencyWaves);
    }
    if (bars.length > 0) requestAnimationFrame(updateFrequencyWaves);

    // Track controls click
    function recalculateDashboardState() {
        let alpha = 12.4;
        let beta = 21.8;
        currentLoad = 20;

        if (synapseToggle && synapseToggle.checked) {
            currentLoad += 30;
            alpha += 4.2;
            beta += 8.5;
        }
        if (backchannelToggle && backchannelToggle.checked) {
            currentLoad += 15;
            beta += 5.2;
        }
        if (protectionToggle && protectionToggle.checked) {
            currentLoad -= 10;
            alpha -= 2.5;
        }

        currentLoad = Math.max(Math.min(currentLoad, 100), 5);
        
        // Update UI
        if (cognitiveLoadFill) {
            cognitiveLoadFill.style.width = `${currentLoad}%`;
            cognitiveLoadTxt.innerText = `${currentLoad}%`;
        }
        if (freqAlpha) freqAlpha.innerText = `${alpha.toFixed(1)} Hz`;
        if (freqBeta) freqBeta.innerText = `${beta.toFixed(1)} Hz`;

        // Update stability status badge text
        if (currentLoad > 80) {
            mappingStatus.innerText = "WARNING: HIGH LOAD";
            mappingStatus.className = "badge-txt-only text-pink";
        } else if (currentLoad < 15) {
            mappingStatus.innerText = "STANDBY";
            mappingStatus.className = "badge-txt-only text-yellow";
        } else {
            mappingStatus.innerText = "STABLE";
            mappingStatus.className = "badge-txt-only text-cyan";
        }
    }

    [synapseToggle, protectionToggle, backchannelToggle].forEach(toggle => {
        if (toggle) toggle.addEventListener('change', recalculateDashboardState);
    });

    // ----------------------------------------------------
    // 8. 3D CARD TILT EFFECT (MOUSE INTERACTIVE)
    // ----------------------------------------------------
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bound = card.getBoundingClientRect();
            const mouseX = e.clientX - bound.left;
            const mouseY = e.clientY - bound.top;

            // Set variables for gradient cards
            card.style.setProperty('--x', `${mouseX}px`);
            card.style.setProperty('--y', `${mouseY}px`);

            // Compute angles of tilt (maximum 8 degrees)
            const rotX = ((mouseY / bound.height) - 0.5) * -12;
            const rotY = ((mouseX / bound.width) - 0.5) * 12;

            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ----------------------------------------------------
    // 9. TECHNOLOGY CIRCUIT CANVAS SHADER LOGIC
    // ----------------------------------------------------
    const circuitCanvas = document.getElementById('circuit-canvas');
    if (circuitCanvas) {
        const cCtx = circuitCanvas.getContext('2d');
        let width = circuitCanvas.width = 450;
        let height = circuitCanvas.height = 380;

        // Draw static cybernetic grid lines
        function drawCircuitGrid() {
            cCtx.clearRect(0, 0, width, height);
            cCtx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
            cCtx.lineWidth = 1;

            const gridGap = 25;
            for (let x = 0; x < width; x += gridGap) {
                cCtx.beginPath();
                cCtx.moveTo(x, 0);
                cCtx.lineTo(x, height);
                cCtx.stroke();
            }
            for (let y = 0; y < height; y += gridGap) {
                cCtx.beginPath();
                cCtx.moveTo(0, y);
                cCtx.lineTo(width, y);
                cCtx.stroke();
            }

            // Draw circuit routes (paths)
            cCtx.strokeStyle = body.classList.contains('cyber-theme-light') ? 'rgba(0, 135, 163, 0.12)' : 'rgba(0, 243, 255, 0.12)';
            cCtx.lineWidth = 1.5;

            // Hardcode some beautiful circuit wire lines
            const paths = [
                [[50, 100], [150, 100], [200, 150], [200, 280], [350, 280]],
                [[100, 300], [250, 300], [300, 250], [300, 80], [400, 80]],
                [[80, 50], [200, 50], [250, 100], [350, 100]],
                [[150, 200], [200, 200], [250, 150]]
            ];

            paths.forEach(p => {
                cCtx.beginPath();
                cCtx.moveTo(p[0][0], p[0][1]);
                p.slice(1).forEach(pt => cCtx.lineTo(pt[0], pt[1]));
                cCtx.stroke();
                
                // Draw path endpoints
                cCtx.beginPath();
                cCtx.arc(p[0][0], p[0][1], 3, 0, Math.PI*2);
                cCtx.fillStyle = body.classList.contains('cyber-theme-light') ? '#0087a3' : '#00f3ff';
                cCtx.fill();
            });

            // Draw pulsing signal dots moving along pathways based on timestamp
            const t = Date.now() * 0.001;
            cCtx.fillStyle = body.classList.contains('cyber-theme-light') ? '#d1005d' : '#ff007f';
            cCtx.shadowColor = body.classList.contains('cyber-theme-light') ? '#d1005d' : '#ff007f';
            cCtx.shadowBlur = 10;

            paths.forEach((p, idx) => {
                // Find signal progress
                const duration = 4; // seconds
                const progress = ((t + idx * 1.5) % duration) / duration;
                
                // Estimate segment coordinate
                const segmentCount = p.length - 1;
                const activeSegment = Math.floor(progress * segmentCount);
                const segProgress = (progress * segmentCount) - activeSegment;

                const start = p[activeSegment];
                const end = p[activeSegment + 1];

                if (start && end) {
                    const sx = start[0] + (end[0] - start[0]) * segProgress;
                    const sy = start[1] + (end[1] - start[1]) * segProgress;
                    
                    cCtx.beginPath();
                    cCtx.arc(sx, sy, 4, 0, Math.PI*2);
                    cCtx.fill();
                }
            });

            // Reset shadows for performance
            cCtx.shadowBlur = 0;
            requestAnimationFrame(drawCircuitGrid);
        }
        requestAnimationFrame(drawCircuitGrid);
    }

    // ----------------------------------------------------
    // 10. STATISTICS SECTION - SCROLL COUNTER ANIMATIONS
    // ----------------------------------------------------
    const statsSection = document.getElementById('stats');
    const statCards = document.querySelectorAll('.stat-value');
    let animatedStats = false;

    function animateStatsCounters() {
        statCards.forEach(card => {
            const targetVal = parseFloat(card.getAttribute('data-target'));
            let currentVal = 0;
            const isFloat = card.getAttribute('data-target').includes('.');
            
            // Calculate increment step
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = targetVal / steps;
            const stepTime = duration / steps;

            let step = 0;
            const countInterval = setInterval(() => {
                currentVal += increment;
                step++;
                
                if (step >= steps) {
                    currentVal = targetVal;
                    clearInterval(countInterval);
                }
                
                card.innerText = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);
            }, stepTime);
        });
    }

    // Observe stats block viewport intersection
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedStats) {
                    animateStatsCounters();
                    animatedStats = true;
                    statsObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.2 });
        statsObserver.observe(statsSection);
    } else {
        // Fallback for older browsers
        setTimeout(animateStatsCounters, 1500);
    }

    // ----------------------------------------------------
    // 11. TESTIMONIALS CAROUSEL SLIDER LOGIC
    // ----------------------------------------------------
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.indicator-dot');
    let activeSlideIdx = 0;
    let slideTimer;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                dots[i].classList.add('active');
            }
        });
        activeSlideIdx = index;
    }

    function nextSlide() {
        let nextIdx = activeSlideIdx + 1;
        if (nextIdx >= slides.length) nextIdx = 0;
        showSlide(nextIdx);
    }

    function startSlideShow() {
        stopSlideShow();
        slideTimer = setInterval(nextSlide, 6000);
    }

    function stopSlideShow() {
        if (slideTimer) clearInterval(slideTimer);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const targetIdx = parseInt(dot.getAttribute('data-slide'));
            showSlide(targetIdx);
            startSlideShow(); // Reset interval timer
        });
    });

    if (slides.length > 0) {
        startSlideShow();
    }

    // ----------------------------------------------------
    // 12. CTA TERMINAL DEPLOY LOGIC (INTERACTION PORTAL)
    // ----------------------------------------------------
    const ctaBtn = document.getElementById('cta-sync-btn');
    const ctaTermContent = document.getElementById('cta-term-content');

    if (ctaBtn && ctaTermContent) {
        ctaBtn.addEventListener('click', () => {
            // Avoid duplicate triggers
            if (ctaBtn.disabled) return;
            ctaBtn.disabled = true;

            // Trigger canvas-confetti equivalent or custom visual reaction
            triggerQuantumPortalAnimation();

            ctaTermContent.innerHTML = '';
            const connectSteps = [
                "$ connecting --cortex --port=662",
                "[SYSTEM] Establishing biological link sync sequence...",
                "[SYSTEM] Loading synaptic bridge compilers...",
                "[SYSTEM] Synapse alignment compatibility: 99.8% STABLE.",
                "[SYSTEM] STREAMING DIRECT MEMORY STREAM...",
                "[FUSION_SUCCESSFUL] Mind-link complete. Welcome to the Core."
            ];

            let stepIdx = 0;
            function runConnectStep() {
                if (stepIdx < connectSteps.length) {
                    const line = document.createElement('div');
                    line.className = 'terminal-output-line';
                    
                    if (connectSteps[stepIdx].startsWith('$')) {
                        line.style.color = '#ffe600'; // Command color
                    } else if (connectSteps[stepIdx].includes('SUCCESSFUL')) {
                        line.style.color = '#00f3ff'; // Core cyan glow color
                        line.style.fontWeight = 'bold';
                    }

                    line.innerText = connectSteps[stepIdx];
                    ctaTermContent.appendChild(line);
                    stepIdx++;
                    setTimeout(runConnectStep, 600 + Math.random() * 300);
                } else {
                    ctaBtn.disabled = false;
                }
            }
            runConnectStep();
        });
    }

    // Visual reaction: fire off a high-density ring of glowing particles
    function triggerQuantumPortalAnimation() {
        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 8 + 3;
            
            // Override active coordinates of some existing canvas particles
            const p = particles[Math.floor(Math.random() * particles.length)];
            if (p) {
                p.x = mouseX;
                p.y = mouseY;
                p.vx = Math.cos(angle) * velocity;
                p.vy = Math.sin(angle) * velocity;
                p.radius = Math.random() * 4 + 2;
            }
        }
    }

    // ----------------------------------------------------
    // 13. NEWSLETTER DECK FORM LOGIC
    // ----------------------------------------------------
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMsg = document.getElementById('newsletter-msg');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailVal = document.getElementById('newsletter-email').value;

            // Dynamic diagnostic feedback
            newsletterMsg.style.color = 'var(--neon-cyan)';
            newsletterMsg.innerText = "TRANSMITTING ENCRYPTED EMAIL VECTOR...";

            setTimeout(() => {
                newsletterMsg.style.color = '#4af626'; // Green success
                newsletterMsg.innerText = "TRANSMISSION SECURED. NODE LINK ESTABLISHED.";
                newsletterForm.reset();
            }, 1200);
        });
    }

    // ----------------------------------------------------
    // 14. SMOOTH PAGE NAVIGATION SCROLLING
    // ----------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-btn)');
    const sections = document.querySelectorAll('header, section');

    // Update active section states on scroll
    window.addEventListener('scroll', () => {
        let currentSecId = 'hero';
        const scrollOffset = window.scrollY + 120;

        sections.forEach(sec => {
            if (sec.offsetTop <= scrollOffset) {
                currentSecId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSecId}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 15. MOBILE NAVBAR HAMBURGER TOGGLE
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close mobile nav when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });
    }
});
