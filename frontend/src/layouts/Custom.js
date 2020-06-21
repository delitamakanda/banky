import React from "react";
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

export default CustomLayout;
