import * as React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
import {Teams} from '../teams/Teams';
import {Players} from '../players/Players';

export function RouterSwitchForAuthorized(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/teams`} component={Teams}/>
            <Route path={`${path}/players`} component={Players}/>
            <Redirect exact from={`/main`} to={`/main/teams`}/>
            <Redirect to='/notfound'/>
        </Switch>
    )
}