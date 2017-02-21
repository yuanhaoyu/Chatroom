 var net = require('net');
 var PORT = 8080;
 var From, To;
 var Msg = null;

 setTimeout(function () {
   document.getElementById("welcome").style.display = "none";
   document.getElementById("start").style.display = "block";
 }, 4000)
 
 var client = net.connect({port: PORT}, function () {
   document.getElementById('sendBtn').onclick = function () {
     From = document.getElementById("from").value;
     To = document.getElementById("to").value;
     if (From == To && From != "") {
       alert("请输入不一样的号码！");
       return 0;
     }
     if (From == "" || To == "") {
       alert("输入不能为空");
       return 0;
     }
     document.title = From + '正在与' + To + '通话';
     document.getElementById("start").style.display = "none";
     document.getElementById("content").style.display = "block";
   }
   document.getElementById('sendMsg').onclick = function () {
     var myDate = new Date();
     Msg = document.getElementById("msg").value;
     if(Msg==""){
       alert("输入空值给你的小伙伴看，并没有什么意义哦！");
       return 0;
     }
     var send = {
       from: From,
       to: To,
       msg: Msg
     };
     client.on('error', function (err) {
       alert('请检查服务器是否正确启动！');
       console.log(err);
     });
     var textNodeTo = document.createElement('div');
     textNodeTo.innerHTML = '<p class="title">' + From + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + Msg.toString() + '</p>';
     textNodeTo.className = 'To tr tblue';
     var parentNode = document.getElementById("chatMsg");
     parentNode.appendChild(textNodeTo);
     client.write(JSON.stringify(send));
     document.getElementById("msg").value = null;
   };

 });

 client.on('data', function (data) {
   var myDate = new Date();
   var textNodeFrom = document.createElement('div');
   textNodeFrom.innerHTML = '<p class="title">' + To + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + data.toString() + '</p>';
   textNodeFrom.className = 'From tl tgreen';
   var parentNode = document.getElementById("chatMsg");
   console.log(textNodeFrom);
   parentNode.appendChild(textNodeFrom);
   console.log(data.toString());
 });

 client.on('end', function () {
   console.log('Disconnected from server');
   //alert(1);
   process.exit();
 });