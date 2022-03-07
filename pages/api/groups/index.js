import {getAll, createGroup} from "../../../lib/repositories/GroupRepository";

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