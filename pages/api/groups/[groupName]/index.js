import {addMember, getGroupMembers, removeMember} from "../../../../lib/repositories/GroupRepository";

const handler = async (request, response) => {
    let result = {acknowledged: false, message: "Only GET / PATCH / DELETE permitted."};
    let {groupName} = request.query;

    switch (request.method)
    {
        case "GET":
            let groupMembers = await getGroupMembers({name: groupName});
            response.status(200).json(groupMembers);
            break;

        /**
         * Throws error when id is not BSON
         */
        case "PATCH":
            result = await addMember(request.body.id, groupName);
            response.status(200).json(result);
            break;

        case "DELETE":
            result = await removeMember(request.body.id, groupName);
            response.status(200).json(result);
            break;

        default:
            response.status(405).json(result);
    }
};

export default handler;