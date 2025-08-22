function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

function filterProjects(category) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

fetch('data/portfolio.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nel caricamento dei dati');
    }
    return response.json();
  })
  .then(data => {
    const grid = document.querySelector('.grid');
    if (!grid) return;

    grid.innerHTML = ''; // Rimuove eventuali messaggi di caricamento

    data.forEach(item => {
      if (!item.image || !item.title || !item.description || !item.category) return;

      const div = document.createElement('div');
      div.className = 'card';
      div.dataset.category = item.category;
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
      grid.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Errore:', error);
    const grid = document.querySelector('.grid');
    if (grid) {
      grid.innerHTML = '<p>Impossibile caricare i progetti al momento.</p>';
    }
  });