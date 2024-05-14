const getDiscord = async (code) => {
    console.log(JSON.stringify({ 'code': code }));
    try {
        const response = await fetch('http://localhost:3001/discord/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'code': code }),
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

export { getAuthorizationCodeFromURL, getDiscord };