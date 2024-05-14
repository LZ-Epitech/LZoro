import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/nav/Nav.js';
import Acceuil from './pages/acceuil.js';
import Tournament  from './pages/tournament.js';
import Profil from './pages/Profil.js';
import Ranked from './pages/ranked.js';
import NoPage from './pages/NoPage.js';
import { useEffect } from 'react';
import { getDiscordUser } from './providers/getDiscordLogin.js';
import { createUsers } from './providers/setUsers.js';

function App()
{
    useEffect(() => {
        const currentUrl = window.location.href;

        const checkToken = async () => {
            if (localStorage.getItem('token') != null) {
                const discordUser = await getDiscordUser(localStorage.getItem('token'))
                console.log(discordUser);
                if (discordUser == null) {
                    createUsers(localStorage.getItem('token'));
                }
            } else {
                if (currentUrl.includes("#")) {
                    const fragmentIndex = currentUrl.indexOf("#");
                    const fragment = currentUrl.substring(fragmentIndex + 1);
                    const params = new URLSearchParams(fragment);
                    if (params.has("access_token")) {
                        const accessToken = params.get("access_token");
                        localStorage.setItem('token', accessToken);
                        if (getDiscordUser(accessToken) == null) {
                            createUsers(accessToken);
                        }
                    }
                } else {
                    console.log("L'URL ne contient pas de fragment.");
        }}
}});

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