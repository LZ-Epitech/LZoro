import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/nav.css';
import { getDiscordUser } from '../../providers/getDiscordLogin';

function Nav() {
    const [discordUser, setDiscordUser] = useState(null);

    useEffect(() => {
        const extractTokenFromUrl = async () => {
            let accessToken = localStorage.getItem('token');
            console.log(accessToken);
            if (localStorage.getItem('token')) {
                const user = await getDiscordUser(accessToken);
                setDiscordUser(user);
            }
            const urlParams = new URLSearchParams(window.location.hash.substr(1));
            accessToken = urlParams.get('access_token')
            if (accessToken) {
                localStorage.setItem('token', accessToken);
                window.history.replaceState({}, document.title, "/");
                const user = await getDiscordUser(accessToken);
                setDiscordUser(user);
        }
        };

        extractTokenFromUrl();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setDiscordUser(null);
    };

    const handleLogin = () => {
        window.location.href = `https://discord.com/oauth2/authorize?client_id=1239797278533746732&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=identify`;
    };

    return (
        <div>
            <div className="Nav">
                <Link className="link site-link" to="/">LZoro</Link>
                <Link className="link" to="/">Acceuil</Link>
                <Link className="link" to="/ranked">Classée</Link>
                <Link className="link" to="/tournaments">Tournois</Link>
                <Link className="link" to="/profil">Profil</Link>
                {discordUser ? (
                    <div>
                        <img src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`} alt="Discord Avatar" />
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                        <p>{discordUser.username}</p>
                    </div>
                ) : (
                    <button className="login-button" onClick={handleLogin}>Login with Discord</button>
                )}
            </div>
        </div>
    );
}

export default Nav;
