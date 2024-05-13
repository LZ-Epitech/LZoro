const setTag = async (email) => {
    try {
        const response = await fetch('http://localhost:3001/users/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
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

export default setTag;