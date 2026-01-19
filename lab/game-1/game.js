/**
 * Flappy Saro - Ultimate Edition
 * Features: Password Protect, Levels, Parallax, Particles, Sprite Animation
 */

// --- CONFIG ---
const CONFIG = {
    gravity: 0.25,
    flapStrength: -4.5,
    colors: {
        sky: '#70c5ce',
        ground: '#ded895',
        grass: '#73bf2e',
        pipe: '#4ec04e',
        pipeBorder: '#2f812f'
    },
    messages: [
        "Machi ava unna than pakura",
        "Sathiyama onume padikala da",
        "Naliku confirm mass bunk",
        "Treat epo veika pora",
        "Night online vaa match podalam",
        "Mavaney nee setha iniku",
        "Adutha sem pathukalam vidu",
        "Briyani sapda polama?",
        "Result pathu heart attack vanthuruchu",
        "Dai seekiram va da waiting",
        "Thalaivar movie FDFS ticket book pannu",
        "Single pasanga saabam unna summa vidathu",
        "You can do it",
        "ava unakuthan",
        "adutha match high score edutha ava kandipa unaku than",
        "Next result brooo",
        "abu iniku oru ponu ku propose pana poran",
        "500+ score edutha naliku college leave"
    ]
};

// State Variables
let LEVELS = {
    'EASY': { pipeSpeed: 2, pipeGap: 120, spawnRate: 110 },
    'HARD': { pipeSpeed: 3, pipeGap: 100, spawnRate: 90 },
    'IMPOSSIBLE': { pipeSpeed: 4, pipeGap: 85, spawnRate: 75 }
};

let currentLevel = 'EASY'; // Default
let canvas, ctx;
let frames = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem('flappySaroHighScore')) || 0;
let gameState = 'PASSWORD'; // PASSWORD, LEVEL_SELECT, START, PLAYING, GAMEOVER, PAUSED
let pipes = [];
let particles = [];
let shakeIntensity = 0;
let isMuted = false;
let audioCtx = null;

// Background Parallax
let bgOffset1 = 0;
let bgOffset2 = 0;

// Bird
const bird = {
    x: 50,
    y: 150,
    velocity: 0,
    radius: 12,
    rotation: 0,
    frame: 0,

    update: function () {
        this.velocity += CONFIG.gravity;
        this.y += this.velocity;

        if (this.velocity < 0) this.rotation = -25 * Math.PI / 180;
        else {
            this.rotation += 2 * Math.PI / 180;
            if (this.rotation > 90 * Math.PI / 180) this.rotation = 90 * Math.PI / 180;
        }

        if (this.y + this.radius >= canvas.height - 110) {
            this.y = canvas.height - 110 - this.radius;
            gameOver();
        }

        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.velocity = 0;
        }

        if (frames % 5 === 0) this.frame = (this.frame + 1) % 4;
    },

    draw: function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Body
        ctx.fillStyle = '#ffeb3b';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius + 2, this.radius, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(6, -6, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(8, -6, 2, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.fillStyle = '#ff5722';
        ctx.beginPath();
        ctx.moveTo(6, 2);
        ctx.lineTo(16, 6);
        ctx.lineTo(6, 10);
        ctx.fill();
        ctx.stroke();

        // Wing
        ctx.fillStyle = '#fff9c4';
        ctx.beginPath();
        let wingY = 2;
        if (this.frame === 1) wingY = -4;
        else if (this.frame === 3) wingY = 6;

        ctx.ellipse(-6, wingY, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    },

    flap: function () {
        this.velocity = CONFIG.flapStrength;
        this.rotation = -25 * Math.PI / 180;
        createParticles(this.x, this.y + 10, 5, '#fff');
    }
};

// Particles
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = color;
        this.life = 1.0;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.05;
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1.0;
    }
}
function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
}

// Audio
const AudioSys = {
    hitSound: new Audio('sounds/hit.mp3'),

    init: function () {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.hitSound.load();
    },
    play: function (type) {
        if (isMuted) return;

        // Custom File for HIT
        if (type === 'hit') {
            this.hitSound.currentTime = 0;
            this.hitSound.play().catch(e => console.log(e));
            return;
        }

        // Synth for others
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'flap') {
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.linearRampToValueAtTime(800, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.1);
            osc.start(); osc.stop(now + 0.1);
        } else if (type === 'point') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(); osc.stop(now + 0.15);
        }
    }
};

// --- LOGIC ---

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // UI Listeners
    document.getElementById('pass-submit').addEventListener('click', checkPassword);
    document.getElementById('restart-btn').addEventListener('click', startGame);
    document.getElementById('btn-pause').addEventListener('click', togglePause);
    document.getElementById('btn-sound').addEventListener('click', toggleSound);

    // Check if already unlocked
    if (localStorage.getItem('flappySaroUnlocked') === 'true') {
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('level-screen').classList.remove('hidden');
        gameState = 'LEVEL_SELECT';
    }

    // Global Input
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') handleAction();
        if (e.code === 'KeyP') togglePause();
        if (gameState === 'PASSWORD' && e.code === 'Enter') checkPassword();
    });
    canvas.addEventListener('mousedown', (e) => {
        handleAction();
    });
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleAction();
    });

    loop();
}

function checkPassword() {
    const input = document.getElementById('pass-input').value;
    if (input === 'saro boss') {
        localStorage.setItem('flappySaroUnlocked', 'true'); // Save unlock state
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('level-screen').classList.remove('hidden');
        gameState = 'LEVEL_SELECT';
    } else {
        document.getElementById('pass-error').classList.remove('hidden');
    }
}

// Exposed to HTML
window.selectLevel = function (level) {
    currentLevel = level;
    document.getElementById('level-screen').classList.add('hidden');
    startGame();
}

function handleAction() {
    AudioSys.init();
    if (gameState === 'PLAYING') {
        bird.flap();
        AudioSys.play('flap');
    }
}

function startGame() {
    AudioSys.init();
    bird.y = 150;
    bird.velocity = 0;
    score = 0;
    pipes = [];
    particles = [];
    frames = 0;
    gameState = 'PLAYING';
    bgOffset1 = 0;
    bgOffset2 = 0;

    // Reset UI
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('hud-score').classList.remove('hidden');
    document.getElementById('hud-score').innerText = '0';
    document.getElementById('controls').classList.remove('hidden');
}

function gameOver() {
    if (gameState === 'GAMEOVER') return; // Prevent double trigger
    gameState = 'GAMEOVER';
    AudioSys.play('hit');
    shakeIntensity = 20;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('flappySaroHighScore', highScore);
    }

    const msg = CONFIG.messages[Math.floor(Math.random() * CONFIG.messages.length)];

    document.getElementById('hud-score').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    document.getElementById('best-score').innerText = highScore;
    document.getElementById('custom-message').innerText = msg;
}

function togglePause() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        document.getElementById('pause-screen').classList.remove('hidden');
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        document.getElementById('pause-screen').classList.add('hidden');
    }
}

function toggleSound() {
    isMuted = !isMuted;
    const btn = document.getElementById('btn-sound');
    btn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
}

function updatePipes() {
    const level = LEVELS[currentLevel];

    if (frames % level.spawnRate === 0) {
        const minH = 50;
        const maxH = canvas.height - 110 - level.pipeGap - minH;
        let topH = Math.floor(Math.random() * (maxH - minH + 1) + minH);
        pipes.push({ x: canvas.width, topHeight: topH, passed: false });
    }

    for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        p.x -= level.pipeSpeed;

        // Collision
        if (bird.x + 8 > p.x && bird.x - 8 < p.x + 52) { // 52 is pipeWidth
            if (bird.y - 8 < p.topHeight || bird.y + 8 > p.topHeight + level.pipeGap) {
                gameOver();
            }
        }

        if (p.x + 52 < 0) {
            pipes.shift();
            i--;
        }

        if (p.x + 52 < bird.x && !p.passed) {
            score++;
            p.passed = true;
            document.getElementById('hud-score').innerText = score;
            createParticles(bird.x, bird.y, 15, '#FFD700');
            AudioSys.play('point');
        }
    }
}

function drawBackground() {
    ctx.fillStyle = CONFIG.colors.sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clouds
    bgOffset1 -= 0.5;
    if (bgOffset1 <= -canvas.width) bgOffset1 = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    [bgOffset1, bgOffset1 + canvas.width].forEach(off => {
        ctx.beginPath();
        ctx.arc(off + 50, 100, 30, 0, Math.PI * 2);
        ctx.arc(off + 100, 120, 40, 0, Math.PI * 2);
        ctx.arc(off + 250, 80, 50, 0, Math.PI * 2);
        ctx.fill();
    });

    // City
    bgOffset2 -= 1;
    if (bgOffset2 <= -canvas.width) bgOffset2 = 0;
    ctx.fillStyle = 'rgba(165, 220, 227, 0.5)';
    [bgOffset2, bgOffset2 + canvas.width].forEach(off => {
        ctx.fillRect(off + 20, canvas.height - 170, 40, 60);
        ctx.fillRect(off + 80, canvas.height - 210, 50, 100);
        ctx.fillRect(off + 220, canvas.height - 190, 60, 80);
    });

    // Ground
    const groundY = canvas.height - 110;
    ctx.fillStyle = CONFIG.colors.ground;
    ctx.fillRect(0, groundY, canvas.width, 110);
    ctx.fillStyle = CONFIG.colors.grass;
    ctx.fillRect(0, groundY, canvas.width, 12);
    ctx.strokeStyle = '#558c22';
    ctx.beginPath();
    ctx.moveTo(0, groundY + 12);
    ctx.lineTo(canvas.width, groundY + 12);
    ctx.stroke();
}

function drawPipes() {
    const level = LEVELS[currentLevel];
    pipes.forEach(p => {
        const grad = ctx.createLinearGradient(p.x, 0, p.x + 52, 0);
        grad.addColorStop(0, '#59bf59');
        grad.addColorStop(0.5, CONFIG.colors.pipe);
        grad.addColorStop(1, '#3a8c3a');

        ctx.fillStyle = grad;
        ctx.strokeStyle = CONFIG.colors.pipeBorder;
        ctx.lineWidth = 2;

        // Top
        ctx.fillRect(p.x, 0, 52, p.topHeight);
        ctx.strokeRect(p.x, 0, 52, p.topHeight);
        ctx.fillRect(p.x - 2, p.topHeight - 24, 56, 24);
        ctx.strokeRect(p.x - 2, p.topHeight - 24, 56, 24);

        // Bottom
        const bY = p.topHeight + level.pipeGap;
        const bH = canvas.height - 110 - bY;
        ctx.fillRect(p.x, bY, 52, bH);
        ctx.strokeRect(p.x, bY, 52, bH);
        ctx.fillRect(p.x - 2, bY, 56, 24);
        ctx.strokeRect(p.x - 2, bY, 56, 24);
    });
}

function loop() {
    let tx = 0, ty = 0;
    if (shakeIntensity > 0) {
        tx = (Math.random() - 0.5) * shakeIntensity;
        ty = (Math.random() - 0.5) * shakeIntensity;
        shakeIntensity *= 0.9;
        if (shakeIntensity < 0.5) shakeIntensity = 0;
    }

    ctx.save();
    ctx.translate(tx, ty);

    drawBackground();
    drawPipes();

    particles.forEach((p, i) => { p.update(); p.draw(); if (p.life <= 0) particles.splice(i, 1); });

    if (gameState === 'PLAYING') {
        bird.update();
        updatePipes();
        frames++;
    } else if (gameState === 'START' || gameState === 'PASSWORD' || gameState === 'LEVEL_SELECT') {
        bird.y = 150 + Math.sin(frames * 0.1) * 5;
        bird.draw(); // Just show bird bobbing
        frames++;
    } else {
        bird.draw();
    }

    // Only draw bird in loop if logic didn't draw it (logic draws it when playing)
    if (gameState === 'PLAYING' || gameState === 'GAMEOVER') bird.draw();

    ctx.restore();
    requestAnimationFrame(loop);
}

init();
