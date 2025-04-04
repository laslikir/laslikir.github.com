document.getElementById('generate-btn').addEventListener('click', function() {
    // Get user input
    let userNumbers = [];
    for (let i = 1; i <= 6; i++) {
        const userNum = parseInt(document.getElementById(`num-${i}`).value);
        userNumbers.push(userNum);
    }

    // Check if all inputs are filled and valid
    if (userNumbers.some(isNaN)) {
        alert("Please enter all 6 numbers.");
        return;
    }

    // Generate 6 random numbers
    let randomNumbers = [];
    for (let i = 0; i < 6; i++) {
        const randomNum = Math.floor(Math.random() * 100) + 1; // random number between 1 and 100
        randomNumbers.push(randomNum);
    }

    // Show the random numbers
    document.getElementById('result').textContent = `Random Numbers: ${randomNumbers.join(', ')}`;

    // Check if the user wins (exact match)
    const isWinner = userNumbers.every((num, index) => num === randomNumbers[index]);

    // Display win or lose message
    if (isWinner) {
        document.getElementById('message').textContent = "You won!";
        document.getElementById('message').style.color = "green"; // Green for win
    } else {
        document.getElementById('message').textContent = "Try again!";
        document.getElementById('message').style.color = "red"; // Red for lose
    }
});
