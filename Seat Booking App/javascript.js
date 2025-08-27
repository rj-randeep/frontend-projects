const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

// Array to store selected seats (as required in test cases)
let selectedSeatsArray = [];
let currentMoviePrice = 7; // Default Flash price

// DOM Elements
const selectMovie = document.getElementById('selectMovie');
const movieName = document.getElementById('movieName');
const moviePrice = document.getElementById('moviePrice');
const totalPrice = document.getElementById('totalPrice');
const numberOfSeat = document.getElementById('numberOfSeat');
const selectedSeatsHolder = document.getElementById('selectedSeatsHolder');
const continueBtn = document.getElementById('proceedBtn');
const cancelBtn = document.getElementById('cancelBtn');
const seats = document.querySelectorAll('#seatCont .seat');

// Initialize the application
function initApp() {
    populateMovieDropdown();
    addEventListeners();
    updateSelectedSeatsDisplay(); // Set initial display
}

// 1. Populate movie dropdown from moviesList array
function populateMovieDropdown() {
    // Clear existing options first
    selectMovie.innerHTML = '';
    
    moviesList.forEach((movie, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = movie.movieName;
        selectMovie.appendChild(option);
    });
    
    // Set Flash (index 0) as default selected
    selectMovie.value = 0;
}

// 2. Add all required event listeners
function addEventListeners() {
    // Movie selection dropdown event
    selectMovie.addEventListener('change', handleMovieSelection);
    
    // Seat click events (only for non-occupied seats)
    seats.forEach((seat, index) => {
        if (!seat.classList.contains('occupied')) {
            seat.addEventListener('click', () => handleSeatClick(seat, index));
        }
    });
    
    // Button event listeners
    continueBtn.addEventListener('click', handleContinueButton);
    cancelBtn.addEventListener('click', handleCancelButton);
}

// 3. Handle movie selection change
function handleMovieSelection(event) {
    const selectedIndex = parseInt(event.target.value);
    const selectedMovie = moviesList[selectedIndex];
    
    // Update movie name and price display
    movieName.textContent = selectedMovie.movieName;
    moviePrice.textContent = `$ ${selectedMovie.price}`;
    currentMoviePrice = selectedMovie.price;
    
    // Update total price based on currently selected seats
    updatePriceDisplay();
}

// 4. Handle seat click events
function handleSeatClick(seat, seatIndex) {
    if (seat.classList.contains('selected')) {
        // Deselect the seat
        seat.classList.remove('selected');
        selectedSeatsArray = selectedSeatsArray.filter(index => index !== seatIndex);
    } else {
        // Select the seat
        seat.classList.add('selected');
        selectedSeatsArray.push(seatIndex);
    }
    
    // Update displays
    updatePriceDisplay();
    updateSelectedSeatsDisplay();
}

// 5. Update price display based on selected seats
function updatePriceDisplay() {
    const totalCost = selectedSeatsArray.length * currentMoviePrice;
    totalPrice.textContent = `$ ${totalCost}`;
    numberOfSeat.textContent = selectedSeatsArray.length;
}

// 6. Update selected seats display section
function updateSelectedSeatsDisplay() {
    selectedSeatsHolder.innerHTML = '';
    
    if (selectedSeatsArray.length === 0) {
        // Show "No Seat Selected" message when no seats are selected
        const noSelected = document.createElement('span');
        noSelected.className = 'noSelected';
        noSelected.textContent = 'No Seat Selected';
        selectedSeatsHolder.appendChild(noSelected);
    } else {
        // Display selected seats
        selectedSeatsArray.forEach((seatIndex) => {
            const seatElement = document.createElement('div');
            seatElement.className = 'selectedSeat';
            seatElement.textContent = `S${seatIndex + 1}`;
            selectedSeatsHolder.appendChild(seatElement);
        });
    }
}

// 7. Handle continue button click
function handleContinueButton() {
    if (selectedSeatsArray.length === 0) {
        alert('Oops no seat Selected');
    } else {
        alert('Yayy! Your Seats have been booked');
        
        // Convert selected seats to occupied
        selectedSeatsArray.forEach(seatIndex => {
            seats[seatIndex].classList.remove('selected');
            seats[seatIndex].classList.add('occupied');
        });
        
        // Reset all selections and displays
        resetSelections();
    }
}

// 8. Handle cancel button click
function handleCancelButton() {
    // Remove 'selected' class from all selected seats
    selectedSeatsArray.forEach(seatIndex => {
        seats[seatIndex].classList.remove('selected');
    });
    
    // Reset all selections and displays
    resetSelections();
}

// 9. Reset selections (helper function)
function resetSelections() {
    selectedSeatsArray = [];
    updatePriceDisplay();
    updateSelectedSeatsDisplay();
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);