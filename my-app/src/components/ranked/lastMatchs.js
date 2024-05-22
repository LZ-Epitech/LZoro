import { useEffect, useState } from 'react';
import './css/lastMatchs.css';
import MatchLine from './matchLine';

function LastMatchs({ match }) {
    // Match à vérifier !
    // Autres matchs
    const [matchs, setMatchs] = useState([]);
    const [load, setLoad] = useState(1);

    useEffect(() => {
        setMatchs(match);
        setLoad(0);
    }, [match]); // Add dependency array to only run when `match` changes

    const list = matchs.map((element, index) => {
        return <MatchLine key={index} match={element} />; // Add unique key prop
    });

    const matchsList = () => {
        if (matchs.length != 0) {
            return list;
        }
        return <p>Vous n'avez pas de matchs récents</p>;
    }

    return (
        <div>
            {matchsList}
        </div>
    );
}

export default LastMatchs;
