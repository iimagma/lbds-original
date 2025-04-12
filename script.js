const naoBtn = document.getElementById('naoBtn');
const simBtn = document.getElementById('simBtn');

function moverBotao() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = naoBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const novoX = Math.random() * maxX;
    const novoY = Math.random() * maxY;
    
    naoBtn.style.position = 'absolute';
    naoBtn.style.left = novoX + 'px';
    naoBtn.style.top = novoY + 'px';
}

// Eventos para desktop
naoBtn.addEventListener('mouseover', moverBotao);
naoBtn.addEventListener('click', moverBotao);

// Eventos para mobile
naoBtn.addEventListener('touchstart', moverBotao);

// Quando clicar em Sim
simBtn.addEventListener('click', () => {
    window.location.href = 'success/index.html';
});
