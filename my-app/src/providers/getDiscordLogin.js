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

function getAuthorizationCodeFromURL() {
    if (hasAuthorizationCodeInURL()) {
        var currentURL = window.location.href;
        var urlParams = new URLSearchParams(currentURL.split('?')[1]);
        var authorizationCode = urlParams.get('code');
        getDiscord(authorizationCode)
        return authorizationCode;
    } else {
        return 0;
    }
}

function hasAuthorizationCodeInURL() {
    var queryString = window.location.search;
    return queryString.includes('code=');
}

export { getAuthorizationCodeFromURL, fetchDiscordUser };