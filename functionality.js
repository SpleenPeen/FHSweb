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
        PrintValidGuesses();
        break;
    }
  }
}

screen.setScreen(0);

//variables 
const words = [];
const validWords = [];

// Handle user input
input.addEventListener('keydown', (e) => {
  try
  {
    let audio = new Audio('Sounds/ClickyClacky/clacky ' + Math.round(Math.random() * 9) + '.wav');
    audio.play();
  }
  catch (ex)
  {
    PrintErrorMsg(ex);
  }
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

const guesses = {
  index: [],
  correct: []
};

function PrintValidGuesses()
{
  output.innerHTML = '';
  preOut.innerHTML = '';
  validWords.length = 0;
  PrintMessage('Here are some valid guesses:');
  for (let i = 0; i < words.length; i++)
  {
    let valid = true;
    for (let j = 0; j < guesses.index.length; j++)
    {
      let matching = 0;
      for (let k = 0; k < words[0].length; k++)
      {
        if (words[i].charAt(k) == words[j].charAt(k))
        {
          matching++;
          if (matching > guesses.correct[j])
          {
            valid = false;
            break;
          }
        }
      }
      if (matching != guesses.correct[j])
      {
        valid = false;
        break;
      }
    }
    if (valid)
    {
      validWords.push(i);
      PrintMessage(`${i}: ${words[i]}`);
    }
  }
  PrintMessage('<br>Type in the index of your guess.');
}

function InputGuesses(command)
{
  //convert input to a number
  let num = PrepareNumber(command);

  //get correct letters
  if (guesses.index.length > guesses.correct.length)
  {
    if (isNaN(num))
    {
      PrintErrorMsg('Not a number');
      return;
    }

    if (num > words[0].length)
    {
      PrintErrorMsg('Number is too big');
    }

    guesses.correct.push(num);
    PrintValidGuesses();

    return;
  }

  //get guess index
  if (isNaN(num))
  {
    let word = PrepareWord(command);
    for (let i = 0; i < validWords.length; i++)
    {
      if (word == words[validWords[i]])
      {
        num = validWords[i];
      }
    }
    if (isNaN(num))
    {
      PrintErrorMsg('Not a number');
      return;
    }
  }

  let validInd = false;
  for (let i = 0; i < validWords.length; i++)
  {
    if (validWords[i] == num)
    {
      validInd = true;
      break;
    }
  }

  if (!validInd)
  {
    PrintErrorMsg('Not a valid index');
    return;
  }

  guesses.index.push(num);
  PrintMessage(num);
  PrintMessage('<br>Type in the correct amount of letters.');
}

function PrepareWord(inpt)
{
  let str = String(inpt);
  str = str.toUpperCase();
  let word = '';
  for(let i = 0; i < str.length; i++)
  {
    let curChar = str.charAt(i);
    if(/^[A-Z]+$/.test(curChar))
    {
      word += curChar;
    }
  }
  return word;
}

function PrepareNumber(inpt)
{
  let str = String(inpt);
  let word = '';
  for(let i = 0; i < str.length; i++)
  {
    let curChar = str.charAt(i);
    if(/^[0-9]+$/.test(curChar))
    {
      word += curChar;
    }
  }
  return parseInt(word);
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