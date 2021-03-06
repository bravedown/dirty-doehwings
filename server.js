// Dependencies
// =============================================================

const accountSid = 'ACPN1764f40ba703e90a2ed7da6f2acb920d';
const authToken = 'bac8e4289e30e69f7c78fd921ab31010';
const client = require('twilio')(accountSid, authToken);


// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+18606007589',
//      to: '+12038928944'
//    })
//   .then(message => console.log(message.sid));

var tables = [];
var waitingList = [];

var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitingList);
});

app.post("/reservations", function(req, res) {
    if (tables.length >= 5) {
        waitingList.push(req.body);
        return false;
    } else {
        tables.push(req.body);
        return true;
    }
});

app.post("/tables", function(req, res) {
    // tables.splice(req.body, 1);
    let newTable = {
        "name": "David",
        "phone": "2038928944",
        "email": "email",
        "nmbr": "1",
        "id": "123"
        };
    // waitingList.splice(0, 1)[0];
    client.messages
        .create({
            body: `${newTable.name}, your table is now reserved!`,
            from: '+18606007589',
            to: `+1${newTable.phone}`
        })
        .then(message => console.log(message.sid));
    tables.push(newTable);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
