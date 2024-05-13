import { Link } from "react-router-dom";
import './css/nav.css'

function Nav() {
    return (
        <div className="Nav">
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/profil">Profil</Link>
            <Link className="link" to="/ranked">Ranked</Link>
            <Link className="link" to="/tournaments">Tournament</Link>
        </div>
    )
}

export default Nav;