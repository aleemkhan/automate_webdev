
/*
	displayConsoleLog decides if the consoleLog method prints the output.
*/

var displayConsoleLog = true;

/*
	function: consoleLog
	@input: obj (Object)

	Description: this method prints the obj on console if displayConsoleLog flag is set to true.
*/

function consoleLog(obj){
	if(displayConsoleLog){
		console.log(obj);
	}
}


/*
	function: getItem
	@input: key (string)
	@output: JSON string

	Description: this method gets data from the localStorage and returns JSON string.
*/

function getItem(key){
	return localStorage.getItem(key);
}


/*
	function: setItem
	@input: key (string), value (JSON string)
	
	Description: this method stores data to the localStorage.
*/

function setItem(key, value){
	localStorage.setItem(key, value);
}

/*
	function: removeItem
	@input: key (string)
	
	Description: this method deletes data from the localStorage.
*/

function removeItem(key){
	localStorage.removeItem(key);
}

/*
	function: toString
	@input: obj (Object)
	@output: JSON string

	Description: this method converts an object to a JSON string.
*/

function toString(obj){
	return JSON.stringify(obj);
}


/*
	function: toObject
	@input: str (JSON string)
	@output: JSON Object

	Description: this method converts a JSON string to an object.
*/
function toObject(str){
	return JSON.parse(str);
}


