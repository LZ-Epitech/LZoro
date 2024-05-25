import './css/matchLine.css';

function MatchLine({match, classe})
{
    return (
        <div className={classe}>
            <p>{match.user1.fields.name}</p>
            <p>{match.user2.fields.name}</p>
            <p>{match.verified}</p>
            <p>{match.score}</p>
            <p>{match.format}</p>
        </div>
    );
}

export { MatchLine };