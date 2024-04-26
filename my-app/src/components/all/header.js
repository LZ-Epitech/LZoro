function Header() {
    return (
        <header id="header">
            <p className="name" id="name">LZoro</p>
            <ul className="menu" id="menu">
                <a href="#acceuil">
                    <li className="accueil" id="accueil">
                        Accueil
                    </li>
                </a>
                <a href="#about">
                    <li className="classement" id="About">
                        Classement
                    </li>
                </a>
                <a href="#works">
                    <li className="tournoi" id="tournoi">
                        Tournoi
                    </li>
                </a>
                <a href="#contact">
                    <li className="profil" id="profil">
                        Profil
                    </li>
                </a>
            </ul>
            <div className="phone-menu phone" id="phonemenu">
            <div className="phone-trait trait-1">&nbsp;</div>
            <div className="phone-trait trait-2">&nbsp;</div>
            <div className="phone-trait trait-3">&nbsp;</div>
            </div>
        </header>
    );
}

export default Header;
