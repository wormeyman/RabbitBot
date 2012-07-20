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

module.exports.init = function(irc_client, commands) {

    // Send a Bug Report Link
    commands.add('!report',
        '!report <project> | <user> - send a link to report a bug in the Launchpad project <project>, if specified, to <user>',
        function(client, nick, channel, message) {
            commands.say(channel,
                'https://bugs.launchpad.net/' +  message.inner_message + '/+filebug',
                message.requestuser);
        });
            
    //Send a Launchpad Project Link
    commands.add('!lp',
        '!lp <project> | <user> - send a link to the Launchpad project <project> to <user>',
        function(client, nick, channel, message) {
            commands.say(channel,
                'https://launchpad.net/' + message.inner_message,
                message.requestuser);
        });

    irc_client.addListener("message", function(from, to, message) {
        // Handle Bug Report Numbers
        var re = /(:?bug|\#) *([0-9]+)/ig;
        var matches = message.match(re);
        if (matches !== null) {
            for(var match in matches) {
                var result = re.exec(matches[match]);
                if(result) {
                    commands.say(to, 'https://bugs.launchpad.net/bugs/' + result[2]);
                }
            }
        }
        // Handle Project main branches
        re = /lp:([a-zA-Z0-9\/\-\+]+)/ig;
        matches = message.match(re);
        if (matches !== null) {
            for(var match in matches) {
                var result = re.exec(matches[match]);
                if(result) {
                    commands.say(to, 'https://code.launchpad.net/+branch/' + result[1]);
                }
            }
        }
        // Handle Personal branches
        re = /lp:~([a-zA-Z0-9\/\-\+]+)/ig;
        matches = message.match(re);
        if (matches !== null) {
            for(var match in matches) {
                var result = re.exec(matches[match]);
                if(result) {
                    commands.say(to, 'https://code.launchpad.net/~' + result[1]);
                }
            }
        }
        // Handle PPAs
        re = /ppa:([a-zA-Z0-9\-]+)\/([a-zA-Z0-9\-]+)/ig;
        matches = message.match(re);
        if (matches !== null) {
            for(var match in matches) {
                var result = re.exec(matches[match]);
                if(result) {
                    commands.say(to, 'https://code.launchpad.net/~' + result[1] + '/+archive/' + result[2]);
                }
            }
        }
    });
};
