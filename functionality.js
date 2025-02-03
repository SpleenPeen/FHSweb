// script.js
const output = document.getElementById('output');
const input = document.getElementById('input');

// Focus the input field on page load
input.focus();

//make sure input is always focused
input.addEventListener('blur', () => {
    input.focus();
});

// Handle user input
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    const command = input.value.trim();
    input.value = ''; // Clear the input field

    // Display the command in the terminal
    output.innerHTML += `<div><span id="prompt">${command}</div>`;

    // Process the command
    processCommand(command);

    // Scroll to the bottom of the terminal
    output.scrollTop = output.scrollHeight;
  }
});

// Function to process commands
function processCommand(command) {
  let response = '';

  switch (command.toLowerCase()) {
    case 'help':
      response = 'Available commands: help, about, clear';
      break;
    case 'about':
      response = 'This is a terminal-like website built with HTML, CSS, and JavaScript.';
      break;
    case 'clear':
      output.innerHTML = ''; // Clear the terminal
      return; // Exit the function early
    default:
      response = `Command not found: ${command}`;
  }

  // Display the response
  output.innerHTML += `<div>${response}</div>`;
}