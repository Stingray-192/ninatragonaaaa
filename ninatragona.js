
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 20; // Aumenta el tamaño del jugador
const playerHeight = 20; // Aumenta el tamaño del jugador
const ghostRadius = 5; // Aumenta el tamaño de la manzana 

let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
let playerSpeed = 5;
let keys = {};

let ghosts = [];
let ghostCount = 0;
let timeLimit = 30; // Tiempo límite en segundos
let startTime = Date.now();

// Cargar imágenes
let playerImage = new Image();
playerImage.src = 'mona.png.png'; // Ruta de la imagen del jugador

let ghostImage = new Image();
ghostImage.src = 'manzana.png'; // Ruta de la imagen de la niña 

// Asegurar que las imágenes se hayan cargado completamente antes de dibujar
let imagesLoaded = 0;
playerImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        startGame();
    }
};
ghostImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        startGame();
    }
};

function createGhost() {
    return {
        x: Math.random() * (canvas.width - ghostRadius * 2) + ghostRadius,
        y: Math.random() * (canvas.height - ghostRadius * 2) + ghostRadius,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3
    };
}

// Crear manzanas
for (let i = 0; i < 5; i++) {
    ghosts.push(createGhost());
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawText(text, x, y, color, size = '20px', font = 'Arial') {
    ctx.fillStyle = color;
    ctx.font = `${size} ${font}`;
    ctx.fillText(text, x, y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();

    for (let ghost of ghosts) {
        drawGhost(ghost);
    }

    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    let timeRemaining = timeLimit - currentTime;

    // Dibujar contador de fantasmas capturados y tiempo restante
   drawText(`Manzanas capturadas: ${ghostCount}`, 10, 10, 'black', '5px'); // Aquí puedes cambiar '20px' al tamaño que desees
drawText(`Tiempo restante: ${timeRemaining}`, 10, 30, 'black', '5px'); // Ajusta las coordenadas x e y según sea necesario

ctx.imageSmoothingEnabled = false;


    // Terminar el juego si se agota el tiempo
    if (timeRemaining <= 0) {
        clearInterval(gameInterval);
        drawText('¡Tiempo terminado!', canvas.width / 3.2 - 30, canvas.height / 2, 'red', '10px');
    }
}

function drawPlayer() {
    ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight);
}

function drawGhost(ghost) {
    ctx.drawImage(ghostImage, ghost.x - ghostRadius, ghost.y - ghostRadius, ghostRadius * 2, ghostRadius * 2);
}

function moveGhosts() {
    for (let ghost of ghosts) {
        ghost.x += ghost.speedX;
        ghost.y += ghost.speedY;

        if (ghost.x + ghostRadius > canvas.width || ghost.x - ghostRadius < 0) {
            ghost.speedX = -ghost.speedX;
        }
        if (ghost.y + ghostRadius > canvas.height || ghost.y - ghostRadius < 0) {
            ghost.speedY = -ghost.speedY;
        }
    }
}

function movePlayer() {
    if (keys['ArrowUp'] && playerY > 0) {
        playerY -= playerSpeed;
    }
    if (keys['ArrowDown'] && playerY < canvas.height - playerHeight) {
        playerY += playerSpeed;
    }
    if (keys['ArrowLeft'] && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys['ArrowRight'] && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
}

window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});

function checkCollision() {
    for (let i = 0; i < ghosts.length; i++) {
        let ghost = ghosts[i];
        let dx = playerX + playerWidth / 2 - ghost.x;
        let dy = playerY + playerHeight / 2 - ghost.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < playerWidth / 2 + ghostRadius) {
            ghosts.splice(i, 1);
            ghosts.push(createGhost());
            ghostCount++;
        }
    }
}

function startGame() {
    gameInterval = setInterval(gameLoop, 1000 / 60);
}

function gameLoop() {
    draw();
    moveGhosts();
    movePlayer();
    checkCollision();
}

let gameInterval;





let hearts = [];
const heartRadius = 5;
const heartCount = 3; // Número de corazones en el juego
const heartTimeBonus = 5; // Tiempo adicional en segundos al recoger un corazón

// Crear corazones
for (let i = 0; i < heartCount; i++) {
    hearts.push(createHeart());
}

function createHeart() {
    return {
        x: Math.random() * (canvas.width - heartRadius * 2) + heartRadius,
        y: Math.random() * (canvas.height - heartRadius * 2) + heartRadius,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3
    };
}

function drawHeart(heart) {
    // Dibujar la imagen del corazón en lugar de un círculo
    let heartImage = new Image();
    heartImage.src = 'corazon.png'; // Ruta de la imagen del corazón
    ctx.drawImage(heartImage, heart.x - heartRadius, heart.y - heartRadius, heartRadius * 2, heartRadius * 2);
}


function moveHearts() {
    for (let heart of hearts) {
        heart.x += heart.speedX;
        heart.y += heart.speedY;

        if (heart.x + heartRadius > canvas.width || heart.x - heartRadius < 0) {
            heart.speedX = -heart.speedX;
        }
        if (heart.y + heartRadius > canvas.height || heart.y - heartRadius < 0) {
            heart.speedY = -heart.speedY;
        }
    }
}

function checkHeartCollision() {
    for (let i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        let dx = playerX + playerWidth / 2 - heart.x;
        let dy = playerY + playerHeight / 2 - heart.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < playerWidth / 2 + heartRadius) {
            hearts.splice(i, 1);
            hearts.push(createHeart());
            startTime += heartTimeBonus * 1000; // Añadir tiempo adicional
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();

    for (let ghost of ghosts) {
        drawGhost(ghost);
    }

    for (let heart of hearts) {
        drawHeart(heart);
    }

 let currentTime = Math.floor((Date.now() - startTime) / 1000);
let timeRemaining = timeLimit - currentTime;

// Dibujar contador de fantasmas capturados y tiempo restante
drawText(`Manzanas capturadas: ${ghostCount}`, 10, 10, 'black', 12); // Tamaño de fuente 12
drawText(`Tiempo restante: ${timeRemaining}`, 10, 30, 'black', 12); // Tamaño de fuente 12

    // Terminar el juego si se agota el tiempo
    if (timeRemaining <= 0) {
        clearInterval(gameInterval);
        drawText('¡Tiempo terminado!', canvas.width / 3.2 - 30, canvas.height / 2, 'blue');
    }
}

function gameLoop() {
    draw();
    moveGhosts();
    movePlayer();
    checkCollision();
    moveHearts();
    checkHeartCollision();
}