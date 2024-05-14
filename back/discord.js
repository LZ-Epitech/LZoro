async function getUserInfo(accessToken) {
    // Créer une requête HTTP GET
    await fetch('https://discord.com/api/v10/users/@me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        // Vérifier si la réponse est OK (code de statut 200)
        if (response.ok) {
            // Récupérer les données JSON de la réponse
            return response.json();
        } else {
            // Gérer les erreurs
            throw new Error('Impossible de récupérer les informations de l\'utilisateur Discord.');
        }
    })
    .then(userData => {
        // Utiliser les données de l'utilisateur
        console.log(userData);
    })
    .catch(error => {
        // Gérer les erreurs
        console.error(error);
    });
}

export { getUserInfo };