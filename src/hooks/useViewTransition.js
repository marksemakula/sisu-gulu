import { useNavigate } from 'react-router-dom';

export const useViewTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = (path, viewTransitionName) => {
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transitions API
      navigate(path);
      return;
    }

    document.startViewTransition(() => {
      navigate(path);
    });
  };

  return { navigateWithTransition };
};
