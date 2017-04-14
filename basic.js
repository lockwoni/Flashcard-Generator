/*HW Notes: This is a simple application
-- The backend is the node application
-- API is not really an API; for this assignment, 
will get info from user through command line (ex: process.argv)
-- Will ask user questions (hint: user Inquirer)
-- Save info by writing to a text file (use fs.appendFile)
** The user is making the content for the flashcards
** Create the objects and store them some where
** Use constructors to encapsulate what the user is going to write*/
/************************************************/

// SETUP VARIABLES
// Including the FS npm package
var fs = require("fs");


/************************************************/
// FUNCTIONS
// Creating the constructor for the basic flashcards
function BasicCard(front, back) {
  this.front = front;
  this.back = back;
};


/************************************************/
// MAIN PROCESSES
module.exports = BasicCard;