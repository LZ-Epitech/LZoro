import cors from 'cors';
import express from 'express';
const app = express()
app.use(cors())
import { getTable } from "../airtable.js";


app.get('/matchs', async (req, res) =>{
    const matchs = await getMatchs();
    res.json(matchs);
})
app.get('/matchsFromPlayer', async (req, res) => {
    const ID = req.body;
    const matchs = await getMatchsFromPlayer(ID);
    res.json(matchs);
})

async function getMatchs()
{
    try {
        return await getTable("matchs");
    } catch (error) {
        console.error('Error fetching tournoi:', error);
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

export { isInMatchs, getMatchs, getMatchsFromPlayer };