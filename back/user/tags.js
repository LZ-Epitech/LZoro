import { getUsers } from "./users.js";
import { getUserByEmail } from "./user.js";
import cors from 'cors';
import express from 'express';
const app = express()
app.use(cors())

app.get('/users/tag', async (req, res) =>{
    const { email } = req.query;
    const tag = await setTag(email);
    res.json(tag);
})
app.get('/users/get/tags', async (req, res) =>{
    const { email } = req.query;
    const tag = await getTag(email);
    res.json(tag);
})

async function setTag(user)
{
    const users = await getUsers();
    users.forEach(element => {
        console.log("===================================");
        if (element.fields.email === user && element.fields.tag == 0) {
            return updateInTable(element.id, "users",  [["tag", 1]]);
        }
        if (element.fields.email === user && element.fields.tag == 1) {
            return updateInTable(element.id, "users", [["tag", 0]]);
        }
    });
    return null;
}

async function getTag(email)
{
    const users = await getUserByEmail(email);
    const tags = users.fields.tag;
    return tags;
}

export { setTag, getTag};