import { useMediaQuery } from 'react-responsive'

function useIsMobile() {
  return useMediaQuery({ query: '(max-width: 640px)' });
}

export default useIsMobile;
