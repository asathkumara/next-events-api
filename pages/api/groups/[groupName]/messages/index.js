import {ObjectId} from "mongodb";
import Group from "../../../../../lib/models/Group";
import Message from "../../../../../lib/models/Message";
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
    let group = await Group.findOne({name: groupName});

    try
    {
        switch (request.method)
        {
            case "GET":
                let groupMessages = [];

                for (let messageID of group.messages)
                {
                    let message = await Message.findById({_id: new ObjectId(messageID)});
                    groupMessages.push(message);
                }

                response.status(200).json(groupMessages);
                break;

            case "POST":
                result = await Message.create(request.body);
                await Group.findByIdAndUpdate(
                    {_id: group._id},
                    {$push: {messages: new ObjectId(result._id)}},
                    {new: true});

                response.status(201).json(result);
                break;

            default:
                response.status(405).json(result);
        }
    }
    catch (exception)
    {
        result.message = exception.message;
        response.status(404).json(result);
    }

};

export default handler;