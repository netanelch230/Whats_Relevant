const { FieldValue } = require("@firebase/firestore");
var admin = require("firebase-admin");
var serviceAccount = require("./firebaseConfig/example-76af9-firebase-adminsdk-arkfu-6783ba6c29.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-76af9-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// const metadataRef = db.collection('Users').doc("972509675307");
// metadataRef.set({ Token: "ca2OhvqhSP6CsIeMcwxNlt:APA91bGQovqDOZsKc8UHhUd_NHVTaPGA2j9oj1Xj6aY3JqbbSG7XqE3iW1kvxtEnmZML_HkXS3hc6ctL4Kwe4Iz4EStEZNQYsN_PC4VYpU9PNBGYpdQHdlV86AKDSiGKd7FQfAC_M9ce" }).then(() => {
//   console.log('Database updated successfully.');
// });

async function sendNotification()
{
  db.collection('Users').doc("972509675307").get().then(
    (owner) => {
      console.log(owner);
      console.log(owner._fieldsProto.Token.stringValue);
    //const user = db.collection('Users').doc(userId).get();
    console.log("Before sending");
    admin.messaging().sendToDevice(
    owner._fieldsProto.Token.stringValue, // ['token_1', 'token_2', ...]
    {
      notification: {
        body: 'you got a new message',
        title: 'new message',
      },
    },
    {
      // Required for background/quit data-only messages on Android
      priority: 'high',
    },
  );
  console.log("After sending");
    }
  );
  
}


function setWord(userId, word) {
  let userRef = db.collection("Users").doc(userId);
  userRef.get().then((snap) => {
    userData = snap.data();
    userData !== undefined && !userData.Words.includes(word) ? 
    userData.Words = [...userData.Words, word] : userData = { Words: [word] };
    userRef.set(userData);
  });
}

async function deleteWord(userId, wordToDelete) {
  let userRef = db.collection("Users").doc(userId);
  const removeRes = await userRef.update({
    Words: admin.firestore.FieldValue.arrayRemove(wordToDelete)
  });
}

async function deleteUser(userId, groupId, userToDelete)
{
  let userRef = db.collection("Users").doc(userId);
  let members = await getMembersInGroup(userId,groupId);
  const index = members.indexOf(userToDelete);
  members.splice(index, 1);
  userRef.get().then((snap) => {
    userData = snap.data();
    userData.Members[groupId] = members;
    userRef.set(userData);
  });
}

async function addUser(userId, groupId, userToAdd)
{
  let userRef = db.collection("Users").doc(userId);
      userRef.get().then((snap) => {
        userData = snap.data();
        if (userData !== undefined) {
          if (userData.Members !== undefined) {
            if (userData.Members[groupId] !== undefined  && !userData.Members[groupId].includes(userToAdd)) {
              userData.Members[groupId] = [...userData.Members[groupId],userToAdd];
            }
            else  // userData.Members[groupId] === undefined
            {
              userData.Members[groupId] = [userToAdd];
            }
          }
          else    // userData.Members === undefined
          {
            userData.Members = { [groupId]: [userToAdd] };
          }
        }
        else      // userData === undefined
        {
          userData = { Members: { groupId: [userToAdd] } };
        }
        userRef.set(userData);
      });
} 

function updateUserInGroup(userId, groupId, userToUpdate,isNotExist) {

      if(isNotExist)
        addUser(userId, groupId, userToUpdate);
      else
        deleteUser(userId, groupId, userToUpdate);  
}

async function getWordsArray(userId) {
  let userRef = db.collection("Users").doc(userId);
  let words = await userRef.get().then((snap) => {
    userData = snap.data();
    userData = userData !== undefined ? userData.Words : [];
    return userData;
  });
  return words;
}



async function doesMemberExistInGroup(userId, groupId, memberId) {
  const members = await getMembersInGroup(userId,groupId);
  return members.includes(memberId);
  }

async function doesWordExist(userId, word) {
  const userRef = db.collection('Users');
  const snapshot = await userRef.where("Words", 'array-contains', word).get();
  let isWordExist = false;
  if (snapshot.empty) {
    console.log('No matching documents.');
    return false;
  }

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    if (doc.id == userId)
      isWordExist = true;
  });
  return isWordExist;
}

async function getMembersInGroup(userId, groupId) {
  let userRef = db.collection("Users").doc(userId);
  let members = await userRef.get().then((snap) => {
    userData = snap.data();
    if (userData !== undefined && userData.Members !== undefined && userData.Members[groupId] !== undefined)
      return userData.Members[groupId];
    return [];
  });
  return members;
}

module.exports = { setWord, deleteWord, doesMemberExistInGroup, 
  doesWordExist, getWordsArray, getMembersInGroup,deleteUser,updateUserInGroup,
  sendNotification };
