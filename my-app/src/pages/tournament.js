import { useEffect, useState } from "react";
import { TournamentViewForPage } from "../components/acceuil/tournamentview";
import { TournamentDetails } from "../components/tournament/tournamentDetails";
import './css/tournament.css';

function Tournament()
{
    const [dataTournament, setDataTournament] = useState([]);
    const [activeTournament, setActiveTournament] = useState();

    useEffect(() => {
        const getInfo = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/tournaments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setDataTournament(data);
        } catch (error) {
            console.log(error);
        } finally {}};
        getInfo();
        return () => {};
    }, []);

    {/* {dataTournament.map(tournament => (
        <div key={tournament.id} className="tournament-card">
            <img src={tournament.fields.background_url} alt={tournament.fields.name} />
            <h2>{tournament.fields.name}</h2>
            <p>Cash Prize: {tournament.fields.cashprize}</p>
            <p>Date Begin: {tournament.fields.date_begin}</p>
            <p>Date End: {tournament.fields.date_end}</p>
            <p>Number of Players: {tournament.fields.nbr_joueurs}</p>
            <p>Status: {tournament.fields.done}</p>
            <p>Format: {tournament.fields.format}</p>
        </div>
    ))} */}

    return (
        <div className="tournament">
            <TournamentViewForPage dataTournament={dataTournament} setActive={setActiveTournament} />
            <TournamentDetails dataTournament={dataTournament} activeTournament={activeTournament}/>
        </div>
    );
}

 export default Tournament;