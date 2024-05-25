import { useEffect, useState } from "react";
import { getMatchFormated } from "../../providers/getMatchs";
import { MatchLine } from "./MatchLine";
import './css/lastMatchs.css'

function LastMatchs({user})
{
    const [matchs, setMatchs] = useState([]);

    useEffect(() => {
        if (user.fields && user) {
            const setMatches = async () => {
                let allMatchs = await getMatchFormated(user.fields.token);
                setMatchs(allMatchs);
            }
            setMatches();
        }
    }, [user]);

    const matchList = matchs.map((element, index) => {
        const isEven = index % 2 === 0;
        const className = isEven ? 'matchLine ones' : 'matchLine twos';

        return <MatchLine match={element} classe={className}/>
    });

    return (
    <div className="lastMatchsContainer">
        {matchList}
    </div>);
}

export { LastMatchs };