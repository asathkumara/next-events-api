import clientPromise from "../../../lib/mongodb";

const handler = async (request, response) => {
    let client = await clientPromise;
    let db = await client.db("GroupBy");

    let users = await db.collection("Users")
                            .find({})
                            .toArray();

    response.status(200).json(users);

};

export default handler;