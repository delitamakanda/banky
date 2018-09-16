import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import { hashHistory } from 'react-router';
import BankBalanceStore from '../store/BankBalanceStore';
import BankRewardStore from '../store/BankRewardStore';
import BankActions from '../actions/BankActions';
import Header from './Header';
import AccountService from '../services/AccountService';
import AuthService from '../services/AuthService';

import Piechart from './Piechart';

import Icon from './Icons';

import $ from 'jquery';

class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = {
            user: [],
            amount: []
        }
    }

    componentDidMount () {
        this.loadUserData();
        this.loadAccountData();
    }

    logout () {
        AuthService.logout();
        hashHistory.push('/login');
    }

    loadAccountData () {
        $.ajax({
            type: 'GET',
            url: '/api/account/',
            dataType: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState({amount: res[0]})
                console.log(res);
            }.bind(this)
        })
    }

    loadUserData () {
        $.ajax({
            method: 'GET',
            url: '/api/users/i/',
            dataType: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState({user: res})
            }.bind(this)
        })
    }

    deposit() {
        BankActions.depositIntoAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    withdraw() {
        BankActions.withdrawFromAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    render() {

        return (
            <div className="container">
                <Header title={ "Budget" } hasBackButton={false}  />
                <div className="content">
                    <div><button onClick={this.logout.bind(this)} className="button btn-logout"><Icon kind="power-switch" width="20" height="20" color="black" /> </button></div>
                    <div>${ this.state.amount.balance }</div>
                    <Piechart x={150} y={100} outerRadius={100} innerRadius={50} data={[{value: 92-34, label: 'Deposit'},{value: 34, label: 'Withdraw'}]} />
                    <div>Your balance is ${(this.state.balance).toFixed(2)}</div>
                    <div>Your points rewards tier is {this.state.rewardsTier}</div>
                    <div>
                        <input type="number" placeholder="Enter amount" ref="amount" />
                        <button onClick={this.deposit.bind(this)}>Deposit</button>
                        <button onClick={this.withdraw.bind(this)}>Withdraw</button>
                    </div>
                </div>
            </div>
        );
    }
}

App.getStores = () => ([BankBalanceStore, BankRewardStore]);
App.calculateState = (prevState) => ({
    balance: BankBalanceStore.getState(),
    rewardsTier: BankRewardStore.getState()
});

const AppContainer = Container.create(App);

export default AppContainer;
