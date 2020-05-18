let quotesData;
let currentQuote = "";
let currentAuthor = "";
let colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}
function getRandomColor(){
  return colors[Math.floor(Math.random()*colors.length)];
}
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote() {
  
  let randomQuote = getRandomQuote();
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  
  $("#text").animate({opacity: 0},500,function(){
    $(this).animate({opacity: 1},500);
    $("#text").text(currentQuote);  
  });
  $("#author").animate({opacity: 0},500,function(){
    $(this).animate({opacity: 1},500);
    $("#author").text(currentAuthor);
  })
  let color = getRandomColor();
  document.documentElement.style.setProperty("--themecolor", color);
  $("html body").animate({backgroundColor: color},1000
  );
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  
  
}

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log(quotesData+" ");
      }
    }
  });
}

$("document").ready(function(){
  getQuotes().then(()=>{
    getQuote();
  });
  
  $('#new-quote').on('click', getQuote);

  $('#tweet-quote').on('click', function() {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

  });

  
  
});
