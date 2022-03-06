import clientPromise from "../../../../lib/mongodb";

const handler = async (request, response) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let { groupName } = request.query;
    let groupToBeUpdated = {name: groupName};
    let memberToBeRemoved = { $pull: { members: request.body.id }};

    let result = db.collection("Groups").updateOne(groupToBeUpdated, memberToBeRemoved);

    response.status(201).json(result);
};

export default handler;