// Function to fetch phone data from the API based on search text
function phoneAPI(searchText = 9) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json()) // Convert the response to JSON
        .then(data => displayPhones(data)); // Call the displayPhones function with the fetched data
};

// Function to display phone data on the webpage
function displayPhones(data) {
    let allPhone = data.data; // Extract phone data from the fetched response

    // Get the container for displaying phone cards
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ''; // Clear existing content

    // Get the container for the "Show All" button
    const showAllBtnContainer = document.getElementById('show-all-btn-container');
    if (allPhone.length > 9) {
        showAllBtnContainer.classList.remove('hidden'); // Show "Show All" button if there are more than 9 phones
    } else {
        showAllBtnContainer.classList.add('hidden'); // Hide "Show All" button if there are 9 or fewer phones
    }

    allPhone = allPhone.slice(0, 9); // Display only the first 9 phones

    // Iterate through each phone and create a card element
    allPhone.forEach(phone => {
        const card = document.createElement('div'); // Create a new card element
        card.classList = `card w-96 bg-base-100 shadow-md p-5`; // Set card classes
        card.innerHTML = `
            <figure><img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl" /></figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="showPhoneDetails('${phone.slug}');">Show Details</button>
                </div>
            </div>`; // Populate card with phone details
        cardContainer.appendChild(card); // Add the card to the card container
    });
    loadingSpinner(false); // Hide the loading spinner
};

// Function to handle the search button click event
const searchBtn = () => {
    const searchInputFiled = document.getElementById('search-input-filed');
    loadingSpinner(true); // Show the loading spinner
    const searchText = searchInputFiled.value; // Get the search text from the input field
    phoneAPI(searchText); // Fetch and display phone data based on the search text
};

// Function to fetch phone details based on the phone's ID (slug)
const showPhoneDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json()) // Convert the response to JSON
        .then(data => showModal(data)); // Call the showModal function with the fetched data
};

// Function to display phone details in a modal
const showModal = (data) => {
    const detail = data.data; // Extract phone detail data from the fetched response

    // Update modal elements with phone details
    const showPhoneModalName = document.getElementById('show-phone-modal-name');
    showPhoneModalName.innerText = detail.name;

    const mainFeatures = detail.mainFeatures;

    const modalStorage = document.getElementById('modal-storage');
    modalStorage.innerText = mainFeatures.memory;

    // ... (similar updates for other modal elements)

    show_Phone_Info.showModal(); // Show the modal with phone details
};

// Function to toggle the loading spinner visibility
function loadingSpinner(loadingNOF) {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingNOF) {
        loadingSpinner.classList.remove('hidden'); // Show the loading spinner
    } else {
        loadingSpinner.classList.add('hidden'); // Hide the loading spinner
    }
}

// Initial call to fetch phone data with a default value (9) for searchText
phoneAPI();
