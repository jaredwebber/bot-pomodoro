'use strict'

const fs = require('fs');
//const emoji = require('node-emoji');

//File Name Holding Output Strings
var options;
const EMOJIS = ["😀", "😊", "🙂", "😄", "😅", "😃", "😄", "😁", "👍", "💪"];

//Emoji Constants

//Returns random emoji from constant array EMOJIS
function getDifferenciator(){
	var len = EMOJIS.length;
	var random = Math.floor(Math.random() * len);
	return EMOJIS[random];
}

//Returns string from backToWork json obj
function getWorkMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.backToWork[random] + " " + getDifferenciator(duplicate);
}

//Returns string from shortBreak json obj
function getShortBreakMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.shortBreak[random] + " " + getDifferenciator(duplicate);
}

//Returns string from longBreak json obj
function getLongBreakMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.longBreak[random] + " " + getDifferenciator(duplicate);
}

//Make needed functions available
module.exports = {getLongBreakMsg, getShortBreakMsg, getWorkMsg};
 
