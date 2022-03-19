import {createEvent, editEvent, getBy, removeEvent} from "../../../../../lib/repositories/EventRepository";
import {removeGroupEvent} from "../../../../../lib/repositories/GroupRepository";
import {ObjectId} from "mongodb";

/**
 * @swagger
 * /api/groups/{groupName}/events/{eventID}:
 *   get:
 *     summary: Returns the event for a given ID
 *     description: Returns the event for a given ID
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *       - in: path
 *         name: eventID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BSON ID of the event
 *     responses:
 *       200:
 *         description: The event was retrieved successfully.
 *
 *   patch:
 *     summary: Edit an existing event
 *     description: Edit an existing event
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *       - in: path
 *         name: eventID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BSON ID of the event
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 *           example:
 *             name: "Homework 5 Party"
 *             startsAt: "3/15/2022, 2:30:00 PM"
 *             endsAt: "3/15/2022, 3:00:00 PM"
 *     responses:
 *       200:
 *         description: Event was updated successfully.
 *
 *   delete:
 *     summary: Remove an existing event
 *     description: Remove an existing event
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *       - in: path
 *         name: eventID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BSON ID of the event
 *     responses:
 *       200:
 *         description: Event was removed successfully.
 *  */
const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / PATCH / DELETE permitted."};
    let { groupName, eventID } = request.query;

    switch (request.method)
    {
        case "GET":
            let events = await getBy({_id: new ObjectId(eventID)});
            response.status(200).json(events);
            break;

        case "PATCH":
            result = await editEvent(eventID, request.body);
            response.status(200).json(result);
            break;

        case "DELETE":
            result = await removeEvent(eventID);
            // result = await removeGroupEvent(eventID, groupName);

            response.status(200).json(result);
            break;

        default:
            response.status(405).json(result);
    }

};

export default handler;