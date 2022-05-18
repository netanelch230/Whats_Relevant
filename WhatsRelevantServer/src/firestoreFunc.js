var admin = require("firebase-admin");
var serviceAccount = require("./firebaseConfig/example-76af9-firebase-adminsdk-arkfu-6783ba6c29.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-76af9-default-rtdb.firebaseio.com"
});

const db = admin.firestore();


function setWord(userId,word)
{
  const userRef = db.collection("Users").doc(userId);
  userRef.get().then((snap)=>{
  let userData = snap.data();
  userData !== undefined ? userData.Words=[...userData.Words,word]:userData={Words:[word]};
  userRef.set(userData);
})
}
module.exports = { setWord};
