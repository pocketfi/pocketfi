import React from 'react'
import { Route, Redirect } from  "react-router-dom";
import {AuthState} from "../../../types/AuthState";
import {RouteComponentProps} from 'react-router-dom';
import {AppState} from "../../../store";
import {connect} from "react-redux";

export interface PrivateRoutProps extends RouteComponentProps, AuthState{
    path: string;
    component: React.FC;
}

class PrivateRout extends React.Component<PrivateRoutProps> {
    constructor(props: PrivateRoutProps) {
        super(props);
    }

    render() {
        return  this.props.isAuthenticated ? (<Route  path={this.props.path}   component={this.props.component} />) :
            (<Redirect  to="/login"/>);
    }
}

const mapStateToProps = (state: AppState) => ({
    // @ts-ignore
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRout);
