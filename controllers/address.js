/* Importing the RSVP library. */
var RSVP = require('rsvp');
var Utility = require("../lib/Utility.js");
var View = require("../views/View.js");

// Implement the above task using plain node.js callbacks 
exports.getTitles = function (request, response) {
	// check if address provided in url or not
	if (request.url.indexOf("address=") == -1) {
		View.addressInUrl(response);
		return;
	}

	// set header
	View.header(response);
	// set header title
	View.titleHeader(response);

	// If multiple address given iterate over array
	if (request.query.address instanceof Array) {
		var arrayLength = request.query.address.length;
		for (var counter = 0; counter < arrayLength; counter++) {
			Utility.requestTitle(request.query.address[counter], function (title) {
				// print title
				View.title(response, title);
				if (arrayLength == (counter + 1)) {
					// set footer title
					View.titleFooter(response);
					// set footer
					View.footer(response);
				}
			});
		}
	} else {
		// use utility module requestTitle function
		Utility.requestTitle(request.query.address, function (title) {
			// print title
			View.title(response, title);
			// set footer title
			View.titleFooter(response);
			// set footer
			View.footer(response);
		});
	}
};


// Implement the above using Promises. You could use any library e.g. RSVP 
exports.getTitlesRSVP = function (request, response) {
	// check if address provided in url or not
	if (request.url.indexOf("address=") == -1) {
		View.addressInUrl(response);
		return;
	}

	// set header
	View.header(response);
	// set header title
	View.titleHeader(response);

	// If multiple address given iterate over array
	if (request.query.address instanceof Array) {
		var promises = [];
		var arrayLength = request.query.address.length;
		for (var counter = 0; counter < arrayLength; counter++) {
			// create promise for url
			promises.push(new RSVP.Promise(function (resolve, reject) {
				Utility.requestTitle(request.query.address[counter], function (title) {
					resolve(title);
				});
			}));
		}

		// Promise.all function takes a list of promises in the given order and returns another promise
		RSVP.all(promises).then(function (responseText) {
			responseText.map(function (item) {
				View.title(response, item);
			});
			View.titleFooter(response);
			View.footer(response);
		});
	} else {
		// create promise
		var promise = new RSVP.Promise(function (resolve, reject) {
			Utility.requestTitle(request.query.address, function (title) {
				resolve(title);// reject if promise
			});
		});

		// bind promis with then 
		promise.then(function (responseText) {
			View.title(response, responseText);
			View.titleFooter(response);
			View.footer(response);
		});
	}
};
