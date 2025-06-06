import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <FloatingAcademicElements />
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Header />
          <SubjectAverageCalculator />
          <GradeTable />
          <Footer />
        </div>
      </div>
    </div>
  );
}

function FloatingAcademicElements() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const symbols = [
      "%",
      "+",
      "=",
      "A",
      "B",
      "C",
      "1.0",
      "2.0",
      "3.0",
      "∑",
      "∆",
      "∞",
      "±",
      "√",
      "∫",
      "÷",
      "×",
      "π",
    ];
    const initialElements = [];

    // Create 25 floating elements
    for (let i = 0; i < 25; i++) {
      initialElements.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    setElements(initialElements);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute text-blue-400 font-bold select-none animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`,
            transform: `translateX(${element.direction * 20}px)`,
          }}
        >
          {element.symbol}
        </div>
      ))}

      {/* Additional floating graduation caps */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`cap-${i}`}
          className="absolute text-indigo-300 animate-bounce-slow"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            fontSize: "24px",
            opacity: 0.2,
            animationDuration: `${3 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          🎓
        </div>
      ))}

      {/* Floating books */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`book-${i}`}
          className="absolute text-green-300 animate-pulse"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            fontSize: "20px",
            opacity: 0.15,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          📚
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          50% {
            transform: translateY(-5px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
        STI College GWA Calculator
      </h1>
      <p className="text-gray-600">Calculate your General Weighted Average</p>
    </div>
  );
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
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={prelimsGrade}
              onChange={(e) => setPrelimsGrade(e.target.value)}
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Midterms (20%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={midtermsGrade}
              onChange={(e) => setMidtermsGrade(e.target.value)}
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pre-Finals (20%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={prefinalsGrade}
              onChange={(e) => setPrefinalsGrade(e.target.value)}
              placeholder="Enter grade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Finals (40%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={finalsGrade}
              onChange={(e) => setFinalsGrade(e.target.value)}
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

function SubjectAverageResult({ averageGrade }) {
  const getGradeInfo = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 97.5)
      return { gwa: "1.00", remark: "Excellent", color: "green" };
    if (numGrade >= 94.5)
      return { gwa: "1.25", remark: "Very Good", color: "green" };
    if (numGrade >= 91.5)
      return { gwa: "1.50", remark: "Very Good", color: "green" };
    if (numGrade >= 88.5)
      return { gwa: "1.75", remark: "Very Good", color: "green" };
    if (numGrade >= 85.5)
      return { gwa: "2.00", remark: "Satisfactory", color: "blue" };
    if (numGrade >= 81.5)
      return { gwa: "2.25", remark: "Satisfactory", color: "blue" };
    if (numGrade >= 77.5)
      return { gwa: "2.50", remark: "Satisfactory", color: "blue" };
    if (numGrade >= 73.5)
      return { gwa: "2.75", remark: "Fair", color: "yellow" };
    if (numGrade >= 69.5)
      return { gwa: "3.00", remark: "Fair", color: "yellow" };
    return { gwa: "5.00", remark: "Failed", color: "red" };
  };

  const gradeInfo = getGradeInfo(averageGrade);

  const colorClasses = {
    green: "bg-green-50 border-green-200 text-green-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div
      className={`mt-6 p-4 rounded-lg border-2 ${
        colorClasses[gradeInfo.color]
      } bg-opacity-90 backdrop-blur-sm animate-fade-in`}
    >
      <h3 className="text-lg font-semibold mb-3">Your Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium opacity-75">Average Grade</p>
          <p className="text-2xl font-bold">{averageGrade}%</p>
        </div>
        <div>
          <p className="text-sm font-medium opacity-75">GWA</p>
          <p className="text-2xl font-bold">{gradeInfo.gwa}</p>
        </div>
        <div>
          <p className="text-sm font-medium opacity-75">Remark</p>
          <p className="text-2xl font-bold">{gradeInfo.remark}</p>
        </div>
      </div>
    </div>
  );
}

function ValidationModal({ show, title, message, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl max-w-md w-full mx-auto transform transition-all animate-scale-in">
        <div className="p-6 bg-red-50 border-b border-red-200 rounded-t-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <h3 className="text-lg font-semibold text-red-800">{title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">{message}</p>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradeTable() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl mb-8 border border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left font-semibold text-gray-800 hover:bg-white/50 transition-colors duration-200 flex justify-between items-center rounded-t-lg"
      >
        <span>Grade Conversion Table</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="p-4 border-t animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">
                    Grade Range
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">
                    GWA
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    range: "97.50 - 100.00",
                    gwa: "1.00",
                    remark: "Excellent",
                    color: "green",
                  },
                  {
                    range: "94.50 - 97.49",
                    gwa: "1.25",
                    remark: "Very Good",
                    color: "green",
                  },
                  {
                    range: "91.50 - 94.49",
                    gwa: "1.50",
                    remark: "Very Good",
                    color: "green",
                  },
                  {
                    range: "88.50 - 91.49",
                    gwa: "1.75",
                    remark: "Very Good",
                    color: "green",
                  },
                  {
                    range: "85.50 - 88.49",
                    gwa: "2.00",
                    remark: "Satisfactory",
                    color: "blue",
                  },
                  {
                    range: "81.50 - 85.49",
                    gwa: "2.25",
                    remark: "Satisfactory",
                    color: "blue",
                  },
                  {
                    range: "77.50 - 81.49",
                    gwa: "2.50",
                    remark: "Satisfactory",
                    color: "blue",
                  },
                  {
                    range: "73.50 - 77.49",
                    gwa: "2.75",
                    remark: "Fair",
                    color: "yellow",
                  },
                  {
                    range: "69.50 - 73.49",
                    gwa: "3.00",
                    remark: "Fair",
                    color: "yellow",
                  },
                  {
                    range: "69.40 and below",
                    gwa: "5.00",
                    remark: "Failed",
                    color: "red",
                  },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.range}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {row.gwa}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.color === "green"
                            ? "bg-green-100 text-green-800"
                            : row.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : row.color === "yellow"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.remark}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-center text-gray-600 py-4">
      <small className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        This was developed by Marc Plarisan from the College Student Government
        of STI Ortigas-Cainta © 2024-2025
      </small>
    </footer>
  );
}

export default App;
