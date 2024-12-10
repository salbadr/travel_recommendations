const submitForm = document.getElementById('submit');
submitForm.addEventListener('submit', contactUs);


function contactUs(event){
    event.preventDefault();
    alert("Thanks for contacting us. We'll reach out soon.");
}