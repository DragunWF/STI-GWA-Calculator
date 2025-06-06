import FloatingAcademicElements from "./components/FloatingAcademicElements";
import Header from "./components/Header";
import SubjectAverageCalculator from "./components/SubjectAverageCalculator";
import GradeTable from "./components/GradeTable";
import Footer from "./components/Footer";

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

export default App;
