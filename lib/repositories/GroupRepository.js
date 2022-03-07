import clientPromise from "../mongodb";
import {ObjectId} from "mongodb";

const getBy = async (predicate) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let group = await db.collection("Groups")
        .find(predicate)
        .toArray();

    return group;
}

const getAll = async ()  => {
    let groups = await getBy({});

    return groups;
}

const getGroupMembers = async (predicate) => {
    let group = await getBy(predicate);

    return group[0].members;
}

const getGroupMessages = async (predicate) => {
    let group = await getBy(predicate);

    return group[0].messages;
}

const createGroup = async ({userID, name}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let newGroup =
    {
        _id: client.ObjectID,
        name: name,
        members: [new ObjectId(userID)],
        messages: [],
        events: []
    };

    let result = await db.collection("Groups").insertOne(newGroup);
    return result;
}

const addMember = async (memberID, groupName) =>  {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groupToBeUpdated = {name: groupName};
    let newMember = { $push: { members: new ObjectId(memberID) }};

    let result = await db.collection("Groups").updateOne(groupToBeUpdated, newMember);
    return result;
}

const removeMember = async (memberID, groupName) =>  {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groupToBeUpdated = {name: groupName};
    let memberToBeRemoved = { $pull: { members: new ObjectId(memberID) }};

    let result = await db.collection("Groups").updateOne(groupToBeUpdated, memberToBeRemoved);
    return result;
}

const addMessage = async (messageID, groupName) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groupToBeUpdated = {name: groupName};
    let newMessage = { $push: { messages: messageID }};

    let result = await db.collection("Groups").updateOne(groupToBeUpdated, newMessage);
    return result;
};



export { getBy, getAll, getGroupMembers, getGroupMessages, createGroup, addMessage, addMember, removeMember };