'use strict';

var question = [
{
	id: 1,
	name: 'What\'s the difference between "ser" &amp; "estar"? ',
	answer1: '"Ser" expresses essence and "estar" a state of the being (like position).',
	answer2: '"Ser" expresses a state of the being (like position) and "estar" is the essence.',
	answer3: 'They are mutually interchangeable.',
	answer4: '"Ser" is a verb, "estar" is a noun.',
	correct: 'a'

},
{
	id: 2,
	name: 'What\'s the difference between "qu&eacute;" and "cu&aacute;l"?',
	answer1: 'Both are interchangeable.',
	answer2: '"Cu&aacute;l" refers to a location, "Qu&eacute;" asks for a thing.',
	answer3: '"Cu&aacute;l" asks for an option among many others. "Qu&eacute;" asks for a thing.',
	answer4: '"Cu&aacute;l" asks for a given time. "Qu&eacute;" asks for a thing.',
	correct: 'c'

},
{
	id: 3,
	name: 'Someone asks you: "¿Me puede decir cu&aacute;nto vale este vestido? What\'s a good answer for that?',
	answer1: 'Es muy bonito.',
	answer2: 'Este vestido est&aacute; en rojo y azul.',
	answer3: 'Aqu&iacute; est&aacute; su vestido.',
	answer4: 'Cuesta $100. ¿Lo lleva?',
	correct: 'd'

},
{
	id: 4,
	name: 'In which of the following phrases is the preposition "para" used in a wrong way?',
	answer1: 'Para vivir necesito trabajar.',
	answer2: 'Voy para Argentina.',
	answer3: 'Tengo que tomar esta medicina para cinco d&iacute;as.',
	answer4: 'Debo tener este informe para mañana.',
	correct: 'c'

},
{
	id: 5,
	name: 'The word "agua"...',
	answer1: 'is a masculine noun that ends in "a".',
	answer2: 'is a feminine noun that is preceded by "el".',
	answer3: 'is a neutral noun that can be preceded by "el" or "la".',
	answer4: 'is a special noun that shouldn\'t go preceded by articles. ',
	correct: 'b'

},
{
	id: 6,
	name: 'What\'s a feminine name that ends with -o.',
	answer1: 'Roc&iacute;o.',
	answer2: 'Calipso',
	answer3: 'Rosalino',
	answer4: 'Jacinto',
	correct: 'a'

},
{
	id: 7,
	name: 'What\'s something you wouldn\'t bring to the beach?',
	answer1: 'Una pelota.',
	answer2: 'Una toalla.',
	answer3: 'Una pala.',
	answer4: 'Unas sandalias.',
	correct: 'c'

},
{
	id: 8,
	name: 'Choose the right response to: "Hola, disculpe, d&oacute;nde est&aacute; el ba&ntilde;o."',
	answer1: 'Hasta luego.',
	answer2: 'No es nada.',
	answer3: 'Es al fondo.',
	answer4: 'Esta es la parada.',
	correct: 'c'

},
{
	id: 9,
	name: 'Choose a phrase where "sino" is used correctly.',
	answer1: 'No voy a Miami sino a Las Vegas.',
	answer2: 'Estoy yendo sino a la fuerza.',
	answer3: 'Cocino solo sino hay nadie.',
	answer4: 'El profesor de espa&ntilde;ol ayuda sino est&aacute; ocupado.',
	correct: 'a'

},
{
	id: 10,
	name: 'Choose the right response to: "¿Es esta la parada de autobus a la ciudad?"',
	answer1: 'La ciudad es muy bonita.',
	answer2: 'Esta es la parada que va al pueblo.',
	answer3: 'Yo estoy parado aquí en la ciudad.',
	answer4: 'El autob&uacute;s de la ciudad es muy cómodo.',
	correct: 'b'

}
];

var state = {
	questions: question,
	number: 1,
	correct: 0
}

function getQuestion(state){
	var question = state.questions.find(function(item){
		return item.id === state.number;
	});
	return question;
}

function checkAnswer(state, ans){
	var question = getQuestion(state);
	if(ans === question.correct){
		return true;
	} else {
		return false;
	}

}

function updateQuiz(state, right){
	var question = getQuestion(state);
	if(right){
		state.correct++;
	}
	state.number++;
	return state; 
}

function renderQuestion(state, element){
	var question = getQuestion(state);
	var newHtml = '<div class="main center"> \
			<h2>Question #'+question.id+'</h2> \
			<form id="myForm" role="form"> \
			<fieldset> \
			<legend>'+question.name+'</legend> \
			<p>a) : <label><input type="radio" name="answer" value="a"> '+question.answer1+'</label></p> \
		    <p>b) : <label><input type="radio" name="answer" value="b"> '+question.answer2+'</label></p> \
			<p>c) : <label><input type="radio" name="answer" value="c"> '+question.answer3+'</label></p> \
			<p>d) : <label><input type="radio" name="answer" value="d"> '+question.answer4+'</label></p> \
			<input type="submit" value="Answer!" /> \
			</fieldset> \
			</form> \
		</div>';
	element.html(newHtml);
}

function renderFeedback(state, right, element){
	var question = getQuestion(state);
	var newHtml = '';
	if(state.number <= 10) {
	var positive = 'You\'re right!';
	var negative = 'You made a mistake! The right answer was '+ question.correct; 
	var response = right ? positive : negative;
	newHtml = '<div class="main center"> \
			<h2>Question #'+question.id+'</h2> \
			<p>'+response+'</p> \
			<p><button class="next">Next question &gt; &gt;</button></p> \
		</div>';
	} else {
		newHtml = '<div class="main center"> \
			<h2>Your results!</h2> \
			<p>You got '+state.correct+' right answers!</p> \
			<p><button class="back">Try again?</button></p> \
			<p><a href="https://www.facebook.com/sharer/sharer.php?u=https://ffuentese.github.io/SpanishQuiz">Share it on Facebook</a></p> \
			<p><a href="https://twitter.com/home?status=Show%20off%20your%20Spanish%20skills!%20https%3A//ffuentese.github.io/SpanishQuiz">Share it on Twitter</a></p> \
		</div>';
	}

	element.html(newHtml);
}

function renderStats(state, element){
	var newHtml = '';
	if(state.number <= 10) {
	newHtml = '<div> \
	<span class="order">Question #'+state.number+' of 10</span>\
	 <span class="correct">Correct: '+state.correct+' of 10</span> \
	</div>';

	} 	
	element.html(newHtml);
	

}

function handleQuestion(state){
	$('.js-question').on('submit', '#myForm', function(event){
		event.preventDefault();
		var ans = $('input[name=answer]:checked', '#myForm').val();
		var right = checkAnswer(state, ans);
		renderFeedback(state, right, $('.js-question'));
		updateQuiz(state, right);
		renderStats(state, $('.js-stats')); 
		
		
	});

}

function handleFeedback(state){
	$('.js-question').on('click', '.next', function(event){
		event.preventDefault();

		if(state.number > 10){ 
			renderFeedback(state, true, $('.js-question'));
		} else {
		renderQuestion(state, $('.js-question'));
		}
	});
	$('.js-question').on('click', '.back', function(event){
		window.location.reload();
	});

}

function startQuiz(state){
	$('.js-start').click(function(event){
		event.preventDefault();
		renderQuestion(state, $('.js-question'));
		renderStats(state, $('.js-stats'));
		});
}




$(function() {
	startQuiz(state);
	handleQuestion(state);
	handleFeedback(state);
});