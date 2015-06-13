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
		db.close(function(err) {
			if (err) {
				console.log("database not closed properly");
				console.log("exiting with error code: 44");
				process.exit(44);
			}
			else {
				console.log('bye!!');
				process.exit(0);
			}
		})
	});

function eval(line) {
	input = line.replace(/\s\s+/g, ' ').trim().split(" ");//match(/\w+|"(?:\\"|[^"\s])+"/g);
	if (input) {
		multi_eval(input, function() {
			rl.prompt();
		});
	}
	else {
		rl.prompt();
	}
}

function multi_eval(commands, finished) {
	var first = commands.shift();
	switch (first) {
		case '':
			if (finished)
				finished();
			break;
		case 'q':
		case 'quit':
			quit_command(commands, finished);
			break;
		case 'h':
		case 'help':
			help_command(commands, finished);
			break;
		case 'u':
		case 'user':
			user_command(commands, finished);
			break;
		case 't':
		case 'task':
			task_command(commands, finished);
			break;
		default:
			unknown_command_handler(finished);
	}
}

function unknown_command_handler(finished) {
	console.log("huh???");
	if (finished)
		finished();
}

function show_usage_information(finished) {
	console.log("enter 'command -h|--help|help' to get usage");
	console.log("information about a specific command");
	console.log("supported commands are:");
	console.log("[u]ser");
	console.log("[h]elp");
	console.log("[q]uit");
	if (finished)
		finished();
}

function quit_command(args, finished) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			rl.close();
			break;
		case '-h':
		case '--help':
		case 'help':
			console.log("help info: quit");
			if (finished)
				finished();
			break;
		default:
			unknown_command_handler(finished);
	}
}

function help_command(args, finished) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			show_usage_information(finished);
			break;
		case 'h':
		case '--help':
		case 'help':
			console.log("help info: help");
			if (finished)
				finished();
			break;
		default:
			unknown_command_handler(finished);
	}
}

function user_command(args, finished) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			if (finished)
				finished();
			break;
		case '-h':
		case '--help':
		case 'help':
			console.log("help info: user");
			if (finished)
				finished();
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
			}, finished);
			break;
		default:
			unknown_command_handler(finished);
	}
}

function task_command(args, finished) {
	var first = args === undefined || args.length == 0 ? '' : args.shift();
	switch (first) {
		case '':
			if (finished)
				finished();
			break;
		case '-h':
		case '--help':
		case 'help':
			console.log("help info: task");
			if (finished)
				finished();
			break;
		case '-l':
		case '--list':
		case 'list':
			db.each("select task_id, task_summary, user_name from tasks", function(err, task) {
			    if (err) {
			    	console.log("error getting information from database");
			    }
			    else {
			    	var username = task.user_name || '';
			    	console.log(task.task_id + " - " + task.task_summary + " - " + username);
			    }
			}, finished);
			break;
		case '-a':
		case '--add':
		case 'add':
			var stmt = db.prepare("insert into tasks (task_summary) values (?)");
			stmt.run(args.join(" "));
			stmt.finalize();
			if (finished)
				finished();
			break;
		case '-as':
		case '--assign':
		case 'assign':
			var stmt = db.prepare("update tasks set user_name = ? where (task_id = ?)");
			stmt.run(args);
			stmt.finalize();
			if (finished)
				finished();
			break;
		default:
			unknown_command_handler(finished);
	}
}