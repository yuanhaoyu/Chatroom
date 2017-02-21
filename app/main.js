const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,frame: true})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// var net = require('net');
// var PORT=8080;
// var From,To;
// var Msg=null;


// const {ipcMain} = require('electron')



// var client = net.connect({ port: PORT }, function() {
//     ipcMain.on('connect-message', (event, arg) => {
//       console.log(arg);
//       From=arg.from.trim();
//       To=arg.to.trim();        
//       event.sender.send('connect-reply', 'welcome')
//     })

//     ipcMain.on('connectM-message', (event, arg) => {
//       console.log(arg);
//       Msg=arg.msg.trim();
//           var send={
//                 from:From,
//                 to:To,
//                 msg:Msg
//             };
//        client.write(JSON.stringify(send)); 
//     })

//     client.on('error',function(err){  
//      console.log(err);  
//     });  
//     //client.write(JSON.stringify(send)); 
   
// });


// client.on('data', function(data) {
//   console.log('data-test'+data.toString());
//       ipcMain.on('connectM-message', (event, arg) => {
//         console.log('test1');
//       event.sender.send('connectM-reply',data.toString())
//     })

// });

// client.on('end', function() {
//     console.log('Disconnected from server');
//     process.exit();
// });
