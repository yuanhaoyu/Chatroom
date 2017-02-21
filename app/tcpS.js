var net = require('net');
var PORT = 8080;
var server = net.createServer();
var room = [];

server.on('connection', function (socket) {
  console.log("new connection" + socket.remoteAddress + ':' + socket.remotePort);
  socket.on('data', function (data) {
    var data = JSON.parse(data.toString().trim());
    //console.log("this is data"+data);
    var from = data.from;
    var to = data.to;
    var msg = data.msg;
    var singelRoom = {
      "name1": from,
      "name1S": socket,
      "name2": to
    }
    if (room.length == 0) {
      room.push(singelRoom);
    }
    var flag = 0;
    for (var i in room) {
      if ((room[i].name1 == from && room[i].name2 == to) || (room[i].name1 == to && room[i].name2 == from)) {
        //console.log("已存在");
        flag = 1;
        if(room[i].name1 == from){
          room[i].name1S = socket;
        }
        if(room[i].name2 == from){
          room[i].name2S = socket;
        }
        if (room[i].name1S == socket) {
          if (room[i].name2S != null) {
            var toSocket = room[i].name2S;
            //console.log("send:"+msg);
            toSocket.write(msg);

          } else {
            //console.log("等待对方上线");
            socket.write("等待对方上线");

          }
        } else {
          room[i].name2S = socket;
          if (room[i].name1S != null) {
            var toSocket = room[i].name1S;
            //console.log("send:"+msg);            
            toSocket.write(msg);

          } else {
            //console.log("等待对方上线");
            socket.write("等待对方上线");

          }
        }
      }
    }
    if (flag == 0) {
      //console.log("first");
      room.push(singelRoom);
      //console.log(room.length);
      socket.write("等待对方上线");
    }


  });

  socket.on('close', function () {
    if(socket!=null){
      for (var i in room) {
        if(room[i].name1S==socket){
          room[i].name1S=null;
          //console.log(room);
        }
        else if(room[i].name2S==socket){
          room[i].name2S=null;
          //console.log(room);
        }
        else{
          break;
        }
      }
    }
    console.log('A client closed');
  });

  socket.on('error',(err)=>{
    
    console.log("下线请求！"+err);
  });
});

server.on('error', function (err) {
  console.log('server error:', err.message);
});

server.on('close', function () {
  console.log('server closed');
});

server.listen(8080, '0.0.0.0');