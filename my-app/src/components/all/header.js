function Header() {
    return (
        <header id="header">
            <p class="name" id="name">Goulwenn Lazour</p>
            <ul class="menu" id="menu">
                <a href="#acceuil">
                    <li class="accueil" id="accueil" onclick="menuClose()">
                        Accueil
                    </li>
                </a>
                <a href="#about">
                    <li class="About" id="About" onclick="menuClose()">À propos</li>
                </a>
                <a href="#works">
                    <li class="work" id="work" onclick="menuClose()">
                        Projets
                    </li>
                </a>
                <a href="#contact">
                    <li class="Contact" id="Contact" onclick="menuClose()">
                        Contact
                    </li>
                </a>
            </ul>
            <div class="phone-menu phone" id="phonemenu">
            <div class="phone-trait trait-1">&nbsp;</div>
            <div class="phone-trait trait-2">&nbsp;</div>
            <div class="phone-trait trait-3">&nbsp;</div>
            </div>
        </header>
    );
}

export default Header;
