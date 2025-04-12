// Função para criar corações
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.hearts-container').appendChild(heart);
    
    // Remove o coração após a animação
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Cria corações a cada 300ms
setInterval(createHeart, 300);

// Função para gerar rotação aleatória
function getRandomRotation() {
    return Math.random() * 10 - 5; // Rotação entre -5 e 5 graus
}

// Array com extensões de imagem suportadas
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// Função para tentar carregar imagem com diferentes extensões
function tryLoadImage(index, currentExtensionIndex = 0) {
    return new Promise((resolve) => {
        if (currentExtensionIndex >= imageExtensions.length) {
            resolve(null); // Retorna null se nenhuma imagem for encontrada
            return;
        }

        const img = new Image();
        const ext = imageExtensions[currentExtensionIndex];
        img.src = `../Photos/foto${index}.${ext}`;

        img.onload = () => resolve(img.src);
        img.onerror = () => {
            tryLoadImage(index, currentExtensionIndex + 1).then(resolve);
        };
    });
}

// Função para criar elemento de foto
async function createPhotoElement(index) {
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('photo-item');
    photoDiv.style.setProperty('--rotation', `${getRandomRotation()}deg`);
    
    const img = document.createElement('img');
    img.alt = 'Nosso momento especial';
    
    // Tenta carregar a imagem com diferentes extensões
    const imgSrc = await tryLoadImage(index);
    
    if (imgSrc) {
        img.src = imgSrc;
        photoDiv.appendChild(img);
        return photoDiv;
    }
    return null; // Retorna null se nenhuma imagem for encontrada
}

// Função para carregar as fotos
async function loadPhotos() {
    const leftGallery = document.getElementById('leftGallery');
    const rightGallery = document.getElementById('rightGallery');
    
    // Total de fotos a serem carregadas
    const totalPhotos = 10; // Aumentado para 10 fotos
    
    // Distribuir as fotos entre as galerias
    for (let i = 1; i <= totalPhotos; i++) {
        const photoElement = await createPhotoElement(i);
        
        if (photoElement) { // Só adiciona se a foto existir
            // Fotos ímpares vão para a esquerda, pares para a direita
            if (i % 2 === 1) {
                leftGallery.appendChild(photoElement);
            } else {
                rightGallery.appendChild(photoElement);
            }
        }
    }
}

// Carrega as fotos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
    
    // Inicia a música
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.5; // Define o volume para 50%
        bgMusic.play().catch(error => {
            console.log('Erro ao tocar música:', error);
        });
    }
}); 