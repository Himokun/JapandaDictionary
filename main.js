//const FADE_TIME = 600;

function startApp() {
  watchSubmit();
 }

function watchSubmit() {
  $('.startForm').submit(event => {
    event.preventDefault();
    $('.results').hide();
    $('.js-results').html('');
    let searchTerm = document.getElementsByClassName('.search-text')
    let searchTermLowercase = searchTerm.toLowerCase().trim();

    $(event.currentTarget)
      .find('.js-query')
      .select();
  });
}

function getWordFromApi(searchTerm, callback) {
  const query = {
    url:
      'http://beta.jisho.org/api/v1/search/words',
    success: callback,
    data: {
      keyword: searchTerm
    }
  };
  $.ajax(query);
}

function processDataFromWordApi(data) {
  $('.results-count').text(`(${data.data.length})`);
  if (data.data.length === 0) {
    $('.js-results').html(`form class="startForm'>
        <fieldset name="search-bar'>
          Sorry! Your search didn't return any results.
        </div>
      </div>`);
    $('.results').show();
  } else {
    processWordData(data.data);
  }
}

function processWordData(wordArray) {
  let currentWordArray = wordArray.slice();
  let wordsToDisplay = [];
  if (currentWordArray.length <= 5) {
    wordsToDisplay = currentWordArray.slice();
} else {
    wordsToDisplay = currentWordArray.splice(0, 5);
  }

 displayWordData(
      wordsToDisplay,
      scrollListenerActive,
      wordsRemainingToDisplay
    );
 }
function displayWordData(
  wordArray,
  scrollListenerActive,
  wordsRemainingToDisplay
) {
  $('.loading-animation').hide();
  $('.results').fadeIn(FADE_TIME);
    let wordResultSection = '';
    if (typeof japaneseWord === 'undefined') {
      wordResultSection = `
        <span class="japanese-word-hiragana">${wordReading}</span> <span class='word-label'>(word)</span><br>
        <span class="japanese-word-romaji">${wordRomaji}</span> <span class='word-label'>(romaji)</span><br>`;
    } else {
      wordResultSection = `
        <span class="japanese-word">${japaneseWord}</span> <span class='word-label'>(word)</span><br>
        <span class="japanese-word-hiragana">${wordReading}</span> <span class='word-label'>(reading)</span><br>
        <span class="japanese-word-romaji">${wordRomaji}</span> <span class='word-label'>(romaji)</span><br>`;
    }
    let definitionSection = wordDefinitions
      .map((definition, index) => {
        return `<div class="definition"><span class='definition-index'>
          ${index + 1})</span> ${definition}</span></div>`;
      })
      .join('');
    let $resultDiv = $(`
      <div class="row">
        <div class="col-3">
          <div class="word-result">
            ${wordResultSection}
          </div>
        </div>
        <div class="col-5">
          <div class="definition-result">
            ${definitionSection}
          </div>
        </div>
       `);
    $resultDiv
      .hide()
      .appendTo('.js-results')
      .fadeIn(FADE_TIME);

  if (scrollListenerActive) pageScrollListener(wordsRemainingToDisplay);
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