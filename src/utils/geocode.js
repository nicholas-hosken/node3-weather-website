const request = require('postman-request');

const geocode = (address, callback) => {
	const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=658b3f87025cd538314865zvu6b98c3&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (body.length === 0) {
			callback('Unable to find location', undefined);
		} else {
			callback(undefined, {
				latitude: body[0].lat,
				longitude: body[0].lon,
				location: body[0].display_name,
			});
		}
	});
};

module.exports = geocode;
