import {editMessage} from "../../../../../../lib/repositories/MessageRepository";

const handler = async (request, response) => {

    let result = {acknowledged: false, message: "Only PATCH permitted."};

    switch (request.method)
    {
        case "PATCH":
            let { messageID } = request.query;
            result = await editMessage(messageID, request.body.contents);

            response.status(200).json(result);
            break;

        default:
            response.status(405).json(result);
    }
};

export default handler;