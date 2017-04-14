// SETUP VARIABLES
// Including the FS npm package
var fs = require("fs");


/************************************************/
// FUNCTIONS
// Creating the constructor for the basic flashcards
function BasicReview(ID, front, back, ) {
  this.ID = ID;
  this.front = front;
  this.back = back;
};


/************************************************/
// MAIN PROCESSES
module.exports = BasicReview;