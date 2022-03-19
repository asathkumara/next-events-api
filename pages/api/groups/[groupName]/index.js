import {ObjectId} from "mongodb";
import Group from "../../../../lib/models/Group";
import User from "../../../../lib/models/User";

/**
 * @swagger
 *
 * /api/groups/{groupName}:
 *   get:
 *     summary: Returns all the group's members
 *     description: Returns all the group's members
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
 *         description: Group members were retrieved successfully.
 *   patch:
 *     summary: Add a new member to the group.
 *     description: Add a new member to the group.
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
 *             $ref: "#/components/schemas/User"
 *           example:
 *             userID: 6224fe098c103c8a0a8f1859
 *     responses:
 *       201:
 *         description: Member was added to the group successfully.
 *
 *   delete:
 *     summary: Remove a member from the group.
 *     description: Remove a member from the group.
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
 *             $ref: "#/components/schemas/User"
 *           example:
 *             userID: 6224fe098c103c8a0a8f1859
 *     responses:
 *       200:
 *         description: Member was removed from the group successfully.
 *  */
const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / PATCH / DELETE permitted."};
    let { groupName } = request.query;
    let group = await Group.findOne({name: groupName});

    try
    {
        switch (request.method)
        {
            case "GET":

                let groupMembers = [];

                for (let memberID of group.members)
                {
                    let member =  await User.findById({_id: new ObjectId(memberID)});
                    groupMembers.push(member);
                }

                response.status(200).json(groupMembers);
                break;

            case "PATCH":
                result = await Group.findByIdAndUpdate(
                    {_id: group._id},
                    {$push: {members: new ObjectId(request.body.userID)}},
                    {new: true});
                response.status(200).json(result);
                break;

            case "DELETE":
                result = await Group.findByIdAndUpdate(
                    {_id: group._id},
                    {$pull: {members: new ObjectId(request.body.userID)}},
                    {new: true});
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