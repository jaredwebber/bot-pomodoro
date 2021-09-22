'use strict'

const fs = require('fs');

//Temporary strings
const BACK_TO_WORK = "Time to work hard for 25 minutes!";
const SHORT_BREAK = "Take a 5 minute break!";
const LONG_BREAK = "Long break! Take 30 minutes off!";

//File Names Holding Output Strings
const OPTIONS = require('./OutputOptions.json');

//Returns string from WorkOutput.json
function getWorkMsg(){
	try{
		const string = fs.readFileSync(OPTIONS);
		console.log(string);

		const read = JSON.parse(string);
		console.log(read);
	}catch{
		return;
	}
	
	//var array = JSON.parse(WORK_OUTPUT);
	//var random = Math.random()*array.length;
	//return array[random];

}

//Returns string from ShortBreakOutput.json
function getShortBreakMsg(){
	return SHORT_BREAK;
}

//Returns string from LongBreakOutput.json
function getLongBreakMsg(){
	return LONG_BREAK;
}

getWorkMsg()
//console.log(getWorkMsg());

//Make needed functions available
module.exports = {getLongBreakMsg, getShortBreakMsg, getWorkMsg};
 
