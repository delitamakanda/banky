import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "shards-react";
import Gravatar from 'react-gravatar';

const UserDetails = ({ userDetails, accountDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <Gravatar size={110} className="rounded-circle" email={userDetails.email} />
      </div>
      <h4 className="mb-0">{userDetails.username}</h4>
      <span className="text-muted d-block mb-2">{accountDetails[0].balance}€</span>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem>
        <strong className="text-muted d-block mb-2">
          {accountDetails[0].days_since_created} since account creation
        </strong>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserDetails.propTypes = {
  userDetails: PropTypes.object,
  accountDetails: PropTypes.array
};

export default UserDetails;