const cards = document.querySelectorAll('.egg-card');


cards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(1.1)';
        setTimeout(() => card.style.transform = '', 160);


        localStorage.setItem('eggType', JSON.stringify({
            name: card.dataset.name,
            src: card.dataset.src
        }));
    });
});