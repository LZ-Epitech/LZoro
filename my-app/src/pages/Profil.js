import React, { useEffect, useState } from 'react';
import './css/Profil.css';
import { getUserToken } from '../providers/getUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from '../providers/setUsers';

function Profil() {
    const [user, setUser] = useState(null);
    const [load, setLoad] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoad(true);
            return;
        }

        const fetchData = async () => {
            try {
                const profile = await getUserToken(token);
                setUser(profile);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoad(true);
            }
        };

        fetchData();
    }, []);

    const supprUser = async () => {
        deleteUser(user.fields.token);
        localStorage.removeItem('token');
        setDeleteMessage(<p>Votre compte a été supprimé.<br/> La page va se recharger dans 5 secondes.</p>);
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }

    return (
        <div className="profil-container">
            {!load ? (
                <p>Chargement...</p>
            ) : !user ? (
                <p>Connectez-vous avec Discord !</p>
            ) : (
                <>
                    <div className='profil-header'>
                        <img src={`https://cdn.discordapp.com/avatars/${user.fields.discordID}/${user.fields.avatar}.png`} alt="Profil" />
                        <h2 className='profil-name'>{user.fields.name}</h2>
                    </div>
                    <div className='profil-content'>
                        <div className='profil-content-1v1'>
                            <h3 className='profil-content-title'>1v1</h3>
                            Votre classement : <br/>
                            Votre élo : {user.fields.elo1v1} <br/>
                            Votre évolution :<br/>
                        </div>
                        <div className='profil-content-2v2'>
                            <h3 className='profil-content-title'>2v2</h3>
                            Votre classement : <br/>
                            Votre élo : {user.fields.elo2v2} <br/>
                            Votre évolution : <br/>
                        </div>
                    </div>
                    {/* <div class="table">
                        <div class="row">
                            <div class="cell col1">Elo 1v1</div>
                            <div class="cell col2">:</div>
                            <div class="cell col3">{user.fields.elo1v1}</div>
                        </div>
                        <div class="row">
                            <div class="cell col1">Elo 2v2</div>
                            <div class="cell col2">:</div>
                            <div class="cell col3">{user.fields.elo2v2}</div>
                        </div>
                    </div> */}
                    <div className='profil-btns'>
                        <div className='profil-btn btn_suppr' onClick={supprUser}>
                            <div className='square-btn_suppr'></div>
                            Supprimer <FontAwesomeIcon icon={faXmark} style={{paddingLeft: '10px',}} />
                        </div>
                        <div className='profil-btn btn_edit'>
                            <div className='square-btn_edit'></div>
                            Modifier <FontAwesomeIcon icon={faPen} style={{paddingLeft: '10px',}}/>
                        </div>
                    </div>
                    {deleteMessage && (
                        <div className="delete-message">
                            {deleteMessage}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Profil;
