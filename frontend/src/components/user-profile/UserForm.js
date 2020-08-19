import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    // FormGroup,
    FormInput,
    // FormSelect,
    // FormTextarea,
    Button
} from "shards-react";

class UserForm extends Component {

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    render() {
        const { title, userProfile, handleSubmit } = this.props;

        return (
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Row>
                            <Col>
                                <Form onSubmit={handleSubmit.bind(this)}>
                                    <Row form>
                                        {/* First Name */}
                                        <Col md="6" className="form-group">
                                            <label htmlFor="feFirstName">First Name</label>
                                            <FormInput
                                                id="feFirstName"
                                                placeholder="First Name"
                                                value={userProfile.first_name || ''}
                                                onChange={this.handleChange.bind(this, 'first_name')}
                                            />
                                        </Col>
                                        {/* Last Name */}
                                        <Col md="6" className="form-group">
                                            <label htmlFor="feLastName">Last Name</label>
                                            <FormInput
                                                id="feLastName"
                                                placeholder="Last Name"
                                                value={userProfile.last_name || ''}
                                                onChange={this.handleChange.bind(this, 'last_name')}
                                            />
                                        </Col>
                                    </Row>
                                    <Row form>
                                        {/* Email */}
                                        <Col md="6" className="form-group">
                                            <label htmlFor="feEmail">Email</label>
                                            <FormInput
                                                type="email"
                                                id="feEmail"
                                                placeholder="Email Address"
                                                value={userProfile.email || ''}
                                                onChange={this.handleChange.bind(this, 'email')}
                                                autoComplete="email"
                                            />
                                        </Col>
                                        {/* Password */}
                                        <Col md="6" className="form-group">
                                            <label htmlFor="fePassword">Password</label>
                                            <FormInput
                                                type="password"
                                                id="fePassword"
                                                placeholder="Password"
                                                disabled
                                                value={userProfile.password || ''}
                                                onChange={this.handleChange.bind(this, 'password')}
                                                autoComplete="current-password"
                                            />
                                        </Col>
                                    </Row>
                                    <Button theme="accent" type="submit">Update Account</Button>
                                </Form>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}

UserForm.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    userProfile: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string
    }),
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func
};

UserForm.defaultProps = {
    title: "Edit Profile",
};

export default UserForm;

/*
<FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value="1234 Main St."
                  onChange={() => {}}
                />
              </FormGroup>
              <Row form>
<Col md="6" className="form-group">
    <label htmlFor="feCity">City</label>
    <FormInput
        id="feCity"
        placeholder="City"
        onChange={() => { }}
    />
</Col>
<Col md="4" className="form-group">
    <label htmlFor="feInputState">Country</label>
    <FormSelect id="feInputState">
        <option>Choose...</option>
        <option>...</option>
    </FormSelect>
</Col>
<Col md="2" className="form-group">
    <label htmlFor="feZipCode">Zip</label>
    <FormInput
        id="feZipCode"
        placeholder="Zip"
        onChange={() => { }}
    />
</Col>
              </Row >
    <Row form>
        <Col md="12" className="form-group">
            <label htmlFor="feDescription">Description</label>
            <FormTextarea id="feDescription" rows="5" />
        </Col>
    </Row>
    */