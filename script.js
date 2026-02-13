const btn = document.getElementById('openBtn');
const heart = document.getElementById('heart-burst');
const card = document.getElementById('birthdayCard');
const poemLines = document.querySelectorAll('.poem-line');
const floatContainer = document.getElementById('floating-container');
const scrollArea = document.getElementById('scrollArea');

// --- 1. SETTINGS ---
// IMPORTANT: Upload the 5 photos you sent to GitHub as pic1.jpg, pic2.jpg, etc.
const myPics = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];
const bgWords = ["Arushi", "I love you", "Baby", "Soulmate", "Valentine", "Beautiful", "My Whole Heart"];

// Use your Dropbox link (ensure it ends in raw=1)
const audio = new Audio('https://www.dropbox.com/scl/fi/349z8putdic1ltab78lpj/Yiruma_-_River_Flows_in_You_48kbps.mp3?rlkey=x9tt24bvhbmkn33xovvnafsd5&st=bz1myrjm&raw=1');
audio.loop = true;

// --- 2. TRAIL & SPARKLES ---
function createTrail(x, y) {
  const t = document.createElement('div');
  t.className = 'trail';
  t.style.left = x + 'px'; t.style.top = y + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 800);
}
window.addEventListener('mousemove', e => createTrail(e.clientX, e.clientY));
window.addEventListener('touchstart', e => createTrail(e.touches[0].clientX, e.touches[0].clientY));

// --- 3. BACKGROUND SPAWNING ---
let lane = 0;
setInterval(() => {
  const isWord = Math.random() > 0.4;
  const el = document.createElement(isWord ? 'div' : 'img');
  el.className = isWord ? 'floater' : 'floating-img';
  if (isWord) {
    el.innerText = bgWords[Math.floor(Math.random() * bgWords.length)];
  } else {
    el.src = myPics[Math.floor(Math.random() * myPics.length)];
  }
  el.style.left = (lane * 20) + (Math.random() * 8) + 'vw';
  lane = (lane + 1) % 5;
  const dur = 18 + Math.random() * 6;
  el.style.animationDuration = dur + 's';
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}, 3000);

// --- 4. REVEAL ---
btn.addEventListener('click', () => {
  btn.style.opacity = '0';
  setTimeout(() => btn.style.display = 'none', 500);
  heart.classList.add('heart-animate');
  audio.play();
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ffde59', '#ff4d6d'] });
  setTimeout(() => {
    card.classList.add('reveal-frame');
    setTimeout(startPoem, 1200);
  }, 1000);
});

function startPoem() {
  let delay = 0;
  poemLines.forEach((line) => {
    setTimeout(() => {
      line.classList.add('slide-in');
      scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' });
    }, delay);
    delay += 750;
  });
  const poemEndTime = (poemLines.length * 750) + 500;
  setTimeout(() => {
    document.querySelectorAll('.first-letter').forEach(l => l.classList.add('glow-gold'));
    document.getElementById('final-msg').classList.add('show-final');
    confetti({ particleCount: 50, spread: 100, origin: { y: 0.7 }, colors: ['#ffde59'] });
  }, poemEndTime);
}

document.getElementById('replayBtn').addEventListener('click', () => location.reload());
