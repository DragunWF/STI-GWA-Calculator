import { useState } from "react";
import GRADES from "../constants/grades";

function GradeTable() {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 400);
    } else {
      setIsOpen(true);
    }
  };

  const formatGradeRange = (index) => {
    const grade = GRADES[index];
    const isLast = index === GRADES.length - 1;

    if (isLast) {
      return `${grade.range[1].toFixed(2)} and below`;
    }

    return `${grade.range[0].toFixed(2)} - ${grade.range[1].toFixed(2)}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl mb-8 border border-white/20">
      <button
        onClick={handleToggle}
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
        <div
          className={`p-4 border-t ${
            isClosing ? "grade-table-closed" : "grade-table-open"
          }`}
        >
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
                {GRADES.map((grade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {formatGradeRange(index)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {grade.gwa}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          grade.color === "premium"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : grade.color === "green"
                            ? "bg-green-100 text-green-800"
                            : grade.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : grade.color === "yellow"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {grade.remark}
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

export default GradeTable;
