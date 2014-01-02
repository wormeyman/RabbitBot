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

module.exports.init = function(irc_client, commands) {

    commands.add('!allensay',
        '!allensay <message> - make a surprising <message> containing Allen ;)',
        function(client, nick, channel, message) {
            commands.say(channel, '\\o/ -< ' + message.inner_message);
            commands.say(channel, ' |');
            commands.say(channel, '/ \\');
        });

    commands.add('!rabbitsay',
        '!rabbitsay <message> - make a cute little bunny speak <message>',
        function(client, nick, channel, message) {
            commands.say(channel, '() ()');
            commands.say(channel, '(=\'\'=) -< ' + message.inner_message);
            commands.say(channel, '( . )');
            commands.say(channel, '(\')(\')');
        });

    commands.add('!ask',
        '!ask <user> or !ask - request <user> to ask directly its question',
        function(client, nick, channel, message) {
            if(message.requestuser === null && message.inner_message !== null)
                message.requestuser = message.inner_message.trim();

            commands.say(channel,
                'Please ask your question directly. Don\'t ask to ask, just ask!',
                message.requestuser);
        });

    commands.add('!support',
        '!support <user> or !support - request <user> to ask their question in #elementary',
        function(client, nick, channel, message) {
            if(message.requestuser === null && message.inner_message !== null)
                message.requestuser = message.inner_message.trim();

            commands.say(channel,
                'You are talking about support stuff! Please join #elementary.',
                message.requestuser);
        });

    commands.add('!web',
        '!web <user> or !web - request <user> to ask their question in #elementary-web',
        function(client, nick, channel, message) {
            if(message.requestuser === null && message.inner_message !== null)
                message.requestuser = message.inner_message.trim();

            commands.say(channel,
                'You are talking about website related stuff! Please join #elementary-web.',
                message.requestuser);
        });

    commands.add('!ugt',
        '!ugt <user> or !ugt - sends a Link explaining the UGT, if specified, to <user>',
        function(client, nick, channel, message) {
            if(message.requestuser === null && message.inner_message !== null)
                message.requestuser = message.inner_message.trim();

            commands.say(channel,
                'http://www.total-knowledge.com/~ilya/mips/ugt.html',
                message.requestuser);
        });

    commands.add('!wir',
        '!wir <user> or !wir - tells <user> that we will release when it\'s ready',
        function(client, nick, channel, message) {
            if(message.requestuser === null && message.inner_message !== null)
                message.requestuser = message.inner_message.trim();

            commands.say(channel,
                'When it\'s ready',
                message.requestuser);
        });

    commands.add('!google',
        "!google <search> | <user> - send a link to the Google search <search>, if specified, to <user>",
        function(client, nick, channel, message) {
            commands.say(channel,
                'http://www.google.com/search?q=' + encodeURIComponent(message.inner_message.trim()),
                message.requestuser);
        });

    commands.add('!dev-guide',
        "!dev-guide | <user> - send a link to the elementary Developer Guide draft, if specified, to <user>",
        function(client, nick, channel, message) {
            commands.say(channel,
                'http://tiny.cc/dev-guide-draft',
                message.requestuser);
        });
};
