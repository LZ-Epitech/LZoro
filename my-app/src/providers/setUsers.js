const setTag1 = async (token, tag) => {
    try {
        const response = await fetch('http://localhost:3001/users/tag1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token, tags1: tag }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
}

const setTag2 = async (token, tag) => {
    try {
        const response = await fetch('http://localhost:3001/users/tag2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token, tags2: tag }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
}

const createUsers = async (token) => {
    console.error("CREATE USER !!!!!!!!!!!!!");
    try {
        const response = await fetch('http://localhost:3001/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
}

const deleteUser = async (token) => {
    try {
        console.log("send");
        const response = await fetch('http://localhost:3001/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    } finally {}
}

export { setTag1, setTag2, createUsers, deleteUser };