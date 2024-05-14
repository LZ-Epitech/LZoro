async function fetchDiscordUser(token) {
    try {
        const response = await fetch(`/user?token=${token}`, {
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
        return null;
    } finally {}
}

// const getDiscordUser = async (accessToken) => {
//     const response = await fetch('https://discord.com/api/users/@me', {
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//         }
//     });
//     if (response.ok) {
//         const user = await response.json();
//         console.log(user);
//         return user;
//     } else {
//         console.error('Failed to fetch Discord user');
//     }
// };



export { fetchDiscordUser };