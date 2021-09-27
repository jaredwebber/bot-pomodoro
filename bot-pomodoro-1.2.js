'use strict'

//Manage environment variables
require('dotenv').config();
//Access Twit api for tweet posting
const Twit = require('twit');
//Allow json writing
const fs = require('fs');
const DBFile = "./Database.json"

//Access tweetable phrases from output-gen file
const output = require("./output-gen-1.1.js");
const { send, exit } = require('process');

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
function sendTweet(){
	T.post('statuses/update', { status:msg})
}  

//Sleep function, minutes of sleep taken as parameter
function sleep(minutes) {
	var ms = minutes*60*1000;//minutes * 60 sec/min * 1000 ms/sec
	return new Promise(resolve => setTimeout(resolve, ms));
}

//triggered every time the program is run, bot triggers every 10 minutes - Cloud Host
async function trigger(){
	db = require("./Database.json");

	var currStage = db.currentStage.stage;
	var currRemaining = db.currentStage.minRemaining
	var minRemain = currRemaining - BOT_TICK_TIME;
	//need to check db.json for current stage, and if action(s) required, schedule them
	//then call update to set next json stage info

	if(currStage == -1){//init value - first program call
		msg = output.getWorkMsg();
		sendTweet();
		currStage = 0;
		minRemain = WORK_TIME;
	} else if(currRemaining < BOT_TICK_TIME){
		console.log("Yes")
		//switch statement for stages
		switch(currStage){
			case WORK_ONE:
			case WORK_TWO:
			case WORK_THREE: 
				if(currRemaining = 0){//Stage Finished
					//Tweet Short Break Stage
					msg = output.getShortBreakMsg();
					sendTweet();
					
					//Sleep 5 mins
					sleep(SHORT_BREAK_TIME);

					//Tweet Back To Work
					msg = output.getWorkMsg();
					sendTweet();

					//Double Increment JSON
					currStage += 2;
					minRemain = WORK_TIME;

				}else{//5 mins remaining
					//sleep 5 minutes
					sleep(TICK);

					//Tweet Short Break
					msg = output.getShortBreakMsg();
					sendTweet()

					//Single Increment JSON File
					currStage++;
					minRemain = 0;
				}
			break;

			case SB_ONE:
			case SB_TWO:
			case SB_THREE: 
				if(currRemaining = 0){//Stage Finished
					//Tweet Back To Work
					msg = output.getWorkMsg();
					sendTweet();
					
					//Double Increment JSON
					currStage++;
					minRemain = WORK_TIME;

				}else{//5 mins remaining
					//sleep 5 minutes
					sleep(TICK);

					//Tweet Back To Work
					msg = output.getWorkMsg();
					sendTweet();

					//Single Increment JSON File
					currStage++;
					minRemain = WORK_TIME - 5;
				}
			break;

			case WORK_FOUR: 
				if(currRemaining = 0){//Stage Finished
					//Tweet Short Break Stage
					msg = output.getLongBreakMsg();
					sendTweet();
					
					//Increment JSON
					currStage = LB;
					minRemain = LONG_BREAK_TIME;

				}else{//5 mins remaining
					//sleep 5 minutes
					sleep(TICK);

					//Tweet Short Break Stage
					msg = output.getLongBreakMsg();
					sendTweet();

					//Set JSON
					currStage = LB;
					minRemain = LONG_BREAK_TIME - TICK;
				}

			break;

			case LB: 
				if(currRemaining = 0){//Stage Finished
					//Tweet Back To Work
					msg = output.getWorkMsg();
					sendTweet();
					
					//Double Increment JSON
					currStage = WORK_ONE;
					minRemain = WORK_TIME;

				}else{//5 mins remaining
					//sleep 5 minutes
					sleep(TICK);

					//Tweet Back To Work
					msg = output.getWorkMsg();
					sendTweet();
					
					//Increment JSON
					currStage = WORK_ONE;
					minRemain = WORK_TIME - TICK;
				}
			break;
			
		}
	}

	//Send values to be updated in JSON
	updateDB(currStage, minRemain);
}

//Update JSON values in Database.json - passed via parameter
function updateDB(stage, minRemain){
	var file = JSON.parse(fs.readFileSync(DBFile).toString());
	file.currentStage.stage = stage;
	file.currentStage.minRemaining = minRemain;
	fs.writeFileSync(DBFile, JSON.stringify(file));
}

//Local Host Function
//Updates the tweet contents, sends tweets, and waits appropriate times between actions
async function beginSchedule(){
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


//Run Program
if(process.argv[COMMAND_LINE_ARG_INDEX] == LOCAL_HOST){
	beginSchedule();
}else{
	trigger();
}

