const cardContainer = document.getElementById('cardContainer');
const viewToggle = document.getElementById('viewToggle');
const closeBtn = document.getElementById('closeBtn');

const TOTAL_MAIN_CARDS = 100;
const IMAGES_COUNT = 17;
const FILLER_COLUMNS = 2; // 2 on each side

function generateCards() {
  const cardsPerRow = Math.floor(window.innerWidth / 216); // 200px + 16px gap
  const totalRows = Math.ceil(TOTAL_MAIN_CARDS / cardsPerRow);

  let cardIndex = 1;

  for (let row = 0; row < totalRows; row++) {
    // Add fillers to the left
    for (let f = 0; f < FILLER_COLUMNS; f++) {
      const filler = createFillerCard((f + row) % IMAGES_COUNT + 1);
      cardContainer.appendChild(filler);
    }

    // Main cards for this row
    for (let col = 0; col < cardsPerRow; col++) {
      if (cardIndex > TOTAL_MAIN_CARDS) break;

      const formattedNum = String(((cardIndex - 1) % IMAGES_COUNT) + 1).padStart(2, '0');
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
      label.textContent = `Card ${cardIndex}`;

      const back = document.createElement('div');
      back.classList.add('card-back');
      back.innerHTML = `<h3>NatGeo ${formattedNum}</h3><p>More info about Card ${cardIndex}</p>`;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      card.appendChild(label);

      card.addEventListener('click', () => selectCard(card));
      cardContainer.appendChild(card);

      cardIndex++;
    }

    // Add fillers to the right
    for (let f = 0; f < FILLER_COLUMNS; f++) {
      const filler = createFillerCard((f + row + FILLER_COLUMNS) % IMAGES_COUNT + 1);
      cardContainer.appendChild(filler);
    }
  }
}

function createFillerCard(imgIndex) {
  const formattedNum = String(imgIndex).padStart(2, '0');
  const imgSrc = `NatGeo${formattedNum}.jpg`;

  const filler = document.createElement('div');
  filler.classList.add('card', 'filler');

  const front = document.createElement('div');
  front.classList.add('card-front');
  front.style.backgroundImage = `url(${imgSrc})`;

  filler.appendChild(front);
  return filler;
}

// Toggle between views
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

  const cards = document.querySelectorAll('.card:not(.filler)');
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
