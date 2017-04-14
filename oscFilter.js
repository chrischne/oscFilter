var osc = require('node-osc');
var express = require('express');
//var monitorio = require('monitor.io');

var sendingPort = 8081;
var listeningPort = 3333;

var app = express();
var server = app.listen(sendingPort);

console.log('forwarding messages to socket.io on http://127.0.0.1:'+ sendingPort);


var oscServer, oscClient;

var client = new osc.Client('10.0.1.4', 4444);
/*console.log('sending test message to 10.0.1.4:4444');
client.send('/oscAddress', 200, function (err) {
	if(err){
	console.error(new Error(err));
}
  client.kill();
});*/


//var ip = '127.0.0.1';
var ip = '10.0.1.4';
//this is where we are listening for OSC messages
console.log('listening to OSC messages on ' + ip + ':'+ listeningPort);
 oscServer = new osc.Server(listeningPort, ip);
 console.log('created server');
  oscServer.on('message', function(msg, rinfo) {
      //console.log(msg, rinfo);
  //  console.log(msg[2]);

    var oscMsg = msg[2];
    var id = oscMsg[0];
    console.log('id',id);

     //var msg2 =  new osc.Message('/testmessage'); 
     //msg2.append('hi');

     if(id == '/muse/elements/alpha_absolute'){

     var msg2 = new osc.Message(id); 

      for(var i=1; i<oscMsg.length; i++){
    	msg2.append(oscMsg[i]); 
    }

     client.send(msg2);
	 }


/*
    var msg =  new osc.Message(oscMsg[0]); 

    for(var i=1; i<oscMsg.length; i++){
    	msg.append(oscMsg[i]); 
    }
	 client.send(msg);*/
    });



