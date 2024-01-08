const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', { title: 'Weather App', name: 'Nicholas Hosken' });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About Page', name: 'Nicholas Hosken' });
});

app.get('/help', (req, res) => {
	res.render('help', { title: 'Help Page', name: 'Nicholas Hosken' });
});

app.get('/couple', (req, res) => {
	res.send([
		{
			name: 'Nick',
			age: 38,
		},
		{
			name: 'Mosi',
			age: 38,
		},
	]);
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please supply a location!!!',
		});
	} else {
		geocode((address = req.query.address), (error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, location, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({ forecast: forecastData, location, address });
			});
		});
	}
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Search term missing',
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', { title: 'Error', issue: 'Help article not found', name: 'Nicholas Hosken' });
});

app.get('*', (req, res) => {
	res.render('error', { title: 'Error', issue: 'Page not found', name: 'Nicholas Hosken' });
});

app.listen(3000, () => {
	console.log('Server started: Port 3000');
});
