import { Link } from "react-router-dom";
import './Sidebar.css'
import 'primeicons/primeicons.css';
import Elmotahida from '../../Images/Elmotahida.png'
function Sidebar() {
    const menuItem = [
        {
            path: "/app/main",
            name: "اضافة كورس",

        },
    ]
    return (
        <div className="sidebar">
            <div style={{ width: "100%", alignItems: "center" }}>
                <div className="site-title" >
                    <img src={Elmotahida} style={{ height: "100px", margin: "auto", alignItems: "center", display: "flex", }} />
                </div>
            </div>
            {

                menuItem.map((item, index) => (
                    <Link to={item.path} key={index} className="link active"  style={{direction:"ltr"}}>
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>
                    </Link>
                ))
            }
        </div>
    )

}


export default Sidebar;