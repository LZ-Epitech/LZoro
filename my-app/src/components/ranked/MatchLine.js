import { ButtonVerify } from './ButtonVerify';
import './css/matchLine.css';

function MatchLine({match, classe})
{
    return (
        <div className={classe}>
            <p className='fieldsLastMatchLine'>{match.user1.fields.name}</p>
            <p className='fieldsLastMatchLine'>{match.user2.fields.name}</p>
            <p className='fieldsLastMatchLine'>{match.score}</p>
            <p className='fieldsLastMatchLine'>{match.format}</p>
            <ButtonVerify match_id={match.match_id} clicked={0} />
        </div>
    );
}

export { MatchLine };