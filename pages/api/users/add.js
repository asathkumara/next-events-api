import clientPromise from "../../../lib/mongodb";

const handler = async (request, response) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let newUser =
    {
        _id: client.ObjectID,
        name: request.body.name,
        joinedAt: new Date(Date.now()).toLocaleString(),
        interests: request.body.interests ?? [],
        active: request.body.active ?? true
    }

    let result = db.collection("Users").insertOne(newUser);

    response.status(201).send(result);
};

export default handler;