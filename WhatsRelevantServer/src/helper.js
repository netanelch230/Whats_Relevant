const log = require('log-to-file');

const currentMessageTime = (how) => {
  var today = new Date();
  //   var date =
  //     today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  
  //return today.getHours() + ":" + today.getMinutes();
  return today.toLocaleTimeString('en-US');
};


function reverseString(str) {

  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}


async function getAllParticipantOnGroupById(client, currentGroup, groupsMap) {

  let participants = [];

  await client.getGroupMembers(currentGroup).then(members => {
    console.log(members);
    for (const member of members) {
      const id = member.id;
      const text = member.formattedName;
      const image = member.profilePicThumbObj.img === null ? undefined : member.profilePicThumbObj.img;
      if(! thisContentExist(currentGroup,groupsMap,id) && !member.isMe)
      {
        participants.push({text,id,image});
        log(image);
      }
    }
    return participants;
  });
  return participants;
}

function thisContentExist( currentGroup, groupsMap,contactId )
{
  return (groupsMap.hasOwnProperty(currentGroup) && 
  groupsMap[currentGroup].find((author)=>{return contactId === author}))
}

module.exports = { currentMessageTime, reverseString, getAllParticipantOnGroupById };