// CREATE A STARTING POINT (running total) FOR WHEN WE INPUT &/OR PERFORM MATH ON NUMBERS

// WE NEED TO KEEP TRACK OF WHAT USER IS TYPING IN (buffer).  WE MAKE IT A STRING HERE, SINCE THAT'S WHAT IT WILL OUTPUT TO ANYWAY (it's a string in HTML)

// HAVE TO KEEP TRACK OF WHAT OPERATOR WAS PREVIOUSLY/LAST PRESSED (previous operator [12 + 27]) WE NEED TO KNOW ITS PLUS IN ORDER TO GIVE BACK CORRECT ANSWER

// WE BIND SCRREN WITH A QUERY SELECTOR

// WE BIND UP THE EVENT LISTENER AT THE TOP-LEVEL / THE CONTAINER OF ALL  BUTTONS LEVEL (calc-buttons)

// WE CREATE A FUNCTION (button click) THAT CHECKS WHAT VALUE IS -- SYMBOL OR NUMBER

// WE CREATE TWO FUNCTIONS (handle number & handle value) THAT TAKE IN WHAT VALUE IS FOR BUTTON CLICK -- SYMBOL OR NUMBER

// IF THE VALUE FOR BUTTONCLICK IS NAN WE PUT THE VALUE OF THE SYMBOL INTO THE FUNCTION (handle symbol)

// (handle number) IF THE VALUE IS A NUMBER AND THE BUFFER IS 0, WE REPLACE 0 WITH THIS VALUE.  IF THE BUFFER IS A NUMBER OTHER THAN 0, WE APPEND THIS VALUE TO THE NUMBER IN THE BUFFER  ex. if 7 is already there & we press 5 now we have 75

// (handle symbol) WE CREATE A SWITCH STATEMENT FOR THIS FUNCTION

// WE CREATE A FUNCTION (rerender) TO DISPLAY THE TEXT IN BUFFER TO THE SCREEN

// WE CREATE A FUNCTION (flush operation) WHICH COMMITS TO THE NUMBER WE HAD IN THE BUFFER 

// WE USE PARSEINT BUFFER TO TURN BUFFER INTO A NUMBER & THEN PASS IT INTO FLUSH OPERATION


let runningTotal = 0;

let buffer = "0";

let previousOperator = null; // nothing has been previously assigned here

const screen = document.querySelector(".screen");



/***** CALC-BUTTONS EVENT LISTENER *****/

document.querySelector('.calc-buttons').addEventListener("click", function(event) {
	buttonClick(event.target.innerText); 
	//value usually assoc with inputs & here we want innertext of the button
});


/***** BUTTON CLICK FUNCTION *****/

function buttonClick(value) {
	if(isNaN(parseInt(value))) {
		handleSymbol(value);
	}
	else {
		handleNumber(value);
	}
	rerender();
}


/***** HANDLE NUMBER / SYMBOL FUNCTIONS *****/

function handleNumber(value) {
	if(buffer === "0") {
		buffer = value;
	}
	else {
		buffer += value;
	}	
}


function handleSymbol(value) {
	switch (value) {
	  case "C":
	    buffer = "0";
	    runningTotal = 0;
	    previousOperator = null;
	    break;
	    
 	  case "=":
 	    if(previousOperator === null) {
	 	    return;
 	    }
 	    flushOperation(parseInt(buffer));
 	    previousOperator = null;
 	    buffer = "" + runningTotal;
 	    runningTotal = 0;
 	    break;
 	    
 	  case "←":
 	     if(buffer.length === 1) {
	 	     buffer = "0";
 	     }
 	     else {
	 	     buffer = buffer.substring(0, buffer.length - 1);
 	     }
 	     break;
 	     
 	  default:
 	     handleMath(value);
 	     break;
	}	
}

function handleMath(value) {
	const intBuffer = parseInt(buffer);
	if(runningTotal === 0) {
		runningTotal = intBuffer;
	}
	else {
		flushOperation(intBuffer);
	}
	
	previousOperator = value;
	
	buffer = "0";
}


function flushOperation(intBuffer) {
	if (previousOperator === "+") {
		runningTotal += intBuffer;
	}
	else if (previousOperator === "-") {
		runningTotal -= intBuffer;
	}
	else if (previousOperator === "÷") {
		runningTotal /= intBuffer;
	}
	else {
		previousOperator === "×"
		runningTotal *= intBuffer;
	}
}

function rerender() {
	screen.innerText = buffer;
}
