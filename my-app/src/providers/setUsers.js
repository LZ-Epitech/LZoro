const setTag1 = async (email, tag) => {
    try {
        const response = await fetch('http://localhost:3001/users/tag1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, tags1: tag }),
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

const setTag2 = async (email, tag) => {
    try {
        const response = await fetch('http://localhost:3001/users/tag2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, tags2: tag }),
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

export { setTag1, setTag2 };