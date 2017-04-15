// SETUP VARIABLES
// Including the inquirer & FS npm packages
var inquirer = require("inquirer");
var fs = require("fs");

// Using the require keyword to access the constructors
var BasicCard = require("./basic.js");
var ClozeCard = require("./cloze.js");

// Creating variables to store data
var dataArr;
var flashcard = [];
var question;
var answer;


/************************************************/
// FUNCTIONS
var newBasic = function(front, back) {
	// Creating a new object from the BasicCard constructor and user-input
	var newBasic = new BasicCard(front, back);
	// Storing the user input
	var basicTxt = "Basic|" + front + "|" + back + ";\n";
	fs.appendFileSync("log.txt", basicTxt);
	// Console logging the new instance of the BasicCard constructor
	console.log("\nQuestion: " + newBasic.front);
	console.log("\nAnswer: " + newBasic.back);
};

var newCloze = function(fullText, cloze) {
	// Creating a new object from the ClozeCard constructor and user-input
	var newCloze = new ClozeCard(fullText, cloze);
	newCloze.partialCreate(cloze, fullText);
	// Storing the user input
	var clozeTxt = "Cloze|" + newCloze.partial + "|" + cloze + "|" + fullText + ";\n";
	fs.appendFileSync("log.txt", clozeTxt);
	// Console logging the new instance of the ClozeCard constructor
	console.log("\nFull text: " + newCloze.fullText);
	console.log("\nPartial text: " + newCloze.partial);
	console.log("\nCloze: " + newCloze.cloze);
};

// Creating an initial prompt to determine whether the user will be creating or studying flashcards
var initialPrompt = function() {	
	inquirer.prompt([
		{
			type: "list",
			message: "Would you like to study or create flashcards?",
			name: "action",
			choices: ["Study", "Create"]
		}
	]).then(function(user) {
		console.log("*******************************");
	  console.log("\nLet's begin.\n");
		console.log("*******************************");
		
		if (user.action === "Create") {
			// Calling the createFlashcards() function if the user chose 'create'
			createType();
		}
		else {
			// Calling the studyFlashcards() function if the user chose 'study'
			studyFlashcards();
		}
	});
};

// After the user selects "create", creating a prompt to determine whether the user will create basic or cloze-deleted flashcards
var createType = function() {
	inquirer.prompt([
		{
			type: "list",
			message: "Will this be a basic (question/answer) or cloze deleted flashcard?",
			name: "action",
			choices: ["Basic", "Cloze"]
		}
	]).then(function(user) {
		if (user.action === "Basic") {
			// Calling the createBasicFlashcards() function if the user chose 'basic'
			createBasicFlashcards();
		}
		else {
			// Calling the createClozeFlashcards() function if the user chose 'cloze'
			createClozeFlashcards();
		}
	});
};

// Creating a prompt to ask the user for the information they would like added to the Basic flashcards
var createBasicFlashcards = function() {
	inquirer.prompt([
		{
			type: "input",
			message: "What question would you like to add to your flashcards?",
			name: "question"
		},
		{
			type: "input",
			message: "What is the answer to this question?",
			name: "answer"
		},
		{
		  type: "confirm",
		  message: "Would you like to create another flashcard?",
		  name: "confirmCreate",
		  default: true
		}
	]).then(function(user) {
		// Logging the user-inputted info as a JSON
		console.log(JSON.stringify(user, null, 2));
		// Making a new instance of the BasicCard constructor
		newBasic(user.question, user.answer);

		if (user.confirmCreate) {
			// Calling the createFlashcards() function to run again
			createBasicFlashcards();
		}
	  else {
	  	// Letting the user know their flashcards have been stored
		  console.log("\n*******************************");
	    console.log("\nYour flashcards are ready to study.\n");
		  console.log("*******************************");
	  }
	})
};

// Creating a prompt to ask the user for the information they would like added to the Cloze flashcards
var createClozeFlashcards = function() {
	inquirer.prompt([
		{
			type: "input",
			message: "What is the full-text that you would like add to your flashcards?",
			name: "fullText"
		},
		{
			type: "input",
			message: "What word/phrase would you like removed?",
			name: "cloze"
		},
		{
		  type: "confirm",
		  message: "Would you like to create another flashcard?",
		  name: "confirmCreate",
		  default: true
		}
	]).then(function(user) {
		// Logging the user-inputted info as a JSON
		console.log(JSON.stringify(user, null, 2));
		// Making a new instance of the ClozeCard constructor
		newCloze(user.fullText, user.cloze);

		if (user.confirmCreate) {
			// Calling the createFlashcards() function to run again
			createClozeFlashcards();
		}
	  else {
	  	// Letting the user know their flashcards have been stored
		  console.log("\n*******************************");
	    console.log("\nYour flashcards are ready to study.\n");
		  console.log("*******************************");
	  }
	})
};

// If the user selects "study", running through the flashcards to study
var studyFlashcards = function() {
	fs.readFile(
		"log.txt", 
		"utf8", 
		function(error, data) {
			if (error) {
				console.log(error);
			}
			// Splitting the stored data and storing each string in an array
			dataArr = data.split(";\n");
			// Storing the data into separate arrays by flashcard
			for (var i = 0; i < dataArr.length; i++) {
				flashcard[i] = dataArr[i].split("|");
			}
			// Storing a random flashcard's Q&A
			var index = Math.floor(Math.random() * (flashcard.length - 1));
			question = flashcard[index][1];
			answer = flashcard[index][2];
			
			// Outputting the question
			console.log("\nQuestion: %s\n",question);

			// Confirming whether the user is ready to see the answer
			inquirer.prompt([
				{
				  type: "confirm",
				  message: "Are you ready to see the answer?",
				  name: "confirmCreate",
				  default: true
				}
			]).then(function(user) {
				if (user.confirmCreate) {
					// Displaying the answer, if ready
					console.log("\nAnswer: %s\n",answer);
					studyFlashcards();
				}
				else {
			  	// Displaying the default message, if not ready
				  console.log("\n*******************************");
			    console.log("\nThat's okay. Study a bit more and then try again.\n");
				  console.log("*******************************");
				}
			});
		}
	)
};


/************************************************/
// MAIN PROCESSES
// Calling the initialPrompt() function
initialPrompt();