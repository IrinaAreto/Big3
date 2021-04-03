import * as React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {LoginPage} from "../authorization/LoginPage";
import {SingUpPage} from "../authorization/SignUpPage";
import {CardsTeams} from "../teams/CardTeams";
import {CardsPlayer} from "../players/CardPlayers";

type RouterSwitchProps = {
    isAuthorized: boolean;
}

export function RouterSwitch({isAuthorized}: RouterSwitchProps): React.ReactElement {
    return (
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/signup" component={SingUpPage}/>
            <Route exact path="/teams">{isAuthorized ? <CardsTeams/> : <Redirect to="/"/>}</Route>
            <Route exact path="/players">{isAuthorized ? <CardsPlayer/> : <Redirect to="/"/>}</Route>
        </Switch>
    )
}