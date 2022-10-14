import * as dotenv from 'dotenv'
dotenv.config()

// returns true if the rows is in limit specified
export const isWithinLimit = (lineCount: number): boolean => {
  return (
    lineCount >= Number(process.env.MIN_CSV_LINE_COUNT || 1) &&
    lineCount <= Number(process.env.MAX_CSV_LINE_COUNT || 10000)
  )
}
