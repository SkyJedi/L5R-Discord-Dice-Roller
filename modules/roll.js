const config = require("../config.json");
var printEmoji = require("./printEmoji.js").print;



function roll(diceResult, params, message, client, desc, add) {

  if (add === undefined) diceResult = initdiceResult(diceResult);
  if (diceResult === undefined) return;
  if (params[0] == undefined) {
    message.reply('No dice rolled.');
    return;
  }
  //process each identifier and set it into an array
  var diceOrder = processType(params, message);
  if (diceOrder == 0) return;

  //rolls each die and begins rollResults
  diceOrder.forEach((die) => {
    diceResult.roll[die].push(rollDice(die))
  });

  //counts the symbols rolled and returns them in diceResult.results
  return countSymbols(diceResult, message, client, desc);
}

function keep(diceResult, message, client, params, desc, reroll) {
  if (diceResult === undefined) return;
  var keeperResults = initdiceResult();
  if (reroll !== undefined) keeperResults.roll = diceResult.roll;
  if (params.length === 1) params = params[0].split('')
  params.forEach((keeper) => {
    let i=0;
    Object.keys(diceResult.roll).forEach((color) => {
      diceResult.roll[color].forEach((face) => {
        if (+keeper === i+1) {
          if (reroll !== undefined) keeperResults.roll[color].splice(i, 1, rollDice(color))
          else keeperResults.roll[color].push(face);
        }
        i++;
      });
    });
  });
  return countSymbols(keeperResults, message, client, desc);
}

//init diceResult
function initdiceResult() {
  var diceResult = {
    roll: {
      white: [],
      black: [],
      success: [],
      oppertunity: [],
      strife: [],
      explosiveSuccess: []
    },
    results: {
      face: '',
      success: 0,
      oppertunity: 0,
      strife: 0,
      explosiveSuccess: 0
    }
  };
  return diceResult;
}

//processes the params and give an array of the type of dice to roll
function processType(params, message) {
    if (params.length > 0) {
      var diceOrder = [];
      if ((params[0]).match(/\d+/g) != null) {
        for (var i = 0; i < params.length; i++) {
          var diceQty = (params[i]).replace(/\D/g, "");
          var color = params[i].replace(/\d/g, "");
          if (diceQty > config.maxRollsPerDie) {
            message.reply('Roll exceeds max roll per die limit of ' + config.maxRollsPerDie + ' . Please try again.');
            return 0;
          }
          for (var j = 0; j < diceQty; j++) {
            diceOrder.push(color);
          }
        }
      } else {
          params = params.join('');
          for(var i = 0; i < params.length; i++) {
            diceOrder.push(params[i]);
          }
        }
    } else {
    message.reply('No dice rolled.');
    return 0;
  }
  let finalOrder = [];
  diceOrder.forEach((die) => {
    switch (die) {
      case 'black':
      case 'b':
      case 'blk':
      case 'ring':
      case 'r':
        finalOrder.push('black');
        break;
      case 'white':
      case 'w':
      case 'skill':
      case 's':
        finalOrder.push('white');
        break;
      case 'success':
      case 'suc':
      case '+':
        finalOrder.push('success');
        break;
      case 'strife':
      case 'str':
      case 't':
        finalOrder.push('strife');
        break;
      case 'oppertunity':
      case 'o':
        finalOrder.push('oppertunity');
        break;
      case 'explosiveSuccess':
      case 'e':
      case 'exp':
        finalOrder.push('explosiveSuccess');
        break;
      default:
        break;
    }
  });
  return finalOrder;
}

//rolls one die and returns the results in an array
function rollDice(die) {
  let diceFaces = {
            black: ['', 's', 'st', 'et', 'o', 'ot'],
            white: ['', '', 's', 's', 'so', 'st', 'st', 'e', 'et', 'o', 'o', 'o'],
            success: 's',
            oppertunity: 'o',
            explosiveSuccess: 'e',
            strife: 't'
          };
  //roll dice and match them to a side and add that face to the message
  if (die === undefined) return;
  if (die === 'white' || die === 'black') return diceFaces[die][(Math.floor(Math.random() * diceFaces[die].length) + 1)-1];
  else return diceFaces[die];
}

function countSymbols(diceResult, message, client, desc) {
  diceResult.results = {
    face: '',
    success: 0,
    oppertunity: 0,
    strife: 0,
  }
  Object.keys(diceResult.roll).forEach((color) => {
    diceResult.roll[color].forEach((face) => {
      if (color === 'white' || color === 'black') diceResult.results.face += printEmoji(`${color}${face}`, client);
      else diceResult.results.face += printEmoji(`${color}`, client);
      for(let i=0; face.length > i; i++) {
        switch (face[i]) {
          case 'e':
            diceResult.results.success++
            break;
          case 's':
            diceResult.results.success++
            break;
          case 'o':
            diceResult.results.oppertunity++
            break;
          case 't':
            diceResult.results.strife++
            break;
          default:
            break;
        }
      }
    });
  });
  printResults(diceResult.results, message, client, desc);
  return diceResult;
}

function printResults (diceResult, message, client, desc) {
  let symbolOrder = ['success', 'oppertunity', 'strife'];
  let response = '';
  //prints faces
  if (diceResult.face != '') {
    if (diceResult.face.length > 1500) diceResult.face = 'Too many dice to display.'
    message.channel.send(diceResult.face);
  } else {
    message.reply("No dice rolled.");
    return;
  }
  //prints symbols
  symbolOrder.forEach((symbol) => {
    if (diceResult[symbol] !== 0) response += printEmoji(`${symbol}`, client) + diceResult[symbol] + ' ';
  });
  if (diceResult.face != '') message.reply(desc + " results:" + "\n\n\t" + response);
}

module.exports = {
    roll: roll,
    keep: keep,
    processType: processType,
    rollDice: rollDice,
    countSymbols: countSymbols,
    printResults: printResults,
};
