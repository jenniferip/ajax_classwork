
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    // YOUR CODE GOES HERE!
    $greeting.text('So you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // NYT Implementation
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='
        + cityStr + '&sort=newest&api-key=2179bc2f0b834359939303e5bba0da3f';
    $.getJSON(nytURL, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'
                + article.web_url + '">' + article.headline.main + '</a>'
                + '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('Error! New York Times articles could not be loaded.');
    });

    // Wikipedia Implementation
    var wikiURl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
        + cityStr + '&format=json&callback=wikiCallback';
    $.ajax({
        url: wikiURl,
        dataType: 'jsonp',
        success: function(response) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr
                    + '</a></li>');
            };
        }
    });

    return false;
}

$('#form-container').submit(loadData);
