

const BACK_TO_WORK = "Time to work hard for 25 minutes!";
const SHORT_BREAK = "Take a 5 minute break!";
const LONG_BREAK = "Long break! Take 30 minutes off!";


function getWorkMsg(){
	return BACK_TO_WORK;
}

function getShortBreakMsg(){
	return SHORT_BREAK;
}

function getLongBreakMsg(){
	return LONG_BREAK;
}


module.exports = {getLongBreakMsg, getShortBreakMsg, getWorkMsg};
 
