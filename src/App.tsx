import './App.module.css';
import {RouterSwitch} from './pages/routerSwitch/RouterSwitch';
import {useAppSelector} from './core/hooks/Hooks';
import {userSelector} from './modules/user/UserSelector';

function App() {
    const {token} = useAppSelector(userSelector);

    return (
        <div className="App">
            <RouterSwitch isAuthorized={!!token}/>
        </div>
    );
}

export default App;
