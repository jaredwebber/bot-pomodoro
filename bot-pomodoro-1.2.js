'use strict'

//Manage environment variables
require('dotenv').config();
//Access Twit api for tweet posting
const Twit = require('twit');
//Access tweetable phrases from output-gen file
const output = require("./output-gen-1.1.js");

//Session Time Lengths (minutes)
const WORK_TIME = 25;
const LONG_BREAK_TIME = 30;
const SHORT_BREAK_TIME = 5;

//Create new twit using env variables
var T = new Twit({
	consumer_key: process.env.API_KEY, 
	consumer_secret: process.env.SECRET_KEY, 
	access_token: process.env.ACCESS_TOKEN, 
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var msg; //Message to be tweeted

//Send tweet to account, using message var contents
function sendTweet(){
	T.post('statuses/update', { status:msg})
}  

//Sleep function, minutes of sleep taken as parameter
function sleep(minutes) {
	var ms = minutes*60*1000;//minutes * 60 sec/min * 1000 ms/sec
	return new Promise(resolve => setTimeout(resolve, ms));
}

//Handles running of program:
//Updates the tweet contents, sends tweets, and waits appropriate times between actions
async function beginSchedule(){
	console.log("starting");
	//First 'Get to work' tweet
	msg = output.getWorkMsg();
	sendTweet();

	//Enter infinite loop
	while(true){

		//loop 3 times break -> work
		for(var i = 0; i< 3; i++){
			await sleep(WORK_TIME);
			msg = output.getShortBreakMsg();
			sendTweet();
			
			await sleep(SHORT_BREAK_TIME);
			msg = output.getWorkMsg();
			sendTweet();
		}

		await sleep(WORK_TIME);
		msg = output.getLongBreakMsg();
		sendTweet();

		await sleep(LONG_BREAK_TIME);
		msg = output.getWorkMsg();
		sendTweet();
	}
}

//Run the Program
beginSchedule();

