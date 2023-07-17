
import clientPromise from '../../../lib/mongodb';
import { v4 as uuid } from 'uuid';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { times } = req.body;
        const code = uuid();
        const encoded=  Buffer.from(code).toString('base64')
        const qr = await db.collection("qrs").insertOne({
            code : encoded,
            times :times
           
        })

        res.json(qr);


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}