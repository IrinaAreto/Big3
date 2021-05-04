import * as React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
import {RouterSwitchTeams} from './RouterSwitchTeams';
import {RouterSwitchPlayers} from './RouterSwitchPlayers';

export function RouterSwitchForAuthorized(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/teams`} component={RouterSwitchTeams}/>
            <Route path={`${path}/players`} component={RouterSwitchPlayers}/>
            <Redirect exact from={`/main`} to={`/main/teams`}/>
            <Redirect to='/notfound'/>
        </Switch>
    )
}