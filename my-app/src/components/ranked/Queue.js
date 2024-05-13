import './css/queue.css';

function Queue()
{
    // DOIT RECEVOIR JOUEUR
    // Check if player search matchs
    function searchButton()
    {
        return <div className="ranked__queue__button">
            <div className="ranked__queue__button1v1">
                1v1
            </div>
            <div className="ranked__queue__button2v2">
                2v2
            </div>
        </div>
    };

    function searchFuncAlready()
    {
        return(
            <div className="ranked__queue__already">
                <h3>Recherche de matchs ...</h3>
            </div>
        );
    }
    function isSearch(user)
    {
        if (user.fields.search == "on") {
            return searchAlready();
        }
        return searchButton();
    }
    const searchBtn = searchButton();
    const searchAlready = searchFuncAlready();

    return (
        <div className="ranked__queue">
            <h1 className="ranked__queue__title">Queue</h1>
            {searchAlready}
        </div>
    );
}

export default Queue;