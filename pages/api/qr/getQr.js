import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("qrs");
        const { id } = req.query;

        const post = await db
            .collection("qrs")
            .findOne({
                '_id': ObjectId(id)
            })

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};