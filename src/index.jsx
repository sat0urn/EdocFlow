import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import UserStore from "./store/UserStore.js";
import {AuthContext} from "./context/index.js";
import "./index.css";
import DocumentStore from "./store/DocumentStore.js";
import SearchDataStore from "./store/SearchDataStore.js";
import FetchChangeStore from "./store/FetchChangeStore.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext.Provider value={{
    user: new UserStore(),
    documents: new DocumentStore(),
    searchData: new SearchDataStore(),
    fetchChanges: new FetchChangeStore()
  }}>
    <App/>
  </AuthContext.Provider>
)
