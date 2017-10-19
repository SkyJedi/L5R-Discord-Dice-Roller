function help(params, message) {
  if (params == "") {
    message.channel.send("```prolog\ntype '!Help [topic]' for futher information\n!Roll: rolls any combination of lr5 dice\n!Help: displays help for topics\n\nfor more information join the LR5 Assistant Bot discord server 'https://discord.gg/mvqj7sy'\n```");
  } else {
    var topic = params[0];
    switch (topic) {
      case "roll":
        message.channel.send("```prolog\nCOMMAND\n\n\t!Roll DiceIdentifiers \"TEXT\"\n\nDICE IDENTIFIERS\n\n\tWhite/W/Skill = skill die\n\tBlack/B/Blk/Ring/R = ring die\n\tExplosiveSuccess/Exp/E = explosive success\n\tSuccess/Suc/S = success\n\tOppertunity/O = oppertunity\n\tStrife/STR/T = strife\n\n\"TEXT\" assigns a label to the roll. (optional)\n\nExamples:\n\t!roll wwwbb (must use single character identifiers)\n\t!roll 1white 2black (must specify a number before each identifier)\n\t```");
        break;
      default:
        break;
      }
    }
  }

module.exports = {
    help: help,
};
