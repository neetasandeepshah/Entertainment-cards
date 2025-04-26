const cardContainer = document.getElementById('cardContainer');
const viewToggle = document.getElementById('viewToggle');
const closeBtn = document.getElementById('closeBtn');

// Generate cards for NatGeo01.jpg to NatGeo17.jpg
function generateCards() {
  const totalCards = 17;
  for (let i = 1; i <= totalCards; i++) {
    const formattedNum = String(i).padStart(2, '0');
    const imgSrc = `NatGeo${formattedNum}.jpg`;

    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.style.backgroundImage = `url(${imgSrc})`;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `<h3>NatGeo ${formattedNum}</h3><p>More info about NatGeo ${formattedNum}</p>`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => selectCard(card));
    cardContainer.appendChild(card);
  }
}

// Apply staggered rotation and vertical offset for angled view
function applyAngledStyles() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const rotation = (Math.random() * 10 - 5).toFixed(2); // -5deg to +5deg
    const stagger = (Math.random() * 20 - 10).toFixed(2); // -10px to +10px
    card.style.setProperty('--rotation', `${rotation}deg`);
    card.style.setProperty('--stagger', `${stagger}px`);
  });
}

// Toggle between angled and flat view
viewToggle.addEventListener('change', () => {
  resetSelection();
  toggleView(viewToggle.checked);
});

function toggleView(isAngled) {
  if (isAngled) {
    cardContainer.classList.remove('flat');
    cardContainer.classList.add('angled');
    applyAngledStyles();
  } else {
    cardContainer.classList.remove('angled');
    cardContainer.classList.add('flat');
  }
}

// Card selection and flip logic
function selectCard(card) {
  if (card.classList.contains('selected')) {
    card.classList.toggle('flipped');
    return;
  }

  toggleView(false);
  resetSelection();

  card.classList.add('selected', 'transitioning');
  card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  closeBtn.style.display = 'block';

  const cards = document.querySelectorAll('.card');
  cards.forEach((c, index) => {
    if (c !== card) {
      c.classList.add('fly-in');
      c.style.animationDelay = `${index * 0.05}s`;
    }
  });

  setTimeout(() => {
    card.classList.remove('transitioning');
  }, 500);
}

// Reset card selection and animations
function resetSelection() {
  const selected = document.querySelector('.card.selected');
  if (selected) {
    selected.classList.remove('selected', 'flipped');
  }

  const allCards = document.querySelectorAll('.card');
  allCards.forEach(c => {
    c.classList.remove('fly-in');
    c.style.animationDelay = '';
  });

  closeBtn.style.display = 'none';
}

// Close button logic
closeBtn.addEventListener('click', () => {
  resetSelection();
  toggleView(true);
  viewToggle.checked = true;
});

// Initialize
generateCards();
applyAngledStyles();
