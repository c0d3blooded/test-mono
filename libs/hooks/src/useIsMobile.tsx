import { useMediaQuery } from '@react-hook/media-query';
/**
 * @returns custom hook to check if the screen is in mobile view
 */
export default function useIsMobile() {
  return !useMediaQuery('only screen and (min-width: 768px)');
}
