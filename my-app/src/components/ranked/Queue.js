import { useEffect, useState } from 'react';
import { getUserByEmail } from '../../providers/getUsers';
import setTag from '../../providers/setUsers';
import './css/queue.css';

function Queue({activeUser, setActiveUser})
{
    const [tags, setTags] = useState(0);

    // DOIT RECEVOIR JOUEUR
    // Check if player search matchs
    useEffect(() => {
        if (activeUser && activeUser.fields) {
            setTags(activeUser.fields.tag);
        }
    }, [activeUser]);

    const handlebutton1v1 = async () => {
        if (activeUser && activeUser.fields) {
            setTag(activeUser.fields.email);
            const tag = await getUserByEmail(activeUser.fields.email)
            setActiveUser(tag);
            console.log("tags : " + tags);
            console.log("user : " + activeUser);
            console.log("user tag : " + activeUser.fields.tag);
        }
    }

    function searchButton()
    {
        return (<div className="ranked__queue__button">
            <div className="ranked__queue__button1v1" onClick={handlebutton1v1}>
                1v1
            </div>
            <div className="ranked__queue__button2v2">
                2v2
            </div>
        </div>);
    }
    function searchFuncAlready()
    {
        return(
            <div className="ranked__queue__already">
                <h3 onClick={handlebutton1v1}>Recherche de matchs ...</h3>
            </div>
        );
    }
    function waitPlease()
    {
        return(<div className="ranked__queue__already">Please wait</div>);
    }
    const searchAlready = () => {
        if (!activeUser && !activeUser.fields) {
            return waitPlease();
        }
        if (tags == 1) {
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