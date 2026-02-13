const btn = document.getElementById('openBtn');
const heart = document.getElementById('heart-burst');
const card = document.getElementById('birthdayCard');
const poemLines = document.querySelectorAll('.poem-line');
const floatContainer = document.getElementById('floating-container');
const sparkleContainer = document.getElementById('sparkle-container');
const scrollArea = document.getElementById('scrollArea');


const myPics = [
  "cbcc58d4-40ad-468a-9ed9-27bb1ac70a07.jpg"
"54b66a61-8b35-4c43-be62-468240aa79af.jpg"
"ca451672-9246-4e61-8e6e-293ef3832fbd.jpg"
"f4934f9d-27dd-4c1d-aa08-dbff7c53064d.jpg"
"f0e0bcb2-5bcf-4313-9d8e-3b3257ab8049.jpg"
];
const bgWords = ["Arushi", "I love you", "Baby", "Soulmate", "Valentine", "Beautiful", "My Whole Heart"];

const audio = new Audio('https://www.dropbox.com/scl/fi/349z8putdic1ltab78lpj/Yiruma_-_River_Flows_in_You_48kbps.mp3?rlkey=x9tt24bvhbmkn33xovvnafsd5&st=bz1myrjm&raw=1');
audio.loop = true;


function createTrail(x, y) {
  const t = document.createElement('div');
  t.className = 'trail';
  t.style.left = x + 'px'; t.style.top = y + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 800);
}
window.addEventListener('mousemove', e => createTrail(e.clientX, e.clientY));
window.addEventListener('touchstart', e => createTrail(e.touches[0].clientX, e.touches[0].clientY));


setInterval(() => {
  const s = document.createElement('div');
  s.className = 'sparkle';
  const size = Math.random() * 2 + 'px';
  s.style.width = size; s.style.height = size;
  s.style.left = Math.random() * 100 + 'vw';
  s.style.top = '105vh';
  s.style.animationDuration = Math.random() * 5 + 5 + 's';
  sparkleContainer.appendChild(s);
  setTimeout(() => s.remove(), 10000);
}, 400);

let lane = 0;
setInterval(() => {
  const isWord = Math.random() > 0.4;
  const el = document.createElement(isWord ? 'div' : 'img');
  el.className = isWord ? 'floater' : 'floating-img';
  if (isWord) el.innerText = bgWords[Math.floor(Math.random() * bgWords.length)];
  else el.src = myPics[Math.floor(Math.random() * myPics.length)];
  el.style.left = (lane * 20) + (Math.random() * 8) + 'vw';
  lane = (lane + 1) % 5;
  const dur = 18 + Math.random() * 6;
  el.style.animationDuration = dur + 's';
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}, 3500);


btn.addEventListener('click', () => {
  btn.style.opacity = '0';
  setTimeout(() => btn.style.display = 'none', 500);
  heart.classList.add('heart-animate');
  audio.play().catch(e => console.log(e));
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffde59', '#ff4d6d'] });
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
    confetti({ particleCount: 40, spread: 100, origin: { y: 0.7 }, colors: ['#ffde59'] });
  }, poemEndTime);
}

document.getElementById('replayBtn').addEventListener('click', () => location.reload());
