import {createMessage, getBy} from "../../../../../lib/repositories/MessageRepository";
import {addMessage, getGroupMessages} from "../../../../../lib/repositories/GroupRepository";
import {ObjectId} from "mongodb";
/**
 * @swagger
 * /api/groups/{groupName}/messages:
 *   get:
 *     summary: Returns all the messages sent to the group
 *     description: Returns all the messages sent to the group
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *     responses:
 *       200:
 *         description: Groups were retrieved successfully.
 *
 *   post:
 *     summary: Creates a new message
 *     description: Creates a new message
 *     tags:
 *       - Message
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
 *             $ref: "#/components/schemas/Message"
 *           example:
 *             userID: 6224fe098c103c8a0a8f1859
 *             contents: I'll meet you after class
 *     responses:
 *       201:
 *         description: Message was sent successfully.
 *
 *
 *  */
const handler = async (request, response) => {

    let result = {acknowledged: false, message: "Only GET / POST permitted."};
    let { groupName } = request.query;

    /**
     * TO-DO: Parse message ids from get group messages to actual messages.
     */
    switch (request.method)
    {
        case "GET":
            let messageIDs = await getGroupMessages({name: groupName});
            let messages = [];

            for (let messageID of messageIDs)
            {
                let message = await getBy({_id: new ObjectId(messageID)});
                messages.push(message);
            }

            response.status(200).json(messages);
            break;

        case "POST":
            let { insertedId } = await createMessage(request.body);
            result = await addMessage(insertedId, groupName);

            response.status(201).json(result);
            break;

        default:
            response.status(405).json(result);
    }
};

export default handler;