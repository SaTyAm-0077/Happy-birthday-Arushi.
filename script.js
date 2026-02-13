const btn = document.getElementById('openBtn');
const heart = document.getElementById('heart-burst');
const card = document.getElementById('birthdayCard');
const poemLines = document.querySelectorAll('.poem-line');
const floatContainer = document.getElementById('floating-container');
const scrollArea = document.getElementById('scrollArea');

// --- 1. IMAGES ---
const myPics = [
  "https://raw.githubusercontent.com/SaTyAm-0077/Happy-birthday-Arushi./main/54b66a61-8b35-4c43-be62-468240aa79af.jpg",
  "https://raw.githubusercontent.com/SaTyAm-0077/Happy-birthday-Arushi./main/ca451672-9246-4e61-8e6e-293ef3832fbd.jpg",
  "https://raw.githubusercontent.com/SaTyAm-0077/Happy-birthday-Arushi./main/f0e0bcb2-5bcf-4313-9d8e-3b3257ab8049.jpg",
  "https://raw.githubusercontent.com/SaTyAm-0077/Happy-birthday-Arushi./main/cbcc58d4-40ad-468a-9ed9-27bb1ac70a07.jpg"
];
const bgWords = ["Arushi", "I love you", "Baby", "Soulmate", "Mine Forever", "Valentine"];

const audio = new Audio('https://www.dropbox.com/scl/fi/349z8putdic1ltab78lpj/Yiruma_-_River_Flows_in_You_48kbps.mp3?rlkey=x9tt24bvhbmkn33xovvnafsd5&st=bz1myrjm&raw=1');
audio.loop = true;

// --- 2. TRAIL ---
window.addEventListener('mousemove', e => createTrail(e.clientX, e.clientY));
window.addEventListener('touchstart', e => createTrail(e.touches[0].clientX, e.touches[0].clientY));

function createTrail(x, y) {
  const t = document.createElement('div');
  t.className = 'trail';
  t.style.left = x + 'px'; t.style.top = y + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 800);
}

// --- 3. BACKGROUND SPAWN ---
let lane = 0;
setInterval(() => {
  const isWord = Math.random() > 0.4;
  const el = document.createElement(isWord ? 'div' : 'img');
  el.className = isWord ? 'floater' : 'floating-img';
  if (isWord) el.innerText = bgWords[Math.floor(Math.random() * bgWords.length)];
  else el.src = myPics[Math.floor(Math.random() * myPics.length)];
  el.style.left = (lane * 20) + (Math.random() * 5) + 'vw';
  lane = (lane + 1) % 5;
  const dur = 15 + Math.random() * 5;
  el.style.animationDuration = dur + 's';
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}, 3000);

// --- 4. THE REVEAL ---
btn.addEventListener('click', () => {
  btn.style.display = 'none';
  heart.classList.add('heart-animate');
  audio.play().catch(e => console.log(e));
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffde59', '#ff4d6d'] });

  setTimeout(() => {
    card.classList.add('reveal-card');
    setTimeout(startPoem, 1000);
  }, 1000);
});

function startPoem() {
  let delay = 0;
  poemLines.forEach((line) => {
    setTimeout(() => {
      line.classList.add('slide-in');
      scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' });
    }, delay);
    delay += 700;
  });

  setTimeout(() => {
    document.querySelectorAll('.letter').forEach(l => l.classList.add('glow-gold'));
    document.getElementById('final-msg').classList.add('show-final');
    confetti({ particleCount: 40, spread: 100, origin: { y: 0.7 }, colors: ['#ffde59'] });
  }, (poemLines.length * 700) + 500);
}

document.getElementById('replayBtn').addEventListener('click', () => location.reload());
