/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, FormInput, FormGroup, Button } from "shards-react";
import AuthActions from '../actions/AuthActions';

import { Logo, Icon } from '../components/ui';

import auth from '../utils/auth';

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

  signup = (event) => {
    event.preventDefault();

    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const username = this.state.username;
    const pass = this.state.pwd;
    const email = this.state.email;

    AuthActions.signup(first_name, last_name, username, pass, email);
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
            <Icon kind="star" />
            <p>Créez un compte. C'est simple et gratuit.</p>
            <Form onSubmit={this.signup}>
              <FormGroup>
                <label htmlFor="#username">Identifiant</label>
                <FormInput id="username" placeholder="Identifiant" name="username" value={this.state.username} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#email">E-mail</label>
                <FormInput id="email" placeholder="E-mail" name="email" value={this.state.email} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Mot de passe</label>
                <FormInput type="password" id="password" placeholder="Mot de passe" name="pwd" value={this.state.pwd} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#first_name">Prénom</label>
                <FormInput id="first_name" placeholder="Prénom" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#last_name">Nom</label>
                <FormInput id="last_name" placeholder="Nom" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
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