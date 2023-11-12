import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import HomeSettings from "../Home/HomeSettings";
import { Route, Switch } from 'react-router-dom';
import CourseDetails from '../courseDetails/CourseDetails';
import '../MainApp/MainApp.css';
import Footer from "../Footer/Footer";
function MainApp() {
    return (
        <>
            <div >
                <Navbar />
            </div>

            <div className="min">
                    <Sidebar />
                <div style={{width:"100%"}}>    

                    <Switch>
                        <Route path="/app/main">
                            <HomeSettings />
                        </Route>
                        <Route path="/app/courseDetails/:course">
                            <CourseDetails />
                        </Route>
                    </Switch>
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default MainApp;