/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {
  Container as FullContainer,
  Row,
  Col,
  Card,
  CardBody,
  // CardFooter,
  // Badge,
  // Button
} from "shards-react";
import { Container } from 'flux/utils';

import auth from '../utils/auth';
import AccountStore from "../stores/AccountStore";
import UserStore from "../stores/UserStore";
import { convert } from '../utils/misc';
import AuthActions from '../actions/AuthActions';
import BankBalanceStore from '../stores/BankBalanceStore';
import BankRewardStore from '../stores/BankRewardStore';
import BankActions from '../actions/BankActions';

import Piechart from '../components/Piechart';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

class DashboardContainer extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     // First list of posts.
  //     PostsListOne: [
  //       {
  //         backgroundImage: require("../images/content-management/1.jpeg"),
  //         category: "Business",
  //         categoryTheme: "dark",
  //         author: "Anna Kunis",
  //         authorAvatar: '',
  //         title: "Conduct at an replied removal an amongst",
  //         body:
  //           "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
  //         date: "28 February 2019"
  //       },
  //     ]
  //   }

  // }

  componentDidMount() {
    if (auth.loggedIn()) {
      AuthActions.getCurrentUser()
      AuthActions.fetchAccountUser()
    }
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
    const {
      // PostsListOne,
      account,
      user,
      balance,
      rewardsTier
    } = this.state;

    console.log(account)

    if (!auth.loggedIn()) {
      return <Redirect to="/login" />
    }

    return (
      <FullContainer fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
        </Row>

        {/* First Row of Posts */}
        <Row>
          <Col>
            {/*<OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'scroll' } }}>
            </OverlayScrollbarsComponent>*/}
              <Card className="card-post card-post--1">
                <CardBody>

                  {user.username}
                  <div>Your balance is ${(balance).toFixed(2)}</div>
                  <div>Your points rewards tier is {rewardsTier}</div>
                  <Piechart x={150} y={100} outerRadius={100} innerRadius={50} data={[{ value: 92 - 34, label: 'Deposit' }, { value: 34, label: 'Withdraw' }]} />
                  <div>
                    <input type="number" placeholder="Enter amount" ref="amount" />
                    <button onClick={this.deposit.bind(this)}>Deposit</button>
                    <button onClick={this.withdraw.bind(this)}>Withdraw</button>
                  </div>
                </CardBody>
              </Card>
          </Col>
          {/* PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                    {post.category}
                      Written by {post.author} 
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.body}</p>
                  <span className="text-muted">{post.date}</span> { user.username }
                </CardBody>
              </Card>
            </Col>
          ))*/}
        </Row>
      </FullContainer>
    );
  }
}

DashboardContainer.getStores = () => ([UserStore, AccountStore, BankBalanceStore, BankRewardStore]);
DashboardContainer.calculateState = () => ({
  user: UserStore.getState(),
  account: AccountStore.getState(),
  balance: BankBalanceStore.getState(),
  rewardsTier: BankRewardStore.getState()
});

export default Container.create(convert(DashboardContainer));