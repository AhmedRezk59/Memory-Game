//splash screen variables
const startButton = document.querySelector('.control-buttons span');
const nameSpan = document.querySelector('.name span');

//memory blocks variables
const blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
let flipped = [];
let alikeArr = [];
let wrongArr = [];
let tries = document.querySelector('.tries span');
let notification = document.querySelector('.notification');
let notificationP = document.querySelector('.notification p');
let wrongTries = 0;
let currentIndex = blocks.length, temprorayValue, randomIndex;
let againScreen = document.querySelector('.end-game');
let againText = document.querySelector('.again-text');
let playAgainbtn = document.getElementById('again-btn');

//shuffling the game blocks
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// running the shuffle function
function appendShuffledBlocks() {
    shuffle(blocks);
    blocksContainer.innerHTML = '';
    blocks.forEach(item => blocksContainer.appendChild(item));
}


//Starting the game 
startButton.onclick = function () {
    //Asking for name
    let yourName = prompt("What is your name ?");
    //checking if the name is valid
    function checkName() {
        if (yourName == null || yourName === "") {
            alert('Invalid name');
            yourName = prompt("What is your Name ?");
            //Rechecking incase the name is invalid in the first time
            checkName();
        } else {
            //Starting the game if the name is valid
            nameSpan.textContent = yourName;
            startButton.parentElement.style.display = "none";
        }

    }
    appendShuffledBlocks();
    checkName();
};

//Check if the player won
function winStatus() {
    if (alikeArr.length === blocks.length) {
        againScreen.style.display = 'block';
        againText.textContent = 'Congrats! You won'
    }
}
//update wrong tries number
function updateWrongTries() {
    wrongTries = +wrongTries + 1;
    tries.textContent = wrongTries;
}
//checking the cards 
function checkAlike() {
    if (flipped.length === 2) {
        //what will happen if the two cards are the same
        if (flipped[0].getAttribute('data-technology') === flipped[1].getAttribute('data-technology')) {
            alikeArr.push(flipped[0]);
            alikeArr.push(flipped[1]);
            winStatus();
            flipped = [];
            notificationP.textContent = "Congrats! Matched"
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.remove('show');
            }, 1500)
        } else {
            //what will happen if the two cards are not the same
            notificationP.textContent = "Not Matched"
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.remove('show');
            }, 1500);
            wrongArr.push(flipped[0]);
            wrongArr.push(flipped[1]);
            updateWrongTries();
            playagain();
            setTimeout(function () {
                flipped.forEach(function (item) {
                    item.classList.remove('flipped');
                }, 1000);
                flipped = []
            });
        };
    }
}


//Flipping the game blocks
blocks.forEach(function (block) {
    block.addEventListener('click', e => {
        e.target.parentElement.classList.add('flipped');
        flipped.push(e.target.parentElement);

        //checking the cards
        checkAlike();
    });
});

function playagain() {
    if (wrongTries === 12) {
        againScreen.style.display = 'block';
        againText.textContent = 'Unfortunatly! You lost'
    }
}


playAgainbtn.addEventListener('click', () => {
    wrongTries = -1;
    updateWrongTries();
    flipped = [];
    wrongArr = [];
    alikeArr = [];
    againScreen.style.display = 'none';
    appendShuffledBlocks();
    blocks.forEach(item => item.classList.remove('flipped'));
})