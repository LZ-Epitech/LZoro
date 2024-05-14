import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/nav/Nav.js';
import Acceuil from './pages/acceuil.js';
import Tournament  from './pages/tournament.js';
import Profil from './pages/Profil.js';
import Ranked from './pages/ranked.js';
import NoPage from './pages/NoPage.js';
import { useEffect } from 'react';
import { getAuthorizationCodeFromURL, getDiscord } from './providers/getDiscordLogin.js';

function App()
{
    useEffect(() => {
        const currentUrl = window.location.href;

        if (currentUrl.includes("#")) {
            const fragmentIndex = currentUrl.indexOf("#");
            const fragment = currentUrl.substring(fragmentIndex + 1);
            const params = new URLSearchParams(fragment);
            if (params.has("access_token")) {
                const accessToken = params.get("access_token");
                localStorage.setItem('token', accessToken);
            }
        } else {
            console.log("L'URL ne contient pas de fragment.");
        }
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