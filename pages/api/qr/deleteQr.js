
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { id } = req.query;


        const qr = await db.collection("qrs").deleteOne(
            {
                _id: ObjectId(id)
            });


        res.json(qr);


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}