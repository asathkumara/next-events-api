import {createEvent, getBy, removeEvent} from "../../../../../lib/repositories/EventRepository";
import {addEvent, getGroupEvents, getGroupMembers} from "../../../../../lib/repositories/GroupRepository";
import {ObjectId} from "mongodb";

/**
 * @swagger
 * /api/groups/{groupName}/events:
 *   get:
 *     summary: Returns all the events for the group
 *     description: Returns all the events for the group
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *     responses:
 *       200:
 *         description: Events were retrieved successfully.
 *
 *   post:
 *     summary: Creates a new event
 *     description: Creates a new event
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 *           example:
 *             userID: 6224fe098c103c8a0a8f1859
 *             name: "Homework 5 Party"
 *             startsAt: "3/15/2022, 2:30:00 PM"
 *             endsAt: "3/15/2022, 2:30:00 PM"
 *     responses:
 *       201:
 *         description: Event was created successfully.
 *
 *
 *  */
const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / POST permitted."};
    let { groupName } = request.query;

    switch (request.method)
    {
        case "GET":
            let groupEventIDs = await getGroupEvents({name: groupName});
            let groupEvents = [];

            for (let eventID of groupEventIDs) {
                let event = await getBy({_id: new ObjectId(eventID)});
                groupEvents.push(event);
            }

            response.status(200).json(groupEvents);
            break;

        case "POST":
            let { insertedId } = await createEvent(request.body);
            result = await addEvent(insertedId, groupName);
            response.status(201).json(result);
            break;

        default:
            response.status(405).json(result);
    }

};

export default handler;