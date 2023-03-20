import './App.css';
import { BrowserRouter as Brouter, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing';
import Auth from './views/Auth';

function App() {
  return (
    <Brouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
        <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
      </Switch>
    </Brouter>
  );
}

export default App;
