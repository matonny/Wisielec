init();
function init(){
	const wordToGuess = chooseWord().split('');
	console.log(wordToGuess);
	let guessedLetters = [];
	let tries = 0;
	let didPlayerWon = false;
	guessedLetters.length = wordToGuess.length;
	startGame(wordToGuess);
	function startGame(word){
		addEventListeners();
		generateLetterFields(word);
	}

	function addEventListeners(){
		let submitLetter = document.querySelector('.submitLetter');
		submitLetter.addEventListener('click', sendLetter);
		let letterInput = document.querySelector('.letterInput');
		letterInput.addEventListener('keyup', enterForLetter);
		let submitWord = document.querySelector('.submitWord');
		submitWord.addEventListener('click', sendWord);
		let answerInput = document.querySelector('.answerInput');
		answerInput.addEventListener('keyup', enterForWord);
	}
	function enterForLetter(key){
		if(key.code === 'Enter'){
			sendLetter();
		}
	}
	function enterForWord(key){
		if(key.code === 'Enter'){
			sendWord();
		}
	}
	function sendLetter(){
		let letterInput = document.querySelector('.letterInput');
		if(validateLetter(letterInput)){
			addLetter(letterInput.value);
			clearInput(letterInput);
			if(areAllLettersGuessed()){
				playerWon();
				return;
			}
			tries++;
			showLeftTries();
			if(didPlayerLose()){
				playerLost();
			}
		}
	}
	function showLeftTries(){
		adjustStatement(polishPlural('Pozostał ', 'Pozostały ', 'Pozostało ', (10 - tries)) + (10 - tries) + ' ' + polishPlural('ruch', 'ruchy', 'ruchów', (10-tries)) + '.');
	}
	function sendWord(){
		let wordInput = document.querySelector('.answerInput');
		console.log(wordInput.value);
		if(validateWord(wordInput.value)){
			if(isWordGuessed(wordInput.value)){
				playerWon();
			}else{
				playerLost();
			}
			revealWord();
			clearInput(wordInput)
		}
	}
	function validateLetter(input){
		console.log(input.value);
		if(isOfLengthOne(input.value)){
			if(consistsOfLetters(input.value)){
				adjustStatement('');
				return true;
			}
		}
	}
	function validateWord(word){
		console.log(word);
		let isOkay = true;
		if(isOfTheCorrectLength(word)){
			if(consistsOfLetters(word)){
			}
			else{
				isOkay = false;
			}
		}
		else{
				isOkay = false;
		}			
			return isOkay;
	}
	function isOfTheCorrectLength(word){
		console.log(word);
		if(word.length === wordToGuess.length){
			return true;
		}else{
			adjustStatement('Podaj ' + wordToGuess.length + ' ' + polishPlural('literę', 'litery', 'liter', wordToGuess.length));
			return false;
		}
	}
	function isOfLengthOne(text){
		if(text.length === 1){
			return true;
			adjustStatement('');
		}else{
			adjustStatement("Podaj JEDNĄ literę!");
			return false;
		}
	}
	function adjustStatement(message){
		let statement = document.querySelector('.statement');
		statement.textContent = message;
	}

	function consistsOfLetters(string){
		console.log(string.length);
		if(/^[a-zA-Z]/.test(string)){
			adjustStatement('');
			return true
		}else{
			if(string.length === 1){
				adjustStatement('Podaj 1 litere  bez polskich znakow');
				return false;
			}else{
				adjustStatement('Podaj tylko litery bez polskich znakow');	
				return false;
			}
		}
	}
	function clearInput(input){
		input.value = '';
	}
	function chooseWord(){
		let words = ['rzeka', 'ryba', 'chleb', 'magdalena', 'dobrik', 'kod', 'genetyka',
					 'biologia', 'matematyka', 'uroda', 'inteligencja', 'pracownik', 'sukces',
					 'zysk', 'david', 'chemia', 'woda', 'prokrastynacja', 'ekran', 'monitor', 'dekapitcja',
					 'vlog', 'angielski', 'pancerz', 'intelekt', 'zachowanie', 'tworzenie', 'tuba', 'rura', 
					 'but', 'pokrzywa', 'taboret', 'pszenica', 'wersalka', 'ludzie', 'populacja'];
		console.log(words.length);

		return words[randomNumber(words.length-1)];
	}
	function generateLetterFields(word){
		let fields = document.querySelector('.word');
		for(let i = 0; i < word.length; i++){
			let letter = document.createElement('li');
			letter.textContent = '';
			letter.className += 'letter';
			fields.appendChild(letter);
		}
	}
	function randomNumber(maximumNumber){
		return Math.floor(Math.random() * (maximumNumber+1));
	}
	function addLetter(letter){
		for(let i = 0; i < wordToGuess.length; i ++){
			if(wordToGuess[i] === letter){
				guessedLetters[i] = letter;	
			}
			console.log(guessedLetters);
		}showGuessedLetters();
	}
	function isWordGuessed(word){
		answer = word.split('');
		let isGuessed = true;
		for(let i = 0; i < wordToGuess.length; i++){
			if(answer[i] != wordToGuess[i]){
				isGuessed = false;
			}
		}
		return isGuessed;
	}
	function playerWon(){
			adjustStatement('Gracz wygrał!');
			finishGame();			
	}
	function playerLost(){
			adjustStatement('Gracz przegrał! Hasło to: ' + wordToGuess.join('') + '.');
			finishGame();			
	}
	function didPlayerLose(){
		if(tries === 10 && !didPlayerWon){
			return true;
		}
	}
	function areAllLettersGuessed(){
		let areGuessed = true;
		for(let i = 0; i < wordToGuess.length; i++){
			if(guessedLetters[i] != wordToGuess[i]){
				areGuessed = false;
				console.log( guessedLetters[i] + ' ' + wordToGuess[i]);
			}
		}
		console.log(areGuessed);
		return areGuessed;
	}
	function revealWord(){
		let fields = document.querySelector('.word');
		var letters = Array.from(fields.childNodes);
		for(let i = 0; i < wordToGuess.length; i ++){
				letters[i+1].textContent = wordToGuess[i];
			}					
	}
	function finishGame(){
		removeListeners()
		disableGUI()
		addNewGameButton();
	}
	function showGuessedLetters(){
		let fields = document.querySelector('.word');
		console.log(fields);
		var letters = Array.from(fields.childNodes);
		for(let i = 0; i < guessedLetters.length; i ++){
				letters[i+1].textContent = guessedLetters[i];
				console.log(letters[i].textContent);
			}
	}
	function polishPlural(singularNominativ, pluralNominativ, pluralGenitive, value) {
    	if (value === 1) {
        	return singularNominativ;
    	} else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
        	return pluralNominativ;
 	   } else {
    	    return pluralGenitive;
    	}
	}
	function removeListeners(){
		let submitLetter = document.querySelector('.submitLetter');
		submitLetter.removeEventListener('click', sendLetter);
		let letterInput = document.querySelector('.letterInput');
		letterInput.removeEventListener('keyup', enterForLetter);
		let submitWord = document.querySelector('.submitWord');
		submitWord.removeEventListener('click', sendWord);
		let answerInput = document.querySelector('.answerInput');
		answerInput.removeEventListener('keyup', enterForWord);
	}
	function disableGUI(){
		let submitLetter = document.querySelector('.submitLetter');
		submitLetter.disabled = true;
		let letterInput = document.querySelector('.letterInput');
		letterInput.disabled = true;
		let submitWord = document.querySelector('.submitWord');
		submitWord.disabled = true;
		let answerInput = document.querySelector('.answerInput');
		answerInput.disabled = true;		
	}
	function addNewGameButton(){

	}
}