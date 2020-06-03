const Discord = require('discord.js');
const axios = require('axios').default;
const fixerio_endpoint = "http://data.fixer.io/api/latest?access_key=0966f0ee81643c0679266d4eff82748a&symbols=USD,AUD,CAD,PLN,MXN&format=1";
// const fixerio_endpoint = "http://data.fixer.io/api/convert?access_key=0966f0ee81643c0679266d4eff82748a";
const client = new Discord.Client();

var rates_memo = null;

console.log(process.emit("Here now"));

console.log(axios.get(fixerio_endpoint));

const getRateData = () => {
  axios.get(fixerio_endpoint)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      return null;
    });
  //
}

//convert and return te result according to requirement
//400 USD = 358 EUR
const convert = (from, to, amount) => {
  let rates_data = getRateData();
  console.log(rates_data);
  // let USD_EUR = rates_data.data.rates.USD;
  // console.log(USD_EUR);
  // axios.get(`?from=&to=&amount=`).then(
  //   (res) => {
  //     console.log(res.data);
  //   }
  // )
}

const resolveRateQuery = (msg) => {
  console.log("Incoming msg > " + msg.content);
  //'400 USD to EUR'
  let query = msg.content;



  // ['400 USD ', ' EUR']
  // str.split
  // destructuring
  const [raw_from_currenc, raw_to_currency] = query.split("to")

  // [ '400', 'USD' ]
  const [amount_string, base_currency] = raw_from_currenc.trim().split(" ");

  let amount = parseInt(amount_string);
  let from_currency = base_currency;
  let to_currency = raw_to_currency.trim();
  console.log(`converting ${amount} from ${from_currency} to ${to_currency}`);

  convert(from_currency, to_currency, amount);

  console.log(rates_memo);




  "400 USD to EUR"

  return "400 USD = 358 EUR";
}

//ES6 arrow function
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
      response = resolveRateQuery(msg);
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