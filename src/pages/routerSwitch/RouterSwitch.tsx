import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LoginPage} from '../authorization/LoginPage';
import {SingUpPage} from '../authorization/SignUpPage';
import {Main} from '../main/Main';
import {NotFound} from '../notFound/NotFound';

type RouterSwitchProps = {
    isAuthorized: boolean;
}

export function RouterSwitch({isAuthorized}: RouterSwitchProps): React.ReactElement {
    return (
        <Switch>
            <Route exact path='/' component={LoginPage}/>
            <Route exact path='/signup' component={SingUpPage}/>
            <Route path='/main'>{isAuthorized ? <Main/> : <Redirect to='/'/>}</Route>
            <Route path='/notfound' component={NotFound}/>
            <Redirect to='/notfound'/>
        </Switch>
    )
}