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
var bannedmsgs = [];

server.on("connection", function (ws) {
    clients.push(ws);
    console.log("Initial Connection: " + clients.length);
    ws.on("message", function (input) {
    	//create new\separate array from clients array to edit
    	var sendingclients = [];
    	clients.forEach( function (val) {
        sendingclients.push(val);
    	});
    	//index of the current client client
    	var x = sendingclients.indexOf(ws);
    	//remove the current item from the temp array
    	sendingclients.splice(x,1);
    	//ws.send(input)
        sendingclients.map(function (user) {
        user.send(input);
         });
    });

    ws.on("close", function () {
        //clients.splice(clients.indexOf(this), 1);
        console.log(clients.length);
        console.log("Inside close: " + clients.length);
        //do something
    });
}); //end server.on



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