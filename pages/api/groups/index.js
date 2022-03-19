import Group from "../../../lib/models/Group";
import {ObjectId} from "mongodb";

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Returns all the groups
 *     description: Returns all the groups
 *     tags:
 *       - Group
 *     responses:
 *       200:
 *         description: Groups were retrieved successfully.
 *
 *   post:
 *     summary: Creates a new group
 *     description: Creates a new group
 *     tags:
 *       - Group
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Group"
 *           example:
 *             userID: 6224fe098c103c8a0a8f1859
 *             name: cs380
 *     responses:
 *       201:
 *         description: Group was created successfully.
 *
 *
 *  */
const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / POST permitted."};

    try
    {
        switch (request.method)
        {
            case "GET":
                result = await Group.find({});
                response.status(200).json(result);
                break;

            case "POST":
                request.body["members"] = [new ObjectId(request.body.userID)];
                result = await Group.create(request.body);
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