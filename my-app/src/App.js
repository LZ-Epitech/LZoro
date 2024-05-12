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
    


    return (
        <div className='App'>
            {/* <Acceuil person={userList} trn_list={tournoiList} /> */}
            {/* <Acceuil trn_list={tournoiList} person={userList} /> */}
            {/* console.log(); */}
            <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={ <Acceuil/>}/>
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