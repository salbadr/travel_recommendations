
const submitForm = document.getElementById('submit');
submitForm.addEventListener('submit', fetchRecommendations);
submitForm.addEventListener('reset', clearResults);

function clearResults(){
    const searchResults = document.getElementById('search_results');
    searchResults.innerHTML = '';
    searchResults.style.overflowY = 'hidden';
}

function fetchRecommendations(event) {
    event.preventDefault();
    clearResults();
    const term = submitForm[0].value.toLowerCase();


    fetch('./travel_recommendation.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (const [key, value] of Object.entries(data)) {
                if (key.includes(term) || term === 'country') {
                    if (key ==='countries'){
                        for(const country of value){
                            handleTerms(country.cities);
                        }
                    }
                    else{
                        handleTerms(value)
                    }
                }

            }

        })
        .catch((error) => {
            console.error(error)
        })

}

function handleTerms(list) {
    const searchResults = document.getElementById('search_results');

    for (const value of list) {
        const { imageUrl, name, description } = value;
        const div = document.createElement('div');
        const result = `
    <img src="images/${imageUrl}" alt="${name}"/>
    <span><b>${name}</b></span>
    <p>${description}</p>
    <button>Visit</button>
`;
        div.innerHTML = result;
        searchResults.appendChild(div);
        searchResults.style.overflowY = 'scroll'

    }
}