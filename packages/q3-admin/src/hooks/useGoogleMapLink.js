import { printValues } from './usePositionStack';

const useGoogleMapLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    printValues(address),
  )}`;

export default useGoogleMapLink;
