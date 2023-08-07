 import axios from 'axios';

export class MsgatService {
  private key :string|undefined;
 


  constructor(){
    
        this.key = process.env.MSGAT_KEY;
        
  }
  SendMessage({to,data}:{to:string,data:string}) {

    var body = {
      userName: "ghazeer",
      apiKey:  this.key ,
      numbers: to,
      userSender: "ghazeer",
      msg: data,
      timeToSend: "now",
      msgEncoding: "UTF8"
    }
 
    var url = 'https://www.msegat.com/gw/sendsms.php'

    return new Promise((resolve, reject) => {
      axios.post(url, body )
      .then(function (response) {
        console.log(response.status);
        resolve(response.data) ;
      })
      .catch(function (error) {
        console.log(error);
        reject(error) ; 
      });
    })
  }

  SendVerify() {
    // return new Promise(function (resolve, reject) {
    //     client.verify.services(ServiceId)
    //         .verifications
    //         .create({ to: phone, channel: 'sms' })
    //         .then(verification =>
    //             resolve(verification.status)
    //         ).catch(err => {
    //             reject(err);
    //         });
    // });

  }


  VerifyPhone(phone: string, code: string) {
    // client.verify.services(ServiceId)
    //     .verificationChecks
    //     .create({ to: phone, code: code })
    //     .then(verification_check => 
    //         resolve(verification_check.status)
    //     ).catch(err => {

    //         reject(err);
    //     })
    //     ;

  }
}







