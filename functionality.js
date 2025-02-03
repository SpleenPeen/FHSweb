// script.js
const preOut = document.getElementById('preOut');
const output = document.getElementById('output');
const input = document.getElementById('input');

// Focus the input field on page load
input.focus();

//make sure input is always focused
input.addEventListener('blur', () => {
    input.focus();
});

//screen object
const screen = {
  curScrn: 0,
  setScreen: function(scrn)
  {
    //change value
    this.curScrn = scrn;

    //clear screen
    output.innerHTML = '';

    //print default pre text
    switch (this.curScrn)
    {
      case 0:
        PrintMessage('This is a hack solver for the terminals in Fallout. <br><br>To enter a word simply write down the word and press enter, to clear all previous words type /c and to confirm your word selection press enter with a blank field.');
        break;
      case 1:
        break;
    }
  }
}

screen.setScreen(0);

//variables 
const words = [];

// Handle user input
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    const command = input.value.trim();
    input.value = ''; // Clear the input field
    preOut.innerHTML = '' //clear pre message;

    switch (screen.curScrn)
    {
      case 0:
        InputWords(command);
        break;
      case 1:
        InputGuesses(command);
        break;
    }

    // Scroll to the bottom of the terminal
    output.scrollTop = output.scrollHeight;
  }
});

function InputWords(command)
{
  if (command == "/c")
  {
    screen.setScreen(0);
    words.length = 0;
    PrintPreMsg('All words have been cleared');
    return;
  }

  if (command == "")
  {
    if (words.length < 1)
    {
      PrintErrorMsg('You must provide atleast 1 word');
      return;
    }
    screen.setScreen(1);
    return;
  }

  let word = PrepareWord(command);

  if (words.length == 0)
  {
    words.push(word);
    PrintMessage(`<br>Current words:<br>${word}`);
    return;
  }

  for(let i = 0; i < words.length; i++)
  {
    if (words[i] == word)
    {
      PrintErrorMsg('Word already in the list');
      return;
    }
  }

  if (word.length < words[0].length)
  {
    PrintErrorMsg('Word is too short');
    return;
  }
  else if (word.length > words[0].length)
  {
    PrintErrorMsg('Word is too long');
    return;
  }
  words.push(word);
  PrintMessage(word);
}

function InputGuesses(command)
{

}

function PrepareWord(inpt)
{
  let str = String(inpt);
  str = str.toUpperCase();
  let word = '';
  for(let i = 0; i < str.length; i++)
  {
    let curChar = str.charAt(i);
    if(/^[A-Za-z]+$/.test(curChar))
    {
      word += curChar;
    }
  }
  return word;
}

function PrintErrorMsg(msg){
  preOut.innerHTML += `<div><span id="error">${msg}</span></div>`;
}

function PrintMessage(msg)
{
  output.innerHTML += `<div><span>${msg}</span></div>`;
}

function PrintPreMsg(msg)
{
  preOut.innerHTML += `<div><span>${msg}</span></div>`;
}