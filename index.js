
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1515;

app.use(express.static(__dirname + '/public'));
var bots = [];
myBot = {}
myBot.x = 40;
myBot.y = 100;
myBot.r = 15;
myBot.theta = 0;
myBot.color = "azul";

function botStatus(data){
	bots.push(data);
}

function onConnection(socket){
	socket.broadcast.emit('drawing', data);
	function drawAllBots(){
		for(i=0; i<bots.length; i++){
			socket.broadcast.emit('drawing', bots[i]);
		}
	}
	function onDrawing(data){
		console.log("onDrawing",data);
		//socket.broadcast.emit('drawing', data);
		botStatus(data);
		drawAllBots();

	}
  socket.on('drawing', onDrawing);
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));