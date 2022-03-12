import {createUser, getAll} from "../../../lib/repositories/UserRepository";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _ID:
 *           type: string
 *           description: The BSON ID of the user. [Generated value]
 *         name:
 *           type: string
 *           description: The name of the user.
 *         joinedAt:
 *           type: string
 *           description: The timestamp for the account creation.
 *         interests:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of the user's interests.
 *         active:
 *           type: boolean
 *           description: Indicates whether the user is active.
 *
 *
 * /api/users/:
 *   get:
 *     summary: Returns all the users.
 *     description: Returns all the users.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Users were retrieved successfully.
 *   post:
 *     summary: Create a new user.
 *     description: Create a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *           example:
 *             name: "John Doe"
 *             interests: ["Cinematography"]
 *             active: true
 *     responses:
 *       201:
 *         description: Member was added to the group successfully.
 *
 *  */
const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / POST permitted."};

    switch (request.method)
    {
        case "GET":
            result = await getAll();
            response.status(200).json(result);
            break;

        case "POST":
            result = await createUser(request.body);
            response.status(201).json(result);
            break;

        default:
            response.status(405).json(result);
    }

};

export default handler;