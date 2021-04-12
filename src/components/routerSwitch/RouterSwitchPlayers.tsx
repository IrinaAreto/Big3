import * as React from "react";
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom";
import {CardsPlayer} from "../players/cardPlayers/CardPlayers";
import {AddPlayer} from "../players/addNew/AddPlayer";
import {PlayerDetails} from "../players/playerDetails/PlayerDetails";

export function RouterSwitchPlayers(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/`} component={CardsPlayer}/>
            <Route exact path={`${path}/addPlayer`} component={AddPlayer}/>
            <Route path={`${path}/playerDetails/:id`} component={PlayerDetails}/>
            <Redirect to="/notfound"/>
        </Switch>
    )
}