import { createInTable, getTable, updateInTableObj } from "../airtable.js";
import { getUser } from "../index.js";

function createMatch1v1(user1, user2)
{
    const data = [
        ["equipe1", user1.id],
        ["equipe2", user2.id],
        ["format", "1v1"],
        ["verified", 0],
    ];
    createInTable("matchs", data);
}

function createMatch2v2(user1, user2, user3, user4)
{
    const data = [
        ["equipe1", user1.id + ":" + user2.id],
        ["equipe2", user3.id + ":" + user4.id],
        ["format", "2v2"],
        ["verfied", 0],
    ]
    createInTable("matchs", data);
}

async function getMatchs()
{
    try {
        return await getTable('matchs');
    } catch (error) {
        console.error('Error fetching matchs:', error);
        return [];
    }
}

async function getMatchById(match_id) {
    const matchs = await getMatchs();

    for (let i = 0; matchs[i] !== null && matchs[i] !== undefined; i++) {
        if (matchs[i].id === match_id)
            return matchs[i];
    }
    return 0;
}

//verifyMatch(token)
async function verifyMatch(token, match_id)
{
    const user = await getUser(token).id;
    const match = await getMatchById(match_id);

    if (match.fields.equipe1 === user)
        if (match.fields.verified !== 1 && match.fields.verified !== 3)
            match.fields.verified += 1;
    if (match.fields.equipe2 === user)
        if (match.fields.verified !== 2 && match.fields.verified !== 3)
            match.fields.verified += 2;
    updateInTableObj(match_id, 'matchs', match.fields);
    return;
}

function isInMatchs(player, match) {
    let playerEquipe1 = match.fields.equipe1.split(':');
    let playerEquipe2 = match.fields.equipe2.split(':');

    if (playerEquipe1.includes(player) || playerEquipe2.includes(player) ) {
        return 1;
    }
    return 0;
}

// /matchsFormated
function getFormatMatch(match) {
    const data = {
        match_id : match.id,
        user1: match.fields.equipe1,
        user2: match.fields.equipe2,
        format: "1v1",
        score: match.fields.score,
        verified: match.fields.verified
    };
    return data;
}

async function hasUnverifiedMatch(user)
{
    let matchs = await getMatchs();
    let matchsPlayer = matchs.filter(match => {
        return isInMatchs(user.id, match) === 1;
    });
    let unverified = 0;
    matchsPlayer.forEach(element => {
        if (element.fields.verified !== 3 && element.fields.verified !== undefined && element.fields.verified !== null) {
            unverified = 1;
        }
    });
    return unverified;
}

export { createMatch1v1, createMatch2v2, getMatchs, verifyMatch, getFormatMatch, hasUnverifiedMatch, isInMatchs };