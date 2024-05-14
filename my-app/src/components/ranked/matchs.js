import { useEffect, useState } from 'react';
import { getMatchFormated } from '../../providers/getMatchs.js';
import './css/matchs.css';

function MatchsCard()
{
    const [matchs, setMatchs] = useState();

    useEffect( () => {
        const fetchData = async () => {
            const matches = getMatchFormated();
            setMatchs(matches);
            console.log(matches);
        };
        fetchData();
    }, []);

    const matchsList = matchs.map(item => {
        return (
            <div>
                {/* <p>{matchs.fields.id}</p> */}
            </div>
        );
    })

    return(
        <div className="matchsCard">
            {/* {matchs[]} */}
        </div>
    );
}

export default MatchsCard;