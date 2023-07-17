
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { id } = req.query;
        const { name ,phone } = req.body;

        const qr = await db.collection("qrs").findOne({
            _id: ObjectId(id)
        })
        var updatedQr  =null ;
        if (qr) {
            updatedQr = await db.collection("qrs").updateOne({
                _id: ObjectId(id)
            },
                {
                    $set: {
                        name: name ,
                        phone: phone
                    }
                }
            )

        }

        res.json(updatedQr);


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}