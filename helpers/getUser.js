const {client} = require('../server');
module.exports = function(mention){
    if(!mention) return;
    const matches = mention.match(/^<@!?(\d+)>$/);
    if(!matches) return;
    const id = matches[1];
    console.log('fetching user with id: ' + id);
    return client.users.cache.get(id);
};