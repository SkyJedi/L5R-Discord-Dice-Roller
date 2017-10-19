const config = require("../config.json");

function print(str, bot) {
  let guild = bot.guilds.get(config.emojiChannel);
  return guild.emojis.find('name', str).toString();
}

module.exports = {
    print: print,
};
