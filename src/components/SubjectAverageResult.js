function SubjectAverageResult({ averageGrade }) {
  const getGradeInfo = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 97.5)
      return { gwa: "1.00", remark: "Excellent", color: "premium" };
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
