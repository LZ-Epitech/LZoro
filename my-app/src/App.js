import './App.css';
import Tests from './tests/tests.js';
import Acceuil from './pages/acceuil.js';
import { useUsersList, useTournamentList } from './services/FrontendService.js';
import { Tournament } from './pages/tournament.js';

let newitem = [];
function App()
{
    const userList = useUsersList();
    const tournoiList = useTournamentList();

    return (
        <div className='App'>
            {/* <Acceuil person={userList} trn_list={tournoiList} /> */}
            <Acceuil trn_list={tournoiList} person={userList} />
        </div>
    );
}

export default App;