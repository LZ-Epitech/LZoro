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
                console.log(allMatchs);
                setMatchs(allMatchs);
            }
            setMatches();
            console.log(matchs);
        }
    }, [user]);

    const matchList = matchs.map(element => {
        return <MatchLine match={element} />
    });

    return (
    <div className="lastMatchsContainer">
        {matchList}
    </div>);
}

export { LastMatchs };