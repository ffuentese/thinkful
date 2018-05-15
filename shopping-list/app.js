// single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(
		{name: item, checked: false}
    	);
};

var delItem = function(state, item) {
   state.items = state.items.filter(function(it){
	return it.name !== item; 
	});
   console.log(state);
   return state;
}

var toggleItem = function(state, item) {
	state.items.forEach(function(it){
		if(it.name === item){
			it.checked = !it.checked;
		}
		return it;
	});
	console.log(state.items);
	return state;
}

//state renderer

var renderState = function(state, element) {
	var itemsHTML = state.items.map(function(item){
		var clase = 'shopping-item__checked';
		var noclase = '';
		var check = item.checked ?  clase : noclase;
		return '<li class="js-shopping-item"><span class="shopping-item ' + check + '\
		">'+ item.name +'</span> \
        <div class="shopping-item-controls"> \
          <button class="shopping-item-toggle"> \
            <span class="button-label">check</span> \
          </button> \
          <button class="shopping-item-delete"> \
            <span class="button-label">delete</span> \
          </button> \
        </div></li>';
	});
	element.html(itemsHTML);
}

// Event listeners
function handleAddToDos(state) {
	$('form#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderState(state, $('.shopping-list'));
});
}

function handleDelete(state) {
	$("ul").on('click', '.shopping-item-delete', function(event){
		event.preventDefault();
		var item = $(this).closest('.js-shopping-item').first().find('span.shopping-item').text();
		state = delItem(state, item);
		renderState(state, $('.shopping-list'));
	});
}

function handleToggle(state) {
	$("ul").on('click', '.shopping-item-toggle', function(event){
		event.preventDefault();
		var item = $(this).closest('.js-shopping-item').first().find('span.shopping-item').text();
		state = toggleItem(state, item);
		renderState(state, $('.shopping-list'));
	});
}

$(function() {
	handleAddToDos(state);
	handleDelete(state);
	handleToggle(state);
});
