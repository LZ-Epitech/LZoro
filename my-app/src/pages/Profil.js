import React, { useEffect, useState } from 'react';
import './css/Profil.css';
import { getDiscordUser } from '../providers/getDiscordLogin';

function Profil() {
    const [dataProfil, setDataProfil] = useState(null); // Initialiser à null pour indiquer le chargement
    const [loading, setLoading] = useState(true); // État de chargement initialisé à true

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getDiscordUser(localStorage.getItem('token'));
                setDataProfil(user);
                setLoading(false); // Mettre à jour l'état de chargement à false une fois les données reçues
            } catch (error) {
                console.error('Erreur lors de la récupération des données de profil :', error);
                setLoading(false); // Mettre à jour l'état de chargement à false en cas d'erreur
            }
        };

        fetchData();
    }, []);

    return (
        <div className="profil-container">
            {!dataProfil ? (
                <p>Connectez-vous avec Discord !.</p>
            ) : (
                <>
                    <h2>{dataProfil.global_name}</h2>
                    <img src={`https://cdn.discordapp.com/avatars/${dataProfil.id}/${dataProfil.avatar}.png`} alt="Profil" />
                    <div>
                        <p className='discord'><strong>Discord : {dataProfil.username}</strong></p>
                        <p className='elo1v1'><strong>ELO 1v1 : 1500</strong></p>
                        <p className='elo2v2'><strong>ELO 2v2 : 500</strong></p>
                    </div>
                </>
            )}
        </div>
    );
}


export default Profil;
