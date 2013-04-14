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

var irc = require('irc');
var commands = require('./lib/commands.js');
var config = require('./config.js');

var client = new irc.Client(config.login.host, config.login.nick, config.profile);

client.connect(function (){
    client.say("NickServ", "IDENTIFY " + config.login.password);  
});


commands.init(client);

// Load our modules
require('./lib/modules/communication.js').init(client, commands);
require('./lib/modules/launchpad.js').init(client, commands);
require('./lib/modules/memo.js').init(client, commands);
