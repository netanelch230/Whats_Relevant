const log = require('log-to-file');

const currentMessageTime = (how) => {
  var today = new Date();
  //   var date =
  //     today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  return today.getHours() + ":" + today.getMinutes();
};


function reverseString(str) {

  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}


function presentAllGroups(client) {
  client.getAllGroups(false).
    then(groups => {
      for (const group of groups) {
        log(reverseString(group.name));
      }
    });
}

async function getAllParticipantOnGroupById(client, currentGroup, groupsMap) {

  let participants = [];

  await client.getGroupMembers(currentGroup).then(members => {
    for (const member of members) {
      const id = member.id;
      const text = member.formattedName;
      const image = member.profilePicThumbObj.eurl != undefined ? member.profilePicThumbObj.eurl : null;
      if(! thisContantExist(currentGroup,groupsMap,id))
      {
        let participant = {text,id};
        log(id);
        log(text);
        participants.push(participant);
      }
    }
    return participants;
  });
  return participants;
}



function ChooseParticipantInGroup(client, indexOfGroup, indexOfParticipant) {
  client.getAllGroups(false).
    then(groups => {
      const group = groups[indexOfGroup];
      if (group !== undefined) {
        m_groupsMap.set(group.id, group.groupMetadata.participants[indexOfParticipant].id._serialized);
        log("the group is: " + reverseString(group.name) + " and the participant is: " +
          group.groupMetadata.participants[indexOfParticipant].id._serialized);
      }

    });

}

function thisContantExist( currentGroup, groupsMap,contantId )
{
  return (groupsMap.hasOwnProperty(currentGroup) && 
  groupsMap[currentGroup].find((author)=>{return contantId === author}))
}

module.exports = { currentMessageTime, reverseString, getAllParticipantOnGroupById };