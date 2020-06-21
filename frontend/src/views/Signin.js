/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormInput, FormGroup, Button } from "shards-react";
import AuthService from '../services/AuthService';

import { Logo } from '../components/ui';

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      pwd: ''
    }
  }

  login(event) {
    event.preventDefault();

    const username = this.state.username;
    const pass = this.state.pwd;

    AuthService.login(username, pass, (loggedIn) => {
      if (loggedIn) {
        // this.props.history.push('/');
      }
    })
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4">
          <Row>
            <Col>
              <Logo title="Bank" />
              <p>Entrer vos identifiants.</p>
              <p>Vous n'avez pas de compte ? <Link to="signup">Créer le</Link> en 3 minutes.</p>
              <Form onSubmit={this.login.bind(this)}>
                <FormGroup>
                  <label htmlFor="#username">Identifiant</label>
                  <FormInput id="#username" placeholder="Identifiant" ref="username" value={this.state.username} onChange={(evt) => { this.setState({ username: evt.target.value })}} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Mot de passe</label>
                  <FormInput type="password" id="#password" placeholder="Mot de passe" ref="pwd" value={this.state.pwd} onChange={(evt) => { this.setState({ pwd: evt.target.value })}} />
                </FormGroup>
                <Button pill type="submit">Se connecter</Button>
              </Form>
            </Col>
          </Row>
      </Container>
    );
  }
}


export default Signin;