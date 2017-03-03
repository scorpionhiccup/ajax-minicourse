
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Streetview
    var street = $('#street').val();
	var city = $('#city').val();
	var address = street + ', ' + city;

	var title = 'Do you really want to live at ' + address + '?';
	$greeting.text(title);

	var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
	var $bg = $('<img>').addClass('bgimg').attr('src', url);
	$body.append($bg);

	//NYTimes AJAX
	
	var api_key = '2bc0e0169aa34e4b81f52e207688c0cc';
	var nytimes_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

	var params = {"q":address, 'apikey': api_key};

	nytimes_url += '?' + $.param( params );

	$.getJSON(nytimes_url, function(data) {

		var headerText = 'Newspaper articles for ' + address;

		$nytHeaderElem.text(headerText);

        var $ul = $('#nytimes-articles');
        data.response.docs.forEach(function(doc) {
			var $li = $('<li>').addClass('article');
			var headline = doc.headline.print_headline || doc.headline.main;
			var paragraph = doc.lead_paragraph;
			if (headline && paragraph) {
				$('<a>').text(headline).attr('href', doc.web_url).appendTo($li);
				$('<p>').text(paragraph).appendTo($li);
				$ul.append($li);
			}
        });
	}).fail(function(err){
		console.error(err);
		$nytHeaderElem.text('Unable to use New York Times API.')
	});
	
    return false;
};

$('#form-container').submit(loadData);
