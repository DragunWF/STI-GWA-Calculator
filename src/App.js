import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";

function App() {
  return (
    <div className="wrapper">
      <Calculator />
    </div>
  );
}

function Calculator() {
  return (
    <Card className="shadow-sm mb-4 full-width">
      <Card.Header as="h5">Enter Your Grades</Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Prelims (20%)</Form.Label>
              <Form.Control type="number" min="0" max="100" />
            </Col>
            <Col md={3}>
              <Form.Label>Midterms (20%)</Form.Label>
              <Form.Control type="number" min="0" max="100" />
            </Col>
            <Col md={3}>
              <Form.Label>Pre-Finals (20%)</Form.Label>
              <Form.Control type="number" min="0" max="100" />
            </Col>
            <Col md={3}>
              <Form.Label>Finals (40%)</Form.Label>
              <Form.Control type="number" min="0" max="100" />
            </Col>
          </Row>
          <Button variant="primary">Calculate Average GWA</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default App;
