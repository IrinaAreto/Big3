import * as React from "react";
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom";
import {CardsPlayer} from "../players/CardPlayers";
import {AddPlayer} from "../players/addNew/AddPlayer";

export function RouterSwitchPlayers(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/`} component={CardsPlayer}/>
            <Route exact path={`${path}/addPlayer`} component={AddPlayer}/>
            <Redirect to="/notfound"/>
        </Switch>
    )
}