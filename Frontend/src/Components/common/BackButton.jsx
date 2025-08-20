import { useNavigation } from '../../contexts/NavigationContext';

const BackButton = ({ className = '', children = '← Back' }) => {
  const { goBack, canGoBack } = useNavigation();

  if (!canGoBack()) {
    return null;
  }

  return (
    <button
      onClick={goBack}
      className={`inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default BackButton;
