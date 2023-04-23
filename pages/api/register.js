import { connectDatabase, ensureCollections, getUser, insertUser } from "@/db/db";

// register user: name, email, password
export default async function handler(req, res) {
    // get db
    const client = await connectDatabase();
    
    // ensure collections exist
    await ensureCollections(client);

    // get email and password from request body
    const { name, email, password } = req.body;


    // get db
    const db = client.db();

    // check if user exists
    const user = await getUser(db, email);

    if (user) {
        // user exists
        res.status(200).json({ success: false, message: "User already exists" });
    } else {
        // user doesn't exist, insert user
        const result = await insertUser(db, {
            name,
            email,
            password,
        });

        // return success
        res.status(200).json({ success: true, user: {
            email,
            name,
            id: result.insertedId,
        }});
    }
}