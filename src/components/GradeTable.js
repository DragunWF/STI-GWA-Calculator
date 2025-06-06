import { useState } from "react";

function GradeTable() {
  const [isOpen, setIsOpen] = useState(true);

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
                    color: "premium",
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
                          row.color === "premium"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : row.color === "green"
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

export default GradeTable;
