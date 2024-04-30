import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserStore from "./store/UserStore.js";
import {AuthContext} from "./context/index.js";
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContext.Provider value={{
            user: new UserStore()
        }}>
            <App/>
        </AuthContext.Provider>
    </React.StrictMode>,
)
