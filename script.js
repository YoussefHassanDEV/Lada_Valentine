const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

const sweetMessages = [
    "You make my heart feel at home.",
    "Every moment with you is my favorite.",
    "I love the way you light up my world.",
    "You + Me = always.",
    "Lada, you’re my forever Valentine."
];

let messageIndex = 0;
let sweetIndex = 0;

const heartsContainer = document.getElementById("heartsContainer");
const messageDisplay = document.getElementById("messageDisplay");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownNote = document.getElementById("countdownNote");
const tiltCard = document.getElementById("tiltCard");
const cursorGlow = document.getElementById("cursorGlow");
const orbs = Array.from(document.querySelectorAll(".orb"));
const letterToggle = document.getElementById("letterToggle");
const letterContent = document.getElementById("letterContent");
const wishButton = document.getElementById("wishButton");
const wishText = document.getElementById("wishText");
const heartSend = document.getElementById("heartSend");
const quoteText = document.getElementById("quoteText");
const scrollProgress = document.getElementById("scrollProgress");
const starfield = document.getElementById("starfield");

let rafId = null;
let lastMouseEvent = null;
let parallaxOffset = 0;

const reunionDate = new Date("2026-03-11T12:00:00+02:00");

const wishes = [
    "A sunrise walk in Egypt together.",
    "A thousand kisses on March 11.",
    "A lifetime of calm, love, and laughter.",
    "More playlists, more dates, more you and me.",
    "A love that grows stronger every day."
];

const quotes = [
    "I’ll love you in every timezone.",
    "Our distance is just proof of how strong we are.",
    "Every heartbeat is one step closer to you.",
    "My favorite place is right next to you.",
    "March 11: our stars align in Egypt."
];

let quoteIndex = 0;

function updateCountdown() {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    const now = new Date();
    const diff = reunionDate - now;

    if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        if (countdownNote) {
            countdownNote.textContent = "She’s here. Welcome to Egypt, Lada!";
        }
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

function spawnHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement("span");
    heart.className = "heart";
    const size = Math.random() * 12 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = "-20px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

function burstHearts(count = 8) {
    for (let i = 0; i < count; i += 1) {
        setTimeout(spawnHeart, i * 120);
    }
}

function handleNoClick() {
    const noButton = document.querySelector(".no-button");
    const yesButton = document.querySelector(".yes-button");
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.12}px`;

    if (messageDisplay) {
        messageDisplay.textContent = sweetMessages[sweetIndex];
        sweetIndex = (sweetIndex + 1) % sweetMessages.length;
    }

    burstHearts(4);
}

function handleYesClick() {
    burstHearts(12);
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 400);
}

setInterval(spawnHeart, 1200);
setInterval(updateCountdown, 1000);
updateCountdown();

function handleTilt(event) {
    lastMouseEvent = event;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!tiltCard || !lastMouseEvent) return;
        const rect = tiltCard.getBoundingClientRect();
        const x = (lastMouseEvent.clientX - rect.left) / rect.width - 0.5;
        const y = (lastMouseEvent.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 6).toFixed(2);
        const rotateY = (x * 8).toFixed(2);
        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${parallaxOffset}px)`;
    });
}

function resetTilt() {
    if (!tiltCard) return;
    tiltCard.style.transform = "rotateX(0deg) rotateY(0deg)";
}

function handleCursor(event) {
    lastMouseEvent = event;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!lastMouseEvent) return;
        if (cursorGlow) {
            cursorGlow.style.left = `${lastMouseEvent.clientX}px`;
            cursorGlow.style.top = `${lastMouseEvent.clientY}px`;
        }

        if (orbs.length > 0) {
            const viewportX = lastMouseEvent.clientX / window.innerWidth - 0.5;
            const viewportY = lastMouseEvent.clientY / window.innerHeight - 0.5;
            orbs.forEach((orb, index) => {
                const depth = (index + 1) * 12;
                orb.style.transform = `translate3d(${viewportX * depth}px, ${viewportY * depth}px, ${80 + depth}px)`;
            });
        }
    });
}

window.addEventListener("mousemove", handleCursor);
window.addEventListener("mousemove", handleTilt);
window.addEventListener("mouseleave", resetTilt);

if (letterToggle && letterContent) {
    letterToggle.addEventListener("click", () => {
        const isOpen = letterContent.classList.toggle("open");
        letterContent.setAttribute("aria-hidden", String(!isOpen));
        letterToggle.textContent = isOpen ? "Close letter" : "Open letter";
    });
}

if (wishButton && wishText) {
    wishButton.addEventListener("click", () => {
        const wish = wishes[Math.floor(Math.random() * wishes.length)];
        wishText.textContent = wish;
    });
}

if (heartSend) {
    heartSend.addEventListener("click", () => {
        burstHearts(18);
    });
}

function rotateQuotes() {
    if (!quoteText) return;
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteText.style.opacity = "0";
    setTimeout(() => {
        quoteText.textContent = `“${quotes[quoteIndex]}”`;
        quoteText.style.opacity = "1";
    }, 300);
}

setInterval(rotateQuotes, 5000);

function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
    parallaxOffset = Math.min(16, Math.max(-16, scrollTop * 0.02));
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

const revealItems = Array.from(document.querySelectorAll(".reveal"));
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("is-visible"));
}

if (starfield) {
    const ctx = starfield.getContext("2d");
    let stars = [];

    function resizeStarfield() {
        starfield.width = window.innerWidth;
        starfield.height = window.innerHeight;
        stars = Array.from({ length: Math.min(140, Math.floor(window.innerWidth / 7)) }, () => ({
            x: Math.random() * starfield.width,
            y: Math.random() * starfield.height,
            radius: Math.random() * 1.4 + 0.4,
            speed: Math.random() * 0.25 + 0.1
        }));
    }

    function drawStars() {
        ctx.clearRect(0, 0, starfield.width, starfield.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < -5) {
                star.y = starfield.height + 5;
                star.x = Math.random() * starfield.width;
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    resizeStarfield();
    drawStars();
    window.addEventListener("resize", resizeStarfield);
}