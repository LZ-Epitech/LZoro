import React, { useState, useEffect } from 'react';
import { getTable } from './airtable';
// GET BASE DE DONNEE


async function getUsers()
{
    try {
        return await getTable("users");
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}
function getTournament()
{

}

function getMatchsFromPlayer(player)
{

}

function getMatchsBetweenTwoPlayer(player1, player2)
{

}

function getBadgesPlayer(player)
{

}

export { getUsers }