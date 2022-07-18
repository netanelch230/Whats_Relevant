const log = require('log-to-file');
const {doesMemberExistInGroup,getMembersInGroup,getWordsArray} = require('./firestoreFunc');
const { Message } = require("../Classes");
var diffLib = require('diffit');
const m_keyWords = ["הודעה חשובה", "שימו לב", "אזהרה", "עדכון", "שינויים", "דחוף", "סקר", "מעוניינים"];

const currentMessageTime = (how) => {
  var today = new Date();
  return today.toLocaleTimeString('en-US');
};


function reverseString(str) {

  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}


async function getAllParticipantOnGroupById(client, currentGroup, groupsMap) {

  let participants = await client.getGroupMembers(currentGroup).then(members => {
    let participants = client.getHostNumber().then(hostId=>{
      let participants = getMembersInGroup(hostId,currentGroup).then(selectedMembers=>{
        let participants = [];
        for (const member of members) {
          const id = member.id;
          const text = member.formattedName;
          const image = member.profilePicThumbObj.img === null ? undefined : member.profilePicThumbObj.img;
          if(!member.isMe)
          {
            const isExist = selectedMembers.includes(member.id);
            participants.push({text,id,image,isExist});
          }
        }
        return participants;
      })
      return participants;
    })
    return participants;
  })
  return participants;
}

async function messageClassification(message) {
  hostId=message.to.substring(0,message.to.length-5);
  const timeOfMessage = currentMessageTime();
 let newRelevantMessage = await doesMemberExistInGroup(hostId, message.chat.id, message.author).then(isExist=>{
    if(isExist)
    {
      return new Message(message.sender.profilePicThumbObj.eurl, message.body,
      message.sender.name, timeOfMessage, message.author, true, message.chat.name);
    }
    return undefined;
 });
 if(newRelevantMessage === undefined)
 {
  newRelevantMessage = getWordsArray(hostId).then(userKeyWords => {
  const messageContent=message.body.toLowerCase().split(" ");
   let keyWords = Object.assign({}, ...(m_keyWords.concat(userKeyWords)).map((x) => ({[x]: 0})));
   console.log(keyWords);
    for(const [keyWord,value] of Object.entries(keyWords))
    { 
    const keyWordsArray=keyWord.toLowerCase().split(" ");
    for (let kw of keyWordsArray)
    {
        let highestRatio=0;
        for (let word of messageContent)
        {
            let s = new diffLib.SequenceMatcher(null,kw,word);
            highestRatio=highestRatio < s.ratio() ? s.ratio() : highestRatio;
        }
        keyWords[keyWord] += highestRatio;
    }
      keyWords[keyWord] /= keyWordsArray.length;
    }
    for (const [keyWord,value] of Object.entries(keyWords)) {
      if (value>=0.7) {
        return new Message(message.sender.profilePicThumbObj.eurl, message.body,
          message.sender.name, timeOfMessage, keyWord, false, message.chat.name);
      }
    }
    return undefined;
  });
 }
 return newRelevantMessage;
}

module.exports = { currentMessageTime, reverseString, getAllParticipantOnGroupById , messageClassification};