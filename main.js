
const submitForm = document.getElementById('submit');
submitForm.addEventListener('submit', fetchRecommendations);

function fetchRecommendations(event) {
    event.preventDefault();
    const term = submitForm[0].value.toLowerCase();


    fetch('./travel_recommendation.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (const [key, value] of Object.entries(data)) {
                if (key.includes(term) || term === 'country') {
                    if (term === 'country' || term ==='countries'){
                        handleTerms(value.cities);
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
`;
        div.innerHTML = result;
        searchResults.appendChild(div);
    }
}