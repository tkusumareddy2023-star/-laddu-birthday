/* =========================================================
   EASY PERSONALIZATION CONFIGURATION
   ========================================================= */
const birthdayConfig = {
    name: "Kushwanth Reddy",
    nickname: "Laddu",
    birthDate: "2003-09-20", // YYYY-MM-DD
    firstKnownDate: "2021-08-01", // YYYY-MM-DD

    // Personal letter text
    personalLetter: `My Love ❤️,

I don’t know if words will ever be enough to explain what you mean to me, but I still want to try.

Since the day you came into my life, something inside me changed. You became more than just a person I love—you became a beautiful part of my everyday thoughts, my happiness, my dreams, and even my quiet moments.

I love the way you make me smile without even trying. I love talking to you, teasing you, caring for you, and even those little arguments that somehow make me realize how much you matter to me. 🥹❤️

There are days when I may not express my feelings properly. Sometimes I may get angry, overthink, or become silent. But please never mistake my silence for a lack of love. The truth is, I care about you more than I know how to explain.

I don't want only the beautiful moments with you. I want the difficult days too. I want to stand beside you when everything is going right and hold your hand when everything feels wrong. I want to see you grow, achieve your dreams, and be there to celebrate every little victory with you.

If I could make one wish, I wouldn't wish for a perfect life. I would simply wish for you to remain a part of my life through all the imperfect days, because with you, even ordinary moments feel special. ❤️

Thank you for being you. Thank you for every smile, every conversation, every memory, and every moment you've given me.
I’ve seen how much you’ve changed, grown, and worked hard—not just for yourself, but for the future you want to build with me. ❤️

No matter how many days pass, I hope you always remember one thing:

You are deeply loved. You are precious to me. And a part of my heart will always belong to you. ❤️

I don't know what the future has written for us, but if I get to choose, I want to keep choosing you—again and again, every single day.

Forever yours,
With all my heart, ❤️
I love you.`,

    // Interactive Cards Messages
    surprise1: "Your amazing smile makes my heart skip a beat, but your cute eyes… I swear, I completely melt every time I look into them. ❤️🥹",
    surprise2: "I wish you endless joy, success, and a life full of beautiful surprises.",
    surprise3: "I'm so glad I got to know you. You are truly special and mean a lot to me!"
};

/* =========================================================
   INITIALIZATION & SETUP
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Inject Configuration Data
    document.getElementById("full-name-display").textContent = birthdayConfig.name;
    document.getElementById("bday-name").textContent = birthdayConfig.name;
    document.getElementById("bday-nickname").textContent = birthdayConfig.nickname.toUpperCase();
    document.getElementById("final-nickname").textContent = birthdayConfig.nickname;

    // Parse Dates for display
    const bDate = new Date(birthdayConfig.birthDate);
    document.getElementById("birth-date-display").textContent = formatDateDot(bDate);

    const fDate = new Date(birthdayConfig.firstKnownDate);
    document.getElementById("first-known-display").textContent = formatDateDot(fDate);

    // Inject Surprise Cards
    document.getElementById("surprise-1").textContent = birthdayConfig.surprise1;
    document.getElementById("surprise-2").textContent = birthdayConfig.surprise2;
    document.getElementById("surprise-3").textContent = birthdayConfig.surprise3;

    // Start background animations
    createFloatingHearts();

    // Start Live Counters
    updateCounters();
    setInterval(updateCounters, 1000);
});

/* =========================================================
   NAVIGATION (SCREENS)
   ========================================================= */
let currentScreen = 1;
function nextScreen(screenNumber) {
    // Hide current
    const current = document.querySelector('.screen.active');
    if (current) current.classList.remove('active');

    // Show new
    const next = document.getElementById(`screen-${screenNumber}`);
    if (next) {
        next.classList.add('active');
        currentScreen = screenNumber;

        // Trigger specific screen actions
        if (screenNumber === 7) triggerConfetti();
        if (screenNumber === 9) typeLetter();
    }
}

/* =========================================================
   MUSIC CONTROL
   ========================================================= */
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
const iconPlay = document.getElementById("music-icon-play");
const iconPause = document.getElementById("music-icon-pause");

let isMusicPlaying = false;

musicBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        iconPlay.style.display = "block";
        iconPause.style.display = "none";
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        iconPlay.style.display = "none";
        iconPause.style.display = "block";
    }
    isMusicPlaying = !isMusicPlaying;
});

// Auto-play attempt on first interaction
document.body.addEventListener("click", () => {
    if (!isMusicPlaying && bgMusic.paused) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            iconPlay.style.display = "none";
            iconPause.style.display = "block";
        }).catch(() => {
            // Autoplay blocked, handled gracefully
        });
    }
}, { once: true });


/* =========================================================
   DATE CALCULATIONS & COUNTERS
   ========================================================= */
function formatDateDot(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d} • ${m} • ${y}`;
}

function calculateElapsed(startDate) {
    const start = new Date(startDate);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Use the actual current time to populate hours, minutes, seconds dynamically.
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return {
        years, months, days: Math.max(0, days),
        hours,
        minutes,
        seconds
    };
}

function updateCounters() {
    // Birth Counter
    const bElapsed = calculateElapsed(birthdayConfig.birthDate);
    document.getElementById("b-years").textContent = bElapsed.years;
    document.getElementById("b-months").textContent = bElapsed.months;
    document.getElementById("b-days").textContent = bElapsed.days;
    document.getElementById("b-hours").textContent = String(bElapsed.hours).padStart(2, '0');
    document.getElementById("b-mins").textContent = String(bElapsed.minutes).padStart(2, '0');
    document.getElementById("b-secs").textContent = String(bElapsed.seconds).padStart(2, '0');

    // Known Counter
    const kElapsed = calculateElapsed(birthdayConfig.firstKnownDate);
    document.getElementById("k-years").textContent = kElapsed.years;
    document.getElementById("k-months").textContent = kElapsed.months;
    document.getElementById("k-days").textContent = kElapsed.days;
    document.getElementById("k-hours").textContent = String(kElapsed.hours).padStart(2, '0');
    document.getElementById("k-mins").textContent = String(kElapsed.minutes).padStart(2, '0');
    document.getElementById("k-secs").textContent = String(kElapsed.seconds).padStart(2, '0');
}

/* =========================================================
   INTERACTIVE ELEMENTS
   ========================================================= */

// Photo Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("active");
}

function closeLightbox(e) {
    if (e.target === lightbox || e.target.classList.contains('close-btn')) {
        lightbox.classList.remove("active");
    }
}

// Flip Cards
function toggleCard(card) {
    card.classList.toggle("flipped");
}

// Toggle Language
function toggleLang(el) {
    if (el.textContent === "I love you 💕") {
        el.textContent = el.getAttribute("data-original");
        el.style.backgroundColor = "";
        el.style.color = "";
        el.style.borderColor = "";
    } else {
        el.textContent = "I love you 💕";
        el.style.backgroundColor = "#ffb6c1";
        el.style.color = "white";
        el.style.borderColor = "#ffb6c1";
    }
}

// Typewriter Effect for Letter
let letterTyped = false;
function typeLetter() {
    if (letterTyped) return; // Prevent re-typing

    const container = document.getElementById("personal-letter");
    const text = birthdayConfig.personalLetter;
    container.innerHTML = ""; // Clear existing

    let i = 0;
    const speed = 25; // typing speed

    function typeWriter() {
        if (i < text.length) {
            // Handle line breaks
            if (text.charAt(i) === '\n') {
                container.innerHTML += '<br>';
            } else {
                container.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typeWriter, speed);
        } else {
            container.innerHTML += '<span class="cursor"></span>';
            letterTyped = true;
        }
    }

    typeWriter();
}

/* =========================================================
   ANIMATIONS & VISUAL EFFECTS
   ========================================================= */
function createFloatingHearts() {
    const container = document.getElementById("floating-hearts");
    const elements = ['❤️', '✨', '💕', '🌙', '💖', '🎁'];

    setInterval(() => {
        const el = document.createElement("div");
        const type = Math.random() > 0.3 ? 'floating-heart' : 'floating-sparkle';
        el.className = type;

        el.innerText = elements[Math.floor(Math.random() * elements.length)];

        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = (Math.random() * 5 + 8) + "s";
        el.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 15000);
    }, 800);
}

function triggerConfetti() {
    const container = document.getElementById("screen-7");
    const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#ffb8b8'];

    // Only run confetti once when opening screen 7
    if (container.querySelector('.birthday-confetti')) return;

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.className = "birthday-confetti";

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
        confetti.style.animationDelay = (Math.random() * 1) + "s";

        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = "50%";
        }

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}
