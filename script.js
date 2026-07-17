const correctPass = "0209";
let enteredPass = "";
const dots = document.querySelectorAll(".dot");
const keys = document.querySelectorAll(".key[data-value]");
const deleteKey = document.getElementById("key-del");
const passwordScreen = document.getElementById("password-screen");
const passwordContent = document.querySelector(".password-content");
const mainExperience = document.getElementById("main-experience");

function updateDots() {
  dots.forEach((dot, index) => {
    if (index < enteredPass.length) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function checkPass() {
  if (enteredPass === correctPass) {
    passwordScreen.style.opacity = "0";
    passwordScreen.style.visibility = "hidden";
    setTimeout(() => {
      passwordScreen.style.display = "none";
      mainExperience.style.display = "block";
      updateInstruction("Nhấn vào bánh để thắp nến");
    }, 500);
  } else {
    passwordContent.classList.add("shake-content");
    setTimeout(() => {
      passwordContent.classList.remove("shake-content");
      enteredPass = "";
      updateDots();
    }, 500);
  }
}

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    e.stopPropagation();

    popSound.currentTime = 0;
    popSound.play().catch((e) => console.log("Pop sound deferred"));

    if (bgMusic.paused) {
      bgMusic.play().catch((e) => console.log("Music waiting for interaction"));
    }

    if (enteredPass.length < 4) {
      enteredPass += key.getAttribute("data-value");
      updateDots();
      if (enteredPass.length === 4) {
        setTimeout(checkPass, 300);
      }
    }
  });
});

deleteKey.addEventListener("click", (e) => {
  e.stopPropagation();

  popSound.currentTime = 0;
  popSound.play().catch((e) => console.log("Pop sound deferred"));

  if (enteredPass.length > 0) {
    enteredPass = enteredPass.slice(0, -1);
    updateDots();
  }
});

const cake = document.getElementById("cake-clickable");
const candle = document.getElementById("candle-img");
const instruction = document.getElementById("instruction-text");
const popSound = document.getElementById("pop-sound");
const candleSound = document.getElementById("candle-sound");
const fireworkSound = document.getElementById("firework-sound");
const bgMusic = document.getElementById("bg-music");

let state = "initial";

document.addEventListener("click", (e) => {
  if (e.target.id === "candle-img" && state === "lit") return;
  if (e.target.classList.contains("key")) return;

  popSound.currentTime = 0;
  popSound.play().catch((e) => console.log("Audio play deferred"));
});

function updateInstruction(text) {
  if (!instruction) return;
  instruction.classList.remove("bounce-up");
  void instruction.offsetWidth;

  instruction.innerText = text;
  instruction.classList.add("bounce-up");
}

cake.addEventListener("click", (e) => {
  if (state === "initial") {
    candle.classList.add("candle-appearing");
    updateInstruction("Nhấn vào nến để thổi nến");
    state = "lit";
  }
});

const balloons = [
  "asset/balloon/balloon (1).png",
  "asset/balloon/balloon (2).png",
  "asset/balloon/balloon (3).png",
  "asset/balloon/balloon (4).png",
];
const emojis = [
  "❤️",
  "🎂",
  "🥰",
  "💗",
  "✨",
  "🎉",
  "🎁",
  "🎈",
  "💖",
  "⭐",
  "🌈",
  "🍭",
];
const container = document.getElementById("floating-elements");

function spawnCelebration() {
  const burstCount = Math.floor(Math.random() * 2) + 1;

  for (let i = 0; i < burstCount; i++) {
    const isBalloon = Math.random() > 0.4;

    if (isBalloon) {
      const balloon = document.createElement("img");
      balloon.src = balloons[Math.floor(Math.random() * balloons.length)];
      balloon.className = "celebration-item";
      balloon.style.left = Math.random() * 90 + "vw";
      balloon.style.width = Math.random() * 60 + 40 + "px";
      balloon.style.animationDuration = Math.random() * 4 + 6 + "s";
      balloon.style.animationDelay = Math.random() * 2 + "s";
      container.appendChild(balloon);

      setTimeout(() => balloon.remove(), 10000);
    } else {
      const emoji = document.createElement("div");
      emoji.className = "floating-emoji";
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * 95 + "vw";
      emoji.style.fontSize = Math.random() * 1.5 + 1.5 + "rem";
      emoji.style.animationDuration = Math.random() * 3 + 5 + "s";
      emoji.style.animationDelay = Math.random() * 1 + "s";
      container.appendChild(emoji);

      setTimeout(() => emoji.remove(), 8000);
    }
  }
}

candle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (state === "lit") {
    candleSound.play().catch((e) => console.log("Candle sound deferred"));
    candle.src = "asset/candle_no_fire.png";
    updateInstruction("✨ HAPPY BIRTHDAY! ✨");
    state = "blown";

    for (let i = 0; i < 5; i++) {
      setTimeout(spawnCelebration, i * 200);
    }
    setInterval(spawnCelebration, 400);
    setTimeout(() => {
      const letter = document.getElementById("letter-container");
      letter.classList.add("show");

      setTimeout(() => {
        letter.classList.add("show-text");
      }, 1600);
    }, 3000);
  }
});

const letterContainer = document.getElementById("letter-container");
const modal = document.getElementById("message-modal");
const fireworksContainer = document.getElementById("fireworks-container");
const closeBtn = document.getElementById("close-modal");

function createFirework() {
  const colors = [
    "#ff47a1",
    "#ffc107",
    "#00bcd4",
    "#4caf50",
    "#ffffff",
    "#e91e63",
    "#9c27b0",
    "#ff5722",
    "#00ff00",
    "#ffff00",
    "#00ffff",
  ];
  const x = Math.random() * 100;
  const targetHeight = Math.random() * 50 + 30;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = x + "%";
  rocket.style.setProperty("--target-height", targetHeight + "vh");
  rocket.style.backgroundColor = color;
  rocket.style.boxShadow = `0 0 10px ${color}`;
  fireworksContainer.appendChild(rocket);

  setTimeout(() => {
    rocket.remove();

    const sound = fireworkSound.cloneNode();
    sound.volume = 0.7;
    sound.currentTime = 0;
    sound.play().catch((e) => console.log("Firework sound deferred"));

    setTimeout(() => {
      sound.pause();
      sound.remove();
    }, 2000);

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.backgroundColor = color;
      particle.style.left = x + "%";
      particle.style.bottom = targetHeight + "vh";
      particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

      const angle = ((Math.PI * 2) / particleCount) * i;
      const velocity = Math.random() * 200 + 100;
      const dx = Math.cos(angle) * velocity + "px";
      const dy = Math.sin(angle) * velocity + "px";

      particle.style.setProperty("--dx", dx);
      particle.style.setProperty("--dy", dy);

      fireworksContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1200);
    }
  }, 1000);
}

let fireworkInterval;

function fireBurst() {
  const count = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < count; i++) {
    setTimeout(createFirework, i * 600);
  }
}

letterContainer.addEventListener("click", () => {
  modal.classList.add("show");
  fireBurst();
  fireworkInterval = setInterval(fireBurst, 2500);
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  clearInterval(fireworkInterval);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    clearInterval(fireworkInterval);
  }
});
