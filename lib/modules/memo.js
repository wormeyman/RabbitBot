/*
 * This file is part of elementarys IRC Bot "RabbitBot"
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

var sys = require('util');
var mongoose = require('mongoose');
var schemas = require('../../schemas/memo.js');

module.exports.init = function(irc_client, commands) {

    commands.add('!memo',
        '!memo <message> | <username> - Send a memo to a not logged in user, that they\'ll recieve after signing on',
        function(client, nick, channel, message) {
            if(message.requestuser !== '') {
                var instance = new schemas.Memo();
                instance.from = nick;
                instance.to = message.requesteduser;
                instance.text = message.inner_message;
                instance.save(function (err) {
                    if(!err) {
                        irc_client.notice(nick, 'Message saved!');
                    } else {
                        irc_client.notice(nick, 'Failed to save message, please try again later.');
                    }
                });
            }

        });
    
    irc_client.addListener("join", function(channel, nick, message) {
        console.log("here we go!");
        schemas.Memo.where('to', nick).limit(5).exec(function (err, docs) {
                for(var doc in docs) {
                    var memo = docs[doc];
                    irc_client.say(nick, 'Memo from ' + memo.from + ': ' + memo.text);
                    memo.remove();
                }
            });
    });
};
