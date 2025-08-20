import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ message, type = "info", isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "border-green-500/40 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]";
      case "error":
        return "border-red-500/40 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]";
      case "warning":
        return "border-yellow-500/40 text-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]";
      default:
        return "border-blue-500/40 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
      case "error":
        return <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
      case "warning":
        return <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>;
      default:
        return <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          {/* Popup */}
          <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className={`relative border rounded-2xl px-6 py-5 max-w-sm mx-4
    bg-slate-900/80 backdrop-blur-md text-white ${getTypeStyles()}`}
>
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0">{getIcon()}</div>
    <div className="flex-1">
      <div className="text-lg font-bold mb-1">
        {type === "success" && "Success"}
        {type === "error" && "Error"}
        {type === "warning" && "Warning"}
        {type === "info" && "Information"}
      </div>
      <p className="text-sm text-gray-200">{message}</p>
    </div>
  </div>

  {/* Close button */}
  <button
    onClick={onClose}
    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
