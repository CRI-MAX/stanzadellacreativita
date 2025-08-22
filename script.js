// MENU HAMBURGER
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// FILTRI GALLERIA
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterProjects(category);
  });
});

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

// CARICAMENTO GALLERIA DINAMICA
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

// CHATBOT ARTIBOT
function sendMessage() {
  const input = document.getElementById('user-input');
  const log = document.getElementById('chat-log');
  const userText = input.value.trim();
  if (!userText) return;

  log.innerHTML += `<div><strong>Tu:</strong> ${userText}</div>`;
  input.value = '';

  const botReply = getBotReply(userText);
  setTimeout(() => {
    log.innerHTML += `<div><strong>Artibot:</strong> ${botReply}</div>`;
    log.scrollTop = log.scrollHeight;
  }, 500);
}

function getBotReply(message) {
  message = message.toLowerCase();

  const risposte = {
    cucito: {
      testo: "Il cucito è un'arte meravigliosa! Hai mai provato a creare una borsa patchwork?",
      img: "images/tutorial-cucito.jpg"
    },
    pittura: {
      testo: "Acrilico o acquerello? Posso suggerirti tecniche per entrambi!",
      img: "images/tutorial-pittura.jpg"
    },
    legno: {
      testo: "Il fai da te con il legno è super gratificante. Vuoi un progetto semplice da iniziare?",
      img: "images/tutorial-legno.jpg"
    },
    idee: {
      testo: "Ecco un'idea: crea un porta-pennelli riciclando barattoli di vetro decorati!",
      img: "images/tutorial-idee.jpg"
    }
  };

  for (let key in risposte) {
    if (message.includes(key)) {
      const r = risposte[key];
      return `${r.testo}<br><img src="${r.img}" alt="Tutorial ${key}" style="width:100%; border-radius:8px;">`;
    }
  }

  return "Che bello! Raccontami di più sul tuo progetto creativo.";
}