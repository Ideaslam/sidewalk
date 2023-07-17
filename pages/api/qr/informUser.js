
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import {  TwilioService } from '../../../utils/twilio';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { code } = req.query; 

        console.log('User informing')
        const qr = await db.collection("qrs").findOne({
            code : code
        })


        // Send SMS
        var smsStatus=false ;
        try{
            var service =new TwilioService(); 
            var response=  await service.sendSms(qr.phone,"Please Move Your Car");
            console.log(response.sid) ;
            smsStatus=true; 
        }catch(error){

            console.error(error.message)
        }
       

        var updatedQr  =null ;
        if (qr) {
            updatedQr = await db.collection("qrs").updateOne({
                code : code
            },
                {
                    $inc: {
                        userTimes: 1
                    },
                    $push: {

                        scans: {
                            datetime: new Date() ,
                            smsStatus :smsStatus
                        }
                    }
                }
            )

        }

        res.json(qr);


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}