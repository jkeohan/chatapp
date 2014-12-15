//1. write an "insult-generator" server
//When a client sends a message to the server, have the server send back "I know you are, but what am I"

//2. When the server reeives a message from the cleint have the server send back..."Oh yeah...return message"
var l = process.argv[2];
var port = process.argv[3];


var wss = require("ws").Server;
var server = new wss({
    port: 3000
});
var clients = [];
var messages = [];
var allBadWords = ["ass","bitch"];
var badWord = false;
var specialWords = false;

server.on("connection", function (ws) {
    addClients(ws);
    ws.on("message", function (input) {
        var json_deserialized = deserialize(input);
         console.log("json_deserialized is: " + json_deserialized)
        var specialWord = msgInspector(json_deserialized);
       
        //var badWords = searchBadWords(json_deserialized);
        //console.log("Bad word is: " + badWords);
        //if(badWords === true) { ws.close() }
        if (specialWords === true ) { forwardMessages(specialWord,ws) }
        else { forwardMessages(input,ws) }
        console.log(input)
        //forwardMessages(input,ws);
    });

    ws.on("close", function () {
        //clients.splice(clients.indexOf(this), 1);
        removeClients(ws);
        console.log(clients.length);
        console.log("Inside close: " + clients.length);
        //do something
    });
}); //end server.on

function msgInspector (object) {
    console.log("Insid msgInspector function " + "msg is: " + object.msg);
    var msg = object.msg;
    console.log("message length is: " + msg.length)
    if(msg.indexOf("/yell") != -1) {
        var newMsg = msg.substring(6,msg.length).toUpperCase();
        specialWords = true;
    }
    object.msg = newMsg;
    console.log("Newobj is: " + object + " Serialed newObj is: " + serialize(object));
    return serialize(object);
}

function searchBadWords (badwordy) {
    console.log("Inside badWords function.." + deserialize(badwordy.msg));
    var bad = badwordy.msg;
    allBadWords.forEach( function (word) {
        if(bad.indexOf(word) != -1) {
            badWord == true;
            console.log("Bad Word Alert")
        }//end if
    })//end forEach
    return badWord
}

function addClients (client) {
   // console.log("client is: " + this);
    clients.push(client);
    //console.log("Initial Connection: " + clients.length);
}

function removeClients(client) {
    var clientX = clients.indexOf(client);
    console.log("clientX is: " + clientX)
    clients.splice(clientX,1);
    console.log("Clients array is: " + clients);
}


function deserialize (data){
    console.log("Inside deserialize function")
    var newjson = JSON.parse(data);
    console.log(newjson);
    return newjson;
}

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


process.stdin.on("data", function (data) {
    var newdata = data.toString().trim();
    if (newdata == "sendnow") {
    	timer = setInterval(sayHello,1000)
    	console.log("Counter is: " + counter)
    if( newdata == "reset") {counter = 0;}
    else { ws.send("ok")}
    }
    //console.log(newdata);
});


//spare code
/*
if(clients.length > 1) {
        console.log("inside if");
        clients.splice(clients.indexOf(this), 1);
        ws.close();
       console.log("Client array is: " + clients.length);*/

            //    console.log("Incoming msg: " + input)
        // //create new\separate array from clients array to edit
        // var sendingclients = [];
        // clients.forEach( function (val) {
     //    sendingclients.push(val);
        // });
        // //index of the current client client
        // var x = sendingclients.indexOf(ws);
        // //remove the current item from the temp array
        // sendingclients.splice(x,1);
        // //ws.send(input)
     //    sendingclients.map(function (user) {
     //    console.log("Sending user messages: " + input)
     //    user.send(input);
     //     });