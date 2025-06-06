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
  const [averageGrade, setAverageGrade] = useState(null);
  const [prelimsGrade, setPrelimsGrade] = useState(null);
  const [midtermsGrade, setMidtermsGrade] = useState(null);
  const [prefinalsGrade, setPrefinalsGrade] = useState(null);
  const [finalsGrade, setFinalsGrade] = useState(null);

  function calculateAverageGrade() {
    if (!prelimsGrade || !midtermsGrade || !prefinalsGrade || !finalsGrade) {
      // show modal
      return;
    }

    const calculatedAverageGrade =
      prelimsGrade * 0.2 +
      midtermsGrade * 0.2 +
      prefinalsGrade * 0.2 +
      finalsGrade * 0.4;
    setAverageGrade(calculatedAverageGrade.toFixed(2));
  }

  return (
    <Card className="shadow-sm mb-4 full-width">
      <Card.Header as="h5">Enter Your Grades</Card.Header>
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
        {averageGrade !== null && SubjectAverageResult(averageGrade)}
      </Card.Body>
    </Card>
  );
}

function SubjectAverageResult({ averageGradeResult }) {
  return <p>{averageGradeResult}</p>;
}

function GradeTable() {
  return (
    <Accordion className="mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Grade Conversion Table</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Grade Range</th>
                <th>GWA</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>97.50 - 100.00</td>
                <td>1.00</td>
                <td>Excellent</td>
              </tr>
              <tr>
                <td>94.50 - 97.49</td>
                <td>1.25</td>
                <td>Very Good</td>
              </tr>
              <tr>
                <td>91.50 - 94.49</td>
                <td>1.50</td>
                <td>Very Good</td>
              </tr>
              <tr>
                <td>88.50 - 91.49</td>
                <td>1.50</td>
                <td>Very Good</td>
              </tr>
              <tr>
                <td>85.50 - 88.49</td>
                <td>2.00</td>
                <td>Satisfactory</td>
              </tr>
              <tr>
                <td>81.50 - 85.49</td>
                <td>2.25</td>
                <td>Satisfactory</td>
              </tr>
              <tr>
                <td>77.50 - 81.49</td>
                <td>2.50</td>
                <td>Satisfactory</td>
              </tr>
              <tr>
                <td>73.50 - 77.49</td>
                <td>2.75</td>
                <td>Fair</td>
              </tr>
              <tr>
                <td>69.50 - 73.49</td>
                <td>3.00</td>
                <td>Fair</td>
              </tr>
              <tr>
                <td>69.40 and below</td>
                <td>2.75</td>
                <td>Failed</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function Footer() {}

export default App;
