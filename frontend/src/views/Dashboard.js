/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  // CardFooter,
  Badge,
  // Button
} from "shards-react";

import auth from '../utils/auth';
import AuthStore from "../stores/AuthStore";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [
        {
          backgroundImage: require("../images/content-management/1.jpeg"),
          category: "Business",
          categoryTheme: "dark",
          author: "Anna Kunis",
          authorAvatar: '',
          title: "Conduct at an replied removal an amongst",
          body:
            "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
          date: "28 February 2019"
        },
      ],
      user: AuthStore.getUser()
    }

  }

  updateState = () => {
    const { username, id, first_name, last_name, email } = AuthStore.user;
    this.setState({ user: { username, id, first_name, last_name, email }});
  }

  UNSAFE_componentWillMount() {
    AuthStore.on('updated', this.updateState);
  }

  componentWillUnmount() {
    AuthStore.off('updated', this.updateState);
  }

  render() {
    const {
      PostsListOne,
      user
    } = this.state;

    if (!auth.loggedIn()) {
      return <Redirect to="/login" />
    }
    
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
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
          ))}
        </Row>
      </Container>
    );
  }
}

export default Dashboard;