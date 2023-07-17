
import clientPromise from '../../../lib/mongodb';
import { v4 as uuid } from 'uuid';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
         
        const qrs = await db.collection("qrs").find({}).limit(20).toArray();

        res.json(qrs);


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}