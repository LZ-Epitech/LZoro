import { useState } from 'react';
import './css/matchLine.css';

function MatchLine({match})
{
    return (
        <div className="match__line">
            <p>{match[0].equipe1}</p>
            <p>{match[0].equipe2}</p>
            <p>{match[0].id}</p>
            <p>{match[0].verified}</p>
        </div>
    );
}

export default MatchLine;