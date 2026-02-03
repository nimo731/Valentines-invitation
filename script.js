const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const container = document.querySelector('.container');

// Yes Button Click
yesBtn.addEventListener('click', () => {
    // Hide container contents or just replace them?
    // Let's hide the container briefly to fade out, or just overlay the celebration
    container.style.display = 'none';
    celebration.classList.remove('hidden');

    // Trigger Confetti
    triggerConfetti();
    setInterval(triggerConfetti, 3000);
});

// No Button Evasion
const moveNoBtn = () => {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate new position
    // We want to keep it within the viewport but maybe not too far away
    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed'; // Switch to fixed positioning
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
};

noBtn.addEventListener('mouseover', moveNoBtn);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent clicking
    moveNoBtn();
});

// Confetti Effect
function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Create floating hearts background
function createHearts() {
    const body = document.querySelector('body');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 7 + 's';
        heart.style.opacity = Math.random();
        body.appendChild(heart);
    }
}

createHearts();
