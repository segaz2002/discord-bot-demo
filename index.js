const Discord = require('discord.js');
const client = new Discord.Client();

const handle_message = (msg) => {
  console.log(`Incoming message > ${msg.content}`);
  let response = null;

  switch (msg.content) {
    case 'Hello':
      response = 'Hi';
      break;
    case 'Tere':
      response = 'kuidas';
      break;
    default:
      response = 'Sorry I cannot handle this message yet';
  }

  msg.reply(response);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  console.log(msg.author);
  if (!msg.author.bot) {
    handle_message(msg);
  }
});

client.login("NzE1OTk1OTI0Njk4MjM0OTAx.XtU0NQ.PSMexNlSFVySVeprzt4Q_tn_Uqg");