const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;
const wa = require("@open-wa/wa-automate");
const ev = require("@open-wa/wa-automate").ev;

const m_keyWords=["הודעה חשובה", "שימו לב", "אזהרה","עדכון","שינויים","דחוף","סקר","מעוניינים"];
let m_groupsMap = new Map();
let m_groups = [];
let m_isCategorizeMessage = false;
let m_message;


class Message{
  constructor(imageProfile, body,sender,timeStamp,timeOfMessage, reason,isContact) {
    this.imageProfile = imageProfile;
    this.body = body;
    this.sender = sender;
    this.timeStamp = timeStamp;
    this.timeOfMessage = timeOfMessage;
    this.reason = reason;
    this.isContact = isContact;
    
  }
}

const { currentMessageTime } = require("./src/helper");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connect", (socket) => {
  console.log("a user connected :D");
  socket.on("join", () => {
    wa.create({
      sessionId: "user3",
      multiDevice: true, //required to enable multiDevice support
      authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
      blockCrashLogs: true,
      disableSpins: true,
      headless: true,
      hostNotificationLang: "PT_BR",
      logConsole: false,
      popup: true,
      qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
    }).then((client) => start(client));

    function start(client) {
      client.onMessage(
        message => {

          if(message.isGroupMsg)
	        {
              const timeOfMessage = currentMessageTime();
              m_isCategorizeMessage=false;
            if(m_groupsMap.get(message.chat.id) == message.author)
            {
              m_isCategorizeMessage=true;
              m_message=new Message(message.sender.profilePicThumbObj.eurl,message.body,
                  message.sender.name,message.timestamp,timeOfMessage,message.author,true);
            }
            else{
                for (let word of m_keyWords) {
                 if(message.body.includes(word))
                {
                  m_isCategorizeMessage=true;
                  m_message=new Message(message.sender.profilePicThumbObj.eurl,message.body,
                      message.sender.name,message.timestamp,timeOfMessage,word,false);
                  break;
                }
            }
        }
        if(m_isCategorizeMessage)
        {
          console.log("------------------New message found!--------");
          console.log("The message recived from: "+reverseString(message.sender.name));
          console.log("The message is: "+ reverseString(message.body));
          //console.log("This message has been categorized because of the words:"+reverseString(word));
          console.log("--------------------------------------------");
          socket.emit("message", m_message);
        }
        }
      }
      );
    }

    ev.on("qr.**", async (qrcode) => {
      socket.emit("QrCode", qrcode);
      console.log("emit image");
    });
    ev.on("sessionData.**", async (sessionData, sessionId) => {
      socket.emit("SuccessSession", { message: "Success Session" });
    });
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);

function reverseString(str) {

  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}