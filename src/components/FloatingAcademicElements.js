import { useState, useEffect } from "react";

function FloatingAcademicElements() {
  const floatingElementCount = 75;
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

    for (let i = 0; i < floatingElementCount; i++) {
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

export default FloatingAcademicElements;
