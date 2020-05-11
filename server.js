const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const Sequelize = require('sequelize');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const sequelize = new Sequelize( {dialect: 'sqlite', storage: './database.sqlite'});
module.exports = {client, sequelize};
const {Enrollments} = require('./helpers/database');

//set up command files dynamically
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    console.log(`Adding command ${command.name} to commands list`);
    client.commands.set(command.name, command);
};

client.login(token);

client.on('message', async message => {
    if(message.author.bot ) return;
    if(!message.content.startsWith(prefix)){
        try{
            client.commands.get('audit').execute(message, message.content);
        }catch(error){
            console.error(`there was an error when auditing a message: ${error}`);
        }
    } 
    const input = message.content.slice(prefix.length).split(' ');
    const command = input.shift();
    if(!client.commands.has(command)) return;
    try{
        client.commands.get(command).execute(message, input);
    }catch(error){
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
client.once('ready', () =>{
    console.log('IMMMMM, READY!!!');
    Enrollments.sync();
});

