    
        const data = JSON.parse(document.getElementById('birthday-data').textContent);
        document.getElementById('b-title').textContent = `${data.title} ${data.name}`;
        document.getElementById('b-date').textContent = data.date;
        document.getElementById('b-msg').textContent = data.message;

        const sprinkleBox = document.getElementById('sprinkles-box');
        const sColors = ['var(--sprinkle-1)', 'var(--sprinkle-2)', 'var(--sprinkle-3)', 'var(--sprinkle-4)'];
        for (let i = 0; i < 40; i++) {
            const s = document.createElement('div');
            s.className = 'sprinkle';
            s.style.left = Math.random() * 90 + 5 + '%';
            s.style.top = Math.random() * 80 + 10 + '%';
            s.style.backgroundColor = sColors[Math.floor(Math.random() * sColors.length)];
            s.style.transform = `rotate(${Math.random() * 360}deg)`;
            sprinkleBox.appendChild(s);
        }

        const startBtn = document.getElementById('start-btn');
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));



        function spawnBalloonBatch() {
            const bColors = ['#ff9aa2', '#ffd700', '#b5ead7', '#c7ceea', '#f8a5c2', '#f7d794'];
            const batchSize = Math.floor(Math.random() * 6) + 10;

            for (let i = 0; i < batchSize; i++) {
                const b = document.createElement('div');
                b.className = 'balloon';
                b.style.backgroundColor = bColors[Math.floor(Math.random() * bColors.length)];
                b.style.left = Math.random() * 90 + '%';
                document.body.appendChild(b);

                const speed = 5000 + (Math.random() * 3000);

                requestAnimationFrame(() => {
                    b.style.transition = `transform ${speed}ms linear`;
                    b.style.transform = `translateY(-${window.innerHeight + 200}px) rotate(${Math.random() * 60 - 30}deg)`;
                });

                setTimeout(() => b.remove(), speed + 100);
            }
        }

        function startBalloonLoop() {
            spawnBalloonBatch();
            setInterval(spawnBalloonBatch, 3000);
        }

        async function startCelebration() {
            const audio = new Audio('audio.mp3');
            audio.play().catch(e => console.log("Audio play failed:", e));

            startBtn.style.transform = 'scale(0)';
            await wait(300);
            startBtn.style.display = 'none';

            const stage = document.getElementById('cake-stage');
            stage.style.display = 'flex';

            const stand = document.getElementById('stand');
            stand.style.opacity = '1';
            stand.style.transform = 'scaleX(1)';
            await wait(500);

            const assemblyOrder = [
                document.getElementById('layer-1'),
                document.getElementById('cream-1'),
                document.getElementById('layer-2'),
                document.getElementById('cream-2'),
                document.getElementById('layer-3')
            ];

            for (const piece of assemblyOrder) {
                piece.classList.add('animate-drop');
                await wait(400);
            }

            startBalloonLoop();

            const coating = document.getElementById('coating');
            coating.style.height = '168px';
            document.getElementById('sprinkles-box').style.opacity = '1';

            // Show chocolate drips
            const drips = document.querySelectorAll('.drip');
            drips.forEach(drip => drip.style.opacity = '1');

            await wait(1200);

            const candlesContainer = document.getElementById('candles');
            const candles = document.querySelectorAll('.candle');
            candlesContainer.style.opacity = '1';
            candles.forEach((c, i) => setTimeout(() => c.style.transform = 'scaleY(1)', i * 150));
            await wait(800);

            const flames = document.querySelectorAll('.flame');
            let flamesLit = 0;
            flames.forEach((f, i) => {
                setTimeout(() => {
                    f.style.opacity = '1';
                    f.style.transform = 'scale(1)';
                    flamesLit++;
                    if (flamesLit === flames.length) {
                        triggerTripleConfetti();
                        showText();
                    }
                }, i * 250);
            });
        }

        function showText() {
            document.getElementById('text-card').classList.add('visible');
        }

        function triggerTripleConfetti() {
            const defaults = {
                particleCount: 500,
                spread: 180,
                origin: { y: 0.7 },
                colors: ['#ff9aa2', '#ffd700', '#ffffff', '#7fb3d5']
            };

            confetti({ ...defaults, origin: { x: 0.5, y: 0.7 } });
            setTimeout(() => {
                confetti({ ...defaults, angle: 60, origin: { x: 0, y: 0.8 } });
            }, 200);
            setTimeout(() => {
                confetti({ ...defaults, angle: 120, origin: { x: 1, y: 0.8 } });
            }, 400);
        }

        startBtn.addEventListener('click', startCelebration);
    