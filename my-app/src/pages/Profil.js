// import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

function Profil() {

    const [dataProfil, setDataProfil] = useState([]);

    useEffect(() => {
        const getInfo = async () => {
            try {
                // const token = localStorage.getItem('token');
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
            } finally {}};
        getInfo();

        return () => {};
    }, []);

    return (
        <div>
            profil
        </div>
    )
}

export default Profil;
