import express from 'express';
import cors from 'cors';
import { createInTable, deleteInTable, getTable, updateInTable } from './airtable.js';
import { getUserInfo } from './discord.js';
import { getQueue1v1, getQueue2v2, queueConnect1v1, queueConnect2v2 } from './ranked/queuing.js';
import { getFormatMatch, getMatchs, hasUnverifiedMatch, isInMatchs, verifyMatch } from './ranked/matchs.js';

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

/***************/
/*    MATCHS   */
/***************/

app.get('/matchs', async (req, res) =>{
    const matchs = await getMatchs();
    res.json(matchs);
})
app.get('/matchs/format', async (req, res) =>{
    const matchs = await getMatchsFormated();
    res.json(matchs);
})
app.get('/matchs/player', async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const matchs = await getMatchsFromPlayer(token);
        res.json(matchs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

app.post('/matchs/verify', async (req, res) =>{
    const { token, match_id } = req.body;
    verifyMatch(token, match_id);
    res.json("OK");
})

/***************/
/*    USER     */
/***************/

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

app.post('/users/tag1', async (req, res) =>{
    const { token, tags1 } = req.body;
    const tag = await setTag1(token, parseInt(tags1));
    res.json(tag);
})
app.post('/users/tag2', async (req, res) =>{
    const { token, tags2 } = req.body;
    const tag = await setTag2(token, parseInt(tags2));
    res.json(tags2);
})
app.get('/users/get/tags', async (req, res) =>{
    const { token } = req.query;
    const tag = await getTag(token);
    res.json(tag);
})
app.post('/users/create', async (req, res) => {
    const { token } = req.body;
    try {
        const existingUser = await getUser(token);

        if (existingUser) {
            return res.status(200).json(existingUser);
        }
        const result = createUser(token);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
app.delete('/users/delete', async (req, res) => {
    const { token } = req.body;
    const respons = await deleteUser(token);
    res.json(respons);
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

async function getMatchsFromPlayer(player) {
    let matchs = await getMatchs();
    const user = await getUser(player);
    const users = await getUsers();

    let matchsPlayer = matchs.filter(match => {
        const inMatch = isInMatchs(user.id, match) === 1;
        return inMatch;
    });
    let formattedMatchsPlayer = matchsPlayer.map(element => {
        const formatted = getFormatMatch(element, users);
        return formatted;
    });

    return formattedMatchsPlayer;
}

async function createUser(token)
{
    const isExist = await getUser(token);
    if (isExist !== null && isExist !== undefined) {
        return isExist;
    }
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
    if (tag === 1 && await hasUnverifiedMatch(users) === 1) {
        updateInTable(users.id, "users", [["tag1", 0]]);
        return -1;
    }
    if (tag === 1 && getQueueMatchs1v1(user) === 1) {
        return 2;
    }
    updateInTable(users.id, "users", [["tag1", tag]]);
    return tag;
}

async function setTag2(user, tag)
{
    const users = await getUser(user);
    if (tag === 1 && getQueueMatchs2v2(user) === 1) {
        return;
    }
    updateInTable(users.id, "users", [["tag2", tag]]);
    return;
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
    const user2 = getUsersQueue.find(element => element.id !== userL.id);
    if (user2 !== null && user2 !== undefined) {
        console.log("1v1 Found !");
        return queueConnect1v1(userL, user2);
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

async function getUserId(id) {
    const users = await getUsers();

    for (let i = 0; users[i] != null; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }
    return 0;
}

async function deleteUser(token) {
    try {
        const user = await getUser(token);
        console.log(token);
        await deleteInTable('users', user.id);
        return 1;
    } catch (error) {
        return 0;
    }
}


export { getUsers, getUser };