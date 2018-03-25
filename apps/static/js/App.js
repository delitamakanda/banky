import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import BankBalanceStore from './store/BankBalanceStore';
import BankRewardStore from './store/BankRewardStore';
import BankActions from './actions/BankActions';
import { Button } from 'element-react';
import './App.css';


class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = {
            authenticated: false
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        this.props.lock.show((err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            this.setState({authenticated: true});
        })
    }

    logout() {
        this.setState({authenticated: false});
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
