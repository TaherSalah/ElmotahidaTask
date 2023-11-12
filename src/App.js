import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import MainApp from './Components/MainApp/MainApp'
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css"; 
import 'primeflex/primeflex.css';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <MainApp />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
