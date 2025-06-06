import { useState } from "react";
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
  Modal,
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
  const [prelimsGrade, setPrelimsGrade] = useState("");
  const [midtermsGrade, setMidtermsGrade] = useState("");
  const [prefinalsGrade, setPrefinalsGrade] = useState("");
  const [finalsGrade, setFinalsGrade] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  function validateInputs() {
    const grades = [prelimsGrade, midtermsGrade, prefinalsGrade, finalsGrade];
    const gradeNames = ["Prelims", "Midterms", "Pre-Finals", "Finals"];

    // Check for empty fields
    for (let i = 0; i < grades.length; i++) {
      if (!grades[i] || grades[i] === "") {
        setModalContent({
          title: "Missing Grade",
          message: `Please enter your ${gradeNames[i]} grade before calculating.`,
        });
        setShowModal(true);
        return false;
      }
    }

    // Check for invalid ranges
    for (let i = 0; i < grades.length; i++) {
      const grade = parseFloat(grades[i]);
      if (isNaN(grade) || grade < 0 || grade > 100) {
        setModalContent({
          title: "Invalid Grade",
          message: `${gradeNames[i]} grade must be a number between 0 and 100.`,
        });
        setShowModal(true);
        return false;
      }
    }

    return true;
  }

  function calculateAverageGrade() {
    if (!validateInputs()) {
      return;
    }

    const calculatedAverageGrade =
      parseFloat(prelimsGrade) * 0.2 +
      parseFloat(midtermsGrade) * 0.2 +
      parseFloat(prefinalsGrade) * 0.2 +
      parseFloat(finalsGrade) * 0.4;

    setAverageGrade(calculatedAverageGrade.toFixed(2));
  }

  function clearGrades() {
    setPrelimsGrade("");
    setMidtermsGrade("");
    setPrefinalsGrade("");
    setFinalsGrade("");
    setAverageGrade(null);
  }

  return (
    <>
      <Card className="shadow-sm mb-4">
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
                  step="0.01"
                  value={prelimsGrade}
                  onChange={(e) => setPrelimsGrade(e.target.value)}
                  placeholder="Enter grade"
                />
              </Col>
              <Col md={3}>
                <Form.Label>Midterms (20%)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={midtermsGrade}
                  onChange={(e) => setMidtermsGrade(e.target.value)}
                  placeholder="Enter grade"
                />
              </Col>
              <Col md={3}>
                <Form.Label>Pre-Finals (20%)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={prefinalsGrade}
                  onChange={(e) => setPrefinalsGrade(e.target.value)}
                  placeholder="Enter grade"
                />
              </Col>
              <Col md={3}>
                <Form.Label>Finals (40%)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={finalsGrade}
                  onChange={(e) => setFinalsGrade(e.target.value)}
                  placeholder="Enter grade"
                />
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={calculateAverageGrade}>
                Calculate Average GWA
              </Button>
              <Button variant="outline-secondary" onClick={clearGrades}>
                Clear All
              </Button>
            </div>
          </Form>
          {averageGrade !== null && (
            <SubjectAverageResult averageGrade={averageGrade} />
          )}
        </Card.Body>
      </Card>

      <ValidationModal
        show={showModal}
        title={modalContent.title}
        message={modalContent.message}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

function SubjectAverageResult({ averageGrade }) {
  const getGradeInfo = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 97.5)
      return { gwa: "1.00", remark: "Excellent", variant: "success" };
    if (numGrade >= 94.5)
      return { gwa: "1.25", remark: "Very Good", variant: "success" };
    if (numGrade >= 91.5)
      return { gwa: "1.50", remark: "Very Good", variant: "success" };
    if (numGrade >= 88.5)
      return { gwa: "1.75", remark: "Very Good", variant: "success" };
    if (numGrade >= 85.5)
      return { gwa: "2.00", remark: "Satisfactory", variant: "info" };
    if (numGrade >= 81.5)
      return { gwa: "2.25", remark: "Satisfactory", variant: "info" };
    if (numGrade >= 77.5)
      return { gwa: "2.50", remark: "Satisfactory", variant: "info" };
    if (numGrade >= 73.5)
      return { gwa: "2.75", remark: "Fair", variant: "warning" };
    if (numGrade >= 69.5)
      return { gwa: "3.00", remark: "Fair", variant: "warning" };
    return { gwa: "5.00", remark: "Failed", variant: "danger" };
  };

  const gradeInfo = getGradeInfo(averageGrade);

  return (
    <Alert variant={gradeInfo.variant} className="mt-3">
      <Alert.Heading>Your Results</Alert.Heading>
      <p className="mb-2">
        <strong>Average Grade:</strong> {averageGrade}%
      </p>
      <p className="mb-2">
        <strong>GWA:</strong> {gradeInfo.gwa}
      </p>
      <p className="mb-0">
        <strong>Remark:</strong> {gradeInfo.remark}
      </p>
    </Alert>
  );
}

function ValidationModal({ show, title, message, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function GradeTable() {
  return (
    <Accordion className="mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Grade Conversion Table</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
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
                <td>
                  <span className="badge bg-success">Excellent</span>
                </td>
              </tr>
              <tr>
                <td>94.50 - 97.49</td>
                <td>1.25</td>
                <td>
                  <span className="badge bg-success">Very Good</span>
                </td>
              </tr>
              <tr>
                <td>91.50 - 94.49</td>
                <td>1.50</td>
                <td>
                  <span className="badge bg-success">Very Good</span>
                </td>
              </tr>
              <tr>
                <td>88.50 - 91.49</td>
                <td>1.75</td>
                <td>
                  <span className="badge bg-success">Very Good</span>
                </td>
              </tr>
              <tr>
                <td>85.50 - 88.49</td>
                <td>2.00</td>
                <td>
                  <span className="badge bg-info">Satisfactory</span>
                </td>
              </tr>
              <tr>
                <td>81.50 - 85.49</td>
                <td>2.25</td>
                <td>
                  <span className="badge bg-info">Satisfactory</span>
                </td>
              </tr>
              <tr>
                <td>77.50 - 81.49</td>
                <td>2.50</td>
                <td>
                  <span className="badge bg-info">Satisfactory</span>
                </td>
              </tr>
              <tr>
                <td>73.50 - 77.49</td>
                <td>2.75</td>
                <td>
                  <span className="badge bg-warning">Fair</span>
                </td>
              </tr>
              <tr>
                <td>69.50 - 73.49</td>
                <td>3.00</td>
                <td>
                  <span className="badge bg-warning">Fair</span>
                </td>
              </tr>
              <tr>
                <td>69.40 and below</td>
                <td>5.00</td>
                <td>
                  <span className="badge bg-danger">Failed</span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function Footer() {
  return (
    <footer className="text-center text-muted py-3">
      <small>
        This was developed by Marc Plarisan from the College Student Government
        of STI Ortigas-Cainta © 2024-2025
      </small>
    </footer>
  );
}

export default App;
