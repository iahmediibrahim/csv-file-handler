import util from 'util'
import { getElementWithHighestOccurence } from '../businessLogic/brandsBusinessLogic'
import { CategoryWithBrands, Quantity } from '../routes/api/types'
import { AverageQuantity } from './../routes/api/types'

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key]

// return the number of lines in a file
const exec = util.promisify(require('child_process').exec)

export const fileLineCount = async ({ fileLocation }: { fileLocation: string }) => {
  const { stdout } = await exec(`cat ${fileLocation} | wc -l`)
  return parseInt(stdout)
}

export const getElementsWithAverage = (quantity: Quantity, lineCount: number) => {
  return Object.keys(quantity).map(
    (key: keyof Quantity): AverageQuantity => ({
      category: key,
      average: getKeyValue<keyof Quantity, Quantity>(key)(quantity) / (lineCount - 1)
    })
  )
}
//
export const getElementsWithHighestOccuerence = (categoryWithBrandArray: CategoryWithBrands) => {
  return Object.keys(categoryWithBrandArray).map((key: string) => ({
    category: key,
    brand: getElementWithHighestOccurence(
      Object.values(categoryWithBrandArray[key as keyof CategoryWithBrands])
    )
  }))
}
