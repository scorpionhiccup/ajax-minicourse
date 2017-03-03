
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


    return false;
};

$('#form-container').submit(loadData);
