const request = require('postman-request');

const forecast = (latitude, longitude, location, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=b175712a5a6e22cd76f9da19fff3655c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect weather service', undefined);
		} else if (body.error) {
			callback(`Unable to find location.`, undefined);
		} else {
			callback(undefined, `${body.current.weather_descriptions[0]}. The temperature in ${location} is currently ${body.current.temperature}C out and it feels like ${body.current.feelslike}C. The currect UV index is:${body.current.uv_index}`);
		}
	});
};

module.exports = forecast;
