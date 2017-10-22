const Discord = require('discord.js');
const client = new Discord.Client
const config = require('./config.json');
const version = require('./package.json').version;
var roll = require("./modules/roll.js").roll;
var help = require("./modules/help.js").help;
var poly = require("./modules/poly.js").poly;
var keep = require("./modules/roll.js").keep;
var add = require("./modules/roll.js").roll;
var diceResult = {};

client.login(config.token);

client.on('ready', () => {
  console.log(`Bot version ${version}`);
  console.log(`Logged in as ${client.user.username}!`);
});

//Called whenever a users send a message to the server
client.on("message", message => {
  var channel = message.channel.id;
  var userid = message.author.id;
  if (diceResult[channel] === undefined) diceResult[channel] = {};
  //Ignore messages sent by the bot
  if (message.author.bot) return;
  //Ignore messages that dont start with the command symbol
  if (!message.content.includes(config.prefix)) return;

  if (message.channel.type !== "dm") {
    if (message.channel.permissionsFor(client.user).has('USE_EXTERNAL_EMOJIS') != true) {
      message.channel.send(`Please enable \'Use External Emoji\' for ${client.user.username}`);
      return;
    }
  }

  //Seperate and create a list of parameters. A space in the message denotes a new parameter
  if (!message.content.startsWith(config.prefix)) {
    var params = message.content.split(" ");
    for (var i=0; params.length>i; i++) {
      if (params[i].startsWith(config.prefix)) break;
    }
    params = params.slice(i);
  } else var params = message.content.split(" ");

  //create command
  if (params.length == 0) return;

  var command = params[0].toLowerCase().toString().slice(1);
  params = params.slice(1);

  if (command.startsWith('d') && (command.length > 1) && (command != 'destiny')) {
    var sides = command.replace(/\D/g, "");
    command = 'polyhedral';
  }
  //init the descriptor string to an empty string
  var desc = "";
  var beg, end = 0;
  var begF, endF = false;
  for (var i = 0; i < params.length; i++) {
    if (params[i].includes('"')) {
      if (!begF) {
        beg = i;
        end = i;
        begF = true;
      } else if (begF && !endF) {
        end = i;
        endF = true;
      }
    }
  }
  //remove the text field arguments from the list of parameters before checking for dice.
  for (i = beg; i <= end; i++) {
    desc += " " + params[i];
  }
  var spliceAmnt = end + 1 - beg;
  params.splice(beg, spliceAmnt);
  //remove Quotes from descriptor
  desc = desc.replace(/['"]+/g, '');

  //set the rest of params to lowercase
  if (params != undefined) {
    params = params.filter(Boolean);
    for (var i = 0; i < params.length; i++) {
      params[i] = params[i].toLowerCase();
    }
  }
  console.log("@" + message.author.username + " " + message.createdAt);
  console.log(command + " " + params + " " + desc);

  switch (command) {
    case 'roll':
    case 'r':
      diceResult[channel] = roll(diceResult[channel][userid], params, message, client, desc);
      break;
    case 'keep':
      diceResult[channel] = keep(diceResult[channel][userid], message, client, params, desc);
      break;
    case 'add':
      diceResult[channel] = roll(diceResult[channel][userid], params, message, client, desc, 'add');
      break;
    case 'reroll':
    case 'rr':
      diceResult[channel] = keep(diceResult[channel][userid], message, client, params, desc, 'reroll');
      break
    case 'help':
    case 'h':
      help(params, message);
    case "ver":
      message.channel.send(client.user.username + ": version: " + version);
      break;
    case "poly":
    poly(params, message);
      break;
    default:
      break;
  }
});
