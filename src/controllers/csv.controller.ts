import { parse } from 'csv-parse'
import { stringify } from 'csv-stringify'
import fs from 'fs'
import { getBrandsForEachCategory } from '../businessLogic/brandsBusinessLogic'
import { getQuantityForEachCategory } from '../businessLogic/categoryBusinessLogic'
import {
  getElementsWithAverage,
  getElementsWithHighestOccuerence
} from '../csvFileOperations/csvFileOperations'
import { AverageQuantity, MostSellingBrand, Quantity } from '../routes/api/types'
import { CategoryWithBrands } from './../routes/api/types'

export const createCSVFile = async (
  files: {
    data: any
    fileName: string
  }[]
) => {
  files.forEach((file) => {
    stringify(
      file.data,
      {
        header: true
      },
      function (err, output) {
        fs.createWriteStream(__dirname + `./../csvFiles/${file.fileName}.csv`).write(output)
      }
    )
  })
}
export const processCSVData = async (fileName: string, lineCount: number): Promise<void> => {
  const results: any[] = []
  try {
    const readStream = fs
      .createReadStream(__dirname + `./../csvFiles/${fileName}.csv`)
      .pipe(
        parse({
          columns: true
        })
      )
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const quantity: Quantity = getQuantityForEachCategory(results)
        const categoryWithBrands: CategoryWithBrands = getBrandsForEachCategory(results)
        const elementsWithAverage: AverageQuantity[] = getElementsWithAverage(quantity, lineCount)
        const elementsWithHighestOccuerence: MostSellingBrand[] =
          getElementsWithHighestOccuerence(categoryWithBrands)
        await createCSVFile([
          {
            data: elementsWithAverage,
            fileName: `0_${fileName}`
          },
          {
            data: elementsWithHighestOccuerence,
            fileName: `1_${fileName}`
          }
        ])
        readStream.end()
      })
  } catch (error) {
    throw new Error('Error occurred while processing data')
  }
}
