// 🌐 MENU HAMBURGER
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});

// 🎨 FILTRI GALLERIA
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterProjects(category);
  });
});

function filterProjects(category) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
  });
}

// 🖼️ CARICAMENTO GALLERIA DINAMICA
fetch('data/portfolio.json')
  .then(response => {
    if (!response.ok) throw new Error('Errore nel caricamento dei dati');
    return response.json();
  })
  .then(data => {
    const grid = document.querySelector('.grid');
    if (!grid) return;

    grid.innerHTML = '';

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

// 🤖 CHATBOT ARTIBOT CON AI BACKEND
function sendMessage() {
  const input = document.getElementById('user-input');
  const log = document.getElementById('chat-log');
  const userText = input.value.trim();
  if (!userText || !log) return;

  // Mostra il messaggio dell'utente
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.innerHTML = `<strong>Tu:</strong> ${userText}`;
  log.appendChild(userMsg);

  input.value = '';

  // Messaggio di caricamento
  const botMsg = document.createElement('div');
  botMsg.className = 'chat-message bot';
  botMsg.innerHTML = `<strong>Artibot:</strong> <em>Sto pensando...</em>`;
  log.appendChild(botMsg);
  log.scrollTop = log.scrollHeight;

  // Invio al backend Python
  fetch('http://stanzadellacreativita.onrender.com//chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  })
    .then(res => res.json())
    .then(data => {
      botMsg.innerHTML = `<strong>Artibot:</strong> ${data.reply}`;
      log.scrollTop = log.scrollHeight;
    })
    .catch(err => {
      botMsg.innerHTML = `<strong>Artibot:</strong> Ops! Non riesco a rispondere al momento.`;
      console.error('Errore nella comunicazione con il backend:', err);
    });
}

// ⌨️ Invio con tasto Invio
document.getElementById('user-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});