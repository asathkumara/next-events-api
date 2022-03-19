import {addMember, getGroupMembers, removeMember} from "../../../../lib/repositories/GroupRepository";
import {getBy} from "../../../../lib/repositories/UserRepository";
import {ObjectId} from "mongodb";

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

    switch (request.method)
    {
        case "GET":
            let groupMemberIDs = await getGroupMembers({name: groupName});
            let groupMembers = [];

            for (let memberID of groupMemberIDs) {
                let member = await getBy({_id: new ObjectId(memberID)});
                groupMembers.push(member);
            }

            response.status(200).json(groupMembers);
            break;

        /**
         * Throws error when id is not BSON
         */
        case "PATCH":
            result = await addMember(request.body.userID, groupName);
            response.status(200).json(result);
            break;

        case "DELETE":
            result = await removeMember(request.body.userID, groupName);
            response.status(200).json(result);
            break;

        default:
            response.status(405).json(result);
    }
};

export default handler;