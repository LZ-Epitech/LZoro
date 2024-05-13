import { ProfilMinComponent } from '../acceuil/profils/profils';
import './css/TopRankingsBoard.css';

function TopThree({users})
{
    function three(dataUsers) {
        let lgt = Math.min(3, dataUsers.length);
        let first3 = [];

        for (let i = 0; i < lgt; i++) {
            let userWithPlace = { ...dataUsers[i]};
            first3.push(userWithPlace);
        }
        return first3;
    }

    let listcard = three(users).map(user => {
        return <ProfilMinComponent key={user.id} persons={user.fields}/>
    });

    return(
        <div className="toprankings_board__topthree">
            <h2 className="toprankings_board__topthree__title">
                TOP 3
            </h2>
            <div className="toprankings_board__topthree__list">
                {listcard}
            </div>
        </div>
    );
}

function TopRankingsBoard({users})
{
    return (
        <div className="toprankingsboard">
            <TopThree users={users} />
        </div>
    );
}

export default TopRankingsBoard;