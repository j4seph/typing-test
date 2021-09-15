//Global Variables

let count = 60;
let cancelled = false;
let isThisActive = false;
let correctWords = 0;
let incorrectWords = 0;
let currentWord = 0;
let index = 0;
let highScore = 0;

const words = document.querySelector('.words');
const input = document.querySelector('.typing-input');
const seconds = document.querySelector('.seconds');
const redoButton = document.querySelector('.redo-button');
const startHelp = document.querySelector('.start-help');
const results = document.querySelector('.results');
const corrWords = document.querySelector('.correct-words');
const incorrWords = document.querySelector('.incorrect-words');
const accuracy = document.querySelector('.accuracy');
const wpm = document.querySelector('.wpm');
const reveal = document.querySelector('.reveal');
const highScoreDiv = document.querySelector('.high-score');
const escKey = 27;

let wordArray = [
	'hello',
	'these',
	'are',
	'the',
	'words',
	'that',
	'I',
	'would',
	'like',
	'to',
	'show',
	'in',
	'the',
	'typing',
	'test',
	'this',
	'is',
	'another',
	'word',
	'to',
	'water',
	'circles',
	'phone',
	'lamp',
	'speaker',
	'air',
	'listen',
	'mirror',
	'England',
	'sun',
	'cream',
	'burger',
	'jacket',
	'cold',
	'ice',
	'for',
	'let',
	'which',
	'who',
	'what',
	'when',
	'where',
	'why',
	'a',
	'to',
	'this',
	'then',
	'there',
	'their',
	'attempt',
	'copy',
	'airport',
	'alight',
	'partake',
	'shut',
	'seek',
	'side',
	'efficient',
	'bag',
	'fifth',
	'rate',
	'forgive',
	'reset',
	'stamp',
	'bang',
	'determine',
	'moo',
	'sip',
	'worship',
	'door',
	'process',
	'dine',
	'hypnotic',
	'bomb',
	'eye',
	'cause',
	'wrong',
	'heavenly',
	'troubled',
	'ring',
	'kettle',
	'pear',
	'leap',
	'sky',
	'smooth',
	'rabbit',
	'dog',
	'dress',
	'detect',
	'caring',
	'have',
	'icy',
	'treasure',
	'cars',
	'person',
	'breakfast',
	'pest',
	'put',
	'messy',
	'wood',
	'day',
	'watch',
	'part',
	'shop',
	'bells',
	'town',
	'trip',
	'books',
	'hair',
	'basketball',
	'clock',
	'thumb',
	'map',
	'wall',
	'smile',
	'love',
	'part',
	'show',
	'add',
	'desire',
	'present',
	'build',
	'roll',
	'bring',
	'add',
	'finish',
	'dive',
	'dance',
	'sentence',
	'collect',
	'thank',
	'soar',
];

//Functions

//shuffle array
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// while there remain elements to shuffle
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// and swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

shuffledWords = shuffle(wordArray);

function displayShuffledWords() {
	//need to show the highscore in here first so that it can be updated later
	highScoreDiv.innerText = `Your current high score is: ${highScore}`;

	//display the array on-screen and add a class with the word number
	shuffledWords.forEach((word) => {
		const x = document.createElement('span');
		x.innerText = word;
		x.classList.add(`word-${index}`);
		words.appendChild(x);

		index++;
	});
}

displayShuffledWords();

//highlight the current word needing to be input by the user
function highlightCurrentWord() {
	activeWord = wordArray[currentWord];
	words.children[currentWord].classList.add('current-word');
}
highlightCurrentWord();

//check that the word inputted matches the current word -- increment correct or incorrect
function checkWord() {
	if (input.value === wordArray[currentWord]) {
		words.children[currentWord].classList.remove('current-word');
		words.children[currentWord].classList.add('correct');
		correctWords++;
		currentWord++;
		highlightCurrentWord();
		corrWords.innerText = `Correct Words: ${correctWords}`;
		input.value = '';
	} else {
		words.children[currentWord].classList.remove('current-word');
		words.children[currentWord].classList.add('wrong');
		incorrectWords++;
		currentWord++;
		highlightCurrentWord();
		incorrWords.innerText = `Incorrect Words: ${incorrectWords}`;
		input.value = '';
	}
}

//start the countdown when a letter is pressed, only if its not already counting down and break if the redo button is pressed
function countdown(e) {
	//this is to start the countdown again AFTER the redo button has been pressed
	if (
		(e.keyCode >= 65 && event.keyCode <= 90) ||
		(e.keyCode >= 97 && event.keyCode <= 122)
	) {
		if (cancelled) {
			cancelled = false;
		}

		if (!isThisActive) {
			isThisActive = true;
			seconds.classList.add('active-timer');
			startHelp.classList.add('end-help');

			function tick() {
				if (cancelled) {
					return;
				} else {
					count--;
					seconds.innerText = (count < 10 ? '0' : '') + String(count);

					if (count > 0) {
						setTimeout(tick, 1000);
					}

					if (count === 0) {
						input.value = '';
						input.disabled = true;
						input.classList.add('typing-end');
						redoButton.classList.add('redo-end');
						isThisActive = false;
						seconds.innerText = '00';
						results.classList.add('finished');
						reveal.classList.add('finished');
						calculateAccuracy();
						calculateWpm();
						updateHighScore();
					}
				}
			}
			tick();
		}
	}
}

function calculateAccuracy() {
	x = correctWords + incorrectWords;
	y = correctWords / x;
	z = Math.floor(y * 100);

	accuracy.innerText = `Accuracy: ${z}%`;
}

function calculateWpm() {
	x = incorrectWords / 2;
	y = correctWords + x;
	z = Math.floor(y);

	wpm.innerText = `Words Per Minute: ${z}`;

	//function to update the highscore on the page, put in here as it needs the updated wpm
	if (highScore === 0) {
		highScore = z;
		highScoreDiv.innerText = `Your current high score is: ${highScore}`;
	} else if (z > highScore) {
		highScore = z;
		highScoreDiv.innerText = `Your current high score is: ${highScore}`;
		// const x = document.createElement('span');
		// x.innerText = word;
		// x.classList.add(`word-${index}`);
		// words.appendChild(x);
	}
}


//reset everything back to its original state to start again
function redo() {
	correctWords = 0;
	incorrectWords = 0;
	currentWord = 0;
	count = 60;
	cancelled = true;
	isThisActive = false;
	input.disabled = false;
	words.innerHTML = '';
	shuffle(wordArray);
	displayShuffledWords();
	highlightCurrentWord();
	input.value = '';
	seconds.innerText = count;
	seconds.classList.remove('active-timer');
	results.classList.remove('finished');
	reveal.classList.remove('finished');
	redoButton.classList.remove('redo-end');
	startHelp.classList.remove('end-help');
	input.classList.remove('typing-end');
	wpm.innerText = '';
	corrWords.innerText = '';
	incorrWords.innerText = '';
}

//Event Listeners

input.addEventListener('keypress', (e) => {
	countdown(e);
});

//keyCode 32 is spacebar
input.addEventListener('keypress', (e) => {
	if (e.keyCode === 32) {
		e.preventDefault();
		checkWord();
	}
});

// Reset the game or shuffle the words
redoButton.addEventListener('click', redo);

document.addEventListener('keyup', (e) => {
	if (e.keyCode === escKey) {
		redo();
	}
});