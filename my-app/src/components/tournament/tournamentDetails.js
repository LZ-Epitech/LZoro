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
    let noTournament = <div className="noselected">Vous n'avez séléctionner aucun tournoi :( !</div>;

    function selectedTournament(active)
    {
        if (active != 0) {
            return (
                <div className="tournamentdetails__content">
                    <div className="tournamentdetails__content__img">
                        <img src={active.background_url}/>
                    </div>
                    <p className="tournamentdetails__name">{active.name}</p>
                    <p className="tournamentdetails__nbrjoueurs">Nombre de joueurs : {active.nbr_joueurs}</p>
                    <p className="tournamentdetails__cashprize">Cashprize : {active.cashprize}</p>
                    <p className="tournamentdetails__format">Format : {active.format}</p>
                    <p className="tournamentdetails__datebegin">Date de début : {active.date_begin}</p>
                    <p className="tournamentdetails__dateend">Date de fin : {active.date_end}</p>
                    <p className="tournamentdetails__description">Description : {active.description}</p>
                    <p className="iscriptionbutton">S'inscrire</p>
                </div>
            );
        }
        return noTournament;
    }

    let selected = selectedTournament(active);

    return(
        <div className="tournamentdetails">
            <h1 className="tournamentdetails__title">Tournament Details</h1>
            {selected}
        </div>
    );
}

export { TournamentDetails };