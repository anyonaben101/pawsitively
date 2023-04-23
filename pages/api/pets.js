import { connectDatabase, deletePet, getPets, insertPet } from "@/db/db";

// managing pets
export default async function handler(req, res) {
    // get db
    const client = await connectDatabase();
    
    const { operation, data } = req.body;

    // get db
    const db = client.db();

    if(operation == 'add') {
        const { pet } = data;

        console.log(pet);

        await insertPet(db, pet);

        res.status(200).json({ success: true });
    }

    if(operation == 'get') {
        const { user_id } = data;

        const pets = await getPets(db, user_id);

        res.status(200).json({ success: true, pets });
    }

    if(operation == 'delete') {
        const { pet_id } = data;

        await deletePet(db, pet_id);

        res.status(200).json({ success: true });
    }
}
