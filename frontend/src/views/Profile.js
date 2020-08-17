/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {
    Container as FullContainer,
    Row,
    Col,
    Card,
    CardBody,
} from "shards-react";
import { Container } from 'flux/utils';

import auth from '../utils/auth';
import UserStore from "../stores/UserStore";
import { convert } from '../utils/misc';
import AuthActions from '../actions/AuthActions';

// import history from '../utils/history';

class ProfileContainer extends Component {

    componentDidMount() {
        if (auth.loggedIn()) {
            AuthActions.getCurrentUser()
        }
    }


    render() {
        const {
            user,
        } = this.state;

        //  console.log(user)

        if (!auth.loggedIn()) {
            return <Redirect to="/login" />
        }

        const search = this.props.location.search; // could be '?editing=true'
        const params = new URLSearchParams(search);
        const isEditing = params.get('editing');

        return (
            <FullContainer fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                </Row>

                {/* First Row of Posts */}
                <Row>
                    <Col>
                        <Card className="card-post card-post--1">
                            <CardBody>
                                {
                                    isEditing ? <div>edit profile</div>
                                    :  <div>{user.username}</div>
                                }


                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </FullContainer>
        );
    }
}

ProfileContainer.getStores = () => ([UserStore]);
ProfileContainer.calculateState = () => ({
    user: UserStore.getState()
});

export default Container.create(convert(ProfileContainer));