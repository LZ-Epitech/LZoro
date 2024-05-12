import { getUsers } from "./provider";
import { getTournament } from "./provider";
import { useState, useEffect } from "react";

function useUsersList()
{
    const [data, setData] = useState([]);
    const [newitem, setNewItem] = useState([]);

    useEffect(() => {
        getUsers().then(records => {
            setData(records);
        });
    }, []);
    useEffect(() => {
        if (data.length > 0) {
            const updatedItems = data.map((record, index) => ({
                name: record.fields.name,
                email: record.fields.email,
                elo1: record.fields.elo1v1,
                elo2: record.fields.elo2v2,
                backgroundImage: record.fields.backgroundImage
            }));
            setNewItem(updatedItems);
        }
    }, [data]);

    return newitem;
}

function useTournamentList()
{
    const [data, setData] = useState([]);
    const [newitem, setNewItem] = useState([]);

    useEffect(() => {
        getTournament().then(records => {
            setData(records);
        });
    }, []);
    useEffect(() => {
        if (data.length > 0) {
            const updatedItems = data.map((record, index) => ({
                name: record.fields.name,
                nbr_joueurs: record.fields.nbr_joueurs,
                cashprize: record.fields.cashprize,
                done: record.fields.done,
                date_begin: record.fields.date_begin,
                date_end: record.fields.date_end,
                background_url: record.fields.background_url,
            }));
            setNewItem(updatedItems);
        }
    }, [data]);

    return newitem;
}

function getMatchFromSplit(match)
{
    const id = match.split('.')[0];
    const equipe1 = match.split('.')[1].split(';')[0].split(':')[0];
    const equipe2 = match.split('.')[1].split(';')[0].split(':')[1];
    const score1 = match.split('.')[1].split(';')[1].split(':')[0];
    const score2 = match.split('.')[1].split(';')[1].split(':')[1];
    const matchs = {
        id: id,
        equipe1: equipe1,
        equipe2: equipe2,
        score1: score1,
        score2: score2
    };

    return matchs;
}

function useMatchsFromTournament(tournament)
{
    const [Matchs, setMatchs] = useState([]);
    const allmatchs = tournament.split(",");
    const all_matchs = [];

    for (let i = 0; allmatchs[i] != null; i++)
        all_matchs = [...all_matchs + getMatchFromSplit(all_matchs[i])];
    setMatchs(all_matchs);
    return Matchs;
}

export { useUsersList, useTournamentList, useMatchsFromTournament };