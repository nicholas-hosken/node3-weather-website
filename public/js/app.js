const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const output = document.querySelector('#output');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	output.innerHTML = 'Loading...';

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				return (output.innerHTML = data.error);
			} else {
				output.innerHTML = `${data.location} <br><br> ${data.forecast}`;
			}
		});
	});
});
