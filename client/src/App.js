import './App.css';
import { BrowserRouter as Brouter, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './components/route/ProtectedRoute';
function App() {
  return (
    <AuthContextProvider>
      <Brouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Brouter>
    </AuthContextProvider>
  );
}

export default App;
