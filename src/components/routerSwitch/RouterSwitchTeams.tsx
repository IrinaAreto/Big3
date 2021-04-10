import * as React from "react";
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom";
import {CardsTeams} from "../teams/CardTeams";
import {AddTeam} from "../teams/addNew/AddTeam";

export function RouterSwitchTeams(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/`} component={CardsTeams}/>
            <Route exact path={`${path}/addTeam`} component={AddTeam}/>
            <Redirect to="/notfound"/>
        </Switch>
    )
}