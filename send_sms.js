const accountSid = 'ACfdd86140af2e97b0cd3107942c17370b';
const authToken = 'bac8e4289e30e69f7c78fd921ab31010';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+18606007589',
     to: '+12038928944'
   })
  .then(message => console.log(message.sid));