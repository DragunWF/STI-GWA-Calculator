function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-slate-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center space-y-4">
          {/* Main content */}
          <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/50 inline-block">
            <p className="text-gray-700 leading-relaxed">
              Developed with{" "}
              <span className="text-red-500 animate-pulse">❤️</span> by{" "}
              <a
                href="https://www.linkedin.com/in/marc-plarisan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-blue-800"
              >
                Marc Plarisan
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              College Student Government of STI Ortigas-Cainta
            </p>
          </div>

          <div className="text-sm text-gray-500">© 2024-2025 • DragunWF</div>
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
      <div className="absolute top-2 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-50"></div>
    </footer>
  );
}

export default Footer;
