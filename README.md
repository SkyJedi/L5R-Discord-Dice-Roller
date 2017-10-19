# LR5-Discord-Dice-Roller

Invite link https://discordapp.com/oauth2/authorize?client_id=370372169584082957&scope=bot&permissions=262144

A Discord Bot Companion for the LR5 RPG

#Usage
Commands:
- !roll   rolls any combination of lr5 dice and returns results
  - You may add " " at the end of the line to give the roll a name

  DICE IDENTIFIERS
   - White/W/Skill/S = skill die
   -  Black/B/Blk/Ring/R = ring die
   -  ExplosiveSuccess/Exp/E = explosive success
   -  Success/Suc/+ = success
   -  Oppertunity/O = oppertunity
   -  Strife/STR/T = strife

    - note: if you use the !roll wwwbbb method you must use the single character dice identifiers

  EXAMPLES
   - !roll wwwbb (must use single character identifiers)
   - !roll 1white 2black (must specify a number before each identifier)

- !Poly: rolls any combination of polyhedral dice with optional modifier
Examples:
  !poly 1d4 2d6+1 1d100-60
  
- !help          Type '!help topic for further information
  - !roll        rolls any combination of lr5 dice and returns the results

#Installation and Setup

1. First you will need to have NodeJS installed on your machine. You can find the latest version [here](https://nodejs.org/en/)
2. Next create a discord account for your bot. You can do this [here](https://discordapp.com/developers/applications/me)
  1. Click "New App"
  2. Provide a Name (this is the name people will see when the bot joins a channel) and Description
  3. Click "Create App"
  4. On the new screen click "Create a Bot User"
  5. Open Notepad
  6. Under the heading "App Bot User" you will see "Token:click to reveal" Click to reveal it and copy the resulting text and paste it in notepad. Be sure to keep this token private.
  7. Under the heading "App Details" Copy the number after "Client ID:" and paste this in notepad as well.
  8. Replace "CLIENT_ID_GOES_HERE" in the following link with the Client ID you copied in the above step https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0
  9. Paste the edited link into a web browser, select the discord server you wish to add the bot to, and click "Authorize".
3. Click "Clone or Download" at the top of this page. Click "Download Zip" and extract the files.
4. Open config.json with a text editor program of your choice.
5. Replace "BOT TOKEN" with your bot token you copied in step 2.6 and save the file
6. Your bot is now configured and ready to launch.

#Running the bot

Before you first launch the bot you need to run the file "setup.bat" or "setup.command". You can't miss it. This will install all the dependencies that bot needs to run.

To run the bot, Just execute the file "start.bat" or "start.command".

#Configuration File config.json

  config.json has four properties

  1. token
    - this is the login token for your bot
  2. prefix
    - this is the symbol the bot uses to recognize commands. This is set to "!" by default
  3. maxRollsPerDie
    - This is the max number per dice type that can be rolled in a given roll command. Set to 20 by default. Commands that don't respect the roll limit will be aborted and send an error message to the discord chat.
  4. emojiChannel
    - channelID where emoji are uploaded to.
