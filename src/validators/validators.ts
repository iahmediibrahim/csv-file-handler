// returns true if the rows is in limit specified
export const isWithinLimit = (lineCount: number): boolean => {
  return lineCount >= 1 && lineCount <= 10000
}
