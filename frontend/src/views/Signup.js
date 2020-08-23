/* eslint jsx-a11y/anchor-is-valid: 0 */
import 'whatwg-fetch';

import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, FormInput, ListGroup, ListGroupItem, Button, Card, CardHeader, Modal, ModalBody } from "shards-react";
import AuthActions from '../actions/AuthActions';

import { Logo, Icon } from '../components/ui';

import auth from '../utils/auth';
import frenchkiss from '../utils/translations';

import marked from 'marked';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      pwd: '',
      pwd2: '',
      email: '',
      terms: '',
      privacies: '',
      openTerms: false,
      openPrivacy: false
    }

    this.toggleTerms = this.toggleTerms.bind(this);
    this.togglePrivacy = this.togglePrivacy.bind(this);
  }

  toggleTerms() {
    this.setState({
      openTerms: !this.state.openTerms
    });
  }

  togglePrivacy() {
    this.setState({
      openPrivacy: !this.state.openPrivacy
    });
  }

  async componentDidMount() {
    const termsPath = require("../assets/terms-and-conditions.md");
    const privacyPath = require("../assets/privacy-policies.md");

    const response = await Promise.all([
      fetch(termsPath),
      fetch(privacyPath)
    ]);
    const termsData = await response[0].text();
    const privacyData = await response[1].text();

    if (termsData !== undefined && privacyData !== undefined) {
      this.setState({
        terms: termsData,
        privacies: privacyData
      });
    }

  }

  signup = (event) => {
    event.preventDefault();

    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const username = this.state.username;
    const pass = this.state.pwd;
    const passConfirmation = this.state.pwd2;
    const email = this.state.email;

    AuthActions.signup(first_name, last_name, username, pass, passConfirmation, email);
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { terms, privacies, openTerms, openPrivacy } = this.state;
    let basicModal;
    if (openTerms) {
      basicModal = (
        <Modal open={openTerms} toggle={this.toggleTerms}>
          <ModalBody dangerouslySetInnerHTML={{ __html: marked(terms) }}></ModalBody>
        </Modal>
      );
    }

    if (openPrivacy) {
      basicModal = (
        <Modal open={openPrivacy} toggle={this.togglePrivacy}>
          <ModalBody dangerouslySetInnerHTML={{ __html: marked(privacies) }}></ModalBody>
        </Modal>
      );
    }

    if (auth.loggedIn()) {
      return <Redirect to="/" />
    }

    return (
      <Container fluid className="main-content-container px-4">
        <Logo title="Budget" />
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6>{frenchkiss.t('signup.text')}. <Icon kind="star" /></h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p3">
              <Row>
                <Col>
                  <Form onSubmit={this.signup}>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="#first_name">{frenchkiss.t('signup.form.firstName')}</label>
                        <FormInput id="first_name" placeholder={frenchkiss.t('signup.form.firstName')} name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="#last_name">{frenchkiss.t('signup.form.lastName')}</label>
                        <FormInput id="last_name" placeholder={frenchkiss.t('signup.form.lastName')} name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="#username">{frenchkiss.t('signup.form.username')}</label>
                        <FormInput id="username" placeholder={frenchkiss.t('signup.form.username')} name="username" value={this.state.username} onChange={this.handleChange} />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="#email">{frenchkiss.t('signup.form.email')}</label>
                        <FormInput id="email" placeholder={frenchkiss.t('signup.form.email')} name="email" value={this.state.email} onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="#password">{frenchkiss.t('signup.form.motDePasse')}</label>
                        <FormInput type="password" id="password" placeholder={frenchkiss.t('signup.form.motDePasse')} name="pwd" value={this.state.pwd} onChange={this.handleChange} />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="#password2">{frenchkiss.t('signup.form.motDePasseConfirmation')}</label>
                        <FormInput type="password" id="password2" placeholder={frenchkiss.t('signup.form.motDePasseConfirmation')} name="pwd2" value={this.state.pwd2} onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Button pill type="submit">{frenchkiss.t('signup.form.btnRejoindre')}</Button>
                  </Form>
                </Col>
              </Row>
              <p>{frenchkiss.t('signup.cgvText1')} <Button outline onClick={this.toggleTerms}> {frenchkiss.t('signup.cgvText2')} </Button> {frenchkiss.t('signup.cgvText3')} <Button outline onClick={this.togglePrivacy}> {frenchkiss.t('signup.cgvText4')} </Button>.</p>
              {basicModal}
              <Link to="login">{frenchkiss.t('signup.navigateToSignin')}</Link>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Container>
    );
  }
}

export default Signup;