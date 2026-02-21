// ==========================================
// CONSTANTS & DATA
// ==========================================
const TOTAL_ENVELOPES = 8;
const MIN_MONEY = 10000;
const MAX_MONEY = 50000;

const TET_GREETINGS = [
    "Năm mới học giỏi hơn năm cũ 📚",
    "Thi đâu đậu đó, điểm cao chót vót 💯",
    "Bài tập làm một lần là đúng 😆",
    "Code chạy mượt, không bug 💻",
    "Trí tuệ sáng suốt, tiếp thu nhanh ⚡",
    "Kiến thức đầy đầu, tương lai rộng mở 🌟",
    "Học ít hiểu nhiều, thi là trúng 🎯",
    "Tư duy sắc bén, làm gì cũng giỏi 🧠",
    "Năm nay đạt học bổng liền tay 🏆",
    "Thầy cô thương, điểm số yêu ❤️",
    "Ôn đâu trúng đó, làm bài tự tin ✍️",
    "Tốt nghiệp đúng hạn, thành công rực rỡ 🎓"
];

// ==========================================
// STATE
// ==========================================
let selectedEnvelope = null;
let envelopeData = [];

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getRandomMoney() {
    const random = Math.random();

    if (random < 0.924) return 10000;     // 92.4%
    if (random < 0.974) return 20000;     // 5%
    if (random < 0.984) return 30000;     // 1%
    if (random < 0.994) return 40000;     // 1%
    if (random < 0.999) return 50000;     // 0.5%
    return 100000;                        // 0.1% 🔥
}


function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

function getRandomGreeting() {
    return TET_GREETINGS[Math.floor(Math.random() * TET_GREETINGS.length)];
}

// ==========================================
// CONFETTI EFFECTS
// ==========================================
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FFD700', '#FF4444', '#FFFFFF', '#FFA500', '#C8102E'];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// ==========================================
// ENVELOPE GENERATION
// ==========================================
function initializeEnvelopes() {
    const grid = document.getElementById('envelopesGrid');
    grid.innerHTML = '';
    envelopeData = [];
    selectedEnvelope = null;

    for (let i = 0; i < TOTAL_ENVELOPES; i++) {
        // Generate random data for each envelope
        const data = {
            money: getRandomMoney(),
            greeting: getRandomGreeting()
        };
        envelopeData.push(data);

        // Create envelope element
        const envelope = document.createElement('div');
        envelope.className = 'envelope';
        envelope.dataset.index = i;

        envelope.innerHTML = `
            <div class="envelope-inner">
                <div class="envelope-front">
                    <div class="envelope-icon">🧧</div>
                    <div class="envelope-number">${i + 1}</div>
                </div>
                <div class="envelope-back">
                    <div class="revealed-icon">💰</div>
                    <div class="revealed-money">${formatMoney(data.money)}</div>
                    <div class="revealed-greeting">${data.greeting}</div>
                </div>
            </div>
        `;

        envelope.addEventListener('click', () => handleEnvelopeClick(i));
        grid.appendChild(envelope);
    }
}

// ==========================================
// ENVELOPE CLICK HANDLER
// ==========================================
function handleEnvelopeClick(index) {
    // Prevent selection if already selected
    if (selectedEnvelope !== null) {
        return;
    }

    selectedEnvelope = index;
    const envelopes = document.querySelectorAll('.envelope');
    const clickedEnvelope = envelopes[index];

    // Add falling and flip the selected envelope
    clickedEnvelope.classList.add('falling');

    // Slight delay before flipping to make it look like it's starting to fall
    setTimeout(() => {
        clickedEnvelope.classList.add('flipped');
    }, 300);

    // Lock all other envelopes
    envelopes.forEach((env, i) => {
        if (i !== index) {
            env.classList.add('locked');
        }
    });

    // Create confetti effect
    setTimeout(() => {
        createConfetti();
    }, 800);

    // Show result modal after animation sequence (Fall -> Flip)
    setTimeout(() => {
        showResultModal(envelopeData[index]);
    }, 2000);
}

// ==========================================
// RESULT MODAL
// ==========================================
function showResultModal(data) {
    const modal = document.getElementById('resultModal');
    const moneyElement = document.getElementById('resultMoney');
    const greetingElement = document.getElementById('resultGreeting');

    moneyElement.textContent = formatMoney(data.money);
    greetingElement.textContent = data.greeting;

    modal.classList.add('active');
}

function hideResultModal() {
    const modal = document.getElementById('resultModal');
    modal.classList.remove('active');
}

// ==========================================
// RESET GAME
// ==========================================
function resetGame() {
    hideResultModal();

    // Clear confetti
    const confettiContainer = document.getElementById('confettiContainer');
    confettiContainer.innerHTML = '';

    // Wait for modal to close, then reset envelopes
    setTimeout(() => {
        initializeEnvelopes();
    }, 300);
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeEnvelopes();
});

// Make resetGame available globally for onclick handler
window.resetGame = resetGame;
