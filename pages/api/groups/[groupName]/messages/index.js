import {createMessage, getAll} from "../../../../../lib/repositories/MessageRepository";
import {addMessage} from "../../../../../lib/repositories/GroupRepository";

const handler = async (request, response) => {

    let result = {acknowledged: false, message: "Only GET / POST permitted."};

    switch (request.method)
    {
        case "GET":
            let messages = await getAll();
            response.status(200).json(messages);

        case "POST":
            let { groupName } = request.query;
            let { insertedId } = await createMessage(request.body);
            result = await addMessage(insertedId, groupName);

            response.status(201).json(result);
            break;

        default:
            response.status(405).json(result);
    }
};

export default handler;