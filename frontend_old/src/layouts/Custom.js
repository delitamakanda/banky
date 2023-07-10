import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "shards-react";

const CustomLayout = ({ children }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
        tag="main"
      >
        {children}
      </Col>
    </Row>
  </Container>
);

export default withRouter(CustomLayout);
