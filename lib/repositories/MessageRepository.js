import clientPromise from "../mongodb";
import {ObjectId} from "mongodb";

const getBy = async (predicate) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let message = await db.collection("Messages")
                            .find(predicate)
                            .next();

    return message;
}

const getAll = async () => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let messages = await db.collection("Messages")
                            .find({})
                            .toArray();

    return messages;
}

const createMessage = async ({userID, contents}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let newMessage = {
      _id: client.ObjectID,
      userID: userID,
      contents: contents,
      postedAt: new Date(Date.now()).toLocaleString()
    };

    let result = await db.collection("Messages").insertOne(newMessage);
    return result;
}

const editMessage = async (messageID, contents) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let result = await db.collection("Messages")
                            .updateOne({_id: new ObjectId(messageID)}, {$set: {contents: contents}});

    return result;
}

export { getBy, getAll, createMessage, editMessage };