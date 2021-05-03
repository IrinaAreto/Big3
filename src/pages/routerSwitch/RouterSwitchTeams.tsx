import * as React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
import {CardsTeams} from '../teams/cardTeams/CardTeams';
import {AddTeam} from '../teams/AddEdit/addNew/AddTeam';
import {TeamDetails} from '../teams/teamDetails/TeamDetails';
import {EditTeam} from '../teams/AddEdit/Edit/EditTeam';

export function RouterSwitchTeams(): React.ReactElement {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/`} component={CardsTeams}/>
            <Route exact path={`${path}/addTeam`} component={AddTeam}/>
            <Route exact path={`${path}/editTeam`} component={EditTeam}/>
            <Route path={`${path}/teamDetails/:id`} component={TeamDetails}/>
            <Redirect to='/notfound'/>
        </Switch>
    )
}