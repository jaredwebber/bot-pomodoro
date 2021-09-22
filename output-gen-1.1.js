'use strict'

const fs = require('fs');

//File Name Holding Output Strings
var options;

//Returns string from backToWork json obj
function getWorkMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.backToWork[random];
}

//Returns string from shortBreak json obj
function getShortBreakMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.shortBreak[random];
}

//Returns string from longBreak json obj
function getLongBreakMsg(){
	options = require('./OutputOptions.json');
	var len = Object.keys(options).length;
	var random = Math.floor(Math.random()*len);
	return options.longBreak[random];
}

//Make needed functions available
module.exports = {getLongBreakMsg, getShortBreakMsg, getWorkMsg};
 
