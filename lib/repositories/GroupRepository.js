import clientPromise from "../mongodb";
import {ObjectId} from "mongodb";

const getBy = async (predicate) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let group = await db.collection("Groups")
        .find(predicate)
        .next();

    return group;
}

const getAll = async ()  => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groups = await db.collection("Groups")
        .find({})
        .toArray();

    return groups;
}

const getGroupMembers = async (predicate) => {
    let group = await getBy(predicate);

    return group.members;
}

const getGroupMessages = async (predicate) => {
    let group = await getBy(predicate);

    return group.messages;
}

const getGroupEvents = async (predicate) => {
    let group = await getBy(predicate);

    return group.events;
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
    let newMessage = { $push: { messages: new ObjectId(messageID) }};

    let result = await db.collection("Groups").updateOne(groupToBeUpdated, newMessage);
    return result;
};

const addEvent = async (eventID, groupName) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groupToBeUpdated = {name: groupName};
    let newEvent = { $push: { events: new ObjectId(eventID) }};

    let result = await db.collection("Groups").updateOne(groupToBeUpdated, newEvent);
    return result;
};

const removeGroupEvent = async (eventID, groupName) =>  {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groupToBeUpdated = {name: groupName};
    let eventToBeRemoved = { $pull: { events: new ObjectId(eventID) }};

    let result = await db.collection("Groups").updateOne(groupToBeUpdated, eventToBeRemoved);
    return result;
}


export {
    getBy,
    getAll,
    getGroupMembers,
    getGroupMessages,
    getGroupEvents,
    createGroup,
    addMessage,
    addMember,
    removeMember,
    addEvent,
    removeGroupEvent
};