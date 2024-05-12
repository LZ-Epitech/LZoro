import './App.css';
import Tests from './tests/tests.js';
import { useState, useEffect } from 'react';
import { getUsers } from './services/provider.js';
import Acceuil from './pages/acceuil.js';

let newitem = [];
function App()
{
    const [data, setData] = useState([]);
    const [newitem, setNewItem] = useState([]);

    useEffect(() => {
        getUsers().then(records => {
            setData(records);
        });
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const updatedItems = data.map((record, index) => ({
                name: record.fields.name,
                email: record.fields.email,
                elo1: record.fields.elo1v1,
                elo2: record.fields.elo2v2,
                backgroundImage: record.fields.backgroundImage
            }));
            setNewItem(updatedItems);
        }
    }, [data]);

    console.log(newitem);

    return (
        <div className='App'>
            <Acceuil person={newitem} />
        </div>
    );
}

export default App;