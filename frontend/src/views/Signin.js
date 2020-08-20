/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, FormInput, ListGroup, ListGroupItem, Card, CardHeader, Button } from "shards-react";
import AuthActions from '../actions/AuthActions';

import { Logo } from '../components/ui';

import auth from '../utils/auth';
import frenchkiss from '../utils/translations';

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      username: '',
      pwd: ''
    }
  }

  login = event => {
    event.preventDefault();

    const username = this.state.username;
    const pass = this.state.pwd;

    AuthActions.login(username, pass);
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {

    if (auth.loggedIn()) {
      return <Redirect to="/" />
    }

    return (
      <Container fluid className="main-content-container px-4">
        <Logo title="Bank" />
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6>{frenchkiss.t('signin.text')}</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form onSubmit={this.login}>
                    <Row form>
                      <Col className="form-group">

                        <label htmlFor="#username">{frenchkiss.t('signin.form.username')}</label>
                        <FormInput id="username" placeholder="Identifiant" name="username" value={this.state.username} onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row form>
                      <Col className="form-group">

                        <label htmlFor="password">{frenchkiss.t('signin.form.motDePasse')}</label>
                        <FormInput type="password" id="#password" placeholder="Mot de passe" name="pwd" value={this.state.pwd} onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Button pill type="submit">Se connecter</Button>
                    {this.state.error && (
                      <div>{frenchkiss.t('signin.form.error')}</div>
                    )}
                  </Form>
                </Col>
              </Row>
              <p>{frenchkiss.t('signin.navigateToSignUp1')} <Link to="signup">{frenchkiss.t('signin.navigateToSignUp2')}</Link> {frenchkiss.t('signin.navigateToSignUp3')}</p>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Container>
    );
  }
}


export default Signin;