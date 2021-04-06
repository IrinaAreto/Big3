import * as React from "react";
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom";
import {CardsTeams} from "../teams/CardTeams";
import {CardsPlayer} from "../players/CardPlayers";

export function RouterSwitchForAuthorized(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/teams`} component={CardsTeams}/>
            <Route exact path={`${path}/players`} component={CardsPlayer}/>
            <Redirect exact from={`/main`} to={`/main/teams`}/>
            <Redirect to="/notfound"/>
        </Switch>
    )
}