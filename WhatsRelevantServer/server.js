const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const log = require('log-to-file');
const port = 5000;
const wa = require("@open-wa/wa-automate");
const ev = require("@open-wa/wa-automate").ev;

const m_keyWords=["הודעה חשובה", "שימו לב", "אזהרה","עדכון","שינויים","דחוף","סקר","מעוניינים"];
let m_groupsMap = {};
let m_groups = [];
let m_isCategorizeMessage = false;
let m_message;
let currentGroup;


const {Message,Group,Participant} = require("./Classes");
const { currentMessageTime, reverseString,getAllParticipantOnGroupById } = require("./src/helper");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connect", (socket) => {
  log("a user connected :D");
  socket.on("join", () => {
    wa.create({
      sessionId: "user0",
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
      client.getHostNumber().then((phoneNumber) => {
        console.log(phoneNumber)
      });
      client.getAllGroups(false).
      then(groups => {
        let i=0;
        for (const group of groups) {
            log(group.name);
            log(group);
            let currentGroup = new Group(group.contact.profilePicThumbObj.eurl ,group.contact.name, group.id);
            socket.emit("group",currentGroup);
            i++;
            if(i==5)
              break;
        }
    });
 
      socket.on('ChooseGroup', async (id) => {
        currentGroup=id;
        log("The id of gotten group is: "+id);
        let participants = await getAllParticipantOnGroupById(client,id,m_groupsMap);
        log("My participants is: "+participants);
        socket.emit('participants',participants);
        log("after send message");
      });

      socket.on("chooseParticipant",async (participantId) => {
        m_groupsMap[currentGroup] = m_groupsMap[currentGroup] === undefined ? new Array() : m_groupsMap[currentGroup]; 
        m_groupsMap[currentGroup].push(participantId);
        log(m_groupsMap[currentGroup]);
        let participants = await getAllParticipantOnGroupById(client,currentGroup,m_groupsMap);
        log("My participants is: "+participants);
        socket.emit("participants",participants);
      });
      

      client.onMessage(
        message => {

          if(message.isGroupMsg)
	        {
              const timeOfMessage = currentMessageTime();
              m_isCategorizeMessage=false;
            if(m_groupsMap.hasOwnProperty(currentGroup) && m_groupsMap[message.chat.id].find((author)=>{return message.author === author}))
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
          log("------------------New message found!--------");
          log("The message recived from: "+message.sender.name);
          log("The message is: "+ message.body);
          //log("This message has been categorized because of the words:"+reverseString(word));
          log("--------------------------------------------");
          socket.emit("message", m_message);
        }
        }
      }
      );
    }

    ev.on("qr.**", async (qrcode) => {
      socket.emit("QrCode", qrcode);
      log("emit image");
    });
    ev.on("sessionData.**", async (sessionData, sessionId) => {
      socket.emit("SuccessSession", { message: "Success Session" });
    });
  });
});

server.listen(process.env.PORT || 5000, () =>
  log(`Server has started.`)
);
