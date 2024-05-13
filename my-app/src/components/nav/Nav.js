import { Link } from "react-router-dom";

function Nav() {
    return (
        <div className="Nav">
            <Link to="/">Home</Link>
            <Link to="/profil">Profil</Link>
            <Link to="/ranked">Ranked</Link>
            <Link to="/tournaments">Tournament</Link>
        </div>
    )
}

export default Nav;