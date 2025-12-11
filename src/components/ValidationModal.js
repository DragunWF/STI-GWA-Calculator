function ValidationModal({ show, title, message, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl max-w-md w-full mx-auto transform transition-all modal-content">
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

export default ValidationModal;
