import { useEffect, useState } from 'react';
import top3img from '../../Frame 2.svg';
import './css/toprankings.css';
import { ProfilHead, ProfilMinComponent } from './profils/profils.js';
import { getUsersByElo } from '../../providers/getUsers.js';

function TopRankings() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsersByElo();
                setUsers(usersData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    function three(dataUsers) {
        let lgt = Math.min(3, dataUsers.length);
        let first3 = [];
        let places = ["one", "two", "three"];

        for (let i = 0; i < lgt; i++) {
            let userWithPlace = { ...dataUsers[i], place: places[i] };
            first3.push(userWithPlace);
        }

        return first3;
    }

    const usersWithPlace = three(users);

    const list = usersWithPlace.map((user, index) => (
        <ProfilMinComponent key={user.fields.email} persons={user.fields} />
    ));

    const listtop3 = usersWithPlace.map((user, index) => (
        <ProfilHead key={user.fields.email} persons={user} />
    ));

    return (
        <div className="toprankings">
            <h2 className="toprankings__title">Top Rankings</h2>
            <div className="top3">
                <img src={top3img} alt="Top 3" />
                {listtop3}
            </div>
            {list}
        </div>
    );
}

export default TopRankings;