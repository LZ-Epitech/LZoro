 import { useEffect, useState } from 'react';
import top3img from '../../Frame 2.svg';
 import './css/toprankings.css';
 import { ProfilHead, ProfilMinComponent } from './profils/profils.js';

 
 
 function TopRankings({dataUsers})
 {
    //  const[usr_list,setUsr_list] = useState([]);


    //  useEffect(() => {

    //     console.log(dataUsers);
    //      setUsr_list(dataUsers);
    //     console.log(dataUsers);



    //  }, []);

    // console.log(dataUsers);


//     let listtop3 = three(dataUsers).map((persons) => {
//         return <ProfilHead key={persons.email} persons={persons} />
//     });

//    //  Get list of all user {already elo sorted croissant}
//     function three(dataUsers) {
//         let lgt = 3;
//         let first3 = [];
//         let places = ["one", "two", "three"];
//         let place = 3;

//         if (dataUsers.length <= 3)
//             lgt = dataUsers.length;

//         for (; lgt > 0; lgt--) {
//             dataUsers[lgt - 1]["place"] = places[place - 1];
//             first3.push(dataUsers[lgt - 1]);
//             place--;
//         }
//         return first3.reverse();
//     }

//     let list =  three(dataUsers).map((persons) => {
//         return <ProfilMinComponent persons={persons} />;
//     })
     

//      return(
//          <div className="toprankings">
//              <h2 className="toprankings__title">
//                  Top Rankings
//              </h2>
//              <div className="top3">
//                  <img src={top3img} />
//                  {listtop3}
//              </div>
//              {list}
//          </div>
//      );
 }

 export default TopRankings;