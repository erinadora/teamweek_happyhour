
//***************************************************************

						// YELP API CALL

//*****************************************************************

function Bar(name, review, url, phone, address) {
  this.name = name;
  this.review = review;
  this.url = url;
  this.phone = phone;
  this.address = address;
}

var closeBars = {
	barName: [],
	barReviewCount: [],
	barAddress:[],
	barUrl: [],
	barPhone: []
};

var bars = [];
var barStringAddress = [];

function genYelp(city) {


	var auth = {
	  consumerKey: "9vZfVDP_dINI6KFtLfFYfA",
	  consumerSecret: "g2QgG109oBvlf1bUx4ySSpWmlew",
	  accessToken: "IpMMMensb6BGFgf5UxatlXFjVOxTf0V7",
	  accessTokenSecret: "kmMbsOqr6p49LwFYvCamfIVXliw",
	  serviceProvider: {
	    signatureMethod: "HMAC-SHA1"
	  }
		
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
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
	console.log("paramater map", parameterMap);
	var output;




	console.log("im about to enter the AJAX call");

	$.ajax({
	  'url': message.action,
	  'data': parameterMap,
	  'cache': true,
	  'dataType': 'jsonp',
	  'jsonpCallback': 'cb',
	  'async': false,
	  'success': function(data, textStats, XMLHttpRequest) {
	    output = data;

		for(var i=0; i<=5; i= i+1){

				// closebar.properties ***** YELP.business properties //
				(closeBars.barName).push(data.businesses[i].name);
				(closeBars.barUrl).push(data.businesses[i].url);
				(closeBars.barPhone).push(data.businesses[i].phone);
				(closeBars.barReviewCount).push(data.businesses[i].review_count);
				(closeBars.barAddress).push(data.businesses[i].location.display_address);
				console.log(closeBars.barAddress);
				console.log(closeBars.barAddress[0]);
		  }//*************************END OF FOR LOOP***************************//

			closeBars.barAddress.forEach(function(item){
		  		barStringAddress.push(item.join(''));
		  });
			console.log(barStringAddress);

	   for(var k = 0; k <=5;  k ++){

	   	//bar constructor variables//closebar.properties//
			var outputtedBarName = closeBars.barName[k];
			var outputtedBarReview = closeBars.barReviewCount[k];
			var outputtedBarUrl = closeBars.barUrl[k];
			var outputtedBarPhone = closeBars.barPhone[k];
			var outputtedAddress = barStringAddress[k];
			var newBar = new Bar(outputtedBarName, outputtedBarReview, outputtedBarUrl, outputtedBarPhone, outputtedAddress);
			bars.push(newBar);
			
	   }

	   	

	  }//*****************************END OF SUCCESS CALLBACK*****************//

	}); //******************** end of AJAX request*******************

	


	}//************************************************END OF YELP API FUNCTION *****************//

	

$(document).ready(function(){

	$('#click').click(function(){
		var near = $("#yelp-city").val();
		genYelp(near);

		$(".container").slideUp(500);
    // $('.results').slideDown(900);
    // $(".results").delay(100);
    $('.bars').fadeIn(500);
    $('.results').slideDown(1000);


		
		var appendData = function(){
			for(i=0; i<=5; i++){
				$("#bar" + i).append(bars[i].name);
				$("#address" + i).text(bars[i].address);
				$("#phone" + i).text(bars[i].phone);
			}
		}
			setTimeout(appendData, 1000);
	});
				
});






