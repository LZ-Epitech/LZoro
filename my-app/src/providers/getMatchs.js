const getMatchFormated = async (token) => {
    try {
        const response = await fetch(`http://localhost:3001/matchs/player?token${token}`, {
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
}

export { getMatchFormated };