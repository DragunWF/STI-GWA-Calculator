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
      <Header />
      <SubjectAverageCalculator />
      <GradeTable />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>STI College GWA Calculator</h1>;
}

function SubjectAverageCalculator() {
  const [averageGrade, setAverageGrade] = useState(0);
  const [prelimsGrade, setPrelimsGrade] = useState(0);
  const [midtermsGrade, setMidtermsGrade] = useState(0);
  const [prefinalsGrade, setPrefinalsGrade] = useState(0);
  const [finalsGrade, setFinalsGrade] = useState(0);

  function calculateAverageGrade() {
    const calculatedAverageGrade =
      prelimsGrade * 0.2 +
      midtermsGrade * 0.2 +
      prefinalsGrade * 0.2 +
      finalsGrade * 0.4;
    setAverageGrade(calculatedAverageGrade.toFixed(2));
  }

  return (
    <Card className="shadow-sm mb-4 full-width">
      <Card.Header as="h5">Enter Your Grades {averageGrade}</Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Prelims (20%)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                onChange={(e) => setPrelimsGrade(parseFloat(e.target.value))}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Midterms (20%)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                onChange={(e) => setMidtermsGrade(parseFloat(e.target.value))}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Pre-Finals (20%)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                onChange={(e) => setPrefinalsGrade(parseFloat(e.target.value))}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Finals (40%)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                onChange={(e) => setFinalsGrade(parseFloat(e.target.value))}
              />
            </Col>
          </Row>
          <Button variant="primary" onClick={calculateAverageGrade}>
            Calculate Average GWA
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

function SubjectAverageResult() {}

function GradeTable() {}

function Footer() {}

export default App;
