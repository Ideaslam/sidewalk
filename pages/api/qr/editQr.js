
import clientPromise from '../../../lib/mongodb'; 
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { id } = req.query;
        const { times } = req.body;

        const qr  = await db.collection("qrs").updateOne(
            {
                _id: ObjectId(id)
            },
            {
                $set: {
                    times: times
                }
            }
        )


        res.json(qr);


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}