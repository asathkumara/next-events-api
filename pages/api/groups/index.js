import clientPromise from "../../../lib/mongodb";

const handler = async (request, response) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let groups = await db.collection("Groups")
        .find({})
        .toArray();

    response.status(200).json(groups);

};

export default handler;