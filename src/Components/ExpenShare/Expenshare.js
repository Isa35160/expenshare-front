import React, {Component} from 'react';
import Menu from "../Menu/Menu";
import DashBoard from "./DashBoard";
import Expenses from "./Expenses/Expenses";
import Persons from "./Persons/Persons";
import {Route} from "react-router-dom"


class ExpenShare extends Component {
    render() {
        return (
            <div>
                <Menu url={this.props.match.url}/>
                <Route exact path={this.props.match.url}  component={DashBoard}/>
                <Route path={this.props.match.url + '/expenses'} render={props => <Expenses {...props} slug={this.props.match.params.slug}/>}/>
                <Route path={this.props.match.url + '/persons'} render={props => <Persons {...props} slug={this.props.match.params.slug}/>}/>
                </div>

        );
    }
}

export default ExpenShare;