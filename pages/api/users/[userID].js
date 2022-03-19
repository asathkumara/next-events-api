import {ObjectId} from "mongodb";
import User from "../../../lib/models/User";

/**
 * @swagger
 *
 * /api/users/{userID}:
 *   get:
 *     summary: Returns the user with the given ID.
 *     description: Returns the user with the given ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BSON ID of the user
 *     responses:
 *       200:
 *         description: User was retrieved successfully.
 *
 *   patch:
 *     summary: Update the information of an existing user.
 *     description: Update the information of an existing user.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BSON ID of the user to be updated
 *     requestBody:
 *       description: Interests and active status can be updated separately or together.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *           example:
 *             interests: ["Cinematography", "Hiking"]
 *             active: false
 *     responses:
 *       200:
 *         description: User was updated successfully.
 *
 *  */
const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / PATCH permitted."};
    let {userID} = request.query;

    try
    {
        switch (request.method) {
            case "GET":
                // result = await getBy({_id: new ObjectId(userID)});
                // response.status(200).json(result);

                result = await User.findById({_id: new ObjectId(userID)});
                response.status(200).json(result);
                break;

            case "PATCH":
                // result = await editUser(userID, request.body);
                // response.status(200).json(result);

                result = await User.findByIdAndUpdate({_id: new ObjectId(userID)}, request.body, {new: true});
                response.status(200).json(result);
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