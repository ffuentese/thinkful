// your code here!

	$(".js-form").submit(function(event){
		event.preventDefault();
		var txt = $(this).find('#user-text').val();
		console.log(txt);
		var arr = txt.trim().toLowerCase().split(/[ ,!.";:-]+/).filter(Boolean).sort();
		var ct = countWords(arr);
		var uq = uniqueCountWords(arr);
	 	var av = averageWordLength(arr);
		// console.log('Word count: ' + ct);
		// console.log('Unique word count '+ uq);
		// console.log('Average word length '+ av);
		$('.js-wordcount').text(ct);
		$('.js-unique').text(uq);
		$('.js-average').text(av);
		$('.text-report').removeClass('hidden');
	});

function countWords(text){
	var ct = text.length;
	return ct;
}

function uniqueCountWords(text){
	var arr = text.filter(function(word, i, a){
		return a.indexOf(word) == i;
	});
	return arr.length;
}

function averageWordLength(text){
	var ct = text.length;
	var len = text.join('').length;
	return parseFloat(len / ct).toFixed(2);
}