


//***************************************************************

						// YELP API CALL

//*****************************************************************
var closeBars = {
	barName: [],
	barReviewCount: [],
	barUrl: [],
	barPhone: []
}

function genYelp(city) {


	var auth = {
	  consumerKey: "9vZfVDP_dINI6KFtLfFYfA",
	  consumerSecret: "g2QgG109oBvlf1bUx4ySSpWmlew",
	  accessToken: "IpMMMensb6BGFgf5UxatlXFjVOxTf0V7",
	  accessTokenSecret: "kmMbsOqr6p49LwFYvCamfIVXliw",
	  serviceProvider: {
	    signatureMethod: "HMAC-SHA1"
	  }
		// <script src="js/yelp.js"></script>
	};

	var terms = 'happy hour';
	var radius_filter = 8000;
	var deals_filter = true;



	var accessor = {
	  consumerSecret: auth.consumerSecret,
	  tokenSecret: auth.accessTokenSecret
	};

	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['radius_filter', radius_filter]);
	parameters.push(['location', city]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	var message = {
	  'action': 'http://api.yelp.com/v2/search',
	  'method': 'GET',
	  'parameters': parameters
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
	console.log("paramater map", parameterMap);

	var bestRestaurant = "Some random restaurant";
	var output;


	$.ajax({
	  'url': message.action,
	  'data': parameterMap,
	  'cache': true,
	  'dataType': 'jsonp',
	  'jsonpCallback': 'cb',
	  'success': function(data, textStats, XMLHttpRequest) {
	    output = data;

		
		for(var i=0; i<=9; i= i+1){

		(closeBars.barName).push(data.businesses[i].name);
		(closeBars.barUrl).push(data.businesses[i].url);
	
		(closeBars.barPhone).push(data.businesses[i].phone);
		
		(closeBars.barReviewCount).push(data.businesses[i].review_count);
	
		
		
	   }//*************************END OF FOR LOOP***************************//
	   	console.log(closeBars.barName);
	  }
	  	
	}); //******************** end of AJAX request*******************

	


	}//************************************************END OF YELP API FUNCTION *****************//


$(document).ready(function(){



	$('#click').click(function(){
		var near = $("#yelp-city").val();
		genYelp(near);
		$(".container").slideUp(900);
    $(".results").show(1000)
	});





});
