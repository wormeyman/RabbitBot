/*
 * This file is part of elementarys IRC Bot "RabbitBot"
 *
 * This is what this file actually does
 *
 * Copyright (c) Fabian Thoma 2011
 *
 * RabbitBot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * RabbitBot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with RabbitBot.  If not, see <http://www.gnu.org/licenses/>.
 */

var showHelp = function(client, nick, channel, message) {
    for(var item in help) {
        client.notice(nick, help[item]);
    }
};

var help = [];
var commands = {'!help': showHelp };
var irc_client;

exports.say = function(to, message, requestuser) {
    if(requestuser) {
        irc_client.say(to, requestuser + ': ' + message);
    } else {
        irc_client.say(to, message);
    }
};


exports.init = function(irc_client_in) {
    irc_client = irc_client_in;
    irc_client.addListener('message', checkCommands);
    irc_client.addListener('message', function (from, to, message) {
        console.log(from + ' => ' + to + ': ' + message);
    });
};

exports.add = function(command, helpstring, callback) {
    commands[command] = callback;
    if(helpstring !== undefined) {
        help.push(helpstring);
    }
};

checkCommands = function(from, to, message) {
    
    //Split the message by the first Space character
    var message_parts = message.split(' ');
    var command = message_parts.shift();
    var parsed_message = message_parts.join(' ');
    
    //Split the message for all | characters to identify second argument
    var userresults = parsed_message.split('|');
    var requestuser = null;
    if(userresults.length > 1) {
        requestuser = userresults.pop().trim();
    }
    var innermessage = userresults.join(' ').trim();
    
    var result_arr = {
        raw_message: message,
        inner_message: innermessage,
        command: command[0].trim(),
        requesteduser: requestuser
    };
    
    if(commands[command] !== undefined) {
        commands[command](irc_client, from, to, result_arr);
    } else {
        if(command[0] == '!')
            irc_client.notice(from, 'The command ' + command + ' is not defined');
            if(process.env.RABBIT_DEBUG === true)
                console.log("==IRC== The command "+command+" is not defined");
    }
};