
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumped = false;
let position = 0;

/*
document.addEventListener('keyup', () => {
    console.log('pressionou uma tecla');
});
*/

/**
 * Função que verifica o keyCode de uma tecla
 * Neste caso, verificamos o keyCode 32 que é a tecla espaço
 */
function handleKeyup(event) {
    if (event.keyCode === 32) {
        if (!isJumped){
            jump();
        }
    }
}

/**
 * Função para o dino pular
 */
function jump() {
    
    isJumped = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
 
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumped = false;
                    } else {
                        position -= 20;
                        dino.style.bottom = position + 'px';
                    }
                }, 20);
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}


/**
 * Função criar cactos
 */
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000; // posição inicial do cactus
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) { // 
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyup);