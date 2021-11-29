import { useMediaQuery } from 'react-responsive'

function useIsMobile() {
  return useMediaQuery({ query: '(max-width: 768px)' });
}

export default useIsMobile;
