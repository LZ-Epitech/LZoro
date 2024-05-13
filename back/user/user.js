import { getTable } from "../airtable.js";
import cors from 'cors';
import express from 'express';
const app = express()
app.use(cors())

app.get('/user', async (req, res) => {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    res.json(user);
})

async function getUserByEmail(email)
{
    try {
        const users = await getTable("users");
        for (let i = 0; users[i] !== null; i++)
            if (users[i].fields.email === email)
                return users[i];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export { getUserByEmail };