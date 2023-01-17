// import { useHistory } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

import './App.css';
import Routes from './routes';
// import { logout } from './Services/utils';

function App() {
  // const history = useHistory();
  // function handleLogout() {
  //   logout();
  //   history.push("/")
  // };

  return (
    <div className='App'>
      <header>
      </header>
      <Routes />
    </div>
  );
}

export default App;
