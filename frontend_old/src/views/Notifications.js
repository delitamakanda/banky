import React from "react";
import { Container, Button } from "shards-react";
import { useHistory } from 'react-router';

const Errors = () => {
  const history = useHistory();
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>Notifications</h2>
          <p>lorem ipsum</p>
          <Button onClick={() => history.goBack()} pill>&larr; Go Back</Button>
        </div>
      </div>
    </Container>
  )
}

export default Errors;
