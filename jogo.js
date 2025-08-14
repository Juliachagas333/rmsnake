document.addEventListener("DOMContentLoaded", function () {


    var canvas = document.getElementById("quadro"); // define o quadrado onde vai ser o desenho
    var ctx = canvas.getContext("2d"); // desenhar no context 2d
    var cell = 15; // define os tamanhos
    var snake = [{ x: 5, y: 5 }]; // cobra é o quadradinho na posição
    var food = { x: 10, y: 10 }; // posicao que a comida aparece 1
    var dirX = 0; // horizontal da cobra direção
    var dirY = 0; // vertical da cobra direção
    var score = 0; // pontuação inicial
    var gameOver = false; // variavel que define quando o jogo acabou 

// Função para desenhar um quadrado no canvas
function draw(x, y, color) {
    ctx.fillStyle = color; // Escolhe a cor do quadrado
    ctx.fillRect(x * cell, y * cell, cell, cell); 
    // Desenha um quadrado na tela
    // x e y são posições na grade (tipo tabuleiro)
    // cell é o tamanho do quadrado
}

// Função para gerar nova posição aleatória para a comida
function newFood() {
    food.x = Math.floor(Math.random() * (canvas.width / cell)); 
    // Escolhe uma coluna aleatória para a comida
    food.y = Math.floor(Math.random() * (canvas.height / cell)); 
    // Escolhe uma linha aleatória para a comida
}

// Função que roda o jogo a cada "passo"
function loop() {
    if (gameOver) return; // Se o jogo acabou, não faz nada

    // Calcula para onde a cobra vai se mover
    var head = { x: snake[0].x + dirX, y: snake[0].y + dirY }; 

    // Se a cobra não está se movendo ainda, só desenha a tela
    if (dirX === 0 && dirY === 0) {
        render();
        return;
    }

    // Se a cobra bate na parede, o jogo acaba
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width / cell || head.y >= canvas.height / cell) {
        end();
        return;
    }

    // Se a cobra bate em si mesma, o jogo acaba
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            end();
            return;
        }
    }

    snake.unshift(head); 
    // Adiciona a nova posição da cabeça no início da cobra
    // Isso faz a cobra "andar" para frente

    // Se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++; // Aumenta a pontuação
        newFood(); // Coloca a comida em outro lugar aleatório
    } else {
        snake.pop(); 
        // Remove a última parte da cobra para ela continuar do mesmo tamanho
    }

    render(); // Atualiza a tela com a cobra e comida
}

// Função que desenha a cobra, a comida e a pontuação
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    // Limpa a tela antes de desenhar tudo de novo

    draw(food.x, food.y, "pink"); // Desenha a comida rosa

    for (var i = 0; i < snake.length; i++) {
        draw(snake[i].x, snake[i].y, "purple"); 
        // Desenha cada pedacinho da cobra roxa
    }

    ctx.fillStyle = "black"; 
    ctx.fillText("Pontuação: " + score, 5, canvas.height - 5); 
    // Escreve a pontuação no canto da tela
}

// Função para encerrar o jogo
function end() {
    gameOver = true; // Marca que o jogo acabou
    ctx.fillStyle = "black"; 
    ctx.font = "20px Arial"; 
    ctx.fillText("GAME OVER", canvas.width / 2 - 50, canvas.height / 2); 
    // Escreve "GAME OVER" no meio da tela
}

// Função para reiniciar o jogo
function reset() {
    snake = [{ x: 5, y: 5 }]; // Coloca a cobra de volta no início
    dirX = 0; // Para movimento horizontal
    dirY = 0; // Para movimento vertical
    score = 0; // Zera a pontuação
    gameOver = false; // Diz que o jogo está de novo em andamento
    newFood(); // Coloca nova comida na tela
}

// Detecta as teclas que você aperta
window.addEventListener("keydown", function (e) {
    if (e.keyCode === 37 && dirX !== 1) { dirX = -1; dirY = 0; } // Esquerda
    if (e.keyCode === 38 && dirY !== 1) { dirX = 0; dirY = -1; } // Cima
    if (e.keyCode === 39 && dirX !== -1) { dirX = 1; dirY = 0; } // Direita
    if (e.keyCode === 40 && dirY !== -1) { dirX = 0; dirY = 1; } // Baixo
    if (e.keyCode === 13) reset(); // Enter reinicia o jogo
});

newFood(); // Cria a primeira comida quando o jogo começa
setInterval(loop, 100); 
});
// Faz o loop do jogo se repetir a cada 0,1 segundo (100ms)
// Isso faz a cobra andar automaticamente
