# Mole Mayhem - Whack-a-Mole Game

A fun and interactive browser-based Whack-a-Mole game built with HTML, CSS, and JavaScript.

---

## Project Information

- Student Name: Marie Kate Abbido
- Section: BSCS 2D
- Subject: DC 101 - Web Development
- Project Type: Mini Arcade - Browser Game
- Submission Date: December 2025

---

Game Description

Mole Mayhem is an exciting browser-based Whack-a-Mole game where players test their reflexes and hand-eye coordination. Click on the moles as they pop up from their holes to score points before time runs out!

Game Features

- 30-second countdown timer
- Score tracking system
- Persistent high score using LocalStorage
- Smooth animations and transitions
- Fully responsive design
- Info modal with developer information
- Game over screen with performance feedback

---

Technologies Used

Core Technologies

- HTML5 - Semantic markup structure
- CSS3 - Styling, animations, and responsive design
  - CSS Grid for game board layout
  - Flexbox for component alignment
  - CSS animations and transitions
  - Custom gradients and shadows
- Vanilla JavaScript (ES6+) - Game logic and interactivity
  - Event listeners
  - Timer management
  - DOM manipulation
  - LocalStorage API

Development Tools

- Visual Studio Code 2022 - Code editor
- Git - Version control
- GitHub - Repository hosting
- GitHub Pages - Live deployment

---

How to Play

1. Click the "Start Game" button to begin
2. Moles will randomly pop up from holes
3. Click on the moles as fast as you can
4. Each successful hit gives you 10 points
5. You have 30 seconds to score as high as possible
6. Try to beat your high score!

Controls

- Mouse Click - Whack the moles
- Start Game Button - Begin a new game
- Info Button - View game information and instructions

---

Instructions to Run the Game

Method 1: Play Online (Recommended)

Live Demo: [https://abbidomariekate07-ops.github.io/DC101_Game_AbbidoMarieKate/](https://abbidomariekate07-ops.github.io/DC101_Game_AbbidoMarieKate/)

Method 2: Download and Run Locally

1. Download all files from this repository
2. Make sure `index.html`, `style.css`, and `script.js` are in the same folder
3. Open `index.html` in any modern web browser
4. Start playing!

Method 3: Clone Repository

bash
# Clone this repository
git clone https://github.com/abbidomariekate07-ops/DC101_Game_AbbidoMarieKate.git

# Navigate to project folder
cd DC101_Game_AbbidoMarieKate

# Open index.html in your browser

Project Structure

DC101_Game_AbbidoMarieKate/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # Game logic
├── README.md           # Project documentation
├── screenshot.png      # Game screenshot (optional)
└── screenshot-info.png # Info modal screenshot (optional)


Key Features Explained
Score System
- Each successful mole hit awards 10 points
- High scores are automatically saved using LocalStorage
- Persistent across browser sessions

Timer System
- 30-second countdown
- Visual pulse effect when time is running low
- Automatic game end when timer reaches zero

Mole Behavior
- Random appearance intervals (500ms - 1500ms)
- Auto-hide after 800ms if not clicked
- Smooth animations and transitions
- Prevents same hole consecutive appearances

Responsive Design
- Works on desktop, tablet, and mobile devices
- Adaptive layout using CSS Grid and Flexbox
- Touch-friendly on mobile devices

Design Highlights

- Color Scheme: Purple gradient theme with vibrant accent colors
- Animations: Smooth wobble, bonk, and float-up effects
- Typography: Modern sans-serif fonts
- Visual Effects: Glassmorphism, shadows, and gradients

This project is created for educational purposes as part of DC 101 - Web Development course.

Marie Kate Abbido
- Section: BSCS 2D
- GitHub: [@abbidomariekate07-ops](https://github.com/abbidomariekate07-ops)
- Course: DC 101 - Web Development
