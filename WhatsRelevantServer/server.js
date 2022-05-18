const { collection, addDoc } = require("@firebase/firestore");

const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const log = require('log-to-file');
const port = 5000;
const wa = require("@open-wa/wa-automate");
const ev = require("@open-wa/wa-automate").ev;


// var admin = require("firebase-admin");
// var serviceAccount = require("./src/firebaseConfig/example-76af9-firebase-adminsdk-arkfu-6783ba6c29.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://example-76af9-default-rtdb.firebaseio.com"
// });

// const db = admin.firestore();
// const bucket = admin.storage().bucket();


// try {
//   const userData = { 
//     Words:"netanel231",
//     Memebrs: {
//       Group:["huw","buw","frdcg"]
//       }
//   }
//   const usernameId = "050"
//   db.collection("Users").doc(usernameId).
//   set(userData, { merge: true }).then(()=>{
//     console.log("Successfully uploaded id: ", usernameId)
//   })

// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const usernameId = "050"
// const userRef = db.collection("Users").doc(usernameId)
// const userSnap = userRef.get()
//   .then((snap)=>{
//   const userData = snap.data();
//   userData.Words=[...userData.Words,"OneMoreWord"];
//   userRef.set(userData, { merge: true });
//     //console.log("doc id:", snap.id, "data:", userData
//    // )

// })



const m_keyWords=["הודעה חשובה", "שימו לב", "אזהרה","עדכון","שינויים","דחוף","סקר","מעוניינים"];
let m_userKeyWord=["Hey","Hello"];
let m_groupsMap = {};
let m_groups = [];
let m_isCategorizeMessage = false;
let m_message;
let currentGroup;
let ownerPhoneNumber;

const {Message,Group,Participant} = require("./Classes");
const { currentMessageTime, reverseString,getAllParticipantOnGroupById } = require("./src/helper");
const {setWord}=require("./src/firestoreFunc");
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
      sessionId: "user12237",
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
      
      client.getHostNumber().then(hostId=>{
            log(hostId);
      })
      socket.on('GetAllGroups', async () =>{
        log("get all groups");
        client.getAllGroups(false).
        then(groups => {
          let groupsArr = [];
          for (const group of groups) {
            groupsArr.push(new Group(group.contact.profilePicThumbObj.eurl ,group.contact.name, group.id));
            }
            socket.emit("Groups",groupsArr);
      });
      
    });

      socket.emit('words',m_userKeyWord);
 
      socket.on('ChooseGroup', async (id) => {
        currentGroup=id;
        let participants = await getAllParticipantOnGroupById(client,id,m_groupsMap);
        console.log(participants);
        socket.emit('participants',participants);
      });

      socket.on("chooseParticipant",async (participantId) => {
        m_groupsMap[currentGroup] = m_groupsMap[currentGroup] === undefined ? new Array() : m_groupsMap[currentGroup]; 
        m_groupsMap[currentGroup].push(participantId);
        let participants = await getAllParticipantOnGroupById(client,currentGroup,m_groupsMap);
        console.log(participants);
        socket.emit("participants",participants);
      });

      socket.on("AddWord", (word) => {
        client.getHostNumber().then(hostId=>{
          setWord(hostId,word);
        })
        m_userKeyWord.push(word);
        socket.emit('words',m_userKeyWord);
      })

      socket.on("RemoveWord", (index) => {
        m_userKeyWord.splice(index, 1);
        socket.emit('words',m_userKeyWord);
      })

      client.onMessage(
        message => {
          if(message.isGroupMsg)
	        {
              const timeOfMessage = currentMessageTime();
              m_isCategorizeMessage=false;
              let group = m_groupsMap[message.chat.id];
              log(message.chat.id);
              log(currentGroup);
            if(m_groupsMap.hasOwnProperty(message.chat.id) && group.find((author)=>{return message.author === author}))
            {
              m_isCategorizeMessage=true;
              m_message=new Message(message.sender.profilePicThumbObj.eurl,message.body,
                  message.sender.name,timeOfMessage,message.author,true,message.chat.name);
            }
            else{
                let keyWords = m_userKeyWord.concat(m_keyWords);
                log(keyWords);
                for (let word of keyWords) {
                 if(message.body.includes(word))
                {
                  m_isCategorizeMessage=true;
                  m_message=new Message(message.sender.profilePicThumbObj.eurl,message.body,
                      message.sender.name,timeOfMessage,word,false,message.chat.name);
                      console.log(word);
                  break;
                }
            }
        }
        if(m_isCategorizeMessage)
        {
          console.log(m_message);
          log("------------------New message found!--------");
          log("The message received from: "+message.sender.name);
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
