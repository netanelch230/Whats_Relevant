class Message{
    constructor(imageProfile, body,sender,timeStamp,timeOfMessage, reason,isContact) {
      this.imageProfile = imageProfile;
      this.body = body;
      this.sender = sender;
      this.timeStamp = timeStamp;
      this.timeOfMessage = timeOfMessage;
      this.reason = reason;
      this.isContact = isContact;
      
    }
  }
  

  class Group{
    constructor(image, name, id)
    {
      this.name=name;
      this.image=image;
      this.id = id;
    }
    
  }
  
  module.exports={Message,Group};