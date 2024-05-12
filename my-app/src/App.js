import './App.css';
import Tests from './tests/tests.js';
import Acceuil from './pages/acceuil.js';
import { useUsersList, useTournamentList } from './services/FrontendService.js';

let newitem = [];
function App()
{
    const userList = useUsersList();
    const tournoiList = useTournamentList();

    return (
        <div className='App'>
            <Acceuil person={userList} trn_list={tournoiList} />
        </div>
    );
}

export default App;