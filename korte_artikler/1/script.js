document.addEventListener("DOMContentLoaded", () => {
  const sequence = document.getElementById("introSequence");
  if (!sequence) return;

  const frames = sequence.querySelectorAll(".frame");
  const frameCount = frames.length;

  frames.forEach(f => (f.style.opacity = 0));
  frames[0].style.opacity = 1;

  function showFrame(index) {
    frames.forEach(f => (f.style.opacity = 0));
    if (index >= 0 && index < frameCount) {
      frames[index].style.opacity = 1;
    }
  }

  function updateFrames() {
    const scrollTop = window.scrollY;

    const speed = 50;

    let index = Math.floor(scrollTop / speed);

    if (index < 0) index = 0;
    if (index >= frameCount) index = frameCount - 1;

    showFrame(index);
  }

  window.addEventListener("scroll", updateFrames);
  updateFrames();
});

document.addEventListener("DOMContentLoaded", () => {
  function createDots(gridId, totalDots, litCount) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      grid.appendChild(dot);
    }

    const dots = grid.querySelectorAll(".dot");

    if (litCount > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let lit = 0;
            const interval = setInterval(() => {
              if (lit >= litCount) {
                clearInterval(interval);
                return;
              }
              dots[lit].classList.add("lit");
              lit++;
            }, 80);
          }
        });
      }, { threshold: 0.9 });

      observer.observe(grid);
    }
  }

  createDots("dotsGrid1", 56, 6);
  createDots("dotsGrid2", 56, 16);
  createDots("dotsGrid3", 56, 11);
  createDots("dotsGrid4", 56, 0);

  gsap.registerPlugin(ScrollTrigger);

  const fallDots = gsap.utils.toArray("#dotsGrid4 .dot");

  const chosenDots = fallDots.filter(() => Math.random() < 0.4);

  chosenDots.forEach((dot, i) => {
    gsap.fromTo(dot,
      { y: 0, rotation: 0 },
      {
        scrollTrigger: {
          trigger: ".fall-section",
          start: "top center+=-100",
          toggleActions: "play none none none"
        },
        y: 950,
        x: () => (Math.random() - 0.5) * 200,
        rotation: () => (Math.random() - 0.5) * 60,
        ease: "bounce.out",
        duration: () => 1.8 + Math.random() * 1.2,
        delay: () => i * 0.05
      }
    );
  });
});

gsap.registerPlugin(ScrollTrigger);

const stackTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".stack-section",
    start: "top 80%",
    end: "bottom center",
    scrub: true,
  }
});

gsap.utils.toArray(".stack-container img").forEach((img, i) => {
  stackTl.to(img, {
    opacity: 1,
    scale: 1,
    duration: 0.1,
    ease: "back.out(2)"
  }, i * 0.2);
});

const growthSection = document.querySelector('.growth-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      growthSection.classList.add('in-view');
    }
  });
}, { threshold: 0.7 });

observer.observe(growthSection);

document.addEventListener("DOMContentLoaded", () => {
  const graphs = document.querySelectorAll(".graph-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });

  graphs.forEach(graph => observer.observe(graph));
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("genderGrid");

  for (let i = 0; i < 50; i++) {
    const img = document.createElement("img");
    img.src = "filer/jente.png";
    img.classList.add("gender-symbol");
    grid.appendChild(img);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const symbols = grid.querySelectorAll(".gender-symbol");
        const selected = [...symbols].sort(() => 0.5 - Math.random()).slice(0, 10);

        selected.forEach((img, index) => {
          setTimeout(() => {
            img.src = "filer/gutt.png";
            img.classList.add("pop");
            setTimeout(() => img.classList.remove("pop"), 400);
          }, index * 150);
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.8 });

  observer.observe(grid);
});

document.addEventListener('click', (e) => {
  if (!e.target.matches('.expand-btn')) return;
  const box = e.target.closest('.expandable-box');
  if (!box) return;

  box.classList.toggle('open');
  const isOpen = box.classList.contains('open');
  e.target.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  e.target.textContent = isOpen ? 'Vis mindre' : 'Vis mer';
});

(() => {
  document.querySelectorAll('.faktaboks-seksjon').forEach(section => {
    const faktaboks = section.querySelector('.faktaboks');
    const btn = section.querySelector('.faktaboks-knapp');

    btn.addEventListener("click", () => {
      faktaboks.classList.toggle("åpen");
      btn.textContent = faktaboks.classList.contains("åpen")
        ? "Vis mindre"
        : "Vis mer";
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const bubbles = gsap.utils.toArray(".icon-bubble");

  gsap.fromTo(bubbles,
    {
      opacity: 0,
      scale: 0.6,
      y: -25
    },
    {
      scrollTrigger: {
        trigger: ".icon-pop-section",
        start: "top 60%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.25,
      ease: "back.out(2)"
    }
  );

  bubbles.forEach((bubble) => {
    gsap.to(bubble, {
      x: "+=8",
      y: "-=6",
      duration: 2 + Math.random() * 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  });
});

let lastScroll = 0;
let offsetX = 0;
let active = false;

window.addEventListener("scroll", () => {
  const shadow = document.querySelector(".shadow-img");
  const section = document.querySelector(".overlap-image");

  const rect = section.getBoundingClientRect();

  active = rect.top < window.innerHeight && rect.bottom > 0;

  if (!active) return;

  const current = window.scrollY;

  if (current > lastScroll) {
    offsetX += 0.23;
  }
  else {
    offsetX -= 0.23;
  }

  shadow.style.transform = `translateX(calc(-50% + ${offsetX}px))`;

  lastScroll = current;
});
