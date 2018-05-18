var YOUTUBE_SEARCH_API = 'AIzaSyA55UBVrQ09SwVxU82V2thB9tHubMArDZ8';
var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
	var query = {'key': YOUTUBE_SEARCH_API,
				 'maxResults': '25',
                 'part': 'id,snippet',
                 'q': searchTerm,
                 'type': 'video'};
     $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

function renderResult(result) {
	
  return `
    <div id="video">
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> by <a class="js-video-channel" target="_blank" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></h2>
      <p>: <span class="js-thumbnail-video"><a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}" alt="${result.snippet.title}" /></a></span></p>
      
    </div>
  `;
}


function displayQueryResults(data){
	var results = data.items.map(function(item, index){
		return renderResult(item);
	});
	console.log(results);
	$('.js-search-results').html(results);

}

function handleSearchForm(){
	$('.js-search-form').submit(function(event){
		event.preventDefault();
		var queryTarget = $(this).find('.js-query');
		var query = queryTarget.val();
		queryTarget.val('');
		getDataFromApi(query, displayQueryResults);
	})
}

/* Lightbox 
adapted solution from http://www.tonylea.com/2011/how-to-create-your-own-jquery-lightbox/
*/

function renderLightbox(url){
	var width = $(window).width();
	var w = width < 1000 ? width - width*0.1 : 480;
	var h = w * 0.75;
	var newHtml = '<iframe width="'+w+'" height="'+h+'" src="https://www.youtube.com/embed/'+url+'" \
	 frameborder="0" allow="encrypted-media" allowfullscreen></iframe> \
	 <div class="close">x</div>';
	 return newHtml;
}

function close_box(){
	$('.backdrop, .lightbox').animate({'opacity':'0'}, 300, 'linear', function(){
		$('.backdrop, .lightbox').css('display', 'none');
		$('.lightbox iframe').attr('src','');
	});
}

function lightbox(){
	$('main').on('click', '.js-thumbnail-video', function(event){
		event.preventDefault();
		var url = $(this).find('a').attr('href').split('v=')[1];
		var video = renderLightbox(url);
		$('.lightbox').html(video);

		$('.backdrop, .lightbox').animate({'opacity':'.50'}, 300, 'linear');
		$('.lightbox').animate({'opacity':'1.00'}, 300, 'linear');
		$('.backdrop, .lightbox').css('display', 'block');

		$('.close').click(function(){
			close_box();
		});
 
		$('.backdrop').click(function(){
			close_box();
		});
	});
}

$(function(){
	handleSearchForm();
	lightbox();
})



