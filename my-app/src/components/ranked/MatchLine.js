import './css/matchLine.css';

function MatchLine({match, classe})
{
    return (
        <div className={classe}>
            <p className='fieldsLastMatchLine'>{match.user1.fields.name}</p>
            <p className='fieldsLastMatchLine'>{match.user2.fields.name}</p>
            <p className='fieldsLastMatchLine'>{match.score}</p>
            <p className='fieldsLastMatchLine'>{match.format}</p>
            <p className='fieldsLastMatchLine'>{match.verified}</p>
        </div>
    );
}

export { MatchLine };