import { useState } from 'react';
import './css/matchLine.css';

function MatchLine({match})
{
    return (
        <div className="match__line">
            <p>{match.equipe1}</p>
            <p>{match.equipe2}</p>
            <p>{match.id}</p>
            <p>{match.verified}</p>
        </div>
    );
}

export default MatchLine;