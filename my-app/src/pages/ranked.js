// import { StyleSheet, Text, View } from 'react-native'

import { useEffect, useState } from "react";
import TopRankingsBoard from "../components/ranked/TopRankingsBoard";
import { getUsersByElo } from "../providers/getUsers";

function Ranked() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsersByElo();
                setUsers(usersData);
                setIsLoading(false);
                console.log(usersData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <section className="topRankings">
                {isLoading ? ( <p>Loading...</p> ) : ( <TopRankingsBoard users={users} /> )}
            </section>
            {/* <section className="queue">
                {isLoading ? ( <p>Loading...</p> ) : ( <TopRankingsBoard users={users} /> )}
            </section>
            <section className="lastMatchs">
                {isLoading ? ( <p>Loading...</p> ) : ( <TopRankingsBoard users={users} /> )}
            </section> */}
        </div>
    )
}
export default Ranked;
