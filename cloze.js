// FUNCTIONS
// Creating the constructor for the cloze-deleted flashcards
function ClozeCard(fullText, cloze, partial) {
	this.fullText = fullText;
	this.cloze = cloze;
	this.partial;
	this.partialCreate = function(cloze, fullText, partial) {
		if (this.fullText.indexOf(this.cloze) === -1) {
			console.log("Error - that doesn't exist in the full text.");
		}
		this.partial = this.fullText.replace(this.cloze, "...");
		return this.partial;
	};
};

/************************************************/
// MAIN PROCESSES
module.exports = ClozeCard;