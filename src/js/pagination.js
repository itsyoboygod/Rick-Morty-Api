import { callApi } from './characters.js'

document.addEventListener('DOMContentLoaded', async () => {
    function createP() { return document.createElement('p') }
    const characterList = document.getElementById('post_list');
    const loadNextButton = document.getElementById('load-next');
    const loadPreviousButton = document.getElementById('load-previous');
    const section = document.getElementById("container")

    const div_error = document.createElement("div")
    div_error.setAttribute("id", "id_search-error-popup")

    // await callApi()
    //     .then(response => {
    // 	response.forEach(result => {
    //         console.log(`${result.name}`)
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    let page = 1
    let nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;

    async function fetchCharacters(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const response = data.results;
                // Clear the current list
                characterList.innerHTML = '';
                displayCharacters(response);
                // Update pagination buttons based on response data
                loadNextButton.disabled = !data.info.next;
                loadPreviousButton.disabled = !data.info.prev;
            })
    }

    function displayCharacters(characters) {
        characters.forEach(character => {
            const li = document.createElement('li');
            li.classList.add('li__table');
            const div_footer = document.getElementById('id_div-footer');

            const imgElement = document.createElement('img')
            imgElement.setAttribute("src", character.image)
            imgElement.classList.add('li_img')

            const ahref = document.createElement('a')
            ahref.setAttribute('href', `https://rickandmortyapi.com/api/character/${character.id}`)
            ahref.setAttribute('id', 'ahref')
            ahref.setAttribute('target', 'blank')
            ahref.textContent = character.name;

            const idElement = createP()
            idElement.setAttribute('id', 'id_character')
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

            const spanPag = document.getElementById("pagNum")
            spanPag.textContent = page
            spanPag.setAttribute("data-pag",page)

            div_footer?.appendChild(loadPreviousButton);
            div_footer?.appendChild(spanPag);
            div_footer?.appendChild(loadNextButton);
            characterList.appendChild(li);
            section.appendChild(div_footer);
            section.appendChild(characterList);
        });
    }

    loadNextButton.addEventListener('click', () => {
        page++;
        nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
        fetchCharacters(nextPageUrl);
    });

    loadPreviousButton.addEventListener('click', () => {
        if (page > 1) {
            page--;
            nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
            fetchCharacters(nextPageUrl);
        }
    });

    const searchInput = document.getElementById("id_search");

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            page = 1;
            const searchTerm = searchInput.value.trim();
            nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}`;
            fetchCharacters(nextPageUrl);
        }

    });


    const mainElement = document.querySelector('main');
    mainElement.appendChild(section);
    document.body.appendChild(mainElement); // For example, append it to the body

    fetchCharacters(nextPageUrl);
})