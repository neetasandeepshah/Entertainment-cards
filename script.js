const cardContainer = document.getElementById('cardContainer');
const viewToggle = document.getElementById('viewToggle');
const closeBtn = document.getElementById('closeBtn');

function generateCards() {
  const cards = [

  ];

  cards.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.style.backgroundImage = `url(${data.img})`;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `<h3>${data.title}</h3><p>${data.description}</p>`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => selectCard(card));
    cardContainer.appendChild(card);
  });
}

viewToggle.addEventListener('change', () => {
  resetSelection();
  toggleView(viewToggle.checked);
});

function toggleView(isAngled) {
  if (isAngled) {
    cardContainer.classList.remove('flat');
    cardContainer.classList.add('angled');
  } else {
    cardContainer.classList.remove('angled');
    cardContainer.classList.add('flat');
  }
}

function selectCard(card) {
  toggleView(false);

  const alreadySelected = card.classList.contains('selected');
  resetSelection();

  if (!alreadySelected) {
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

    card.addEventListener('click', flipCard);
  }
}

function flipCard(event) {
  event.stopPropagation();
  const card = event.currentTarget;
  card.classList.toggle('flipped');
}

function resetSelection() {
  const selected = document.querySelector('.card.selected');
  if (selected) {
    selected.classList.remove('selected', 'flipped');
    selected.removeEventListener('click', flipCard);
  }

  const allCards = document.querySelectorAll('.card');
  allCards.forEach(c => {
    c.classList.remove('fly-in');
    c.style.animationDelay = '';
  });

  closeBtn.style.display = 'none';
}

function generateCards() {
  const totalCards = 17;
  for (let i = 1; i <= totalCards; i++) {
    const formattedNum = String(i).padStart(2, '0'); // Format as 01, 02...
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

closeBtn.addEventListener('click', () => {
  resetSelection();
  toggleView(true);
  viewToggle.checked = true;
});

generateCards();
