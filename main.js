// Pegar todas as teclas
// Armazena todos os elementos com a classe "key"
const keys = document.querySelectorAll(".key");

// Tocar as notas
function playNote(event) {
    // keyCode - Referencia das letras
    let audioKeyCode = getKeyCode(event);
    
    // Tecla digitada
    // Pega a tecla pressionada
    const key = document.querySelector(`.key[data-key="${audioKeyCode}"]`);

    // Verifica se a tecla existe
    const cantFoundAnyKey = !key;
    
    if(cantFoundAnyKey) {
        return;
    }

    // Toca o audio
    addPlayingClass(key);
    playAudio(audioKeyCode);
}

// Pega a nota pressionada
function getKeyCode(event) {
    let keyCode;
    const isKeyboard = event.type === "keydown";

    if(isKeyboard) {
        keyCode = event.keyCode;
    } else {
        keyCode = event.target.dataset.key;
    }

    return keyCode;
}

// Toca o audio
function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`);
    
    audio.currentTime = 0;
    audio.play()
}

// Adiciona a classe "playing" ao elemento
function addPlayingClass(key) {
    key.classList.add('playing');
}

// Remove a classe "playing" ao elemento 
function removePlayingClass(event) {
    event.target.classList.remove("playing");
}

function registerEvents() {
    // Clicar com o mouse 
    keys.forEach(function(key) {
        key.addEventListener("click", playNote);
        key.addEventListener("transitionend", removePlayingClass);
    });

    // Digitar no teclado
    // Fica escutando cada evento de click no teclado e dispara uma função
    window.addEventListener("keydown", playNote);
}

// Chama a função a função "registerEvents" quando a janela carregar
window.addEventListener("load", registerEvents);