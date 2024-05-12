import { Link } from "react-router-dom";
import React from 'react'

 function Nav() {
  return (
    <div>
            <Link to="/home">Home</Link>
            <Link to="/profil">profil</Link>
            {/* <Link to="/cart">Panier</Link> */}
    </div>
  )
}
export default Nav;
