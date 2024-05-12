import { useState } from 'react';
import './css/tests.css'
import ProfilMinComponent from '../components/profils/profils';
import TopRankings from '../components/toprankings';
import Acceuil from '../pages/acceuil';
import { TournamentView } from '../components/tournamentview';

let newid = 0;
let elo2 = 500;

function Tests()
{

    let name = "Goulwenn LAZOUR";
    let email = "goulwenn@lazour.fr";
    let elo1 = 500;
    let backgroundImage = "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/gojo2.jpg";

    const [person, setPerson] = useState([
    ]);

    /* Get all person */
    const handleClick = () => {
        const personCopy = [...person];
        newid = newid + 1;
        personCopy.push({name: name, email: email, elo1: elo1, elo2: elo2, backgroundImage: backgroundImage});
        setPerson(personCopy);
        console.log(person);
        elo2 = elo2 - 100;
    }

    // const list = person.map((persons) => {
    //     return <ProfilMinComponent persons={persons} />;
    //     // return <p>{persons.name}</p>;
    // })

	return (
        <div>
            {/* <Acceuil person={person} /> */}
            <TournamentView />
            <button onClick={handleClick}>Ajouter Goulwenn</button>
        </div>
    );
}

export default Tests;