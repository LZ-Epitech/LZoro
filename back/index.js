import express from 'express';
import cors from 'cors';
import { getTable, postInTable, updateInTable } from './airtable.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import querystring from 'querystring';

const app = express()
const port = 3001
const YOUR_CLIENT_ID = "1239797278533746732";
const YOUR_CLIENT_SECRET = "CnTTdPAIln8_K0ZXtBm-faLrgUsxzmND";
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

app.get('/user', async (req, res) => {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    res.json(user);
})
app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
})
app.get('/users/by/elo', async (req, res) => {
    const users = await getUsersFilteredByElo();
    res.json(users);
})
app.get('/users/by/elo/1v1', async (req, res) => {
    const users = await getUsersFilteredByElo1v1();
    res.json(users);
})
app.get('/users/by/elo/2v2', async (req, res) => {
    const users = await getUsersFilteredByElo2v2();
    res.json(users);
})
app.get('/tournaments', async (req, res) => {
    const tournaments = await getTournaments();
    res.json(tournaments);
})
app.get('/tournaments/1v1', async (req, res) => {
    const tournaments1v1 = await getTournaments1v1();
    res.json(tournaments1v1);
})
app.get('/tournaments/2v2', async (req, res) => {
    const tournaments2v2 = await getTournaments2v2();
    res.json(tournaments2v2);
})
app.get('/matchs', async (req, res) =>{
    const matchs = await getMatchs();
    res.json(matchs);
})
app.get('/matchsFromPlayer', async (req, res) => {
    const ID = req.body;
    const matchs = await getMatchsFromPlayer(ID);
    res.json(matchs);
})
app.get('/api/users/login', async (req, res) => {
    const { email , password } = req.body;
    const matchs = await getMatchsFromPlayer(req.body);
    res.json(matchs);
})
app.get('/profils', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const profil = await getProfil(userEmail);
        if (!profil) {
            return res.status(404).json({ message: 'Profil not found' });
        }
        res.json(profil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    res.json(profil);
})
app.post('/users/tag1', async (req, res) =>{
    const { email, tags1 } = req.body;
    const tag = await setTag1(email, parseInt(tags1));
    res.json(tag);
})
app.post('/users/tag2', async (req, res) =>{
    const { email, tags2 } = req.body;
    const tag = await setTag2(email, parseInt(tags2));
    res.json(tag);
})
app.get('/users/get/tags', async (req, res) =>{
    const { email } = req.query;
    const tag = await getTag(email);
    res.json(tag);
})

app.post('/discord/login', async (req, res) => {
    const { code } = req.body;
    const authorization_code = "authorization_code"
    console.log(code);
    try {
        const data = JSON.stringify({
            client_id: YOUR_CLIENT_ID,
            client_secret: YOUR_CLIENT_SECRET,
            grant_type: authorization_code,
            code,
            redirect_uri: 'http://localhost:3000/',
            scope: 'identify',
        });
        console.log(data);
        const response = await axios.post('https://discord.com/api/v10/oauth2/token',
            data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const { access_token } = response.data;
        res.json({ token: access_token });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Node.JS server launched on port [${port}] : http://localhost:${port}`)
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
async function getUsersFilteredByElo()
{
    const users = await getUsers();
    const sortedUsers = users.sort((a, b) => (b.fields.elo1v1 + b.fields.elo2v2) - (a.fields.elo1v1 + a.fields.elo2v2));

    return sortedUsers;
}
async function getUsersFilteredByElo1v1()
{
    const users = await getUsers();
    const sortedUsers = users.sort((a, b) => b.fields.elo1v1 - a.fields.elo1v1);

    return sortedUsers;
}
async function getUsersFilteredByElo2v2()
{
    const users = await getUsers();
    const sortedUsers = users.sort((a, b) => b.fields.elo2v2 - a.fields.elo2v2);

    return sortedUsers;
}
async function getTournaments()
{
    try {
        return await getTable("tournoi");
    } catch (error) {
        console.error('Error fetching tournoi:', error);
        return [];
    }
}

async function getTournaments1v1()
{
    let tournoi = await getTournaments();
    let tournaments1v1 = tournoi.filter(tour => {
        return tour.fields.format === "1v1";
    })

    return tournaments1v1;
}

async function getTournaments2v2()
{
    let tournoi = await getTournaments();
    let tournaments2v2 = tournoi.filter(tour => {
        return tour.fields.format === "2v2";
    })

    return tournaments2v2;
}

async function getMatchs()
{
    try {
        return await getTable("matchs");
    } catch (error) {
        console.error('Error fetching matchs:', error);
        return [];
    }
}

function isInMatchs(player, matchs)
{
    let playerEquipe1 = matchs.fields.equipe1.split(':');
    let playerEquipe2 = matchs.fields.equipe2.split(':');

    if (playerEquipe1.has(player) || playerEquipe2.has(player)) {
        return 1;
    }
    return 0;
}

async function getMatchsFromPlayer(player)
{
    let matchs = getMatchs();
    let matchsPlayer = matchs.filter(match => {
    for (let i = 0; matchs[i] != null; i++) {
        if (isInMatchs(player, matchs[i]) === 1)
            matchsPlayer += matchs[i];
    }
        return match.fields.equipe1
    })
}

async function logIn(username, password)
{
    const users = await getUsers();
    const user = users.find(user => user.fields.email === username);
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!user) {
        return res.status(404).json({ message: 'Les données entrées sont incorects' });
    }
    if (password !== user.fields.password) {
        return res.status(404).json({ message: 'Les données entrées sont incorects' });
    }
    const token = jwt.sign({ id: user.id, email: user.fields.email }, secretKey, { expiresIn: '1h' });

    return req.json({ token });
}

async function getProfil(email)
{
    const users = await getUsers();
    const profil = users.find(user => user.fields.email === email);
    return profil;
}

async function setTag1(user, tag)
{
    const users = await getUserByEmail(user);
    return updateInTable(users.id, "users", [["tag1", tag]]);
}
async function setTag2(user, tag)
{
    const users = await getUserByEmail(user);
    return updateInTable(users.id, "users", [["tag2", tag]]);
}

// async function searchForMatchs1v1(usg

async function getTag(email)
{
    const users = await getUserByEmail(email);
    const tags = users.fields.tag;
    return tags;
}

// async function getQueueMatchs1v1(user)
// {
//     const getUsersQueue = getQueue1v1()
//     if (isAlreadyOneQueing1v1() === 1 && !getUsersQueue.has(user.id)) {
//         queueConnect1v1(user, getUsersQueue[0]);
//     }
//     return 1;
// }

// async function getQueueMatchs2v2(user)
// {
//     const getUsersQueue = getQueue2v2();
//     if (isAlreadyOneQueing2v2() === 1 && !getUsersQueue.has(user.id)) {
//         queueConnect2v2(user, getUsersQueue[0], getUsersQueue[1], getUsersQueue[2])
//     }
//     return 1;
// }

export { getUsers };