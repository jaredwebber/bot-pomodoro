'use strict'

//Manage environment variables
require('dotenv').config();
//Access Twit api for tweet posting
const Twit = require('twit');
//Allow json writing
const fs = require('fs');
const DBFile = "./Database.json"

//Access tweetable phrases from output-gen file
const output = require("./output-gen.js");
//const { send, exit } = require('process');

//Session Time Lengths (minutes)
const WORK_TIME = 25;
const LONG_BREAK_TIME = 30;
const SHORT_BREAK_TIME = 5;

//Cloud Host Trigger Time (minutes)
const BOT_TICK_TIME = 10;
const TICK = 5;

//Command Line Parameter to Use for Local Host
const LOCAL_HOST = "local";
const COMMAND_LINE_ARG_INDEX = 2;

//Cloud Host Stages
const WORK_ONE = 0;
const SB_ONE = 1;
const WORK_TWO = 2;
const SB_TWO = 3;
const WORK_THREE = 4;
const SB_THREE = 5;
const WORK_FOUR = 6;
const LB = 7;

//Create new twit using env variables
var T = new Twit({
	consumer_key: process.env.API_KEY,
	consumer_secret: process.env.SECRET_KEY,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var msg; //Message to be tweeted
var db; //Database.json stored

//Send tweet to account, using message var contents
function sendTweet() {
	try {
		T.post('statuses/update', { status: msg }).then(resp => console.log(resp.data.text))
	} catch (e) {
		console.log(e)
	}
}

//Sleep function, minutes of sleep taken as parameter
function sleep(minutes) {
	var ms = minutes * 60 * 1000;//minutes * 60 sec/min * 1000 ms/sec
	return new Promise(resolve => setTimeout(resolve, ms));
}

//Local Host Function - Or Steady/Reliable Cloud Host
//Updates the tweet contents, sends tweets, and waits appropriate times between actions
async function beginSchedule() {
	//First 'Get to work' tweet
	msg = output.getWorkMsg();
	sendTweet();

	//Enter infinite loop
	while (true) {

		//loop 3 times break -> work
		for (var i = 0; i < 3; i++) {
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


//Run Program
beginSchedule();

