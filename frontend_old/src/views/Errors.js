import React from "react";
import { Container, Button } from "shards-react";
import { useHistory } from 'react-router';

const Errors = () => {
  const history = useHistory();
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>500</h2>
          <h3>Something went wrong!</h3>
          <p>There was a problem on our end. Please try again later.</p>
          <Button onClick={() => history.goBack()} pill>&larr; Go Back</Button>
        </div>
      </div>
    </Container>
  )
}

export default Errors;
