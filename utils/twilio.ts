import { Twilio } from "twilio";


export   class TwilioService {
    private accountSid :string|undefined;
    private authToken:string|undefined;
    private twilioNumber:string|undefined;
 

    constructor(){
      
          this.accountSid = process.env.TWILIO_ACCOUNT_SID;
          this.authToken = process.env.TWILIO_AUTH_TOKEN;
          this.twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    }

    sendSms(phone:string, body:string) {
        const client = new Twilio(this.accountSid, this.authToken);
        console.log(phone);
       return new  Promise ((resolve,reject)=>{
        client.messages
        .create({
          from: this.twilioNumber,
          to: phone,
          body: body,
        }).then(message => resolve(message))
        .catch(err=> reject(err)) ;
       })
         
    }
 

}
