require('dotenv').config();
var axios = require('axios');
var date = new Date();
var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
const Twit = require('twit');
const output = require("./output-gen-1.0.js");

var T = new Twit({
	consumer_key: process.env.API_KEY, 
	consumer_secret: process.env.SECRET_KEY, 
	access_token: process.env.ACCESS_TOKEN, 
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var msg; 

function sendTweet(){
	T.post('statuses/update', { status:msg})
}  

function sleep(minutes) {
	var ms = minutes*60*1000;
	return new Promise(resolve => setTimeout(resolve, ms));
}

function updateTime(){
	date = new Date();
	time = date.getMonth()+"/"+date.getDate()+", "+date.getHours()+":"+("0"+date.getMinutes()).slice(-2);
}


beginSchedule();

async function beginSchedule(){
	updateTime();
	msg = output.getWorkMsg() + "\n{" + time +"}";
	sendTweet();

	while(true){
		await sleep(25);
		updateTime();
		msg = output.getShortBreakMsg()  + "\n{" + time +"}";
		sendTweet();
		
		await sleep(5);
		updateTime();
		msg = output.getWorkMsg() + "\n{" + time +"}";
		sendTweet();

		await sleep(25);
		updateTime();
		msg = output.getShortBreakMsg()  + "\n{" + time +"}";
		sendTweet();

		await sleep(5);
		updateTime();
		msg = output.getWorkMsg() + "\n{" + time +"}";
		sendTweet();

		await sleep(25);
		updateTime();
		msg = output.getShortBreakMsg() + "\n{" + time +"}";
		sendTweet();

		await sleep(5);
		updateTime();
		msg = output.getWorkMsg() + "\n{" + time +"}";
		sendTweet();

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