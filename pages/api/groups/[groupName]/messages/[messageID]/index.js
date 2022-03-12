import {editMessage} from "../../../../../../lib/repositories/MessageRepository";

/**
 * @swagger
 *
 * /api/groups/{groupName}/messages/{messageID}:
 *
 *   patch:
 *     summary: Edit a message
 *     description: Edit a message
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the group
 *       - in: path
 *         name: messageID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BSON ID of the message
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Message"
 *           example:
 *             contents: Scratch that, something came up. I'll meet you tomorrow.
 *     responses:
 *       200:
 *         description: Message was edited successfully.
 *
 *
 *  */
const handler = async (request, response) => {

    let result = {acknowledged: false, message: "Only PATCH permitted."};

    switch (request.method)
    {
        case "PATCH":
            let { messageID } = request.query;
            result = await editMessage(messageID, request.body.contents);

            response.status(200).json(result);
            break;

        default:
            response.status(405).json(result);
    }
};

export default handler;