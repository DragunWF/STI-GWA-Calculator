import GRADES from "../constants/grades";

function SubjectAverageResult({ averageGrade }) {
  const getGradeInfo = (grade) => {
    const numGrade = parseFloat(grade);
    const gradeInfo = GRADES.find(
      (g) => numGrade >= g.range[0] && numGrade <= g.range[1]
    );
    return gradeInfo || GRADES[GRADES.length - 1]; // Default to failed if not found
  };

  const gradeInfo = getGradeInfo(averageGrade);

  const colorClasses = {
    premium: "bg-emerald-100 text-emerald-800 border border-emerald-200",
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

export default SubjectAverageResult;
