import { useEffect, useState } from 'react';
import './css/tournamentview.css';
import { getTournament } from '../../providers/getTournament';
import { Link } from 'react-router-dom';

function TournamentPreview({dataTournament})
{
    const info = dataTournament.fields
    function dateFormat(date)
    {
        const dates = date.split('-');
        let str = dates[2] + "/" + dates[1];

        return str;
    }

    return(
        <div className="tournamentpreview">
            <img className="tournamentpreview__background_url" src={info.background_url}/>
            <h2 className="tournamentpreview__title">{info.name}</h2>
            <div className="tournamentpreview__content">
                <p>Nombre de joueurs : {info.nbr_joueurs}</p>
                <p>{dateFormat(info.date_begin)} -&gt; {dateFormat(info.date_end)}</p>
                <p></p>
            </div>
        </div>
    );
}

function TournamentPreviewForView({dataTournament, setActive})
{
    const info = dataTournament.fields
    function dateFormat(date)
    {
        const dates = date.split('-');
        let str = dates[2] + "/" + dates[1];

        return str;
    }

    const handleClick = () => {
        setActive(dataTournament.id);
    }

    return(
        <div className="tournamentpreview" onClick={handleClick}>
            <img className="tournamentpreview__background_url" src={info.background_url}/>
            <h2 className="tournamentpreview__title">{info.name}</h2>
            <div className="tournamentpreview__content">
                <p>Nombre de joueurs : {info.nbr_joueurs}</p>
                <p>{dateFormat(info.date_begin)} -&gt; {dateFormat(info.date_end)}</p>
                <p></p>
            </div>
        </div>
    );
}

function TournamentView()
{
    const [dataTournament, setDataTournament] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tournamentData = await getTournament();
                setDataTournament(tournamentData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []); ;

    const list = dataTournament.map(tournoi => {
        return <TournamentPreview key={tournoi.id} dataTournament={tournoi} />
    });

    return(
        <Link className="tournamentview" to="/tournaments">
            <h2 className="tournamentview__title">
                Tournaments
            </h2>
            <div className="tournamentview__content">
                {list}
            </div>
        </Link>
    );
}

function TournamentViewForPage({dataTournament, setActive})
{
    const list = dataTournament.map(tournoi => {
        return <TournamentPreviewForView key={tournoi.id} dataTournament={tournoi} setActive={setActive} />
    });

    return(
        <div className="tournamentview_forpage">
            <h2 className="tournamentview__forpagetitle">
                Tournaments
            </h2>
            <div className="tournamentviewforpage__content">
                {list}
            </div>
        </div>
    );
}

export { TournamentView, TournamentViewForPage };