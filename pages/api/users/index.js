import User from "../../../lib/models/User";

/**
 * @swagger
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

    try
    {
        switch (request.method)
        {
            case "GET":
                result = await User.find({});
                response.status(200).json(result);
                break;

            case "POST":
                result = await User.create(request.body);
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