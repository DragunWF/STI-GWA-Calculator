import { useState } from "react";
import SubjectAverageResult from "./SubjectAverageResult";
import ValidationModal from "./ValidationModal";

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

  function handleGradeInput(value) {
    // Allow empty string for clearing the field
    if (value === "") {
      return "";
    }

    // Only allow numbers and one decimal point
    const numericValue = value.replace(/[^\d.]/g, "");

    // Prevent multiple decimal points
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      return parts[0] + "." + parts[1];
    }

    // Convert to number and check range
    const numberValue = parseFloat(numericValue);
    if (isNaN(numberValue)) {
      return "";
    }

    // Restrict to 0-100 range
    if (numberValue > 100) {
      return "100";
    }

    return numericValue;
  }

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8 border border-white/20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Enter Your Grades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prelims (20%)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={prelimsGrade}
              onChange={(e) =>
                setPrelimsGrade(handleGradeInput(e.target.value))
              }
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Midterms (20%)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={midtermsGrade}
              onChange={(e) =>
                setMidtermsGrade(handleGradeInput(e.target.value))
              }
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pre-Finals (20%)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={prefinalsGrade}
              onChange={(e) =>
                setPrefinalsGrade(handleGradeInput(e.target.value))
              }
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Finals (40%)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={finalsGrade}
              onChange={(e) => setFinalsGrade(handleGradeInput(e.target.value))}
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculateAverageGrade}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Calculate Average GWA
          </button>
          <button
            onClick={clearGrades}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Clear All
          </button>
        </div>

        {averageGrade !== null && (
          <SubjectAverageResult averageGrade={averageGrade} />
        )}
      </div>

      <ValidationModal
        show={showModal}
        title={modalContent.title}
        message={modalContent.message}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default SubjectAverageCalculator;
