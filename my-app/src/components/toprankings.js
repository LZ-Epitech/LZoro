import top3img from '../Frame 2.svg';
import './css/toprankings.css';
import { ProfilHead, ProfilMinComponent } from './profils/profils.js';




function TopRankings(props)
{
    const usr_list = props.usr_list;

    const listtop3 = three(usr_list).map((persons) => {
        return <ProfilHead key={persons.email} persons={persons} />
    });

    // Get list of all user {already elo sorted croissant}
    function three(usr_list) {
        let lgt = 3;
        let first3 = [];
        let places = ["one", "two", "three"];
        let place = 3;

        if (usr_list.length <= 3)
            lgt = usr_list.length;

        for (; lgt > 0; lgt--) {
            usr_list[lgt - 1]["place"] = places[place - 1];
            first3.push(usr_list[lgt - 1]);
            place--;
        }
        return first3.reverse();
    }

    const list =  three(usr_list).map((persons) => {
        return <ProfilMinComponent persons={persons} />;
    })

    return(
        <div className="toprankings">
            <div className="top3">
                <img src={top3img} />
                {listtop3}
            </div>
            {list}
        </div>
    );
}

export default TopRankings;