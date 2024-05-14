async function getUserInfo(accessToken) {
    try {
        const response = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log("Statut de la réponse:", response.status);
        if (response.ok) {
            return response.json();
            // console.log("Données utilisateur:", userData);
        } else {
            throw new Error('Impossible de récupérer les informations de l\'utilisateur Discord.');
        }
    } catch (error) {
        console.error(error);
    }
}

export { getUserInfo };