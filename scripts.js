document.getElementById('generate-btn').addEventListener('click', function() {
    // Get user input
    const minNumber = parseInt(document.getElementById('min-number').value);
    const maxNumber = parseInt(document.getElementById('max-number').value);
    
    // Generate random number
    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    // Show the random number
    document.getElementById('result').textContent = `Random Number: ${randomNumber}`;

    // Check if the user wins
    if (randomNumber === minNumber || randomNumber === maxNumber) {
        document.getElementById('message').textContent = "You won!";
    } else {
        document.getElementById('message').textContent = "";
    }
});
