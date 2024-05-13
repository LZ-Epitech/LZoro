import './css/tournamentDetails.css'

function TournamentDetails({dataTournament, activeTournament})
{
    function getTournament(dataTournament)
    {
        for (let i = 0; dataTournament[i] != null; i++) {
            if (activeTournament == dataTournament[i].id) {
                return dataTournament[i];
            }
        }
        return 0;
    }
    let active = getTournament(dataTournament);

    if (active != 0) {
        active = active.fields;
    }

    return(
        <div className="tournamentdetails">
            <h1 className="tournamentdetails__title">Tournament Details</h1>
            <p>{active.name}</p>
            <p>{active.nbr_joueurs}</p>
            <p>{active.cashprize}</p>
            <p>{active.format}</p>
            <p>{active.date_begin}</p>
            <p>{active.date_end}</p>
            <p>{active.description}</p>
        </div>
    );
}

export { TournamentDetails };