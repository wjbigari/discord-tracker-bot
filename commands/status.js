const {getEnrollments} = require('../helpers/database');
const getUser = require('../helpers/getUser');
const moment = require('moment');
moment().format();
module.exports = {
    name: 'status',
    description: 'replies with a status of a particular tracking enrollment if it exists',
    execute: async (message, args) => {
        let[mention, ...trackPhraseList] = args;
        let trackPhrase = null;
        let user = getUser(mention);
        if(trackPhraseList && trackPhraseList.length > 0) trackPhrase = trackPhrase = trackPhraseList.join(' ');
        let enrollments = await getEnrollments(message.guild.id, user.id, trackPhrase );
        if(enrollments && enrollments.length > 0){
            if(enrollments.length > 1){
                message.reply(`Tracking ${enrollments.length} Phrases for ${user.username}:`)
            }
            enrollments.map(e => {
                if(e.usage_count === 0){
                    message.reply(`${user.username} has never stated the phrase "${e.phrase}"`);
                }else{
                    message.reply(`${user.username} last stated "${e.phrase}" ${moment(e.last_incident).fromNow()}, Total Times stated: ${e.usage_count}`);
                }
            })
        }else{
            message.reply('That phrase is not being tracked for that user.');
        }
    }
}