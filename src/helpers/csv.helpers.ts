// import { createObjectCsvWriter } from 'csv-writer'
import { promises as fsPromises } from 'fs'
import util from 'util'

// return the number of lines in a file
const exec = util.promisify(require('child_process').exec)

export const fileLineCount = async ({ fileLocation }: { fileLocation: string }) => {
  const { stdout } = await exec(`cat ${fileLocation} | wc -l`)
  return parseInt(stdout)
}
// returns the the item in the array that occurs the most
export const getElementWithHighestOccurence = (arr: any[]) => {
  console.log(arr)
  return arr
    .sort(
      (a: any, b: any) =>
        arr.filter((v: any) => v === a).length - arr.filter((v: any): any => v === b).length
    )
    .pop()
}
// returns true if the rows is in limit specified
export const isWithinLimit = (lineCount: number): boolean => {
  return lineCount >= 1 && lineCount <= 10000
}
// returns best selling brand
export const getBestSellingBrand = (
  results: any[]
): {
  category: any
  brand: string
} => {
  return results.reduce((acc, cur) => {
    const { name } = cur
    let arr = [cur.brand]
    acc[name] = [...(acc[name] || []), ...arr]
    return acc
  }, {})
}
// returns the average quantity of each category
export const getAverageQuantity = (
  results: any[]
): {
  category: any
  average: number
} => {
  return results.reduce((acc: any, cur: any) => {
    const { name, quantity } = cur
    let category = name
    let totalQuantity = Number(quantity)
    if (!acc.hasOwnProperty(name)) {
      acc[name] = 0
    }
    acc[category] += totalQuantity
    return acc
  }, {})
}
// returns a boolean in which the file path exists or not
const fileExists = async (filePath: string): Promise<boolean> =>
  !!(await fsPromises.stat(filePath).catch(() => false))
