import './css/matchLine.css';

function MatchLine({match})
{
    return (
        <div className="matchLine">
            <p>{match.user1}</p>
            <p>{match.user2}</p>
        </div>
    );
}

export { MatchLine };