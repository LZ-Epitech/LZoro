import { Link } from "react-router-dom";
import React from 'react'

 function Nav() {
  return (
    <div>
            <Link to="/">Home</Link>
            <Link to="/profil">Profil</Link>
            <Link to="/ranked">Ranked</Link>
            <Link to="/tournaments">Tournament</Link>

    </div>
  )
}
export default Nav;
