import * as React from "react";
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom";
import {CardsTeams} from "../teams/cardTeams/CardTeams";
import {AddTeam} from "../teams/addNew/AddTeam";
import {TeamDetails} from "../teams/teamDetails/TeamDetails";

export function RouterSwitchTeams(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/`} component={CardsTeams}/>
            <Route exact path={`${path}/addTeam`} component={AddTeam}/>
            <Route path={`${path}/teamDetails/:id`} component={TeamDetails}/>
            <Redirect to="/notfound"/>
        </Switch>
    )
}