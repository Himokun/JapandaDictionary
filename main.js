//const FADE_TIME = 600;

const FADE_TIME = 600;

function startApp() {
  watchSubmit();
 }



function watchSubmit() {
  $('.startForm').submit(event => {
    event.preventDefault();
	$('.loading-animation').show();
    $('.results').hide();
    $('.js-results').html('');
    $('.word-title').toggle();
    $('.definition-title').toggle();
    let searchTerm = document.getElementById('search-text-id');
    let searchTermLowercase = searchTerm.value.toLowerCase().trim();

    getWordFromApi(searchTermLowercase, processDataFromWordApi, 'ja');
	  
     $(event.currentTarget)
        .find('.js-query')
	   	.select();
  });

 function processDataFromWordApi(data) {
  const {data : {translations}} = data 
  $('.results-count').text(`(${translations.length})`);
  if (translations.length === 0) {
    $('.js-results').html(`form class="startForm'>
        <fieldset name="search-bar'>
          Sorry! Your search didn't return any results.
        </div>
      </div>`);
    $('.results').show();
  } else {
    displayWordData(translations);
  }
}

  $('.bar').submit(event => {
    event.preventDefault();
	$('.loading-animation').show();
    $('.results').hide();
    $('.js-results').html('');
    let searchTerm = document.getElementById('js-search-term');
    let searchTermLowercase = searchTerm.value.toLowerCase().trim();

    getWordFromApi(searchTermLowercase, processDataFromWordApi, 'en');
	  
     $(event.currentTarget)
        .find('.js-query')
	   	.select();
  });
}

function getWordFromApi(searchTerm, callback, lang) {
  const query = {
    url:
      `https://translation.googleapis.com/language/translate/v2?q=${searchTerm}&target=${lang}&key=AIzaSyCN13ROG4x24_PslJSVFvJnKwINesNbyo4`,
    success: callback,
    data: {
    keyword: searchTerm
    }
  };
  $.ajax(query);
}

function processWordData(wordArray) {
   displayWordData(wordsToDisplay);
}
 
function displayWordData( wordArray) {
  $('.loading-animation').hide();
  $('.results').fadeIn(FADE_TIME);
	
	const wordReading = wordArray[0].translatedText;
		let wordResultSection = `
        <span class="japanese-word-hiragana">${wordReading}</span> <span class='word-label'>(word)</span><br>`;

    let $resultDiv = $(`
      <div class="row">
        <div class="col-3">
          <div class="word-result">
            ${wordResultSection}
          </div>
        </div>
      </div>  
       `);
    $resultDiv
      .hide()
      .appendTo('.js-results')
      .fadeIn(FADE_TIME);
}

function pageScrollListener(wordArray) {
  $(window).on('scroll', function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      $('.loading-animation').show();
      $(window).off('scroll');
      processWordData(wordArray);
    }
  });
}

$(startApp);
$(startApp);
