/**
 * Mole Mayhem - Game Logic
 * Author: Marie Kate Abbido
 * Section: BSCS 2D
 * Subject: DC 101 - Web Development
 * Description: A browser-based Whack-a-Mole game with score tracking and animations
 */

// ============================================
// GAME STATE VARIABLES
// ============================================

let score = 0;
let timeLeft = 30;
let highScore = 0;
let isGameActive = false;
let moleTimer = null;
let countdownTimer = null;
let activeMole = null;

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const settingsBtn = document.getElementById('settingsBtn');
const gameOverModal = document.getElementById('gameOverModal');
const settingsModal = document.getElementById('settingsModal');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const closeSettingsBtn = document.getElementById('closeSettings');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize game when page loads
 * Loads high score from localStorage
 */
function initGame() {
    loadHighScore();
    attachEventListeners();
    console.log('Game initialized successfully');
}

/**
 * Load high score from localStorage
 */
function loadHighScore() {
    const savedHighScore = localStorage.getItem('moleMayhemHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreElement.textContent = highScore;
    }
}

/**
 * Save high score to localStorage
 */
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('moleMayhemHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Attach all event listeners to game elements
 */
function attachEventListeners() {
    // Start button
    startBtn.addEventListener('click', startGame);

    // Settings button
    settingsBtn.addEventListener('click', openSettings);

    // Close settings button
    closeSettingsBtn.addEventListener('click', closeSettings);

    // Restart button
    restartBtn.addEventListener('click', restartGame);

    // Mole click events
    moles.forEach((mole, index) => {
        mole.addEventListener('click', () => whackMole(index));
    });

    // Close modals when clicking outside
    gameOverModal.addEventListener('click', (e) => {
        if (e.target === gameOverModal) {
            closeGameOver();
        }
    });

    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettings();
        }
    });
}

// ============================================
// GAME CONTROL FUNCTIONS
// ============================================

/**
 * Start the game
 */
function startGame() {
    if (isGameActive) return;

    // Reset game state
    score = 0;
    timeLeft = 30;
    isGameActive = true;

    // Update UI
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    startBtn.disabled = true;
    startBtn.textContent = 'Playing...';

    // Start game loops
    startCountdown();
    startMolePopup();

    console.log('Game started!');
}

/**
 * End the game
 */
function endGame() {
    isGameActive = false;

    // Clear timers
    clearInterval(countdownTimer);
    clearTimeout(moleTimer);

    // Hide all moles
    moles.forEach(mole => {
        mole.classList.remove('active');
    });

    // Save high score
    saveHighScore();

    // Show game over modal
    showGameOver();

    // Reset start button
    startBtn.disabled = false;
    startBtn.textContent = 'Start Game';

    console.log(`Game ended! Final score: ${score}`);
}

/**
 * Restart the game
 */
function restartGame() {
    closeGameOver();
    setTimeout(() => startGame(), 300);
}

// ============================================
// COUNTDOWN TIMER
// ============================================

/**
 * Start the countdown timer
 */
function startCountdown() {
    countdownTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        // Add urgency effect when time is low
        if (timeLeft <= 10) {
            timerElement.parentElement.style.animation = 'pulse 0.5s ease-in-out';
        }

        // End game when time runs out
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// ============================================
// MOLE POPUP LOGIC
// ============================================

/**
 * Start the mole popup sequence
 */
function startMolePopup() {
    if (!isGameActive) return;

    // Hide previous mole
    if (activeMole !== null) {
        moles[activeMole].classList.remove('active');
    }

    // Get random hole index
    const randomHole = getRandomHole();
    activeMole = randomHole;

    // Show mole
    moles[randomHole].classList.add('active');

    // Random time for next mole (500ms to 1500ms)
    const randomTime = Math.random() * 1000 + 500;

    // Auto-hide mole after 800ms if not clicked
    setTimeout(() => {
        if (moles[randomHole].classList.contains('active')) {
            moles[randomHole].classList.remove('active');
        }
    }, 800);

    // Schedule next mole
    moleTimer = setTimeout(startMolePopup, randomTime);
}

/**
 * Get a random hole index (different from current)
 * @returns {number} Random hole index
 */
function getRandomHole() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * holes.length);
    } while (randomIndex === activeMole);

    return randomIndex;
}

// ============================================
// WHACK MOLE FUNCTION
// ============================================

/**
 * Handle mole whacking
 * @param {number} index - Index of the clicked mole
 */
function whackMole(index) {
    if (!isGameActive) return;

    const mole = moles[index];

    // Check if mole is active
    if (mole.classList.contains('active')) {
        // Successful hit
        score += 10;
        scoreElement.textContent = score;

        // Add hit animation
        mole.classList.add('hit');
        mole.classList.remove('active');

        // Play hit sound (visual feedback)
        createHitEffect(holes[index]);

        // Remove hit class after animation
        setTimeout(() => {
            mole.classList.remove('hit');
        }, 300);

        console.log(`Mole whacked! Score: ${score}`);
    }
}

/**
 * Create visual hit effect
 * @param {HTMLElement} hole - The hole element
 */
function createHitEffect(hole) {
    const effect = document.createElement('div');
    effect.textContent = '+10';
    effect.style.position = 'absolute';
    effect.style.color = '#11998e';
    effect.style.fontSize = '2rem';
    effect.style.fontWeight = 'bold';
    effect.style.top = '50%';
    effect.style.left = '50%';
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.animation = 'floatUp 1s ease-out forwards';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '10';

    hole.style.position = 'relative';
    hole.appendChild(effect);

    // Remove effect after animation
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

// ============================================
// MODAL FUNCTIONS
// ============================================

/**
 * Show game over modal
 */
function showGameOver() {
    finalScoreElement.textContent = score;
    gameOverModal.classList.add('active');

    // Celebration message based on score
    const modalTitle = gameOverModal.querySelector('h2');
    if (score >= 200) {
        modalTitle.textContent = '🏆 AMAZING! 🏆';
    } else if (score >= 150) {
        modalTitle.textContent = '🎉 GREAT JOB! 🎉';
    } else if (score >= 100) {
        modalTitle.textContent = '👏 WELL DONE! 👏';
    } else {
        modalTitle.textContent = '🎮 GAME OVER! 🎮';
    }
}

/**
 * Close game over modal
 */
function closeGameOver() {
    gameOverModal.classList.remove('active');
}

/**
 * Open settings modal
 */
function openSettings() {
    settingsModal.classList.add('active');
}

/**
 * Close settings modal
 */
function closeSettings() {
    settingsModal.classList.remove('active');
}

// ============================================
// INITIALIZE GAME ON PAGE LOAD
// ============================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

// Log initialization
console.log('Mole Mayhem by Marie Kate Abbido - BSCS 2D');
console.log('DC 101 - Web Development Project');