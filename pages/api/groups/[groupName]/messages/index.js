import {createMessage, getAll} from "../../../../../lib/repositories/MessageRepository";
import {addMessage, getGroupMessages} from "../../../../../lib/repositories/GroupRepository";

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           description: The BSON ID of the user sending the message
 *         contents:
 *           type: string
 *           description: The message contents
 *
 * /api/groups/{groupName}/messages:
 *   get:
 *     summary: Returns all the messages sent to the group
 *     description: Returns all the messages sent to the group
 *     tags:
 *       - Group
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
 *       - Group
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
            let messages = await getGroupMessages({name: groupName});
            response.status(200).json(messages);

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