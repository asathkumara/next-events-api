import clientPromise from "../mongodb";
import {ObjectId} from "mongodb";

const getBy = async (predicate) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let event = await db.collection("Events")
        .find(predicate)
        .next();

    return event;
}

const getAll = async ()  => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let events = await db.collection("Events")
                            .find({})
                            .toArray();

    return events;
}

const createEvent = async ({userID, name, startsAt, endsAt}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let newEvent =
    {
        _id: client.ObjectID,
        name: name,
        createdBy: new ObjectId(userID),
        startsAt: startsAt,
        endsAt: endsAt
    };

    let result = await db.collection("Events").insertOne(newEvent);
    return result;
}

const editEvent = async (eventID, {name, startsAt, endsAt}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let eventToBeUpdated = {_id: new ObjectId(eventID)};
    let event = await getBy(eventToBeUpdated);
    event.name = name ?? event.name;
    event.startsAt = startsAt ?? event.startsAt;
    event.endsAt = endsAt ?? event.endsAt;

    let result = await db.collection("Events")
                            .updateOne(eventToBeUpdated, {$set: event});

    return result;
}

const removeEvent = async ({eventID}) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let eventToBeRemoved = {_id: new ObjectId(eventID)};
    let result = await db.collection("Events").deleteOne(eventToBeRemoved);
    return result;
}

export { getBy, getAll, createEvent, editEvent, removeEvent};