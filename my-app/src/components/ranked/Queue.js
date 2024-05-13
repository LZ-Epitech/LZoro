import './css/queue.css';

function Queue()
{
    return (
        <div className="ranked__queue">
            <h1 className="ranked__queue__title">Queue</h1>
            <div className="ranked__queue__button">
                <div className="ranked__queue__button1v1">
                    1v1
                </div>
                <div className="ranked__queue__button2v2">
                    2v2
                </div>
            </div>
        </div>
    );
}

export default Queue;