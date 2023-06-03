/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    
    // loop over each item in the data
    for(let game of games)
    {
        
        // create a new div element, which will become the game card
        const gamecard = document.createElement('div');//create a new variable called gamecard to hold our new div element

        // add the class game-card to the list

        gamecard.classList.add("game-card");//adds class game-card to the gamecard class list

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        gamecard.innerHTML = `
            <h1>Game Name: ${game.name}</h1>
            <img class="game-img" src="${game.img}" alt ="Game image"/>
            <p>Description: ${game.description}</p>
        `;

        // append the game to the games-container

        gamesContainer.appendChild(gamecard);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc,games)=>{
    return acc + games.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

const contribDiv = document.createElement('div');
contribDiv.innerHTML=`
<p>${totalContributions.toLocaleString('en-US')}</p>
`;
contributionsCard.appendChild(contribDiv);

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc,games)=>{
    return acc + games.pledged;
},0);

// set inner HTML using template literal

const raisedDiv = document.createElement('div');
raisedDiv.innerHTML=`
<p>$${totalRaised.toLocaleString('en-US')}</p>
`;
raisedCard.appendChild(raisedDiv);

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const gamesDiv = document.createElement('div');
let gameNum = GAMES_JSON.length;
gamesDiv.innerHTML=`
    <p>${gameNum}</p>
`;
gamesCard.appendChild(gamesDiv);

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfNotMet = GAMES_JSON.filter((game)=>{
        return game.goal > game.pledged;
    });
    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfNotMet);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfMet = GAMES_JSON.filter((game)=>{
        return game.goal <= game.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfMet);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let listOfNotMet = GAMES_JSON.filter((game)=>{
    return game.goal > game.pledged;
});

const unMet = listOfNotMet.length;


// create a string that explains the number of unfunded games using the ternary operator
let stringUnMet = `
 A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${11-unMet} games. Currently, ${unMet>1 ? unMet+" games remain unfunded!" : unMet+" game remains unfunded."}
`;

// create a new DOM element containing the template string and append it to the description container

let parUnMet = document.createElement('div');
parUnMet.innerHTML=`
    <p>${stringUnMet}</p>
`;
descriptionContainer.appendChild(parUnMet);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [firstGame, secondGame,...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

let topPledge = document.createElement('div');
topPledge.innerHTML=`
    <p>The highest pledge goes to ${firstGame.name}</p>
`;

firstGameContainer.appendChild(topPledge);

// do the same for the runner up item

let secondPledge = document.createElement('div');
secondPledge.innerHTML=`
    <p>The second highest pledge goes to ${secondGame.name}</p>
`;

secondGameContainer.appendChild(secondPledge);
