# discord-tracker-bot

needs installation of:
discord.js
moment
sqlite3 (if you have issues installing this module you may have to add "node-pre-gyp": "0.12.0" to the dependencies in your package.json)
sequelize
moment

Will need to include a config.json in the root of the project of the format
{
	"prefix": "!",
	"token": "your-token-here"
}

#commands
!track <tag> <phrase>
	-- <tag> - (required) an @mention of a user. Ex: @Willb
	-- <phrase> - (required) any string of characters Ex: I am traysh
	will set the bot to track when the user in <tag> says the phrase <phrase>
!status <tag> <phrase>
	-- <tag> - (required) an @mention of a user. Ex: @Willb
	-- <phrase> - (optional) any string of characters Ex: I am traysh
	if a phrase is entered it will return the status of that phrase for the user
	else if will return the status of all phrases for that user
