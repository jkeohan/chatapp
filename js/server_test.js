var l = process.argv[2];
var port = process.argv[3];


var wss = require("ws").Server;
var server = new wss({
    port: 2000
});
var clients = [];
var messages = [];
var allBadWords = ["ass","bitch"];
var badWord = false;
var specialWords = false;

server.on("connection", function (ws) {
    addClients(ws);
    ws.on("message", function (input) {
        var json_deserialized = JSON.parse(input);
        console.log(json_deserialized);
        var badWords = searchBadWords(json_deserialized);
        console.log("Bad word is: " + badWords);
        //if(badWords === true) { ws.close() }
        console.log("Input is: " + input)
        forwardMessages(input,ws);
    });

    ws.on("close", function () {
        //clients.splice(clients.indexOf(this), 1);
        removeClients(ws);
        console.log(clients.length);
        console.log("Inside close: " + clients.length);
        //do something
    });
}); //end server.on

function searchBadWords (badwordy) {
    //console.log("Inside badWords function.." + deserialize(badwordy.msg));
    var bad = badwordy.msg;
    // allBadWords.forEach( function (word) {
    //     if(bad.indexOf(word) != -1) {
    //         badWord == true;
    //         console.log("Bad Word Alert")
    //     }//end if
    // })//end forEach
    //return badWord
}

function addClients (client) {
   // console.log("client is: " + this);
    clients.push(client);
    //console.log("Initial Connection: " + clients.length);
}


// function deserialize (data){
//     console.log("Inside deserialize function")
//     var newjson = JSON.parse(data);
//     console.log("newjosn is ");
//     console.log(newjson);
//     return newjson;
// }

function serialize (data) {
    return JSON.stringify(data)
}

function forwardMessages (msg,ws) {
    console.log("Inside forwardMessages function")
    //console.log("ws is: ") + ws;
    var forwardingClients = [];
    clients.forEach( function (val){
        forwardingClients.push(val);
    });
    console.log("forwardingClients array: " + forwardingClients)
    var clientX = forwardingClients.indexOf(ws);
    console.log("clientX is: " + clientX)
    forwardingClients.splice(clientX,1);
    forwardingClients.map( function (user) {
        console.log("Sending user message: " + msg)
        user.send(msg)
    });
}




