const { collection, addDoc } = require("@firebase/firestore");

const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const log = require('log-to-file');
const port = 5000;
const wa = require("@open-wa/wa-automate");
const ev = require("@open-wa/wa-automate").ev;
var rn = require('random-number');
const { v4: uuidv4 } = require('uuid');

let m_groupsMap = {};
let currentGroup;


const { Message, Group, Participant } = require("./Classes");
const { currentMessageTime, reverseString, getAllParticipantOnGroupById, messageClassification } = require("./src/helper");
const { setWord, deleteWord, updateUserInGroup, getWordsArray, doesMemberExistInGroup, getMembersInGroup, deleteUser,sendNotification } = require("./src/firestoreFunc");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});



io.on("connect", (socket) => {
  log("a user connected :D");
  socket.on("join", (guid) => {
    wa.create({
      sessionId: guid,
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
      client.getHostNumber().then(hostId => {
        console.log("we are sending a message to", hostId);
        socket.emit("phoneNumber", {
            content:{hostId},
            to:hostId
        })
      })

      socket.on('GetAllGroups', async () => {
        log("get all groups");
        client.getAllGroups(false).
          then(groups => {
            let groupsArr = [];
            for (const group of groups) {
              groupsArr.push(new Group(group.contact.profilePicThumbObj.eurl, group.contact.name, group.id));
            }
            socket.emit("Groups", groupsArr);
          });

      });

      client.getHostNumber().then(hostId => {
        getWordsArray(hostId).then(userKeyWords => {
          console.log(userKeyWords);
          socket.emit('words', userKeyWords);
        });
      })

      socket.on('ChooseGroup', async (id) => {
        currentGroup = id;
        getAllParticipantOnGroupById(client, id, m_groupsMap).then(participants => {
          socket.emit("participants", participants);
        })
      });

      socket.on("updateParticipants", async (participantId, isNotExist) => {
        client.getHostNumber().then(hostId => {
          updateUserInGroup(hostId, currentGroup, participantId, isNotExist);
        })
        m_groupsMap[currentGroup] = m_groupsMap[currentGroup] === undefined ? new Array() : m_groupsMap[currentGroup];
        m_groupsMap[currentGroup].push(participantId);
      });

      socket.on("AddWord", (word) => {
        client.getHostNumber().then(hostId => {
         setWord(hostId, word).then(userKeyWords=>{
            console.log(userKeyWords);
            socket.emit('words', userKeyWords);
          })
         })
        })

      socket.on("RemoveWord", (word) => {
        client.getHostNumber().then(hostId => {
          deleteWord(hostId, word).then(userKeyWords=>{
              console.log(userKeyWords);
              socket.emit('words', userKeyWords);
            })
          })
        })


      client.onMessage(
        message => {
          console.log("The message is: " + message.text);
          console.log(message.chat.notSpam);
          if (message.isGroupMsg && message.text != '' && message.chat.notSpam) {
            messageClassification(message).then(newMessage=>{
              console.log("There is a new message: ",newMessage);
                if(newMessage!=undefined)
                {
                  console.log(newMessage);
                  log("------------------New message found!--------");
                  log("The message received from: " + message.sender.name);
                  log("The message is: " + message.body);
                  log("--------------------------------------------");
                  socket.emit("message", newMessage);
                }
              });
                
          }
        }
      );
}

    ev.on("qr.**", async (qrcode) => {
  socket.emit("QrCode", "http://localhost:7000");
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
