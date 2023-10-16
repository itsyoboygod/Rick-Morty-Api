export async function callApi() {
	return fetch('https://rickandmortyapi.com/api/character')
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		const results = data.results;
		results.forEach(data => {
			console.log(data)
		});
		return results
		})
		.catch(error => {
			console.log('Error occurred while fetching data:', error);
		})
}