import './css/tournamentview.css';

function TournamentPreview(props)
{
    const trn = props.tournoi.fields;

    function dateFormat(date)
    {
        const dates = date.split('-');
        let str = dates[2] + "/" + dates[1];

        return str;
    }

    return(
        <div className="tournamentpreview">
            <img className="tournamentpreview__background_url" src={trn.background_url}/>
            <h2 className="tournamentpreview__title">{trn.name}</h2>
            <div className="tournamentpreview__content">
                <p>Nombre de joueurs : {trn.nbr_joueurs}</p>
                <p>{dateFormat(trn.date_begin)} -&gt; {dateFormat(trn.date_end)}</p>
                <p></p>
            </div>
        </div>
    );
}

function TournamentView(props)
{
    const list = props.trn_list.map(tournoi => {
        return <TournamentPreview key={tournoi.id} tournoi={tournoi} />
    });

    return(
        <div className="tournamentview">
            <h2 className="tournamentview__title">
                Tournaments
            </h2>
            {list}
        </div>
    );
}

export { TournamentView };