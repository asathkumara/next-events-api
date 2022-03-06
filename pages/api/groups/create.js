import clientPromise from "../../../lib/mongodb";

const handler = async (request, response) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let newGroup =
    {
        _id: client.ObjectID,
        name: request.body.name,
        members: [request.body.id]
    };

    let result = db.collection("Groups").insertOne(newGroup);

    response.status(201).json(newGroup);
};

export default handler;