document.addEventListener('DOMContentLoaded', () => {
    function createP() { return document.createElement('p') }
    const characterList = document.getElementById('post_list');
    const loadMoreButton = document.getElementById("load-more")
    const section = document.getElementById("container")

    let nextPageUrl = 'https://rickandmortyapi.com/api/character';
    function fetchCharacters(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const characters = data.results;
                displayCharacters(characters);

                // Check if there's a next page
                if (data.info.next) {
                    nextPageUrl = data.info.next;
                    loadMoreButton.disabled = false;
                } else {
                    loadMoreButton.disabled = true; // No more pages
                }
            })
            .catch(error => {
                console.error('Error occurred while fetching data:', error);
            });
    }

    function createP() { return document.createElement('p') }
    function displayCharacters(characters) {
        characters.forEach(character => {
            const li = document.createElement('li');
            li.classList.add('li__table');

            const imgElement = document.createElement('img')
            imgElement.setAttribute("src", character.image)
            imgElement.classList.add('li_img')

            const ahref = document.createElement('a')
            ahref.setAttribute('href', `https://rickandmortyapi.com/api/character/${character.id}`)
            ahref.setAttribute('id', 'ahref')
            ahref.setAttribute('target', 'blank')
            ahref.textContent = character.name;

            const idElement = createP()
            idElement.setAttribute('id','id_character')
            const urlElement = createP()
            const nameElement = createP()
            const statusElement = createP()
            const speciesElement = createP()
            const typeElement = createP()
            const genderElement = createP()

            idElement.textContent = character.id;
            nameElement.textContent = character.name;
            urlElement.textContent = character.url;
            statusElement.textContent = character.status;
            speciesElement.textContent = character.species;
            typeElement.textContent = character.type;
            genderElement.textContent = character.gender;

            const infos_data_div = document.createElement("div")
            infos_data_div.classList.add('infos-data-div')

            li.appendChild(imgElement);
            infos_data_div.appendChild(idElement);
            infos_data_div.appendChild(ahref);
            infos_data_div.appendChild(urlElement);
            infos_data_div.appendChild(statusElement);
            infos_data_div.appendChild(speciesElement);
            infos_data_div.appendChild(typeElement);
            infos_data_div.appendChild(genderElement);
            li.appendChild(infos_data_div);


            characterList.appendChild(li);
            section.appendChild(characterList);
        });
    }
    loadMoreButton.addEventListener('click', () => {
        fetchCharacters(nextPageUrl);
    });

    const mainElement = document.querySelector('main');
    mainElement.appendChild(section);
    document.body.appendChild(mainElement); // For example, append it to the body

    fetchCharacters(nextPageUrl);
})