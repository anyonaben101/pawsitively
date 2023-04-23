import { connectDatabase, ensureCollections, getUser, validateLogin } from "@/db/db";

// takes password and email from req.body and returns a boolean
export default async function handler(req, res) {
    // get db
    const client = await connectDatabase();

    // ensure collections exist
    await ensureCollections(client);

    // get email and password from request body
    const { email, password } = req.body;
    
    // get db
    const db = client.db();

    // validate login
    if (await validateLogin(db, email, password)) {
        const user = await getUser(db, email);
        // login successful
        res.status(200).json({ success: true, user: {
            email,
            name: user.name,
            id: user._id,
        }});
    } else {
        // login failed
        res.status(200).json({ success: false });
    }
}