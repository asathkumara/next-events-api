import clientPromise from "../../../../lib/mongodb";

const handler = async (request, response) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let { groupName } = request.query;
    let group = {name: groupName};

    let groupMembers = await db.collection("Groups")
        .find(group)
        .toArray();

    if (groupMembers)
    {
        groupMembers = groupMembers[0].members;
    }

    response.status(200).json(groupMembers);
};

export default handler;