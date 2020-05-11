const getUser = require('../helpers/getUser');
const {updateEnrollment} = require('../helpers/database');

module.exports = {
    name: 'audit',
    description: 'check if the person and the message are being tracked,  if so update the enrollment',
    execute: async (message, args) => {
        updateEnrollment(message.guild.id, message.author.id, message.content);
    }
}