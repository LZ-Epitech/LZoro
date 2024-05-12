import { useState } from 'react';
import './css/tests.css'
import ProfilMinComponent from '../components/profils/profils';
import TopRankings from '../components/toprankings';
import Acceuil from '../pages/acceuil';
import { TournamentView } from '../components/tournamentview';

let newid = 0;
let elo2 = 500;

function Tests(props)
{
	return (
        <div>
            <TournamentView trn_list={props.trn_list}/>
        </div>
    );
}

export default Tests;