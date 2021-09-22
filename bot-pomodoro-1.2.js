'use strict'

require('dotenv').config();
var axios = require('axios');
var date = new Date();

//Access Twit api for tweet posting
const Twit = require('twit');
//Access tweetable phrases from output-gen file
const output = require("./output-gen-1.1.js");

//Create new twit using env variables
var T = new Twit({
	consumer_key: process.env.API_KEY, 
	consumer_secret: process.env.SECRET_KEY, 
	access_token: process.env.ACCESS_TOKEN, 
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var date; //Date obj used to check current time
var time; //Stores current time in legible string
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

//Update the legible time string using Date
function updateTime(){
	date = new Date();
	time = date.getMonth()+"/"+date.getDate()+", "+date.getHours()+":"+("0"+date.getMinutes()).slice(-2);
}

//Run the Program
beginSchedule();

//Handles running of program:
//Updates the tweet contents, sends tweets, and waits appropriate times between actions
async function beginSchedule(){
	//First 'Get to work' tweet
	updateTime();
	msg = output.getWorkMsg() + "\n{" + time +"}";
	sendTweet();

	//Enter infinite loop
	while(true){

		//loop 3 times break -> work
		for(var i = 0; i< 3; i++){
			await sleep(25);
			updateTime();
			msg = output.getShortBreakMsg()  + "\n{" + time +"}";
			sendTweet();
			
			await sleep(5);
			updateTime();
			msg = output.getWorkMsg() + "\n{" + time +"}";
			sendTweet();
		}

		await sleep(25);
		updateTime();
		msg = output.getLongBreakMsg() + "\n{" + time +"}";
		sendTweet();

		await sleep(30);
		updateTime();
		msg = output.getWorkMsg() + "\n{" + time +"}";
		sendTweet();
	}
}