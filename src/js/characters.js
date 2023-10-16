export async function callApi() {
	await fetch('https://rickandmortyapi.com/api/character')
	.then(data => {
		const posts = data.results;
		console.log(posts)
		})
		.catch(error => {
			console.log('Error occurred while fetching data:', error);
		})
}