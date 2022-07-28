export const isValidCoordinate = (coordinate: number) =>
  coordinate <= 180 && coordinate >= -180;
