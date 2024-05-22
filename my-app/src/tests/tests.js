import './css/tests.css'
import { TournamentView } from '../components/acceuil/tournamentview';

function Tests(props)
{
	return (
        <div>
            <TournamentView trn_list={props.trn_list}/>
        </div>
    );
}

export default Tests;