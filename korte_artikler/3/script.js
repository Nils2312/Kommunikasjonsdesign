const soundBtn = document.getElementById('enableSound');
const soundIcon = soundBtn.querySelector('.sound-icon');
const soundText = soundBtn.querySelector('.sound-text');
const allAudios = document.querySelectorAll('audio');
const toggleSound = document.getElementById('toggleSound'); 

let soundEnabled = false;
allAudios.forEach(a => a.muted = true);
soundBtn.classList.remove('active');
soundIcon.src = 'filer/off.png';
soundIcon.alt = 'Lyd av';
soundText.textContent = 'Lyd av';

soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  allAudios.forEach(a => a.muted = !soundEnabled);

  if (soundEnabled) {
    soundBtn.classList.add('active');
    soundIcon.src = 'filer/on.png';
    soundIcon.alt = 'Lyd på';
    soundText.textContent = 'Lyd på';
    toggleSound.currentTime = 0;
    toggleSound.muted = false; 
    toggleSound.play();
  } else {
    soundBtn.classList.remove('active');
    soundIcon.src = 'filer/off.png';
    soundIcon.alt = 'Lyd av';
    soundText.textContent = 'Lyd av';
  }
});

const soundToggle = document.querySelector('.sound-toggle');
const soundObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      soundToggle.classList.add('visible');
      soundObserver.unobserve(soundToggle);
    }
  });
}, { threshold: 0.5 });

soundObserver.observe(soundToggle);

const messages = document.querySelectorAll(".message");
const intro = document.querySelector(".intro");

messages.forEach((msg, i) => {
  setTimeout(() => {
    msg.classList.add("visible");
  }, i * 1100);
});

window.addEventListener("scroll", () => {
  const rect = intro.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    intro.classList.add("visible");
  }
});

const notification = document.querySelector(".notification");
const notifSound = document.getElementById("notif-sound");

window.addEventListener("scroll", () => {
  const rect = notification.getBoundingClientRect();
  if (rect.top < window.innerHeight - 300 && !notification.classList.contains("visible")) {
    notification.classList.add("visible");
    notifSound.currentTime = 0;
    notifSound.play().catch(() => {}); 
  }
});

document.querySelectorAll(".image-wrapper").forEach(wrapper => {
  wrapper.addEventListener("click", () => {
    const icon = wrapper.querySelector(".icon");
    wrapper.classList.toggle("enlarged");
    icon.textContent = wrapper.classList.contains("enlarged") ? "−" : "+";
  });
});

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  const video = wrapper.querySelector('.chat-video');
  const overlay = wrapper.querySelector('.video-overlay');

  wrapper.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      overlay.style.opacity = '0';
    } else {
      video.pause();
      overlay.style.opacity = '1';
    }
  });

  video.addEventListener('ended', () => {
    overlay.style.opacity = '1';
  });
});

const chatSection = document.querySelector('.chat-group');
const chatMessages = document.querySelectorAll('.chat-msg'); 

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      chatSection.classList.add('visible');
      chatMessages.forEach((msg, index) => {
        setTimeout(() => {
          msg.classList.add('visible');
        }, index * 120); 
      });

      observer.unobserve(chatSection); 
    }
  });
}, { threshold: 0.15 });

observer.observe(chatSection);

const storyText = document.querySelector('.story-text');

const storyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      storyText.classList.add('visible');
      storyObserver.unobserve(storyText);
    }
  });
}, { threshold: 0.45 });

storyObserver.observe(storyText);

const notification2 = document.querySelector('.notification-section.second');
const notifSound2 = document.getElementById('notifSound2');
let notification2Shown = false;

const notificationObserver2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification2Shown) {
      notification2Shown = true;
      notification2.classList.add('visible');
      notifSound2.currentTime = 0;
      notifSound2.play();
      notificationObserver2.unobserve(notification2);
    }
  });
}, {
  threshold: 0.85,           
  rootMargin: "0px 0px -200px 0px" 
});

notificationObserver2.observe(notification2);

const gradeSection = document.querySelector('.grade-section');

const showGradeSection = () => {
  if (!gradeSection.classList.contains('visible') && notification2Shown) {
    gradeSection.classList.add('visible');
  }
};

const gradeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && notification2Shown) {
      showGradeSection();
      gradeObserver.unobserve(gradeSection);
    }
  });
}, { threshold: 0.7 });

gradeObserver.observe(gradeSection);

window.addEventListener('load', () => {
  const rect = gradeSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && notification2Shown) {
    showGradeSection();
  }
});

const storyText2 = document.querySelector('.story-text.second');

const storyObserver2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      storyText2.classList.add('visible');
      storyObserver2.unobserve(storyText2);
    }
  });
}, { threshold: 0.45 });

storyObserver2.observe(storyText2);

const notification3 = document.querySelector('.notification-section.third');
const notifSound3 = document.getElementById('notifSound3');
let notification3Shown = false;

const notificationObserver3 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification3Shown) {
      notification3Shown = true;
      notification3.classList.add('visible');
      notifSound3.currentTime = 0;
      notifSound3.play();
      notificationObserver3.unobserve(notification3);
    }
  });
}, {
  threshold: 0.9,              
  rootMargin: "0px 0px -200px 0px" 
});

notificationObserver3.observe(notification3);

const momSection = document.querySelector('.mom-section');
const momMsgs = document.querySelectorAll('.mom-message');

const momSectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      momMsgs.forEach((msg, i) => {
        setTimeout(() => {
          msg.classList.add('visible');
        }, i * 120);
      });
      momSectionObserver.unobserve(momSection);
    }
  });
}, { threshold: 0.3 });

momSectionObserver.observe(momSection);

const notification4 = document.querySelector('.notification-section.fourth');
const notifSound4 = document.getElementById('notifSound4');
let notification4Shown = false;

const notificationObserver4 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification4Shown) {
      notification4Shown = true;
      notification4.classList.add('visible');
      notifSound4.currentTime = 0;
      notifSound4.play();
      notificationObserver4.unobserve(notification4);
    }
  });
}, {
  threshold: 0.9,              
  rootMargin: "0px 0px -200px 0px" 
});

notificationObserver4.observe(notification4);

const dadSection = document.querySelector('.dad-section');
const dadMessages = dadSection.querySelectorAll('.dad-message');

const dadObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      dadMessages.forEach((msg, i) => {
        setTimeout(() => {
          msg.classList.add('visible');
        }, i * 120); 
      });
      dadObserver.unobserve(dadSection);
    }
  });
}, { threshold: 0.3 });

dadObserver.observe(dadSection);

const storyText3 = document.querySelector('.story-text.third');

const storyObserver3 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      storyText3.classList.add('visible');
      storyObserver3.unobserve(storyText3);
    }
  });
}, { threshold: 0.45 });

storyObserver3.observe(storyText3);

const snapSection = document.querySelector('.snapchat-section');
const snapMessages = document.querySelectorAll('.snap-msg');

const snapObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      snapSection.classList.add('visible');

      snapMessages.forEach((msg, i) => {
        setTimeout(() => {
          msg.classList.add('visible');
        }, i * 120); 
      });

      snapObserver.unobserve(snapSection);
    }
  });
}, { threshold: 0.2 });

snapObserver.observe(snapSection);

const storyText4 = document.querySelector('.story-text.fourth');

const storyObserver4 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      storyText4.classList.add('visible');
      storyObserver4.unobserve(storyText4);
    }
  });
}, { threshold: 0.45 });

storyObserver4.observe(storyText4);

const gallery = document.querySelector('.gallery-section');
const track = gallery.querySelector('.track');
const slides = Array.from(gallery.querySelectorAll('.slide'));
const prevBtn = gallery.querySelector('.nav.prev');
const nextBtn = gallery.querySelector('.nav.next');
const dots = Array.from(gallery.querySelectorAll('.dot'));

let index = 0;
const slideWidth = () => gallery.querySelector('.viewport').clientWidth;

function updateCarousel() {
  track.style.transform = `translateX(-${index * slideWidth()}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function goTo(i) {
  if (i < 0) index = slides.length - 1; 
  else if (i >= slides.length) index = 0; 
  else index = i;
  updateCarousel();
}

prevBtn.addEventListener('click', () => goTo(index - 1));
nextBtn.addEventListener('click', () => goTo(index + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

window.addEventListener('resize', updateCarousel);

let startX = 0;
let isDragging = false;
let dx = 0;

function startDrag(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  track.style.transition = 'none';
}

function moveDrag(e) {
  if (!isDragging) return;
  const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  dx = x - startX;
  track.style.transform = `translateX(${-index * slideWidth() + dx}px)`;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  track.style.transition = 'transform 0.4s ease';
  const threshold = slideWidth() * 0.2;
  if (dx > threshold) goTo(index - 1);
  else if (dx < -threshold) goTo(index + 1);
  else updateCarousel();
  dx = 0;
}

track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', moveDrag);
track.addEventListener('mouseup', endDrag);
track.addEventListener('mouseleave', endDrag);
track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', moveDrag);
track.addEventListener('touchend', endDrag);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(index - 1);
  if (e.key === 'ArrowRight') goTo(index + 1);
});

const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gallery.classList.add('visible');
      galleryObserver.unobserve(gallery);
    }
  });
}, { threshold: 0.25 });

galleryObserver.observe(gallery);
updateCarousel();

const captions = Array.from(document.querySelectorAll('.caption'));

function updateCaptions() {
  captions.forEach((cap, i) => cap.classList.toggle('active', i === index));
}

const oldUpdate = updateCarousel;
updateCarousel = function () {
  oldUpdate();
  updateCaptions();
};

updateCaptions();

const storyText5 = document.querySelector('.story-text.fifth');

const storyObserver5 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      storyText5.classList.add('visible');
      storyObserver5.unobserve(storyText5);
    }
  });
}, { threshold: 0.45 });

storyObserver5.observe(storyText5);

const notification5 = document.querySelector('.notification-section.fifth');
const notifSound5 = document.getElementById('notifSound5');
let notification5Shown = false;

const notificationObserver5 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification5Shown) {
      notification5Shown = true;
      notification5.classList.add('visible');
      notifSound5.currentTime = 0;
      notifSound5.play();
      notificationObserver5.unobserve(notification5);
    }
  });
}, {
  threshold: 0.9,               
  rootMargin: "0px 0px -200px 0px" 
});

notificationObserver5.observe(notification5);

const chatSection2 = document.querySelector('.chat-group.second');
const chatMessages2 = chatSection2.querySelectorAll('.chat-msg');

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      chatSection2.classList.add('visible');
      chatMessages2.forEach((msg, i) => {
        setTimeout(() => msg.classList.add('visible'), i * 120);
      });
      observer2.unobserve(chatSection2);
    }
  });
}, { threshold: 0.15 });

observer2.observe(chatSection2);

const storyText6 = document.querySelector('.story-text.sixth');
let storyText6Shown = false;

const storyObserver6 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !storyText6Shown) {
      storyText6Shown = true;
      setTimeout(() => {
        storyText6.classList.add('visible');
      }, 400); 
      storyObserver6.unobserve(storyText6);
    }
  });
}, { threshold: 0.45 });

storyObserver6.observe(storyText6);

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const rewind = document.getElementById('rewind');
const forward = document.getElementById('forward');
const volumeBar = document.getElementById('volume-bar');
const volDown = document.getElementById('vol-down');
const volUp = document.getElementById('vol-up');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.src = 'filer/pause.png';
  } else {
    audio.pause();
    playPauseBtn.src = 'filer/play.png';
  }
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

rewind.addEventListener('click', () => {
  audio.currentTime = 0;
});

forward.addEventListener('click', () => {
  audio.currentTime = audio.duration - 5;
});

volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.background = `linear-gradient(to right, #8F8E94 ${percent}%, #ccc ${percent}%)`;
});

volumeBar.addEventListener('input', () => {
  const val = volumeBar.value;
  volumeBar.style.background = `linear-gradient(to right, #8F8E94 ${val}%, #ccc ${val}%)`;
});

const musicSection = document.querySelector('.music-section');
const musicObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      musicSection.classList.add('visible');
      musicObserver.unobserve(musicSection);
    }
  });
}, { threshold: 0.3 });

musicObserver.observe(musicSection);

const story7 = document.querySelector('.story-text.seventh');
let story7Shown = false;

const storyObserver7 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story7Shown) {
      story7.classList.add('visible');
      story7Shown = true;
      storyObserver7.unobserve(story7);
    }
  });
}, { threshold: 0.45 });

storyObserver7.observe(story7);

const notification6 = document.querySelector('.notification-section.sixth');
const notifSound6 = document.getElementById('notifSound6');
let notification6Shown = false;

const notificationObserver6 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification6Shown) {
      notification6Shown = true;
      notification6.classList.add('visible');
      notifSound6.currentTime = 0;
      notifSound6.play();
      notificationObserver6.unobserve(notification6);
    }
  });
}, {
  threshold: 0.9,
  rootMargin: "0px 0px -200px 0px"
});

notificationObserver6.observe(notification6);

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  for (const el of reveals) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 400) {
      el.classList.add("active");
    }
  }
});

const story8 = document.querySelector('.story-text.eighth');
let story8Shown = false;

const storyObserver8 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story8Shown) {
      story8.classList.add('visible');
      story8Shown = true;
      storyObserver8.unobserve(story8);
    }
  });
}, { threshold: 0.45 });

storyObserver8.observe(story8);

const notification7 = document.querySelector('.notification-section.seventh');
const notifSound7 = document.getElementById('notifSound7');
let notification7Shown = false;

const notificationObserver7 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification7Shown) {
      notification7Shown = true;
      notification7.classList.add('visible');
      notifSound7.currentTime = 0;
      notifSound7.play();
      notificationObserver7.unobserve(notification7);
    }
  });
}, {
  threshold: 0.9,
  rootMargin: "0px 0px -200px 0px"
});

notificationObserver7.observe(notification7);

const chat3Section = document.querySelector('.chat-group-3');
const chat3Messages = chat3Section ? chat3Section.querySelectorAll('.chat-msg-3') : [];
const chat3Date = chat3Section ? chat3Section.querySelector('.chat-date-3') : null;
let chat3Shown = false;

if (chat3Section) {
  const chatObserver3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chat3Shown) {
        chat3Shown = true;
        if (chat3Date) chat3Date.classList.add('visible');
        chat3Messages.forEach((m, i) => {
          setTimeout(() => m.classList.add('visible'), 200 + i * 120);
        });

        chatObserver3.unobserve(chat3Section);
      }
    });
  }, { threshold: 0.45 });

  chatObserver3.observe(chat3Section);
}

const story9 = document.querySelector('.story-text.ninth');
let story9Shown = false;

const storyObserver9 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story9Shown) {
      story9.classList.add('visible');
      story9Shown = true;
      storyObserver9.unobserve(story9);
    }
  });
}, { threshold: 0.25 });

storyObserver9.observe(story9);

const notification8 = document.querySelector('.notification-section.eighth');
const notifSound8 = document.getElementById('notifSound8');
let notification8Shown = false;

const notificationObserver8 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification8Shown) {
      notification8Shown = true;
      notification8.classList.add('visible');
      notifSound8.currentTime = 0;
      notifSound8.play();
      notificationObserver8.unobserve(notification8);
    }
  });
}, {
  threshold: 0.9,               
  rootMargin: "0px 0px -200px 0px" 
});

notificationObserver8.observe(notification8);

const story10 = document.querySelector('.story-text.tenth');
let story10Shown = false;

const storyObserver10 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story10Shown) {
      story10.classList.add('visible');
      story10Shown = true;
      storyObserver10.unobserve(story10);
    }
  });
}, { threshold: 0.45 });

storyObserver10.observe(story10);

const notification9 = document.querySelector('.notification-section.ninth');
const notifSound9 = document.getElementById('notifSound9');
let notification9Shown = false;

const notificationObserver9 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !notification9Shown) {
      notification9Shown = true;
      notification9.classList.add('visible');
      notifSound9.currentTime = 0;
      notifSound9.play();
      notificationObserver9.unobserve(notification9);
    }
  });
}, {
  threshold: 0.9,               
  rootMargin: "0px 0px -200px 0px" 
});

notificationObserver9.observe(notification9);

const snapSection2 = document.querySelector('.snapchat-section.second');
const snapMessages2 = snapSection2.querySelectorAll('.snap-msg');

const snapObserver2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      snapSection2.classList.add('visible');

      snapMessages2.forEach((msg, i) => {
        setTimeout(() => {
          msg.classList.add('visible');
        }, i * 120); 
      });

      snapObserver2.unobserve(snapSection2);
    }
  });
}, { threshold: 0.5 });

snapObserver2.observe(snapSection2);

const story11 = document.querySelector('.story-text.eleventh');
let story11Shown = false;

const storyObserver11 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story11Shown) {
      story11.classList.add('visible');
      story11Shown = true;
      storyObserver11.unobserve(story11);
    }
  });
}, { threshold: 0.45 });

storyObserver11.observe(story11);

const strekSection = document.querySelector('.strek-section');

const strekObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      strekSection.classList.add('visible');
      strekObserver.unobserve(strekSection);
    }
  });
}, { threshold: 0.5 });

strekObserver.observe(strekSection);

const story12 = document.querySelector('.story-text.twelfth');
let story12Shown = false;

const storyObserver12 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story12Shown) {
      story12.classList.add('visible');
      story12Shown = true;
      storyObserver12.unobserve(story12);
    }
  });
}, { threshold: 0.25 });

storyObserver12.observe(story12);

const strek2Section = document.querySelector('.strek2-section');

const strek2Observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      strek2Section.classList.add('visible');
      strek2Observer.unobserve(strek2Section);
    }
  });
}, { threshold: 0.5 });

strek2Observer.observe(strek2Section);

const story13 = document.querySelector('.story-text.thirteenth');
let story13Shown = false;

const storyObserver13 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !story13Shown) {
      story13.classList.add('visible');
      story13Shown = true;
      storyObserver13.unobserve(story13);
    }
  });
}, { threshold: 0.15 });

storyObserver13.observe(story13);

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