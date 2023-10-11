function createP() { return document.createElement('p') }

function createPostElement(postData) {
	const liElement = document.createElement('li');
	liElement.classList.add('li__table');

	const imgElement = document.createElement('img')
	imgElement.setAttribute("src", postData.img)
	imgElement.classList.add('li_img')

	const ahref = document.createElement('a')
	ahref.setAttribute('href', `https://rickandmortyapi.com/api/character/${postData.id}`)
	ahref.setAttribute('id', 'ahref')
	ahref.setAttribute('target', 'blank')
	ahref.textContent = postData.name;

	const idElement = createP()
	const urlElement = createP()
	const nameElement = createP()
	const statusElement = createP()
	
	idElement.textContent = postData.id;
	nameElement.textContent = postData.name;
	urlElement.textContent = postData.url;
	statusElement.textContent = postData.status;

	const infos_data_div = document.createElement("div")
	infos_data_div.classList.add('infos-data-div')


	infos_data_div.appendChild(idElement);
	liElement.appendChild(imgElement);
	infos_data_div.appendChild(ahref);
	infos_data_div.appendChild(urlElement);
	infos_data_div.appendChild(statusElement);

	liElement.appendChild(infos_data_div)
	
	return liElement; // Return the liElement
}

async function callApi() {
	await fetch(`https://rickandmortyapi.com/api/character`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			const posts = data.results;
			console.log(posts)
			if (posts.length !== 0) {
				displayPosts(posts)
			} else {
				const noPostFound = "no posts found"
				return noPostFound
			}
		})
		.catch(error => {
			console.log('Error occurred while fetching data:', error);
		})
}

function displayPosts(posts) {
	const mainElement = document.querySelector('main')
	const ulElement = document.createElement('ul');
	ulElement.setAttribute = ('id', 'post_list');
	ulElement.classList.add('ul__table');
	ulElement.innerHTML = '';
	const postnewData = posts;

	postnewData.forEach((post) => {
		const postData = {
			id: post.id,
			img: post.image,
			name: post.name,
			url: post.url,
			status: post.status
		}

		const postElement = createPostElement(postData);
		ulElement.appendChild(postElement);
		mainElement.appendChild(ulElement)
	});
	document.body.appendChild(mainElement); // For example, append it to the body
}
callApi()