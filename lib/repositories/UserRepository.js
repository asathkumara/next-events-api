import clientPromise from "../mongodb";
import {ObjectId} from "mongodb";

const getBy = async (predicate) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let user = await db.collection("Users")
                        .find(predicate)
                        .next();

    return user;
}

const getAll = async () => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let users = await db.collection("Users")
                            .find({})
                            .toArray();

    return users;
};

const createUser = async ({name, interests=[], active=true}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let newUser =
    {
        _id: client.ObjectID,
        name: name,
        joinedAt: new Date(Date.now()).toLocaleString(),
        interests: interests,
        active: active
    }

    let result = db.collection("Users").insertOne(newUser);
    return result;
}

const editUser = async (userID, {interests, active}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let userToBeUpdated = {_id: new ObjectId(userID)};
    let user = await getBy(userToBeUpdated);
    user.interests = interests ?? user.interests;
    user.active = active ?? user.active;

    let result = await db.collection("Users")
                            .updateOne(userToBeUpdated, {$set: user});

    return result;
}


export { getBy, getAll, createUser, editUser }