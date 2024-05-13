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

function AllRanks({users})
{
    let allusers = users.map((user, index) => {
        const isEven = index % 2 === 0;
        const className = isEven ? 'allranks__line pair' : 'allranks__line impair';

        return (
            <div className={className}>
                <p className="case allranks__line__name">{user.fields.name}</p>
                <p className="case allranks__line__elo1">{user.fields.elo1v1}</p>
                <p className="case allranks__line__elo2">{user.fields.elo2v2}</p>
            </div>
        );
    });
    allusers.unshift(
        <div className="allranks__line allranks__line__categories">
            <p className="case allranks__line__name">Nom</p>
            <p className="case allranks__line__elo1">Elo 1v1</p>
            <p className="case allranks__line__elo2">Elo 2v2</p>
        </div>,
        <div className="separator">&nbsp;</div>
    );


    return <div className="allranks">{allusers}</div>;
}

function TopRankingsBoard({users})
{
    return (
        <div className="toprankingsboard">
            <TopThree users={users} />
            <AllRanks users={users} />
        </div>
    );
}

export default TopRankingsBoard;