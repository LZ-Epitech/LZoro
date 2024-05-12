import express from 'express'
import cors from 'cors'
import getTable from './airtable.js'

const app = express()
const port = 3001

app.use(cors())

app.get('/', async (req, res) => {
  // const users = await getUsers();
  res.json("Hello World:");
})

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
})

app.listen(port, () => {
  console.log(`Node.JS server launched on port [${port}] : http://localhost:${port}`)
})

async function getUsers()
{
    try {
      const users = await getTable("users");
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

async function getTournament()
{
    try {
        return await getTable("tournoi");
    } catch (error) {
        console.error('Error fetching tournoi:', error);
        return [];
    }
}