import './App.css';
import Tests from './tests/tests.js';
import Acceuil from './pages/acceuil.js';
import { useUsersList, useTournamentList } from './services/FrontendService.js';
import  Tournament  from './pages/tournament.js';
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profil from './pages/Profil.js';
import Nav from './components/nav/Nav.js';
import Ranked from './pages/ranked.js';
let newitem = [];
function App()
{
    // const userList = useUsersList();
    // const tournoiList = useTournamentList();
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        const getInfo = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/users', {
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
            setDataUsers(data);
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
            <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={ <Acceuil dataUsers={dataUsers}/>}/>
                <Route path="/profil" element={<Profil />} />
                <Route path="/ranked" element={<Ranked />} />
                <Route path="/tournaments" element={<Tournament />} />



                {/* <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} /> */}
               
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;