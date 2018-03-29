import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import { hashHistory } from 'react-router';
import BankBalanceStore from './store/BankBalanceStore';
import BankRewardStore from './store/BankRewardStore';
import BankActions from './actions/BankActions';
import { Button } from 'element-react';
import Header from './Header';
import AuthService from './Auth';
import './App.css';
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
    }

    logout () {
        AuthService.logout();
        hashHistory.push('/login');
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
		let balance = this.state.amount.map((value, index) => (
			return <div key={value.id}>{value.action}</div>
		));
        return (
            <div>
                Hello, { this.state.user.username } <button onClick={this.logout.bind(this)}>Log out</button>
                <div>Your balance is ${(this.state.balance).toFixed(2)}</div>
                <div>Your points rewards tier is {this.state.rewardsTier}</div>
                <div>
                    <input type="number" placeholder="Enter amount" ref="amount" />
                    <Button onClick={this.deposit.bind(this)}>Deposit</Button>
                    <Button onClick={this.withdraw.bind(this)}>Withdraw</Button>
                </div>
				<div>
						{ balance }
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
