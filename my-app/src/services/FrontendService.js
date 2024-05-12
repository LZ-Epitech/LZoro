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

export { useUsersList, useTournamentList };