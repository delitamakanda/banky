/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, FormInput, FormGroup, Button } from "shards-react";
import AuthActions from '../actions/AuthActions';

import { Logo } from '../components/ui';

import auth from '../utils/auth';

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
          <Row>
            <Col>
              <Logo title="Bank" />
              <p>Entrer vos identifiants.</p>
              <p>Vous n'avez pas de compte ? <Link to="signup">Créer le</Link> en 3 minutes.</p>
              <Form onSubmit={this.login}>
                <FormGroup>
                  <label htmlFor="#username">Identifiant</label>
                  <FormInput id="username" placeholder="Identifiant" name="username" value={this.state.username} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">Mot de passe</label>
                  <FormInput type="password" id="#password" placeholder="Mot de passe" name="pwd" value={this.state.pwd} onChange={this.handleChange} />
                </FormGroup>
                <Button pill type="submit">Se connecter</Button>
                {this.state.error && (
                  <div>Mauvaise combinaison de mot de passe</div>
                )}
              </Form>
            </Col>
          </Row>
      </Container>
    );
  }
}


export default Signin;