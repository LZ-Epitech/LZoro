import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/nav.css';
import { getDiscordUser } from '../../providers/getDiscordLogin';
import discordLogo from './discord_logo.png';

function Nav() {
    const [discordUser, setDiscordUser] = useState(null);

    useEffect(() => {
        const extractTokenFromUrl = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const user = await getDiscordUser(token);
                    setDiscordUser(user);
                } catch (error) {
                    console.error("Une erreur s'est produite lors de la récupération de l'utilisateur Discord:", error);
                }
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
                    <div className='log'>
                        <img className='ssssss' src={`https://cdn.discordapp.com/avatars/${discordUser.fields.discordID}/${discordUser.fields.avatar}.png`} alt="Discord Avatar" />
                        <button className="logbtn logout-button" onClick={handleLogout}>Logout</button>
                        <p>{discordUser.username}</p>
                    </div>
                ) : (
                    <button className="login-button" onClick={handleLogin}>
                        <img src={discordLogo} alt="Discord Logo" className="discord-logo" />
                        Login with Discord
                    </button>
                )}
            </div>
        </div>
    );
}

export default Nav;
