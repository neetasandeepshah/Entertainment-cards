const cardContainer = document.getElementById('cardContainer');
const viewToggle = document.getElementById('viewToggle');
const closeBtn = document.getElementById('closeBtn');

const TOTAL_MAIN_CARDS = 100;
const IMAGES_COUNT = 17;

// Generate 100 main cards (repeat images), plus fillers for angled view
function generateCards() {
  for (let i = 1; i <= TOTAL_MAIN_CARDS; i++) {
    const formattedNum = String(((i - 1) % IMAGES_COUNT) + 1).padStart(2, '0');
    const imgSrc = `NatGeo${formattedNum}.jpg`;

    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.style.backgroundImage = `url(${imgSrc})`;

    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = `Card ${i}`;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `<h3>NatGeo ${formattedNum}</h3><p>More info about Card ${i}</p>`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.appendChild(label);

    card.addEventListener('click', () => selectCard(card));
    cardContainer.appendChild(card);
  }
}

// Toggle view between angled and flat
viewToggle.addEventListener('change', () => {
  resetSelection();
  toggleView(viewToggle.checked);
});

function toggleView(isAngled) {
  if (isAngled) {
    cardContainer.classList.remove('flat');
    cardContainer.classList.add('angled');
    document.getElementById('viewport').style.overflowY = 'auto';
  } else {
    cardContainer.classList.remove('angled');
    cardContainer.classList.add('flat');
    document.getElementById('viewport').style.overflowY = 'hidden';
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
      c.style.animationDelay = `${index * 0.03}s`;
    }
  });

  setTimeout(() => {
    card.classList.remove('transitioning');
  }, 500);
}

// Reset selection and animations
function resetSelection() {
  const selected = document.querySelector('.card.selected');
  if (selected) {
    selected.classList.remove('selected', 'flipped');
  }

  const cards = document.querySelectorAll('.card');
  cards.forEach(c => {
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
