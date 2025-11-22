
const heroPrices = document.querySelectorAll(".price");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  heroPrices.forEach(price => {
    const base = parseFloat(price.getAttribute("data-base"));
    const speed = parseFloat(price.getAttribute("data-speed"));
    const mainSpan = price.querySelector(".main");
    const decimalSpan = price.querySelector(".decimal");

    let current = base + scrollPos * speed;

    let [whole, decimal] = current.toFixed(2).split(".");
    mainSpan.textContent = whole;
    decimalSpan.textContent = "," + decimal;
  });
});

function setupReceiptToggle() {
  const buttons = document.querySelectorAll(".receipt-toggle button");
  const prices = document.querySelectorAll(".receipt-price");

  let currentYear = 2015;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetYear = button.dataset.year;
      if (targetYear == currentYear) return;

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      prices.forEach(price => {
        const startValue = parseFloat(price.textContent.replace(",", "."));
        const endValue = parseFloat(price.dataset[targetYear]);

        let startTime = null;

        function animate(time) {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / 800, 1);
          const value = startValue + (endValue - startValue) * progress;

          price.textContent = value.toFixed(2).replace(".", ",") + " kr";

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      });

      currentYear = targetYear;
    });
  });

  buttons.forEach(btn => {
    if (btn.dataset.year == currentYear) btn.classList.add("active");
  });
}

setupReceiptToggle();

(() => {
  const BELOPSGRENSE = 200;

  const kurvListe = document.getElementById('kurvListe');
  const antallEl = document.querySelector('.handlekurv-antall');
  const totalEl = document.getElementById('totalBelop');
  const feilEl = document.querySelector('.handlekurv-feil');
  const forslagEl = document.querySelector('.forslag');

  const lydAdd = new Audio('filer/add.mp3');
  const lydRemove = new Audio('filer/remove.mp3');
  const lydError = new Audio('filer/error.mp3');

  function hentKurvElementer() {
    return Array.from(kurvListe.querySelectorAll('.rad'));
  }
  function hentSum() {
    return hentKurvElementer().reduce((sum, el) => sum + Number(el.dataset.belop), 0);
  }

  function animateNumber(el, start, end, duration = 400) {
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      el.textContent = `${value} kr`;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function oppdaterUI(prevSum) {
    const antall = hentKurvElementer().length;
    const sum = hentSum();

    antallEl.textContent = String(antall);
    animateNumber(totalEl, prevSum, sum);
  }

  function visFeil(melding) {
    feilEl.textContent = melding;
    feilEl.style.opacity = '1';

    lydError.currentTime = 0;
    lydError.play();

    const boks = document.querySelector('.handlekurv-boks');
    boks.classList.add('shake');
    setTimeout(() => boks.classList.remove('shake'), 400);

    setTimeout(() => {
      feilEl.style.opacity = '0';
      setTimeout(() => {
        feilEl.textContent = '';
      }, 600);
    }, 1800);
  }

  function leggTilIRad(rad) {
    const ny = rad.cloneNode(true);
    ny.classList.add('rad--kurv');

    const knapp = ny.querySelector('.knapp');
    knapp.textContent = 'Fjern';
    knapp.classList.remove('knapp--leggtil');
    knapp.classList.add('knapp--fjern');

    rad.remove();

    kurvListe.appendChild(ny);

    lydAdd.currentTime = 0;
    lydAdd.play();
  }

  function fjernFraKurv(rad) {
    const ny = rad.cloneNode(true);
    ny.classList.remove('rad--kurv');

    const knapp = ny.querySelector('.knapp');
    knapp.textContent = 'Legg til';
    knapp.classList.remove('knapp--fjern');
    knapp.classList.add('knapp--leggtil');

    rad.remove();

    forslagEl.appendChild(ny);

    lydRemove.currentTime = 0;
    lydRemove.play();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.knapp');
    if (!btn) return;
    const rad = btn.closest('.rad');
    const belop = Number(rad.dataset.belop);
    const prevSum = hentSum();

    if (btn.classList.contains('knapp--fjern')) {
      fjernFraKurv(rad);
      oppdaterUI(prevSum);
      return;
    }

    if (btn.classList.contains('knapp--leggtil')) {
      const nySum = hentSum() + belop;
      if (nySum > BELOPSGRENSE) {
        visFeil('Du har ikke råd!');
        return;
      }
      leggTilIRad(rad);
      oppdaterUI(prevSum);
    }
  });

  oppdaterUI(0);
})();

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.graph-section');
  if (!target) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add('in-view');
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.6 });

  io.observe(target);
});

(() => {
  const kurv = document.querySelector('.kurv-rull');
  const seksjon = document.querySelector('.kurv-seksjon');
  let animert = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animert) {
        animert = true;

        kurv.style.opacity = '0';

        void kurv.offsetWidth;

        kurv.style.opacity = '1';

        const seksjonBredde = seksjon.offsetWidth;
        const kurvBredde = kurv.offsetWidth;
        const sluttPos = seksjonBredde - kurvBredde;

        kurv.animate(
          [
            { transform: `translateX(0px)` },
            { transform: `translateX(${sluttPos}px)`, offset: 0.7 },
            { transform: `translateX(${sluttPos - 90}px)` }
          ],
          {
            duration: 4200,
            easing: 'cubic-bezier(0.6, 0, 0.3, 1)',
            fill: 'forwards'
          }
        );

        observer.disconnect();
      }
    });
  }, { threshold: 0.99 });

  observer.observe(seksjon);
})();

(() => {
  const section = document.querySelector('.kurv-stack-seksjon');
  const images = [...document.querySelectorAll('.kurv-bilde')];
  const total = images.length;

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      let progress = (windowHeight * 0.7 - rect.top) / (rect.height * 2.5);
      const clamped = Math.min(Math.max(progress, 0), 1);

      const frame = Math.floor(clamped * (total - 1));

      images.forEach((img, i) => {
        img.style.opacity = i < total - frame ? 1 : 0;
      });
    }
  }

  window.addEventListener('scroll', updateScroll);
  window.addEventListener('resize', updateScroll);
  updateScroll();
})();

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

(() => {
  const section = document.querySelector('.etikett-seksjon');
  const d1 = document.getElementById('etikett1');
  const d2 = document.getElementById('etikett2');
  const dec = document.getElementById('etikettDec');

  const startVals = { d1: 2, d2: 4, dec: 99 };

  function safeDigit(val) {
    return val === 1 ? 2 : val;
  }

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = (windowHeight * 0.8 - rect.top) / (rect.height * 1.8);
    const clamped = Math.min(Math.max(progress, 0), 1);

    if (clamped < 0.9) {
      d1.textContent = startVals.d1;
      d2.textContent = safeDigit(Math.floor(startVals.d2 + clamped * 10) % 10);
      dec.textContent = String(
        Math.floor(startVals.dec + clamped * 50) % 100
      ).padStart(2, '0');
    }
    else if (clamped < 0.95) {
      dec.textContent = "??";
      d2.textContent = "?";
      d1.textContent = startVals.d1;
    }
    else {
      dec.textContent = "??";
      d2.textContent = "?";
      d1.textContent = "?";
    }
  }

  window.addEventListener('scroll', updateScroll);
  window.addEventListener('resize', updateScroll);
  updateScroll();
})();

(() => {
  const section = document.querySelector('.kvittering-seksjon');
  const container = document.querySelector('.kvittering-container');
  const img = document.querySelector('.kvittering-bilde');

  let imgNaturalHeight = 0;

  function initHeight() {
    imgNaturalHeight = img.naturalHeight * (container.offsetWidth / img.naturalWidth);
    updateScroll();
  }

  function updateScroll() {
    if (!imgNaturalHeight) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    const clamped = Math.min(Math.max(progress, 0), 1.0);

    container.style.height = `${clamped * imgNaturalHeight}px`;
  }

  if (img.complete) {
    initHeight();
  } else {
    img.onload = initHeight;
  }

  window.addEventListener('scroll', updateScroll);
  window.addEventListener('resize', () => {
    initHeight();
    updateScroll();
  });
})();








