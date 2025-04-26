const cardContainer = document.getElementById('cardContainer');
const viewToggle = document.getElementById('viewToggle');
const closeBtn = document.getElementById('closeBtn');

const ROWS = 5;
const COLS = 6;
const TOTAL_MAIN_CARDS = 17;

// Generate filler cards around main cards
function generateCards() {
  const totalCells = ROWS * COLS;
  let cardIndex = 1;

  for (let i = 0; i < totalCells; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (isFiller(i)) {
      card.classList.add('filler');
    } else if (cardIndex <= TOTAL_MAIN_CARDS) {
      const formattedNum = String(cardIndex).padStart(2, '0');
      const imgSrc = `NatGeo${formattedNum}.jpg`;

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
      cardIndex++;
    } else {
      card.classList.add('filler');
    }

    cardContainer.appendChild(card);
  }
}

// Define filler cells (outer rows and columns)
function isFiller(index) {
  const row = Math.floor(index / COLS);
  const col = index % COLS;

  return row === 0 || row === ROWS - 1 || col === 0 || col === COLS - 1;
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
    showFillers(true);
  } else {
    cardContainer.classList.remove('angled');
    cardContainer.classList.add('flat');
    showFillers(false);
  }
}

// Show or hide filler cards
function showFillers(show) {
  const fillers = document.querySelectorAll('.card.filler');
  fillers.forEach(f => {
    f.style.display = show ? 'block' : 'none';
  });
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

  const cards = document.querySelectorAll('.card:not(.filler)');
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
