import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/nav.css';

function Nav() {
    const [discordUser, setDiscordUser] = useState(null);
    const [discordUserName, setDiscordUserName] = useState(null);
    const handleLogin = () => {
        window.location.href = `https://discord.com/oauth2/authorize?client_id=1239717928161640518&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=identify`;
    };

    const handleLogout = () => {
        // Supprimer le token Discord du localStorage
        localStorage.removeItem('discordToken');
        // Réinitialiser l'utilisateur Discord
        setDiscordUser(null);
        setDiscordUserName(null); // Réinitialiser le nom d'utilisateur Discord
    };

    return (
        <div>
            <h1>{discordUserName ? discordUserName : "Not Logged In"}</h1>
            <div className="Nav">
                <Link className="link site-link" to="/">LZoro</Link>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/ranked">Ranked</Link>
                <Link className="link" to="/tournaments">Tournament</Link>
                <Link className="link" to="/profil">Profil</Link>
                {discordUser ? (
                    <div>
                        <img src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`} alt="Discord Avatar" />
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button className="login-button" onClick={handleLogin}>
                        {discordUserName ? `Logged in as ${discordUserName}` : 'Login with Discord'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Nav;
