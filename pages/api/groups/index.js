import {getAll, createGroup} from "../../../lib/repositories/GroupRepository";

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           description: The BSON ID of the user creating the group
 *         name:
 *           type: string
 *           description: The name for the group being created
 *
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

    switch (request.method)
    {
        case "GET":
            let groups = await getAll();
            response.status(200).json(groups);
            break;

        case "POST":
            result = await createGroup(request.body);
            response.status(201).json(result);
            break;

        default:
            response.status(405).json(result);
    }

};

export default handler;