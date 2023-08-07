
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import {  MsgatService } from '../../../utils/msgat';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { code } = req.query;

        const qr = await db.collection("qrs").findOne({
            code: code
        })



        // check if pcakage is valid
        if (qr.userTimes >= qr.times) {
           
            throw new  Error ("Package Balance is zero"); 
          
        }


        // Send SMS
        var smsStatus = false;
        var message = "Please Move Your Car";
        var error =null; 
        try {

            if (qr.userTimes + 1 == qr.times) {
                message = "Please Move Your Car ,Extend your package for more scans"
            }

            var service = new MsgatService();
            var result = await service.SendMessage({to:qr.phone, data:message});
          console.log(result.code);
          if(result.code=='1' || result.code =='M0000 '){
            smsStatus = true;
          }else{
            error = result.message ; 
          }
            
        } catch (error) {

            console.error(error.message)
            error = error.message ; 
            res.status(500).send(err.message);
            
        }


        var updatedQr = null;
        if (qr) {
            updatedQr = await db.collection("qrs").updateOne({
                code: code
            },
                {
                    $inc: {
                        userTimes: 1
                    },
                    $push: {

                        scans: {
                            datetime: new Date(),
                            smsStatus: smsStatus,
                            message: message ,
                            error : error
                        }
                    }
                }
            )

        }

        if(error){
            res.status(500).send(error);
        }

        res.json(qr);


    } catch (err) {
        console.error(err); 
        res.status(500).send(err.message);
    }
}