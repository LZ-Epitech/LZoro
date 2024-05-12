import './css/acceuil.css';
import TopRankings from '../components/toprankings';

function Acceuil(props)
{
    const person = props.person;

    return(
        <div>
            <section className="title">
                <img className="image-title" alt="baby-foot background" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.directachat56.fr%2FFiles%2F31462%2FImg%2F19%2Fbaby-foot-sportivo-05-zoom.jpg&f=1&nofb=1&ipt=459c2f4f07421aa68dd01cd733dceca6e68967243b9f36f281c7facf175d2c8f&ipo=images" />
                <h1>LZoro - Baby-Foot</h1>
            </section>
            <section className="info">
                <div className="info__container">
                    <TopRankings usr_list={person} />
                </div>
            </section>
        </div>
    );
}

export default Acceuil;