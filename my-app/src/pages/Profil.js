import React, { useEffect, useState } from 'react';
import './css/Profil.css';
import profilePicture from './pp.jpg';

function Profil() {

    const [dataProfil, setDataProfil] = useState({
        nom: "",
        discord: "",
        elo1v1: 0,
        elo2v2: 0,
        image: "" // Tu peux stocker l'URL de l'image ici
    });

    useEffect(() => {
        const getInfo = async () => {
            try {
                // Remplace cet exemple par ta requête réelle
                const response = await fetch('http://localhost:3001/profil', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDataProfil(data);
            } catch (error) {
                console.log(error);
            }
        };
        getInfo();

        return () => {};
    }, []);

    return (
        <div className="profil-container">
            <h2>Yoyo</h2>
            <img src={profilePicture} alt="Profil" />
            <div>
                <p className='discord'><strong>Discord : IZI</strong></p>
                <p className='elo1v1'><strong>ELO 1v1 : 1500</strong></p>
                <p className='elo2v2'><strong>ELO 2v2 : 500</strong></p>
            </div>
        </div>
    );
}

export default Profil;
