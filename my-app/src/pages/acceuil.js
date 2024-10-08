import './css/acceuil.css';
import TopRankings from '../components/acceuil/toprankings';
import { TournamentView } from '../components/acceuil/tournamentview';
import { Ensemble } from '../components/acceuil/ensemble';

function Acceuil()
{
    return(
        <div className='acceuil'>
            <section className="title">
                {/* <img className="image-title" alt="baby-foot background" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.directachat56.fr%2FFiles%2F31462%2FImg%2F19%2Fbaby-foot-sportivo-05-zoom.jpg&f=1&nofb=1&ipt=459c2f4f07421aa68dd01cd733dceca6e68967243b9f36f281c7facf175d2c8f&ipo=images" /> */}
                <h1>LZoro - Baby-Foot</h1>
                <p>Bienvenue sur LZoro le meilleur site</p>
                <p className='desc'>de compétition de babyfoot</p>
            </section>
            <section className="info">
                <div className="info__container">
                    <TopRankings />
                    <Ensemble />
                    <TournamentView />
                </div>
            </section>
        </div>
    );
}

export default Acceuil;