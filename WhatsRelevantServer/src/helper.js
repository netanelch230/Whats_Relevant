const currentMessageTime = (how) => {
  var today = new Date();
  //   var date =
  //     today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  return today.getHours() + ":" + today.getMinutes();
};
module.exports = { currentMessageTime };

function presentAllGroups(client)
{
  client.getAllGroups(false).
  then(groups => {
      for (const group of groups) {
          console.log(reverseString(group.name));
      }
  });
}

function presentAllParticipantInGroup(client, index)
{
  client.getAllGroups(false).
  then(groups => {
      console.log("The participants of: " + reverseString(groups[index].name));
      const participants = groups[index].groupMetadata.participants;
      console.log(groups[index].groupMetadata.participants);
      for (const participant of participants) {
          console.log((participant));
      }
  });

}

function ChooseParticipantInGroup(client,indexOfGroup, indexOfParticipant) {
  client.getAllGroups(false).
  then(groups => {
      const group = groups[indexOfGroup];
      if(group!==undefined)
      {
          m_groupsMap.set(group.id, group.groupMetadata.participants[indexOfParticipant].id._serialized);
          console.log("the group is: "+reverseString(group.name)+" and the participant is: "+
              group.groupMetadata.participants[indexOfParticipant].id._serialized);
      }

  });

}