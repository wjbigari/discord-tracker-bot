const getUser = require('../helpers/getUser');
const {createEnrollment} = require('../helpers/database');

module.exports = {
    name: 'track',
    description: 'Add a tracker to the given user with a phrase or word',
    execute: async (message, args) => {
        let [usercode, ...trackList] = args;
        let trackPhrase = trackList.join(' ');
        console.log(trackPhrase.length);
        if(!usercode || !trackPhrase) return;
        let user = getUser(usercode);
        console.log(`received request to track when the user:${user.username} says the phrase "${trackPhrase}"`);
        message.channel.send(`Setting up tracking request for when the user:${user.username} says the phrase "${trackPhrase}"`);
        console.log(createEnrollment);
        [success, response_message, enrollment] = await createEnrollment(message.guild.id, message.author.id, user.id, trackPhrase);
        if(success){
            message.reply('enrollment created');
        }else{
            message.reply(response_message);
        }
    }
}