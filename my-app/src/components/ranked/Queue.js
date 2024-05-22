import { useEffect, useState } from 'react';
import { getUser, getUserToken } from '../../providers/getUsers';
import { setTag1, setTag2} from '../../providers/setUsers';
import './css/queue.css';
import { getDiscordUser } from '../../providers/getDiscordLogin';

function Queue({activeUser, setActiveUser})
{
    const [tags1, setTags1] = useState(0);
    const [tags2, setTags2] = useState(0);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (activeUser) {
                let user = await getUserToken(activeUser);
                if (user && user.fields) {
                    setTags1(user.fields.tag1);
                    // setTags2(user.fields.tag2);
                } else {
                    console.error("User or user fields are undefined");
                }
            } else {
                console.error("Active user is undefined");
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [activeUser]);
    // DOIT RECEVOIR JOUEUR
    // Check if player search matchs
    useEffect(() => {
        if (activeUser && activeUser.fields) {
            setTags1(activeUser.fields.tag1);
            // setTags2(activeUser.fields.tag2);
        }
    }, [activeUser]);

    const handlebutton1v1 = async () => {
        if (activeUser && activeUser.fields) {
            const found = await setTag1(activeUser.fields.token, 1);
            if (found === -1) {
                alert("Tu ne peux pas lancer un nouveau match ! Valide d'abord le précédent.");
                setTags1(0);
            } else
                setTags1(found % 2);
            const tag1 = await getUserToken(activeUser.fields.token);
            setActiveUser(tag1);
        }
    }

    // const handlebutton2v2 = async () => {
    //     if (activeUser && activeUser.fields) {
    //         await setTag2(activeUser.fields.token, 1);
    //         setTags2(1);
    //         const user = await getDiscordUser(activeUser.fields.token);
    //         setActiveUser(user);
    //     }
    // }

    const close = async () => {
        if (activeUser && activeUser.fields) {
            await setTag1(activeUser.fields.token, 0);
            await setTag2(activeUser.fields.token, 0);
            setTags1(0);
            setTags2(0);
            const user = await getDiscordUser(activeUser.fields.token)
            setActiveUser(user);
        }
    }

    function searchButton()
    {
        return (<div className="ranked__queue__button">
            <div className="ranked__queue__button1v1" onClick={handlebutton1v1}>
                1v1
            </div>
            {/* <div className="ranked__queue__button2v2" onClick={handlebutton2v2}>
                2v2
            </div> */}
        </div>);
    }
    function searchFuncAlready()
    {
        return(
            <div className="ranked__queue__already">
                <h3 onClick={close}>Recherche de matchs ...</h3>
                { tags1 ? <p>1v1</p> : '' }
                { tags2 ? <p>2v2</p> : '' }
            </div>
        );
    }
    function waitPlease()
    {
        return(<div className="ranked__queue__already">Please wait</div>);
    }
    const searchAlready = () => {
        if (!activeUser || !activeUser.fields) {
            return waitPlease();
        }
        if (tags1 === 1 || tags2 === 1) {
            return searchFuncAlready();
        }
        return searchButton();
    }

    return (
        <div className="ranked__queue">
            <h1 className="ranked__queue__title">Queue</h1>
            {searchAlready()}
        </div>
    );
}

export default Queue;