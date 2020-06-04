const Discord = require('discord.js');
const axios = require('axios').default;
const fixerio_endpoint = "http://data.fixer.io/api/latest?access_key=0966f0ee81643c0679266d4eff82748a&symbols=USD,AUD,CAD,PLN,MXN&format=1";
const client = new Discord.Client();

function getRateData(callback) {
  console.log("Getting data for conversion....")
  axios.get(fixerio_endpoint)
    .then(callback)
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      return null;
    });
  //
}

const resolveRateQuery = (msg) => {
  console.log("Incoming msg > " + msg.content); //'400 USD to EUR'
  const [raw_from_currency, raw_to_currency] = msg.content.split("to")
  const [amount_string, base_currency] = raw_from_currency.trim().split(" "); // [ '400', 'USD' ]
  let amount = parseInt(amount_string);
  let from_currency = base_currency;
  let to_currency = raw_to_currency.trim();

  console.log(`converting ${amount} from ${from_currency} to ${to_currency}`);

  getRateData((result) => {
    conversion = result.data.rates[from_currency] * amount;
    msg.reply(`${amount} ${from_currency} = ${conversion} ${to_currency}`);
  });
}

//ES6 arrow function
const handle_message = (msg) => {
  const known_keywords = ['Hello', 'Tere'];

  if (known_keywords.indexOf(msg.content.trim()) == -1) {
    resolveRateQuery(msg);
  } else {
    switch (msg.content) {
      case 'Hello':
        response = 'Hi';
        break;
      case 'Tere':
        response = 'kuidas';
        break;
    }
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.author.bot) {
    handle_message(msg);
  }
});

client.login("NzE1OTk1OTI0Njk4MjM0OTAx.XtitiQ.Ln17RVMZwrQGT-PqeaaKf10HDb8");