    document.addEventListener('DOMContentLoaded', () => {

        // --- ENVELOPE OPENING ANIMATION ---
        const envelope = document.getElementById('envelope');
        const envelopeContainer = document.getElementById('envelope-container');
        let envelopeOpened = false;

        envelope.addEventListener('click', function () {
            if (!envelopeOpened) {
                envelope.classList.add('open');
                envelopeOpened = true;

                // Hide envelope after animation
                setTimeout(() => {
                    envelopeContainer.classList.add('hidden');
                }, 3000);
            }
        });

        // --- AUTO-OPEN ENVELOPE AFTER 5 SECONDS IF NOT CLICKED ---
        setTimeout(() => {
            if (!envelopeOpened) {
                envelope.classList.add('open');
                envelopeOpened = true;

                setTimeout(() => {
                    envelopeContainer.classList.add('hidden');
                }, 3000);
            }
        }, 5000);

        // --- ROSE PETALS FALLING ANIMATION ---
        const rosePetalsContainer = document.getElementById('rose-petals-container');
        const petalCount = 20;

        function createRosePetal() {
            const petal = document.createElement('div');
            petal.classList.add('rose-petal');

            // Random position
            const startX = Math.random() * window.innerWidth;
            petal.style.left = `${startX}px`;

            // Random size
            const size = Math.random() * 15 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;

            // Random animation duration
            const duration = Math.random() * 10 + 5;
            petal.style.animationDuration = `${duration}s`;

            // Random animation delay
            const delay = Math.random() * 5;
            petal.style.animationDelay = `${delay}s`;

            // Add to container
            rosePetalsContainer.appendChild(petal);

            // Remove petal after animation completes
            setTimeout(() => {
                petal.remove();
            }, (duration + delay) * 1000);
        }

        // Start petals after envelope opens
        setTimeout(() => {
            // Create initial petals
            for (let i = 0; i < petalCount; i++) {
                setTimeout(() => {
                    createRosePetal();
                }, i * 300);
            }

            // Continue creating petals periodically
            setInterval(createRosePetal, 1500);
        }, 2000);

        // --- BACKGROUND MUSIC AUTO-PLAY ---
        const music = document.getElementById('background-music');
        music.volume = 0.3;

        // Try to autoplay music (may be blocked by some browsers)
        function playMusic() {
            music.play().then(_ => {
                console.log("Music playing");
            }).catch(error => {
                console.log("Autoplay prevented, waiting for user interaction");
                // Add a one-time event listener to start music on first user interaction
                document.addEventListener('click', function initMusic() {
                    music.play();
                    document.removeEventListener('click', initMusic);
                }, { once: true });
            });
        }

        // Try to play music after envelope opens
        setTimeout(playMusic, 3000);

        // --- COUNTDOWN TIMER ---
        const weddingDate = new Date("January 22, 2026 10:30:00").getTime();

        const countdownTimer = setInterval(function () {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(countdownTimer);
                document.getElementById("days").innerText = "00";
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                document.getElementById("seconds").innerText = "00";
            }
        }, 1000);

        // --- SCROLL ANIMATIONS ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // --- SUBTLE PARTICLE EFFECT ---
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // Random size
            const size = Math.random() * 3 + 1;

            // Random color
            const colors = ['var(--gold-accent)', 'var(--maroon-primary)', 'var(--rose-pink)'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Apply styles
            particle.style.position = 'fixed';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.5';
            particle.style.zIndex = '1';

            // Add to DOM
            document.body.appendChild(particle);

            // Animate
            const duration = Math.random() * 4000 + 2000;
            const moveX = (Math.random() - 0.5) * 50;
            const moveY = (Math.random() - 0.5) * 50;

            particle.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 0 },
                { transform: 'translate(0, 0) scale(1)', opacity: 0.5, offset: 0.2 },
                { transform: `translate(${moveX}px, ${moveY}px) scale(1)`, opacity: 0.5, offset: 0.8 },
                { transform: `translate(${moveX * 2}px, ${moveY * 2}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }

        // Create particles periodically (less frequent for cleaner look)
        setInterval(createParticle, 800);
    });
