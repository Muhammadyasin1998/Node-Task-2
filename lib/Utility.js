var axios = require("axios");

// Create module function for title extraction
module.exports = {
	requestTitle: function (address, getTitle) {
		axios.get(address).then(result => {
			var title = result.data.split('<title>')[1].split('</title>')[0];
			getTitle(title);
		}).catch(function (err) {
			console.log(err.message);
		});

	},
	getCompleteUrl: function (i, callback) {
		return callback(i);
	}
}
