import React from 'react';
import './App.module.css';
import {RouterSwitch} from "./components/routerSwitch/RouterSwitch";
import {useAppSelector} from "./store/Hooks";
import {userSelector} from "./store/userSlice";

function App() {
    const {token} = useAppSelector(userSelector);

    return (
        <div className="App">
            <RouterSwitch isAuthorized={!!token}/>
        </div>
    );
}

export default App;
