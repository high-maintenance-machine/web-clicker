function handleClick() {
    const displayNumber = document.getElementById("display-main-number");
    const currentValue = parseInt(displayNumber.innerText); // Convert to integer
    displayNumber.innerText = currentValue + 1; 
}