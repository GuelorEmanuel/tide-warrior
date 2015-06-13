#!/usr/bin/env node

var readline = require('readline');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrum.db');

console.log("welcome to scrummy (just a name i'm trying out, patent pending :p)");
console.log("enter '[h]elp' for usage");

var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('tide-warrior => ');
rl.prompt();

rl
	.on('line', eval)
	.on('SIGINT', function() {
		rl.close();
	})
	.on('SIGCONT', function() {
		rl.prompt();
	})
	.on('close', function() {
	  console.log('closed properly');
	  process.exit(0);
	});

function eval(line) {
	input = line.match(/\w+|"(?:\\"|[^"\s])+"/g);
	if (input) {
		multi_eval(input);
	}
	rl.prompt();
}

function multi_eval(commands) {
	var first = commands.shift();
	switch (first) {
		case 'q':
		case 'quit':
			quit_command(commands);
			break;
		case 'h':
		case 'help':
			help_command(commands);
			break;
		case 'u':
		case 'user':
			user_command(commands);
			break;
		default:
			unknown_command_handler();
	}
}

function unknown_command_handler() {
	console.log("huh???");
}

function show_usage_information() {
	console.log("enter 'command -h|--help|help' to get usage");
	console.log("information about a specific command");
	console.log("supported commands are:");
	console.log("[u]ser");
	console.log("[h]elp");
	console.log("[q]uit");
}

function quit_command(args) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			rl.close();
			break;
		case '-h':
		case '--help':
		case 'help':
			console.log("help info: quit");
			break;
		default:
			unknown_command_handler();
	}
}

function help_command(args) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			show_usage_information();
			break;
		case 'h':
		case '--help':
		case 'help':
			console.log("help info: help");
			break;
		default:
			unknown_command_handler();
	}
}

function user_command(args) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			break;
		case '-h':
		case '--help':
		case 'help':
			console.log("help info: user");
			break;
		case '-l':
		case '--list':
		case 'list':
			db.each("select user_name, full_name from users", function(err, user) {
			    if (err) {
			    	console.log("error getting information from database");
			    }
			    else {
			    	var fullname = user.full_name || '';
			    	console.log(user.user_name + " - " + fullname);
			    }
			});
			break;
		default:
			unknown_command_handler();
	}
}