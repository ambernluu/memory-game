const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
    event.target.classList.toggle("flipped");
   
    console.log(`# cards flipped: ${document.getElementsByClassName("flipped").length}`);
    
    if((document.getElementsByClassName("flipped").length) == 2){
      console.log('we have two cards flipped');
      const elementArray = Array.from(document.getElementsByClassName("flipped"));
      console.log(elementArray);

      //check to see if the cards match
      //if cards match, switch class to match and keep face up
      if(checkIfMatch(elementArray)){
        elementArray.forEach((element) => element.classList.add('match'));
        setTimeout(() => elementArray.forEach((element) => element.classList.remove('flipped')), 1500);
        console.log(Array.from(document.getElementsByClassName("match")).length);
        if(Array.from(document.getElementsByClassName("match")).length == 10){
          alert("YOU WON!!!");
        }
      }
      
      //No match - remove 'flipped' class to turn the cards back over
      else{
        setTimeout(() => elementArray.forEach((element) => element.classList.remove('flipped')), 1500);
      }
    } 
}

function checkIfMatch(elementArray){
  if(elementArray[0].className == elementArray[1].className){
    console.log("WE HAVE A MATCH!");
    return true;
  }
  
  else{
    console.log('bummer no match');
  return false;
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
