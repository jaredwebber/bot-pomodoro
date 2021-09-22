'use strict'

const fs = require('fs');
//const emoji = require('node-emoji');

//File Name Holding Output Strings
var options;
var emojiOptions = ["😀", "😊", "🙂", "😄", "😅", "😃", "😄", "😁", "👍", "💪"];

//Emoji Constants

//Returns emoji based on passed value
function getDifferenciator(duplicate){
	var len = emojiOptions.length;
	var random = Math.floor(Math.random() * len);
	return emojiOptions[random];
}

//Returns string from backToWork json obj
function getWorkMsg(duplicate){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.backToWork[random] + getDifferenciator(duplicate);
}

//Returns string from shortBreak json obj
function getShortBreakMsg(duplicate){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.shortBreak[random] + getDifferenciator(duplicate);
}

//Returns string from longBreak json obj
function getLongBreakMsg(duplicate){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.longBreak[random] + getDifferenciator(duplicate);
}

//Make needed functions available
module.exports = {getLongBreakMsg, getShortBreakMsg, getWorkMsg};
 
