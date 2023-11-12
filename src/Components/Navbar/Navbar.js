import {Link } from "react-router-dom";
import './Navbar.css'
import 'primeicons/primeicons.css';
import Elmotahida from '../../Images/Elmotahida.png'


function Navbar() {

    return (
        <nav className="nav p-4">
            <div to="/price" className="site-title">
                <img height={50} src={Elmotahida}/>
                <label>ElMotahida</label>
            </div>
        </nav>

    )
}


export default Navbar;