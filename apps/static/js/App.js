import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import BankBalanceStore from './store/BankBalanceStore';
import BankRewardStore from './store/BankRewardStore';
import BankActions from './actions/BankActions';
import { Button } from 'element-react';
import AuthService from './AuthService';
import AuthStore from './store/AuthStore';
import './App.css';


class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = this.getLoginState();
    }

    getLoginState() {
        return {
            userLoggedIn: AuthStore.isLoggedIn()
        };
    }

    componentDidMount() {
        this.changeListener = this.onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    onChange() {
        this.setState(this.getLoginState());
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    deposit() {
        BankActions.depositIntoAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    withdraw() {
        BankActions.withdrawFromAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    logout (e) {
        e.preventDefault();
        AuthService.logout();
    }

    render() {
        return (
            <div>
                <div>Your balance is ${(this.state.balance).toFixed(2)}</div>
                <div>Your points rewards tier is {this.state.rewardsTier}</div>
                <div>
                    <input type="number" placeholder="Enter amount" ref="amount" />
                    <Button onClick={this.deposit.bind(this)}>Deposit</Button>
                    <Button onClick={this.withdraw.bind(this)}>Withdraw</Button>
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
