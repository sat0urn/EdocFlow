import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {AuthContext} from "./context/index.js";
import "./index.css";
import UserStore from "./store/UserStore.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext.Provider value={{
    user: new UserStore(),
  }}>
    <App/>
  </AuthContext.Provider>
)
