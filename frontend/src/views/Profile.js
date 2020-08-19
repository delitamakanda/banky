/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {
    Container as FullContainer,
    Row,
    Col,
    // Card,
    // CardBody,
} from "shards-react";
import { Container } from 'flux/utils';

import auth from '../utils/auth';
import UserStore from "../stores/UserStore";
import AccountStore from '../stores/AccountStore';
import { convert } from '../utils/misc';
import AuthActions from '../actions/AuthActions';

import UserDetails from '../components/user-profile/UserDetails';
import UserForm from '../components/user-profile/UserForm';

class ProfileContainer extends Component {

    componentDidMount() {
        if (auth.loggedIn()) {
            AuthActions.getCurrentUser()
        }
    }

    handleChange(field, value) {
        AuthActions.updateDraft(field, value);
    }

    handleSubmit(event) {
        event.preventDefault()
        AuthActions.updateCurrentUser(this.state.user);
    }


    render() {
        const {
            user,
            account,
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
                        <div>
                            {
                                isEditing ? <UserForm userProfile={user} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} />
                                    : <UserDetails userDetails={user} accountDetails={account} />
                            }
                        </div>
                    </Col>
                </Row>
            </FullContainer>
        );
    }
}

ProfileContainer.getStores = () => ([UserStore]);
ProfileContainer.calculateState = (prevState) => ({
    user: UserStore.getState(),
    account: AccountStore.getState()
});

export default Container.create(convert(ProfileContainer));