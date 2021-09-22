'use strict'

const fs = require('fs');
//const emoji = require('node-emoji');

//File Name Holding Output Strings
var options;

//Returns random emoji from constant array EMOJIS
function getDifferenciator(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options.emojis).length;
	var random = Math.floor(Math.random()*len);
	return options.emojis[random];
}

//Returns string from backToWork json obj
function getWorkMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options.backToWork).length;
	var random = Math.floor(Math.random()*len);
	return options.backToWork[random] + " " + getDifferenciator();
}

//Returns string from shortBreak json obj
function getShortBreakMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options.shortBreak).length;
	var random = Math.floor(Math.random()*len);
	return options.shortBreak[random] + " " + getDifferenciator();
}

//Returns string from longBreak json obj
function getLongBreakMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options.longBreak).length;
	var random = Math.floor(Math.random()*len);
	return options.longBreak[random] + " " + getDifferenciator();
}

//Make needed functions available
module.exports = {getLongBreakMsg, getShortBreakMsg, getWorkMsg};
 
