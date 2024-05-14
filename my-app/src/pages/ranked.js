import { useEffect, useState } from "react";
import TopRankingsBoard from "../components/ranked/TopRankingsBoard";
import { getUserByEmail, getUsers, getUsersByElo } from "../providers/getUsers";
import './css/ranked.css';
import Queue from "../components/ranked/Queue";
import setTag from "../providers/setUsers";

function Ranked() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(0);
    const [activeBoard, setActiveBoard] = useState(1);
    const [activeUser, setActiveUser] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsersByElo();
                setUsers(usersData);
                let load = isLoading + 1;
                setIsLoading(load);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userActive = await getUsers();
                setActiveUser(userActive[1]);
                let load = isLoading + 1;
                setIsLoading(load);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const selectTopRanks = () => {
        setActiveBoard(1);
    }
    const selectQueue = () => {
        setActiveBoard(2);
    }
    const selectLastMatchs = () => {
        setActiveBoard(3);
    }

    const sectionSelector = displaySelect(activeBoard);

    function displaySelect(selector)
    {
        switch (selector) {
            case 1:
                return (
                    <section className="topRankings">
                        {isLoading > 2 ? ( <p>Loading...</p> ) : ( <TopRankingsBoard users={users} /> )}
                    </section>
                );
                break;
            case 2:
                return (
                    <section className="queue">
                        {isLoading > 2 ? ( <p>Loading...</p> ) : ( <Queue activeUser={activeUser} setActiveUser={setActiveUser} />)}
                    </section>
                );
                break;
            case 3:
                return (
                    <section className="lastMatchs">
                        {isLoading > 2 ? ( <p>Loading...</p> ) : ( <p>LASTMATCHS</p> )}
                    </section>
                );
                break;
        }
    }

    return (
        <div className="ranked">
            <div className="ranked__selector">
                <div className="ranked__selector__topranks ranked__selector__all" onClick={selectTopRanks}>
                    Classement
                </div>
                <div className="ranked__selector__queue ranked__selector__all" onClick={selectQueue}>
                    Rechercher un match
                </div>
                <div className="ranked__selector__lastmatchs ranked__selector__all" onClick={selectLastMatchs}>
                    Derniers matchs
                </div>
            </div>
            {sectionSelector}
        </div>
    )
}
export default Ranked;
