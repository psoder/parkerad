export const isValidCoordinate = (coordinate: number | string) => {
  return +coordinate <= 180 && +coordinate >= -180;
};
