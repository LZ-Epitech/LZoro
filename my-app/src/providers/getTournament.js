const getTournament = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/tournaments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
};

const getTournament1v1 = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/tournaments/1v1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
};

const getTournament2v2 = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/tournaments/2v2', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
};

export { getTournament, getTournament1v1, getTournament2v2 };