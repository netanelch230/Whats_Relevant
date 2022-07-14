class Message{
    constructor(imageProfile, body,sender,timeStamp, reason,isContact,group) {
      this.imageProfile = imageProfile;
      this.body = body;
      this.sender = sender;
      this.timeStamp = timeStamp;
      this.reason = reason;
      this.isContact = isContact;
      this.group=group;
      
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

  class Participant{
    constructor(image, text, id)
    {
      this.text=text;
      this.image=image;
      this.id = id;
    }
    
  }
  
  module.exports={Message,Group,Participant};