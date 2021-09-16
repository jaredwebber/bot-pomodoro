require('dotenv').config();
var axios = require('axios');
var date = new Date();
var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
const Twit = require('twit');

var T = new Twit({
	consumer_key: process.env.API_KEY, 
	consumer_secret: process.env.SECRET_KEY, 
	access_token: process.env.ACCESS_TOKEN, 
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const BACK_TO_WORK = "Time to work hard for 25 minutes!";
const SHORT_BREAK = "Take a 5 minute break!";
const LONG_BREAK = "Long break! Take 30 minutes off!";

updateTime();
var msg = BACK_TO_WORK + "\n{"+time+"}";

function sendTweet(){
	T.post('statuses/update', { status:msg})
}  

function sleep(minutes) {
	var ms = minutes*60*1000;
	return new Promise(resolve => setTimeout(resolve, ms));
}

sendTweet();
loop();

function updateTime(){
	date = new Date();
	time = date.getMonth()+"/"+date.getDate()+", "+date.getHours()+":"+("0"+date.getMinutes()).slice(-2);
}

async function loop(){
	while(true){
		await sleep(25);
		updateTime();
		msg = SHORT_BREAK + "\n{" + time +"}";
		sendTweet();
		
		await sleep(5);
		updateTime();
		msg = BACK_TO_WORK + "\n{" + time +"}";
		sendTweet();

		await sleep(25);
		updateTime();
		msg = SHORT_BREAK + "\n{" + time +"}";
		sendTweet();

		await sleep(5);
		updateTime();
		msg = BACK_TO_WORK + "\n{" + time +"}";
		sendTweet();

		await sleep(25);
		updateTime();
		msg = SHORT_BREAK + "\n{" + time +"}";
		sendTweet();

		await sleep(5);
		updateTime();
		msg = BACK_TO_WORK + "\n{" + time +"}";
		sendTweet();

		await sleep(25);
		updateTime();
		msg = LONG_BREAK + "\n{" + time +"}";
		sendTweet();

		await sleep(30);
		updateTime();
		msg = BACK_TO_WORK + "\n{" + time +"}";
		sendTweet();
	}
}