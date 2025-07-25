$(document).ready(function () 
{
   // ========================
   // Game Data
   // ========================
    const possibleWords = 
    [
    { word: "javascript", hint: "A programming language" },
    { word: "hangman",    hint: "This game" },
    { word: "computer",   hint: "An electronic device" },
    { word: "jquery",     hint: "A JavaScript library" },
    { word: "elephant",   hint: "A large mammal with a trunk" },
    { word: "astronaut",  hint: "Travels to space" },
    { word: "volcano",    hint: "Erupts with lava" },
    { word: "pyramid",    hint: "Ancient Egyptian structure" },
    { word: "microscope", hint: "Magnifies tiny objects" },
    { word: "rainbow",    hint: "Appears after rain" },
    { word: "bicycle",    hint: "Two-wheeled vehicle" },
    { word: "giraffe",    hint: "Tallest land animal" },
    { word: "computer",   hint: "Electronic device for work and play" },
    { word: "kangaroo",   hint: "Australian animal with a pouch" },
    { word: "lighthouse", hint: "Guides ships at night" },
    { word: "saxophone",  hint: "Jazz instrument" },
    { word: "hurricane",  hint: "Powerful rotating storm" },
    { word: "penguin",    hint: "Flightless bird in Antarctica" },
    { word: "backpack",   hint: "Carries school supplies" },
    { word: "waterfall",  hint: "Water dropping over a cliff" },
    { word: "keyboard",   hint: "Computer input device" },
    { word: "hamburger",  hint: "Popular sandwich with a patty" },
    { word: "calendar",   hint: "Tracks days and months" },
    { word: "submarine",  hint: "Underwater vessel" }
    ];

  let selectedWord     = "";
  let displayedWord    = [];
  let incorrectGuesses = 0;
  const maxIncorrect   = 6;

  /*
  Game Setup
  */
  function setupGame()
   {
    resetImages();
    $(".blank-spaces").empty();
    $(".letters button").show();

    pickWord();
    makeBlankSpaces(selectedWord);

    $(".letters button").off("click").on("click", letterGuess);

    $(".game-messages p").text("Hint: " + hintText);
  }

  /*
  Pick a Random Word
  */
  let hintText = "";
  function pickWord() 
  {
    const choice = possibleWords[Math.floor(Math.random() * 
                                 possibleWords.length)];

    selectedWord     = choice.word.toLowerCase();
    hintText         = choice.hint;
    incorrectGuesses = 0;
  }

   /*
   Create Blank Spaces
   */
  function makeBlankSpaces(word)
   {
    displayedWord = [];
    for(let i = 0; i < word.length; i++) 
        {
            displayedWord.push("_");
            $(".blank-spaces").append("<span></span>");
    }
  }

   /*
   Letter Guess Handler
   */
  function letterGuess() 
  {
    const letter = $(this).text().toLowerCase();

    if(letterInWord(letter))
         {
            fillInBlanks(letter);

      if(winner())
         {
            $(".game-messages p").text("You WON! The word was: " + selectedWord.toUpperCase());
            $(".letters button").off("click");
      }
    }
     else 
    {
      showNextImage();

      if(gameOver()) 
        {
        revealWord();
        $(".letters button").off("click");
      }
    }
    $(this).hide(500);
  }

   /*
   Letter Check
   */
  function letterInWord(letter)
   {
    return selectedWord.includes(letter);
   }

   /*
   Fill in Blank
   */
  function fillInBlanks(letter) 
  {
    for(let i = 0; i < selectedWord.length; i++) 
        {
            if(selectedWord[i] === letter) 
                {
                    displayedWord[i] = letter.toUpperCase();
                    $(".blank-spaces span").eq(i).text(letter.toUpperCase());
      }
    }
  }

   /*
   Win Check
   */
  function winner() 
  {
    return displayedWord.join("").toLowerCase() === selectedWord;
  }

   /*
   Lose Check
   */
    function gameOver() 
    {
         return incorrectGuesses >= maxIncorrect;
    }

    function revealWord() 
    {
    $(".blank-spaces").empty();
    for(let i = 0; i < selectedWord.length; i++) 
        {
            $(".blank-spaces").append("<span>" + selectedWord[i].toUpperCase() + "</span>");
        }
    $(".game-messages p").text("You LOST! The word was: " + selectedWord.toUpperCase());
    }
    
   /*
   Image Handling
   */
  function showNextImage() 
  {
    incorrectGuesses++;

    let imageNum; 

     if(incorrectGuesses <= maxIncorrect)
    {
      imageNum = incorrectGuesses;
    }
    else
    {
      imageNum = maxIncorrect;
    }

    const $img = $(".hangman-image img");
    const newSrc = "../final project/images/hangman" + imageNum + ".png";

    $img.fadeOut(200, function ()
    {
    $img.attr("src", newSrc).fadeIn(200);
    });

    $(".hangman-image img").attr("src", "../final project/images/hangman" + imageNum + ".png");
  }

   function resetImages() 
   {
    incorrectGuesses = 0;
    $(".hangman-image img").attr("src", "../final project/images/hangman0.png");
  }

   /*
   Reset Welcome Screen
   */
    function fillInWelcomeWord() 
    {
    $(".blank-spaces").empty();

    const welcomeWord = "CLICKPLAYAWORD";

    for(let i = 0; i < welcomeWord.length; i++) 
          {
            $(".blank-spaces").append("<span>" + welcomeWord[i] + "</span>");
          }
    $(".letters button").show();
  }

   /*
   Reset Game
   */ 
    function resetGame()
    {
    resetImages();
    fillInWelcomeWord();

    $(".letters button").off("click");
    $(".game-messages p").text
    ('Welcome to Elisha Hangman. Click "Play a Word" to start playing!');
  }

   /*
   Event Listeners
   */ 
  $(".play").click(setupGame);
  $(".reset").click(resetGame);

  fillInWelcomeWord();
  resetImages();
  $(".game-messages p").text
  ('Welcome to Elisha Hangman. Click "Play a Word" to start playing!');
})
