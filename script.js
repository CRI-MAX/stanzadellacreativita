fetch('data/portfolio.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nel caricamento dei dati');
    }
    return response.json();
  })
  .then(data => {
    const grid = document.getElementById('portfolio-grid');
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <p><strong>${item.title}</strong><br>${item.description}</p>
      `;
      grid.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Errore:', error);
    document.getElementById('portfolio-grid').innerHTML = '<p>Impossibile caricare i progetti al momento.</p>';
  });