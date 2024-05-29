import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/buttonVerify.css'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ButtonVerify({clicked, verifyMatch})
{
    if (clicked == 0) {

    }
    return (
        <div className="buttonVerify fieldsLastMatchLine profil-btn" onClick={verifyMatch}>
           <p>Valider</p>
           <FontAwesomeIcon icon={faCheck} />
        </div>
    );
}

export { ButtonVerify };