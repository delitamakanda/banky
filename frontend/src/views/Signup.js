/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormInput, FormGroup, Button } from "shards-react";
import AuthService from '../services/AuthService';

import { Logo, Icon } from '../components/ui';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      pass: '',
      email: '',
    }
  }

  signup(event) {
    event.preventDefault();

    const first_name = this.refs.first_name.value;
    const last_name = this.refs.last_name.value;
    const username = this.refs.username.value;
    const pass = this.refs.pwd.value;
    const email = this.refs.email.value;

    AuthService.signup(first_name, last_name, username, pass, email);
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4">
        <Row>
          <Col>
            <Logo title="Bank" />
            <Icon kind="star" />
            <p>Créez un compte. C'est simple et gratuit.</p>
            <Form onSubmit={this.signup.bind(this)}>
              <FormGroup>
                <label htmlFor="#username">Identifiant</label>
                <FormInput id="#username" placeholder="Identifiant" ref="username" value={this.state.username} onChange={(evt) => { this.setState({ username: evt.target.value }) }} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#email">E-mail</label>
                <FormInput id="#email" placeholder="E-mail" ref="email" value={this.state.email} onChange={(evt) => { this.setState({ email: evt.target.value }) }} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Mot de passe</label>
                <FormInput type="password" id="#password" placeholder="Mot de passe" ref="pwd" value={this.state.pwd} onChange={(evt) => { this.setState({ pwd: evt.target.value }) }} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#first_name">Prénom</label>
                <FormInput id="#first_name" placeholder="Prénom" ref="first_name" value={this.state.first_name} onChange={(evt) => { this.setState({ first_name: evt.target.value }) }} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#last_name">Nom</label>
                <FormInput id="#last_name" placeholder="Nom" ref="last_name" value={this.state.last_name} onChange={(evt) => { this.setState({ last_name: evt.target.value }) }} />
              </FormGroup>
              <Button pill type="submit">Se connecter</Button>
            </Form>
            <p>En adhérant, vous acceptez les <Link to="/"> Conditions </Link> et la <Link to="/"> Politique de confidentialité </Link>.</p>
            <Link to="login">Vous avez déjà un compte ?</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;