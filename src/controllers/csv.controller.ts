import { parse } from 'csv-parse'
import { stringify } from 'csv-stringify'
import fs from 'fs'
import {
  getAverageQuantity,
  getBestSellingBrand,
  getElementWithHighestOccurence
} from '../helpers/csv.helpers'
const parser = parse(
  {
    columns: true
  },
  function (err, records) {
    console.log(records)
  }
)
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
        const bestSellingBrand: {
          category: any
          brand: string
        } = getBestSellingBrand(results)
        const averageQuantity: {
          category: any
          average: number
        } = getAverageQuantity(results)
        const outPut1 = Object.keys(averageQuantity).map((key) => ({
          category: key,
          average: averageQuantity[key as keyof typeof averageQuantity] / (lineCount - 1)
        }))
        const outPut2 = Object.keys(bestSellingBrand).map((key) => ({
          category: key,
          brand: getElementWithHighestOccurence(
            Object.values(bestSellingBrand[key as keyof typeof bestSellingBrand])
          )
        }))
        console.log(outPut2)
        await createCSVFile([
          {
            data: outPut1,
            fileName: `0_${fileName}`
          },
          {
            data: outPut2,
            fileName: `1_${fileName}`
          }
        ])
        readStream.end()
      })
  } catch (error) {
    throw new Error('Error occurred while processing data')
  }
}
