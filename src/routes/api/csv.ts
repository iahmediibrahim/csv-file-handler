import { parse } from 'csv-parse'
import { stringify } from 'csv-stringify'
// import { createObjectCsvWriter } from 'csv-writer'
import express, { NextFunction, Request, Response } from 'express'
import fs, { promises as fsPromises } from 'fs'
import util from 'util'

import ApiError from '../../middleware/ApiError'

// csv Router
const csvRouter = express.Router()

// returns a boolean in which the file path exists or not
const fileExists = async (filePath: string): Promise<boolean> =>
  !!(await fsPromises.stat(filePath).catch(() => false))
type CsvRow = {
  [key: string]: string
  area: string
  name: string
  quantity: string
  brand: string
}
type OutPutData = {
  name: string
  noOfPairs: number
  quantity: string
  category: string
}
const inputData: CsvRow[] = [
  {
    id: 'ID1',
    area: 'Minneapolis',
    name: 'shoes',
    quantity: '2',
    brand: 'Air'
  },
  {
    id: 'ID2',
    area: 'Chicago',
    name: 'shoes',
    quantity: '1',
    brand: 'Air'
  },
  {
    id: 'ID3',
    area: 'Central Department Store',
    name: 'shoes',
    quantity: '5',
    brand: 'BonPied'
  },
  {
    id: 'ID4',
    area: 'Quail Hollow',
    name: 'forks',
    quantity: '3',
    brand: 'Pfitzcraft'
  }
]
stringify(
  inputData,
  {
    header: true
  },
  function (err, output) {
    fs.createWriteStream(__dirname + '../../../csvFiles/input-test.csv').write(output)
  }
)
const parser = parse(
  {
    columns: true
  },
  function (err, records) {
    // console.log(records)
  }
)
const exec = util.promisify(require('child_process').exec)

async function fileLineCount({ fileLocation }: { fileLocation: string }) {
  const { stdout } = await exec(`cat ${fileLocation} | wc -l`)
  return parseInt(stdout)
}

csvRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const results: any[] = []

  const lineCount = await fileLineCount({
    fileLocation: __dirname + '../../../csvFiles/input-test.csv'
  })
  fs.createReadStream(__dirname + '../../../csvFiles/input-test.csv')
    .pipe(parser)
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const uTable1 = results.reduce((acc, cur) => {
        const { name } = cur
        let arr = [cur.brand]
        acc[name] = [...(acc[name] || []), ...arr]
        return acc
      }, {})
      const count = (names: any) =>
        names.reduce(
          (result: any, value: any) => ({ ...result, [value]: (result[value] || 0) + 1 }),
          {}
        ) // don't forget to initialize the accumulator
      const duplicates = (dict: any) => Object.keys(dict).filter((a) => dict[a] >= 1)
      function mode(arr: any) {
        return arr
          .sort(
            (a: any, b: any) =>
              arr.filter((v: any) => v === a).length - arr.filter((v: any): any => v === b).length
          )
          .pop()
      }
      // const outputDataArray: any = Object.values(uTable1)
      // const lookup = outputDataArray.reduce((a: any, e: any) => {
      //   a[e.brand] = ++a[e.brand] || 0
      //   return a
      // }, {})
      // console.log(
      //   'dasdasdsd',
      //   outputDataArray.filter((e: any) => lookup[e.brand])
      // )
      // const outPut2 = Object.keys(uTable1).map((key) => ({
      //   category: key,
      //   average: uTable1[key].reduce((acc: any, cur: any) => {
      //     acc[ cur.brand ] = (acc[ cur.brand ] || 0) + cur.noOfOrders
      //     if (acc[ cur.brand ] > acc.max) {
      //     }
      //     return acc
      //   }, {})
      // }))

      // console.log(outPut2)
      // const filterData = results.filter((item) =>  )

      // const outputData = results.reduce((acc: any, cur: any) => {
      //   const { name, quantity, brand } = cur
      //   if (!acc.hasOwnProperty(name)) {
      //     acc[name] = ''
      //   }
      //   let noOfOrders = (acc[brand] || 0) + 1
      //   acc[brand] = noOfOrders
      //   acc[name] += brand
      //   return acc
      // }, {})
      // const outputDataArray = Object.values(outputData)
      // console.log('outputDataArray', outputDataArray)
      // const uniqueCatList = [
      //   ...new Set(outputDataArray.map(({ category }: OutPutData) => category))
      // ]
      // console.log('uniqueCatList', uniqueCatList)
      const newObjectsMerged = results.reduce((acc: any, cur: any) => {
        const { name, quantity } = cur

        let category = name
        let totalQuantity = Number(quantity)
        if (!acc.hasOwnProperty(name)) {
          acc[name] = 0
        }
        acc[category] += totalQuantity
        return acc
      }, {})
      console.log('newObjectsMerged', newObjectsMerged)
      console.log('newObjectsMerged', Object.values(uTable1))
      const outPut1 = Object.keys(newObjectsMerged).map((key) => ({
        category: key,
        average: newObjectsMerged[key] / (lineCount - 1)
      }))
      console.log('outPut1', outPut1)

      const outPut2 = Object.keys(uTable1).map((key) => ({
        category: key,
        brand: mode(Object.values(uTable1[key]))
      }))
      console.log('outPut2', outPut2)
      stringify(
        outPut1,
        {
          header: true
        },
        function (err, output) {
          fs.createWriteStream(__dirname + '../../../csvFiles/input-test-v.csv').write(output)
        }
      )
      // const data = uniqueCatList.forEach((cat) => {
      //   const catData = outputDataArray.filter(({ category }: OutPutData) => category === cat)
      //   // const catData = outputDataArray.reduce(
      //   //   (acc: any, { category, quantity, noOfPairs }: OutPutData) => {
      //   //     if (category === cat) {
      //   //       acc[quantity] = (acc[quantity] || 0) + quantity
      //   //     }
      //   //     return acc
      //   //   }
      //   // )
      //   console.log('catData', catData)
      //   // and no of pairs of the name
      //   // create a function to check if the category is the same and return the total quantity
      //   // const categoryArray = array.filter((item) => {
      //   //   const { category: itemCategory, noOfPairs: pairs } = item as OutPutData
      //   //   return itemCategory === category && pairs > noOfPairs
      //   // })
      //   // console.log('uniqueCatList', uniqueCatList)
      // })
    })
  if (lineCount >= 1 && lineCount <= 10000) {
  } else {
    next(ApiError.internal('number of rows of data must be between 1 and 10000'))
  }
  try {
    // // check if the thumbnails directory exist ( if not fs will create it )
    // await fsPromises.mkdir(imageThumbnailPath, { recursive: true })
    // // check if the image thumbnail already exists using the fs
    // const isFileExist = await fileExists(thumbnailImage)
    // if (isFileExist) {
    //   // Thumbnail image is there ( no need to create it )
    //   console.log('image already exist')
    //   res.render('index', { title: 'Image Already exists', image: imageToRender })
    // } else {
    //   // Thumbnail image isn't there ( we have to create it )
    //   // resize image using sharp
    //   await resizeImage(
    //     parseInt(width as string, 10),
    //     parseInt(height as string, 10),
    //     filename as string
    //   )
    //   res.render('index', { title: 'Hoooooray! a new image created.', image: imageToRender })
    // }
  } catch (error: unknown) {
    if (typeof error === 'string') {
      next(ApiError.internal(error))
    } else if (error instanceof Error) {
      next(ApiError.internal(error.message))
    }
  }
})
// curl localhost:3000/
export default csvRouter
