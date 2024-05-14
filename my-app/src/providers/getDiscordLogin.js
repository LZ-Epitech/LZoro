async function fetchDiscordUser(token) {
    try {
        const response = await fetch(`/discord/user?token=${token}`);
        if (response.ok) {
            const userData = await response.json();
            console.log(userData);
        } else {
            throw new Error('Impossible de récupérer les informations de l\'utilisateur Discord.');
        }
    } catch (error) {
        console.error(error);
    }
}

const getDiscordUser = async (accessToken) => {
    const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (response.ok) {
        const user = await response.json();
        console.log(user);
        return user;
    } else {
        console.error('Failed to fetch Discord user');
    }
};

export { fetchDiscordUser, getDiscordUser };