const getUsers = async () => {
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
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
};

const getUsersByElo = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/users/by/elo', {
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

const getUsersByElo1v1 = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/users/by/elo/1v1', {
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

const getUsersByElo2v2 = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/users/by/elo/2v2', {
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

export { getUsers, getUsersByElo, getUsersByElo1v1, getUsersByElo2v2 };