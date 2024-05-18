import express from 'express';
import cors from 'cors';
import { createInTable, getTable, postInTable, updateInTable } from './airtable.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import querystring from 'querystring';
import { getUserInfo } from './discord.js';
import { getQueue1v1, getQueue2v2, isAlreadyOneQueing1v1, isAlreadyOneQueing2v2, queueConnect1v1, queueConnect2v2 } from './ranked/queuing.js';

const app = express()
const port = 3001
const YOUR_CLIENT_ID = "1239797278533746732";
const YOUR_CLIENT_SECRET = "CnTTdPAIln8_K0ZXtBm-faLrgUsxzmND";
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

app.get('/user', async (req, res) => {
    const { token } = req.query;
    const user = await getUserInfo(token);
    res.json(user);
})
app.get('/userToken', async (req, res) => {
    const { token } = req.query;
    const user = await getUser(token);
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
app.post('/users/tag1', async (req, res) =>{
    const { token, tags1 } = req.body;
    const tag = await setTag1(token, parseInt(tags1));
    res.json(tag);
})
app.post('/users/tag2', async (req, res) =>{
    const { token, tags2 } = req.body;
    const tag = await setTag2(token, parseInt(tags2));
    res.json(tag);
})
app.get('/users/get/tags', async (req, res) =>{
    const { token } = req.query;
    const tag = await getTag(token);
    res.json(tag);
})
app.post('/users/create', async (req, res) => {
    const { token } = req.body;
    const newUser = await createUser(token);
    res.json(newUser);
})

app.listen(port, () => {
    console.log(`Node.JS server launched on port [${port}] : http://localhost:${port}`)
})

async function getUser(token)
{
    try {
        const users = await getTable("users");
        for (let i = 0; users[i] !== null && users[i] !== undefined; i++) {
            if (users[i].fields.token === token)
                return users[i];
        }
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

async function createUser(token)
{
    const user = await getUserInfo(token);
    const data = [["token", token],
        ["name", user.global_name],
        ["username", user.username],
        ["elo1v1", 500],
        ["elo2v2", 500],
        ["tag1", 0],
        ["tag2", 0],
        ["avatar", user.avatar],
        ["discordID", user.id],
    ];
    return createInTable("users", data);
}

async function setTag1(user, tag)
{
    const users = await getUser(user);
    if (tag === 1 && getQueueMatchs1v1(user) === 1) {
        return;
    }
    return updateInTable(users.id, "users", [["tag1", tag]]);
}

async function setTag2(user, tag)
{
    const users = await getUser(user);
    if (tag === 1 && getQueueMatchs2v2(user) === 1) {
        return;
    }
    return updateInTable(users.id, "users", [["tag2", tag]]);
}

async function getTag(token)
{
    const users = await getUser(token);
    const tags = users.fields.tag;
    return tags;
}

async function getQueueMatchs1v1(user)
{
    const getUsersQueue = await getQueue1v1();
    const userL = await getUser(user);
    if ((getUsersQueue.length - 1) >= 1) {
        console.log("1v1 Found !");
        return queueConnect1v1(userL, getUsersQueue.find(element => element.id !== userL.id));
    }
    return 0;
}

async function getQueueMatchs2v2(user)
{
    const getUsersQueue = getQueue2v2();
    if ((getUsersQueue.length - 1) >= 3) {
        console.log("2v2 Found !");
        return queueConnect2v2(user, getUsersQueue[0], getUsersQueue[1], getUsersQueue[2])
    }
    return 0;
}


export { getUsers };