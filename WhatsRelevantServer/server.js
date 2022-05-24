const { currentMessageTime } = require("./src/helper");

//server api
const http = require("http");
const cors = require("cors");
const express = require("express");

const app = express();
const accountRouter = require("./src/api/account");
const WordsRouter = require("./src/api/Words");

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/account", accountRouter);
app.use("/words", WordsRouter);

//wa
const wa = require("@open-wa/wa-automate");
const ev = require("@open-wa/wa-automate").ev;
const port = 3000;

//socket
const server = http.createServer(app);
server.listen(port, () => console.log(` Server has started on port : ${port}`));
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const PhoneNumbers = [];
const clientSessionRegistry = {};
const socketIdByClientSessionId = {};

io.on("connection", (socket) => {
  console.log("a user connected :D", socket.id);

  socket.on("join", (userName) => {
    //socket.emit()id
    //wa.is connect(sessionId)? socket.emit("SuccessSession") :create
    //first time-> create session
    //second time->
    createWA(userName);
    socketIdByClientSessionId[userName] = socket.id;
    console.log("user", userName, "->", socket.id);
    console.log(JSON.stringify(socketIdByClientSessionId));
  });
});

io.on("disconnect", function (socket) {
  console.log("Got disconnect!", socket.id);
});

const createWA = (userName) => {
  wa.create({
    sessionId: userName,
    multiDevice: true,
    authTimeout: 60,
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: "PT_BR",
    logConsole: false,
    popup: true,
    qrTimeout: 0,
  }).then((client) => start(client));
};

function start(client) {
  client.getHostNumber().then((phoneNumber) => {
    //socket.emit("phoneNumber", phoneNumber);
    console.log("phoneNumber", phoneNumber);
  });
  clientSessionRegistry[client.getSessionId()] = client;
  console.log(clientSessionRegistry);
  client.onMessage(async (message) => {
    console.log(message.body);
  });
}

ev.on("qr.**", async (qrcode, sessionId) => {
  io.to(socketIdByClientSessionId[sessionId]).emit("QrCode", qrcode);
  console.log(
    "emit qrcode to  ",
    sessionId,
    socketIdByClientSessionId[sessionId]
  );
});
ev.on("sessionData.**", async (sessionData, sessionId) => {
  console.log("sessionData", sessionData);
  io.to(socketIdByClientSessionId[sessionId]).emit("SuccessSession", {
    message: "SuccessSession",
    data: sessionData,
  });
});
