import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/nav.css';

function Nav() {
    const [discordUser, setDiscordUser] = useState(null);
    const [discordUserName, setDiscordUserName] = useState(null);

    useEffect(() => {
        const fetchDiscordUser = async () => {
            try {
                const response = await fetch('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('discordToken')}`
                    }
                });
                if (response.ok) {
                    const user = await response.json();
                    setDiscordUser(user);
                    setDiscordUserName(user.username); // Récupérer le nom d'utilisateur Discord
                } else {
                    // Gérer les erreurs de récupération de l'utilisateur Discord
                    console.error('Erreur lors de la récupération de l\'utilisateur Discord :', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur Discord :', error);
            }
        };

        const handleDiscordTokenFromCode = async (code) => {
            try {
                const response = await fetch('YOUR_TOKEN_URL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('discordToken', data.token);
                    // Now you can fetch the user using this token
                    fetchDiscordUser();
                } else {
                    // Handle error response
                    console.error('Erreur lors de la récupération du token Discord :', response.statusText);
                }
            } catch (error) {
                console.error('Error handling Discord token:', error);
            }
        };

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            handleDiscordTokenFromCode(code);
        } else {
            if (localStorage.getItem('discordToken')) {
                fetchDiscordUser();
            }
        }
    }, []);

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
