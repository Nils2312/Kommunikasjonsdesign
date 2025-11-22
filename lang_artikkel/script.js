window.requestAnimationFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (!("IntersectionObserver" in window)) {
  document
    .querySelectorAll(".pixel-cell, .pixel-cell8, .pixel-cell9")
    .forEach((c) => {
      c.style.backgroundColor = c.closest(".blue-pixel-grid")
        ? "#263E5E"
        : "#1B2232";
      c.style.opacity = "1";
    });
}

function updateParallax() {
  const fg = document.querySelector(".fg-image");
  const container = document.querySelector(".image-container");
  const scrollY = window.scrollY;

  const containerHeight = container.offsetHeight;
  const viewportHeight = window.innerHeight;

  const maxMove = 10;
  const minMove = -5;
  const scrollProgress = Math.min(
    scrollY / (containerHeight - viewportHeight),
    1
  );
  const move = Math.max(minMove, maxMove - scrollProgress * 16);

  fg.style.transform = `translate(-50%, ${move}%)`;

  if (isMobile && scrollY === 0) fg.style.transform = "translate(-50%, 10%)";
}

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("load", updateParallax);
window.addEventListener("resize", updateParallax);

const pixelGrid = document.querySelector(".pixel-grid");

const isMobilePixel = window.innerWidth <= 800;
if (!pixelGrid || isMobilePixel) {
} else {
  const cols = 40;
  const rows = 6;

  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pixel-cell");
    pixelGrid.appendChild(cell);
  }

  let hasActivated = false;

  function showPixels() {
    const container = document.querySelector(".image-container");
    const rect = container.getBoundingClientRect();
    const cells = document.querySelectorAll(".pixel-cell");

    if (rect.bottom < window.innerHeight * 0.9 && !hasActivated) {
      hasActivated = true;
      cells.forEach((cell, i) => {
        const row = Math.floor(i / cols);
        const random = Math.random();

        let chance;
        if (row <= 1) chance = 0.9;
        else if (row === 2) chance = 0.75;
        else if (row === 3) chance = 0.55;
        else if (row === 4) chance = 0.3;
        else chance = 0.05;

        if (random < chance) {
          const delay = Math.random() * 600;
          setTimeout(() => {
            cell.style.backgroundColor = "#1B2232";
            cell.style.opacity = "1";
          }, delay);
        }
      });
    }

    if (rect.bottom > window.innerHeight && hasActivated) {
      hasActivated = false;
      cells.forEach((cell) => {
        cell.style.backgroundColor = "transparent";
        cell.style.opacity = "0";
      });
    }
  }

  window.addEventListener("scroll", showPixels, { passive: true });
  window.addEventListener("load", showPixels);
  window.addEventListener("resize", showPixels);
}

(function () {
  const boxes = document.querySelectorAll(".text-box");
  if (!boxes.length) return;

  const SPEED = 0.2;
  const MAX_SHIFT = 620;

  function onScroll() {
    const scrollY = window.scrollY;

    boxes.forEach((box, i) => {
      const rect = box.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (rect.top - viewportHeight / 2) / viewportHeight;
      const shift = Math.max(
        -MAX_SHIFT,
        Math.min(MAX_SHIFT, progress * SPEED * viewportHeight)
      );

      box.style.transform = `translateY(${shift}px)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
})();

const boxes = Array.from(document.querySelectorAll(".text-box"));

function handleScroll() {
  const isMobile = window.innerWidth <= 1300;

  if (isMobile) {
    boxes.forEach((box, i) => {
      setTimeout(() => {
        box.classList.add("visible");
        box.style.visibility = "visible";
      }, i * 80);
    });
  } else {
    const triggerBottom = window.innerHeight * 0.8;
    const triggerTop = window.innerHeight * 0.3;

    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      const isVisible = rect.top < triggerBottom && rect.bottom > triggerTop;
      box.classList.toggle("visible", isVisible);
    });
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("load", handleScroll);
window.addEventListener("resize", handleScroll);

const pcSection = document.querySelector(".pc-section");

function handlePCScroll() {
  const rect = pcSection.getBoundingClientRect();
  const inView =
    rect.top < window.innerHeight * 0.4 &&
    rect.bottom > window.innerHeight * 0.1;
  if (inView) {
    pcSection.classList.add("active");
  } else {
    pcSection.classList.remove("active");
  }
}

window.addEventListener("scroll", handlePCScroll, { passive: true });
window.addEventListener("load", handlePCScroll);

window.addEventListener("scroll", () => {
  const chatSections = document.querySelectorAll(".chat-section");

  chatSections.forEach((chatSection) => {
    const date = chatSection.querySelector(".chat-date");
    const messages = chatSection.querySelectorAll(".chat-message");
    const note = chatSection.querySelector(".chat-note");
    if (!date || messages.length === 0) return;

    const rect = chatSection.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.7;

    if (
      rect.top < triggerPoint &&
      !chatSection.classList.contains("activated")
    ) {
      chatSection.classList.add("activated");

      date.classList.add("visible");

      messages.forEach((msg, i) => {
        setTimeout(() => {
          msg.classList.add("visible");
        }, 300 + i * 150);
      });

      if (note) {
        setTimeout(() => {
          note.classList.add("visible");
        }, 300 + messages.length * 150 + 200);
      }
    }
  });
});

(() => {
  document.querySelectorAll(".faktaboks-seksjon").forEach((section) => {
    const faktaboks = section.querySelector(".faktaboks");
    const btn = section.querySelector(".faktaboks-knapp");

    btn.addEventListener("click", () => {
      faktaboks.classList.toggle("åpen");
      btn.textContent = faktaboks.classList.contains("åpen")
        ? "Vis mindre"
        : "Vis mer";
    });
  });
})();

let gender = "male";
let skin = 1,
  hair = 0,
  eyes = 0,
  brows = 0,
  mouth = 0,
  beard = 0;

function updateCharacter() {
  document.getElementById(
    "base"
  ).src = `filer/karakter/base/${gender}/${skin}.png`;

  const parts = {
    hair: hair,
    eyes: eyes,
    brows: brows,
    mouth: mouth,
    beard: beard,
  };

  for (let part in parts) {
    const el = document.getElementById(part);
    if (parts[part] > 0) {
      el.style.display = "block";
      let folder = part;
      if (part === "eyes") folder = "eye";
      if (part === "brows") folder = "brow";
      if (part === "beard") folder = "skjegg";
      el.src = `filer/karakter/${folder}/${parts[part]}.png`;
    } else {
      el.style.display = "none";
      el.src = "";
    }
  }
}

function changePart(part, dir) {
  if (part === "skin") {
    skin += dir;
    if (skin > 3) skin = 1;
    if (skin < 1) skin = 3;
    document.getElementById("skinValue").textContent = skin;
  }

  if (part === "hair") {
    hair += dir;
    if (hair > 11) hair = 0;
    if (hair < 0) hair = 11;
    document.getElementById("hairValue").textContent = hair;
  }

  if (part === "eyes") {
    eyes += dir;
    if (eyes > 6) eyes = 0;
    if (eyes < 0) eyes = 6;
    document.getElementById("eyesValue").textContent = eyes;
  }

  if (part === "brows") {
    brows += dir;
    if (brows > 6) brows = 0;
    if (brows < 0) brows = 6;
    document.getElementById("browsValue").textContent = brows;
  }

  if (part === "mouth") {
    mouth += dir;
    if (mouth > 6) mouth = 0;
    if (mouth < 0) mouth = 6;
    document.getElementById("mouthValue").textContent = mouth;
  }

  if (part === "beard") {
    beard += dir;
    if (beard > 5) beard = 0;
    if (beard < 0) beard = 5;
    document.getElementById("beardValue").textContent = beard;
  }

  updateCharacter();
}

document.getElementById("maleBtn").onclick = () => {
  gender = "male";
  document.getElementById("maleBtn").classList.add("active");
  document.getElementById("femaleBtn").classList.remove("active");
  updateCharacter();
};

document.getElementById("femaleBtn").onclick = () => {
  gender = "female";
  document.getElementById("femaleBtn").classList.add("active");
  document.getElementById("maleBtn").classList.remove("active");
  updateCharacter();
};

updateCharacter();

setInterval(() => {
  if (eyes > 0) {
    const eyesImg = document.getElementById("eyes");
    eyesImg.src = "filer/karakter/blunk.png";
    setTimeout(() => {
      eyesImg.src = `filer/karakter/eye/${eyes}.png`;
    }, 100);
  }
}, 3000);

const click1 = new Audio("filer/click1.mp3");
const click2 = new Audio("filer/click2.mp3");
click1.load();
click2.load();

document.querySelectorAll(".arrow").forEach((btn) => {
  btn.addEventListener("click", () => {
    click1.pause();
    click1.currentTime = 0;
    click1.play().catch(() => {});
  });
});

document.querySelectorAll(".gender button").forEach((btn) => {
  btn.addEventListener("click", () => {
    click2.pause();
    click2.currentTime = 0;
    click2.play().catch(() => {});
  });
});

const npcText = document.getElementById("npcText");
const npcButtons = document.getElementById("npcButtons");
const npcBase = document.getElementById("npcBase");
const mouths = [
  document.getElementById("mouth1"),
  document.getElementById("mouth2"),
  document.getElementById("mouth3"),
];

const blink = document.getElementById("blink");

setInterval(() => {
  blink.style.display = "block";
  setTimeout(() => {
    blink.style.display = "none";
  }, 100);
}, 2000);

let mouthTimer;

const dialogues = {
  start: {
    text: "Hei der, fremmede! Jeg trenger hjelp. Noen har ødelagt avlingen min i natt. Kan du hjelpe meg?",
    img: "normal",
    options: [
      { text: "Ja, selvfølgelig!", next: "help_yes", mood: "glad" },
      { text: "Nei, jeg har ikke tid.", next: "help_no", mood: "sur" },
      {
        text: "Hva får jeg igjen for det?",
        next: "help_reward",
        mood: "normal",
      },
    ],
  },

  help_yes: {
    text: "Takk! Du virker som et godt menneske. Start med å sjekke låven, jeg tror det er noen der inne...",
    img: "glad",
    options: [
      { text: "Greit, jeg går.", next: "barn_1", mood: "normal" },
      { text: "Hva om noen angriper meg?", next: "barn_2", mood: "normal" },
      { text: "Hvorfor går ikke du selv?", next: "barn_3", mood: "sur" },
    ],
  },

  barn_1: {
    text: "Vær forsiktig. Jeg hørte lyder der for litt siden.",
    img: "normal",
  },
  barn_2: { text: "Ta dette sverdet, det kan hjelpe deg!", img: "normal" },
  barn_3: {
    text: "Jeg... har allerede mistet noen dyr. Jeg tør ikke gå inn igjen.",
    img: "normal",
  },

  help_no: {
    text: "Så synd. Jeg hadde håpet at noen endelig ville hjelpe meg, bare denne ene gangen…",
    img: "sur",
  },

  help_reward: {
    text: "Jeg kan betale deg i sølv, eller gi deg noe sjeldent jeg fant i skogen. Hva sier du?",
    img: "normal",
    options: [
      { text: "Jeg tar sølvet.", next: "reward_1", mood: "sur" },
      { text: "Jeg vil se gjenstanden.", next: "reward_2", mood: "normal" },
      { text: "Jeg gjør det gratis.", next: "reward_3", mood: "glad" },
    ],
  },

  reward_1: {
    text: "Greit, men da forventer jeg at du hjelper meg.",
    img: "sur",
  },
  reward_2: {
    text: "Her... en gammel medaljong. Den kan komme til nytte.",
    img: "normal",
  },
  reward_3: {
    text: "Ikke mange som gjør noe uten betaling. Verden kunne trengt flere som deg!",
    img: "glad",
  },

  end: {
    text: "Valgene dine former historien. Selv små handlinger kan endre retningen du tar, og føre til helt ulike utfall.",
    img: "normal",
    options: [{ text: "Start på nytt", next: "start", mood: "normal" }],
  },
};

function typeText(text, callback, talk = true) {
  npcText.innerHTML = `<span class="typing" data-splitting>${text}</span>`;
  Splitting();
  const chars = npcText.querySelectorAll(".char");

  chars.forEach((char) => (char.style.opacity = "0"));

  if (talk) {
    clearInterval(mouthTimer);
    mouthTimer = setInterval(() => {
      mouths.forEach((m) => (m.style.display = "none"));
      const r = Math.floor(Math.random() * mouths.length);
      mouths[r].style.display = "block";
    }, 90);
  }

  chars.forEach((char, i) => {
    setTimeout(() => {
      char.style.opacity = "1";
      if (i === chars.length - 1) {
        clearInterval(mouthTimer);
        mouths.forEach((m) => (m.style.display = "none"));
        callback();
      }
    }, i * 30);
  });
}

function showButtons(options) {
  npcButtons.innerHTML = "";
  setTimeout(() => {
    options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;

      btn.addEventListener("click", () => {
        const click2 = new Audio("filer/click2.mp3");
        click2.currentTime = 0;
        click2.play();
        showDialogue(opt.next || "end");
        if (opt.mood) npcBase.src = `filer/npc/${opt.mood}.png`;
      });

      npcButtons.appendChild(btn);
      void btn.offsetWidth;
      setTimeout(() => btn.classList.add("show"), 150 * i);
    });
  }, 150);
}

function showDialogue(id) {
  const d = dialogues[id];
  npcBase.src = `filer/npc/${d.img}.png`;
  npcButtons.innerHTML = "";
  typeText(
    d.text,
    () => {
      if (d.options) showButtons(d.options);
      else showButtons([{ text: "Fortsett", next: "end", mood: "normal" }]);
    },
    id !== "end"
  );
}

const npcSection = document.querySelector(".npc-box");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showDialogue("start");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.9,
  }
);

observer.observe(npcSection);

function updateParallax() {
  const fg = document.querySelector(".fg-image");
  const container = document.querySelector(".image-container");
  const scrollY = window.scrollY;

  const containerHeight = container.offsetHeight;
  const viewportHeight = window.innerHeight;

  const isMobile = window.innerWidth <= 768;
  const effectiveHeight = isMobile ? containerHeight * 1.3 : containerHeight;

  const maxMove = 10;
  const minMove = -5;
  const scrollProgress = Math.min(
    scrollY / (effectiveHeight - viewportHeight),
    1
  );
  const move = Math.max(minMove, maxMove - scrollProgress * 16);

  fg.style.transform = `translate(-50%, ${move}%)`;
}

let wasMobile = window.innerWidth <= 768;

window.addEventListener("resize", () => {
  const isMobileNow = window.innerWidth <= 768;
  if (isMobileNow !== wasMobile) {
    location.reload();
  }
});

const newPixelGrid = document.querySelector(".new-pixel-grid");

if (newPixelGrid) {
  const isMobile = window.innerWidth <= 768;
  const cols = isMobile ? 20 : 40;
  const rows = isMobile ? 4 : 6;

  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pixel-cell");
    newPixelGrid.appendChild(cell);
  }

  const cells = newPixelGrid.querySelectorAll(".pixel-cell");
  let activated = false;

  function activatePixels() {
    if (activated) return;
    activated = true;
    newPixelGrid.classList.add("active");

    cells.forEach((cell, i) => {
      const row = Math.floor(i / cols);
      const random = Math.random();
      let chance;

      if (row <= 1) chance = 0.9;
      else if (row === 2) chance = 0.75;
      else if (row === 3) chance = 0.55;
      else if (row === 4) chance = 0.3;
      else chance = isMobile ? 0.1 : 0.05;

      if (random < chance) {
        const delay = Math.random() * 600;
        setTimeout(() => {
          cell.style.backgroundColor = "#1B2232";
          cell.style.opacity = "1";
        }, delay);
      }
    });
  }

  function resetPixels() {
    if (!activated) return;
    activated = false;
    newPixelGrid.classList.remove("active");

    cells.forEach((cell, i) => {
      const delay = Math.random() * 600;
      setTimeout(() => {
        cell.style.backgroundColor = "transparent";
        cell.style.opacity = "0";
      }, delay);
    });
  }

  function checkPixelTrigger() {
    const rect = newPixelGrid.getBoundingClientRect();
    const triggerDown = window.innerHeight * 0.6;
    const triggerUp = window.innerHeight * 0.99;

    if (rect.top < triggerDown && !activated) {
      activatePixels();
    } else if (rect.top > triggerUp && activated) {
      resetPixels();
    }
  }

  window.addEventListener("scroll", checkPixelTrigger, { passive: true });
  window.addEventListener("load", checkPixelTrigger);
}

const stats = document.querySelectorAll(".stat");
const speeds = [0.15, 0.35, 0.25];
const bases = [10, 15, 5];

function updateBars() {
  const windowHeight = window.innerHeight;

  stats.forEach((stat, i) => {
    const rect = stat.getBoundingClientRect();
    const fill = stat.querySelector(".stat-fill");
    const handle = stat.querySelector(".stat-handle");

    const visible = rect.top < windowHeight && rect.bottom > 0;

    if (visible) {
      let progress = ((windowHeight - rect.top) / windowHeight) * 100;
      progress = Math.min(
        Math.max(bases[i] + progress * speeds[i], bases[i]),
        100
      );
      fill.style.width = `${progress}%`;
      handle.style.left = `calc(${progress}% - 10px)`;
    } else {
      fill.style.width = `${bases[i]}%`;
      handle.style.left = `calc(${bases[i]}% - 10px)`;
    }
  });

  requestAnimationFrame(updateBars);
}

requestAnimationFrame(updateBars);

const fadeSection = document.querySelector(".image-fade-section");
const leftImg = document.querySelector(".fade-image.left");
const rightImg = document.querySelector(".fade-image.right");

function handleFade() {
  const rect = fadeSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const start = windowHeight * 0.7;
  const end = windowHeight * 0.05;

  let progress =
    (windowHeight - rect.top - start) / (windowHeight - start - end);
  progress = Math.max(0, Math.min(progress * 1.8, 1));

  const leftOpacity = 1 - 0.85 * progress;
  const rightOpacity = 0.15 + 0.85 * progress;

  leftImg.style.opacity = leftOpacity;
  rightImg.style.opacity = rightOpacity;

  requestAnimationFrame(handleFade);
}

requestAnimationFrame(handleFade);

const choices = document.querySelectorAll(".choice-box");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.classList.contains("clicked")) return;
    choices.forEach((c) => {
      if (c !== choice) {
        c.classList.remove("clicked");
      }
    });
    choice.classList.add("clicked");
    document.querySelectorAll(".popup-text").forEach((el) => el.remove());
    const popup = document.createElement("div");
    popup.classList.add("popup-text");

    if (choice.classList.contains("snill")) {
      popup.textContent = "+1 venn";

      const helpSound = new Audio("filer/help.mp3");
      helpSound.volume = 0.15;
      helpSound.play();
    } else {
      popup.textContent = "+10 mynter";

      const robSound = new Audio("filer/rob.mp3");
      robSound.volume = 0.2;
      robSound.play();
    }

    choice.appendChild(popup);

    setTimeout(() => popup.remove(), 1200);
  });
});

const healthSection = document.querySelector(".health-section");
const healthBar = document.querySelector(".health-bar");
let ticking = false;

function updateHealth() {
  const rect = healthSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const visible = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
      1
    );
    let scale = 1 - visible;
    if (scale < 0.1) scale = 0.1;
    healthBar.style.transform = `scaleX(${scale})`;
  } else if (rect.top >= windowHeight) {
    healthBar.style.transform = "scaleX(1)";
  } else if (rect.bottom <= 0) {
    healthBar.style.transform = "scaleX(0.1)";
  }
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHealth);
    ticking = true;
  }
});

window.addEventListener("load", updateHealth);

const ballContainer = document.querySelector(".ball-container");
const balls = [];
const totalBalls = 10;

for (let i = 0; i < totalBalls; i++) {
  const angle = (Math.PI * 2 * i) / totalBalls;
  const radius = 120 + Math.random() * 40;
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;

  const clusterX = Math.random() * 60 - 30;
  const clusterY = Math.random() * 60 - 30;

  const hole = document.createElement("div");
  hole.classList.add("pixel-hole");
  hole.style.transform = `translate(${startX}px, ${startY}px)`;
  ballContainer.appendChild(hole);

  const ball = document.createElement("div");
  ball.classList.add("pixel-ball");
  ball.style.transform = `translate(${startX}px, ${startY}px)`;
  ball.dataset.startX = startX;
  ball.dataset.startY = startY;
  ball.dataset.clusterX = clusterX;
  ball.dataset.clusterY = clusterY;

  const delay = Math.random() * 0.3;
  ball.dataset.delay = delay;

  ballContainer.appendChild(ball);
  balls.push({ el: ball, x: startX, y: startY, delay });
}

function updateBalls(time) {
  const rect = ballContainer.getBoundingClientRect();
  const winH = window.innerHeight;
  const offset = 0.07;
  const visible = Math.min(
    Math.max((winH - rect.top) / (winH + rect.height) - offset, 0),
    1
  );

  balls.forEach((ball) => {
    const el = ball.el;
    const startX = parseFloat(el.dataset.startX);
    const startY = parseFloat(el.dataset.startY);
    const clusterX = parseFloat(el.dataset.clusterX);
    const clusterY = parseFloat(el.dataset.clusterY);

    const adjustedVisible = Math.max(0, visible - ball.delay);
    const smoothVisible = Math.min(adjustedVisible / (1 - ball.delay), 1);

    ball.targetX = startX + (clusterX - startX) * smoothVisible;
    ball.targetY = startY + (clusterY - startY) * smoothVisible;
  });

  for (let iter = 0; iter < 3; iter++) {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const b1 = balls[i];
        const b2 = balls[j];
        const dx = b2.targetX - b1.targetX;
        const dy = b2.targetY - b1.targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 32;

        if (dist < minDist && dist > 0.001) {
          const push = (minDist - dist) / 2;
          const angle = Math.atan2(dy, dx);
          const offsetX = Math.cos(angle) * push;
          const offsetY = Math.sin(angle) * push;

          b1.targetX -= offsetX;
          b1.targetY -= offsetY;
          b2.targetX += offsetX;
          b2.targetY += offsetY;
        }
      }
    }
  }

  balls.forEach((ball) => {
    ball.x += (ball.targetX - ball.x) * 0.9;
    ball.y += (ball.targetY - ball.y) * 0.9;
    const pixelX = Math.round(ball.x);
    const pixelY = Math.round(ball.y);
    ball.el.style.transform = `translate(${pixelX}px, ${pixelY}px)`;
  });

  requestAnimationFrame(updateBalls);
}

updateBalls();


const bluePixelGrid = document.querySelector(".blue-pixel-grid");

if (bluePixelGrid) {
  const isMobile = window.innerWidth <= 768;
  const cols = isMobile ? 20 : 40;
  const rows = isMobile ? 5 : 6;

  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pixel-cell");
    bluePixelGrid.appendChild(cell);
  }

  const cells = bluePixelGrid.querySelectorAll(".pixel-cell");
  let activated = false;

  function activatePixels() {
    if (activated) return;
    activated = true;
    bluePixelGrid.classList.add("active");

    cells.forEach((cell, i) => {
      const row = Math.floor(i / cols);
      const random = Math.random();
      let chance;

      if (row <= 1) chance = 0.9;
      else if (row === 2) chance = 0.75;
      else if (row === 3) chance = 0.55;
      else if (row === 4) chance = 0.3;
      else chance = isMobile ? 0.1 : 0.05;

      if (random < chance) {
        const delay = Math.random() * 600;
        setTimeout(() => {
          cell.style.backgroundColor = "#263E5E";
          cell.style.opacity = "1";
        }, delay);
      }
    });
  }

  function resetPixels() {
    if (!activated) return;
    activated = false;
    bluePixelGrid.classList.remove("active");

    cells.forEach((cell, i) => {
      const delay = Math.random() * 600;
      setTimeout(() => {
        cell.style.backgroundColor = "transparent";
        cell.style.opacity = "0";
      }, delay);
    });
  }

  function checkPixelTrigger() {
    const rect = bluePixelGrid.getBoundingClientRect();
    const triggerDown = window.innerHeight * 0.6;
    const triggerUp = window.innerHeight * 0.99;

    if (rect.top < triggerDown && !activated) {
      activatePixels();
    } else if (rect.top > triggerUp && activated) {
      resetPixels();
    }
  }

  window.addEventListener("scroll", checkPixelTrigger, { passive: true });
  window.addEventListener("load", checkPixelTrigger);
}

const pcSectionRev = document.querySelector(".pc-section-reverse");

function handlePCReverseScroll() {
  const rect = pcSectionRev.getBoundingClientRect();
  const scrolledPast = rect.top < window.innerHeight * 0.4;

  if (scrolledPast) {
    pcSectionRev.classList.add("off");
  } else {
    pcSectionRev.classList.remove("off");
  }
}

window.addEventListener("scroll", handlePCReverseScroll, { passive: true });
window.addEventListener("load", handlePCReverseScroll);

function updateParallax8() {
  const fg = document.querySelector(".fg-image8");
  const container = document.querySelector(".image-container8");
  if (!fg || !container) return;

  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
  progress = Math.max(0, Math.min(progress, 1));

  const eased = Math.min(progress / 0.75, 1);

  const maxMove = 10;
  const minMove = -5;
  const move = maxMove - eased * 18;

  fg.style.transform = `translate(-50%, ${move}%)`;
}

window.addEventListener("scroll", updateParallax8, { passive: true });
window.addEventListener("load", updateParallax8);
window.addEventListener("resize", updateParallax8);

const pixelGrid8 = document.querySelector(".pixel-grid8");
if (pixelGrid8) {
  const isMobile = window.innerWidth <= 768;
  const cols = isMobile ? 20 : 40;
  const rows = isMobile ? 5 : 6;

  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pixel-cell8");
    pixelGrid8.appendChild(cell);
  }

  const cells = document.querySelectorAll(".pixel-cell8");
  let hasActivated = false;

  function showPixels8() {
    const rect = pixelGrid8.getBoundingClientRect();
    const triggerPoint = isMobile ? 0.7 : 0.9;

    if (rect.bottom < window.innerHeight * triggerPoint && !hasActivated) {
      hasActivated = true;
      cells.forEach((cell, i) => {
        const row = Math.floor(i / cols);
        const random = Math.random();
        let chance;

        if (row <= 1) chance = 0.9;
        else if (row === 2) chance = 0.75;
        else if (row === 3) chance = 0.55;
        else if (row === 4) chance = 0.3;
        else chance = isMobile ? 0.1 : 0.05;

        if (random < chance) {
          const delay = Math.random() * 600;
          setTimeout(() => {
            cell.style.backgroundColor = "#1B2232";
            cell.style.opacity = "1";
          }, delay);
        }
      });
    }

    if (rect.bottom > window.innerHeight * 0.99 && hasActivated) {
      hasActivated = false;
      cells.forEach((cell) => {
        cell.style.backgroundColor = "transparent";
        cell.style.opacity = "0";
      });
    }
  }

  window.addEventListener("scroll", showPixels8, { passive: true });
  window.addEventListener("load", showPixels8);
  window.addEventListener("resize", showPixels8);
}

const pixelGridTop8 = document.querySelector(".pixel-grid8-top");

if (pixelGridTop8) {
  const isMobile = window.innerWidth <= 768;
  const cols = isMobile ? 20 : 40;
  const rows = isMobile ? 5 : 6;

  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pixel-cell");
    pixelGridTop8.appendChild(cell);
  }

  const cells = pixelGridTop8.querySelectorAll(".pixel-cell");
  let activated = false;

  function activateTopPixels() {
    if (activated) return;
    activated = true;

    cells.forEach((cell, i) => {
      const row = Math.floor(i / cols);
      const random = Math.random();
      let chance;

      if (row >= rows - 1) chance = 0.9;
      else if (row === rows - 2) chance = 0.75;
      else if (row === rows - 3) chance = 0.55;
      else if (row === rows - 4) chance = 0.3;
      else chance = isMobile ? 0.1 : 0.05;

      if (random < chance) {
        const delay = Math.random() * 600;
        setTimeout(() => {
          cell.style.backgroundColor = "#1B2232";
          cell.style.opacity = "1";
        }, delay);
      }
    });
  }

  function resetTopPixels() {
    if (!activated) return;
    activated = false;
    cells.forEach((cell) => {
      cell.style.backgroundColor = "transparent";
      cell.style.opacity = "0";
    });
  }

  function checkTopPixelTrigger() {
    const rect = pixelGridTop8.getBoundingClientRect();
    const triggerDown = window.innerHeight * 0.4;
    const triggerUp = window.innerHeight * 0.99;

    if (rect.top < triggerDown && !activated) {
      activateTopPixels();
    } else if (rect.top > triggerUp && activated) {
      resetTopPixels();
    }
  }

  window.addEventListener("scroll", checkTopPixelTrigger, { passive: true });
}

const pixelGrid9Top = document.querySelector(".pixel-grid9-top");

if (pixelGrid9Top) {
  const isMobile = window.innerWidth <= 768;
  const cols = isMobile ? 20 : 40;
  const rows = isMobile ? 5 : 6;

  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pixel-cell9");
    cell.style.backgroundColor = "transparent";
    cell.style.opacity = "0";
    pixelGrid9Top.appendChild(cell);
  }

  const cells = pixelGrid9Top.querySelectorAll(".pixel-cell9");
  let activated = false;

  function activatePixels9Top() {
    if (activated) return;
    activated = true;

    cells.forEach((cell, i) => {
      const row = Math.floor(i / cols);
      const random = Math.random();
      let chance;

      if (row >= rows - 1) chance = 0.9;
      else if (row === rows - 2) chance = 0.75;
      else if (row === rows - 3) chance = 0.55;
      else if (row === rows - 4) chance = 0.3;
      else chance = isMobile ? 0.1 : 0.05;

      if (random < chance) {
        const delay = Math.random() * 600 + 150;
        setTimeout(() => {
          cell.style.backgroundColor = "#1B2232";
          cell.style.opacity = "1";
        }, delay);
      }
    });
  }

  function resetPixels9Top() {
    if (!activated) return;
    activated = false;
    cells.forEach((cell) => {
      cell.style.backgroundColor = "transparent";
      cell.style.opacity = "0";
    });
  }

  function checkPixels9Top() {
    const rect = pixelGrid9Top.getBoundingClientRect();
    const triggerDown = window.innerHeight * 0.8;
    const triggerUp = window.innerHeight * 0.99;

    if (rect.top < triggerDown && !activated) {
      activatePixels9Top();
    } else if (rect.top > triggerUp && activated) {
      resetPixels9Top();
    }
  }

  window.addEventListener("load", () => {
    resetPixels9Top();
    setTimeout(checkPixels9Top, 400);
  });
  window.addEventListener("scroll", checkPixels9Top, { passive: true });
}

const topGrid = document.querySelector(".top-pixel-grid");

function buildTopGrid() {
  if (!topGrid) return;
  const isMobile = window.innerWidth <= 768;
  const cell = isMobile ? 22 : 28;
  const rows = isMobile ? 5 : 5;

  topGrid.style.setProperty("--cell", `${cell}px`);

  const cols = Math.ceil(topGrid.clientWidth / cell);

  topGrid.style.gridTemplateColumns = `repeat(${cols}, ${cell}px)`;

  topGrid.innerHTML = "";
  for (let i = 0; i < cols * rows; i++) {
    const cellDiv = document.createElement("div");
    cellDiv.className = "pixel-cell";
    topGrid.appendChild(cellDiv);
  }
}

function activateTopPixels() {
  if (!topGrid) return;
  const cells = topGrid.querySelectorAll(".pixel-cell");
  topGrid.classList.add("active");

  const isMobile = window.innerWidth <= 768;
  const cols = parseInt(
    getComputedStyle(topGrid).gridTemplateColumns.split(" ").length,
    10
  );

  cells.forEach((cell, i) => {
    const row = Math.floor(i / cols);
    const r = Math.random();
    let chance;
    if (row <= 1) chance = 0.9;
    else if (row === 2) chance = 0.75;
    else if (row === 3) chance = 0.55;
    else if (row === 4) chance = 0.3;
    else chance = isMobile ? 0.1 : 0.05;

    if (r < chance) {
      const delay = Math.random() * 600;
      setTimeout(() => {
        cell.style.backgroundColor = "#1B2232";
        cell.style.opacity = "1";
      }, delay);
    }
  });
}

function resetTopPixels() {
  if (!topGrid) return;
  topGrid.classList.remove("active");
  topGrid.querySelectorAll(".pixel-cell").forEach((cell) => {
    cell.style.backgroundColor = "transparent";
    cell.style.opacity = "0";
  });
}

function checkTopGridTrigger() {
  if (!topGrid) return;
  const rect = topGrid.getBoundingClientRect();
  const triggerDown = window.innerHeight * 0.75;
  const triggerUp = window.innerHeight * 0.99;

  const activated = topGrid.classList.contains("active");

  if (rect.top < triggerDown && !activated) {
    activateTopPixels();
  } else if (rect.top > triggerUp && activated) {
    resetTopPixels();
  }
}

let resizeTimer;
window.addEventListener("load", () => {
  buildTopGrid();
  checkTopGridTrigger();
});
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    buildTopGrid();
    setTimeout(checkTopGridTrigger, 50);
  }, 100);
});
window.addEventListener("scroll", checkTopGridTrigger, { passive: true });
