import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/nav/Nav.js';
import Acceuil from './pages/acceuil.js';
import Tournament  from './pages/tournament.js';
import Profil from './pages/Profil.js';
import Ranked from './pages/ranked.js';
import NoPage from './pages/NoPage.js';
import { useEffect } from 'react';
import { getAuthorizationCodeFromURL } from './providers/getDiscordLogin.js';

function App()
{
    useEffect(() => {
        localStorage.setItem('code', getAuthorizationCodeFromURL());
    });

    return (
        <div className='App'>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Acceuil />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/ranked" element={<Ranked />} />
                    <Route path="/tournaments" element={<Tournament />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;