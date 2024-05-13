import './css/acceuil.css';
import TopRankings from '../components/acceuil/toprankings';
// import { TournamentView } from '../components/acceuil/tournamentview';
import { Ensemble } from '../components/acceuil/ensemble';
import { useEffect, useState } from 'react';

 function Acceuil()
 {
    //  const person = props.person;
    //  const trn_list = props.trn_list;
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        const getInfo = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
            });

            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setDataUsers(data);
        } catch (error) {
            console.log(error);
        } finally {
        }
        };

        getInfo();
        return () => {};
    }, []);

     return(
         <div className='acceuil'>
             <section className="title">
                 <img className="image-title" alt="baby-foot background" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.directachat56.fr%2FFiles%2F31462%2FImg%2F19%2Fbaby-foot-sportivo-05-zoom.jpg&f=1&nofb=1&ipt=459c2f4f07421aa68dd01cd733dceca6e68967243b9f36f281c7facf175d2c8f&ipo=images" />
                 <h1>LZoro - Baby-Foot</h1>
             </section>
             <section className="info">
                 <div className="info__container">
                 {dataUsers.length > 0 ? (
                        <TopRankings dataUsers={dataUsers} />
                    ) : (
                        <p>Loading...</p>
                    )}
                     <Ensemble />
                     {/* <TournamentView trn_list={trn_list} /> */}
                 </div>
             </section>
         </div>
     );
 }

 export default Acceuil;