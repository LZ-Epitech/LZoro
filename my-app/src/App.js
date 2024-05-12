import './App.css';
import Tests from './tests/tests.js';
import Acceuil from './pages/acceuil.js';
import { useUsersList, useTournamentList } from './services/FrontendService.js';
import { Tournament } from './pages/tournament.js';
import { useEffect, useState } from 'react';

let newitem = [];
function App()
{
    // const userList = useUsersList();
    // const tournoiList = useTournamentList();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getInfo = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
            // body: JSON.stringify(data),
            });

            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
        }
        };

        getInfo();

        // Cleanup function
        return () => {
        // Optionally perform cleanup here, such as aborting ongoing requests
        };
    }, []);


    return (
        <div className='App'>
            {/* <Acceuil person={userList} trn_list={tournoiList} /> */}
            {/* <Acceuil trn_list={tournoiList} person={userList} /> */}
            {/* console.log(); */}
        </div>
    );
}

export default App;