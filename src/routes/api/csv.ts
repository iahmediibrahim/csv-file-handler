import express, { NextFunction, Request, Response } from 'express'
import { createCSVFile } from '../../controllers/csv.controller'
import { processCSVData } from './../../controllers/csv.controller'

import { fileLineCount } from '../../csvFileOperations/csvFileOperations'
import ApiError from '../../middleware/ApiError'
import { isWithinLimit } from '../../validators/validators'
import { sampleOne, sampleTwo } from './types'

// csv Router
const csvRouter = express.Router()

createCSVFile([
  {
    data: sampleOne,
    fileName: `sampleOne`
  },
  {
    data: sampleTwo,
    fileName: `sampleTwo`
  }
])
csvRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const sampleOneLineCount = await fileLineCount({
    fileLocation: __dirname + '../../../csvFiles/sampleOne.csv'
  })
  const sampleTwoLineCount = await fileLineCount({
    fileLocation: __dirname + '../../../csvFiles/sampleTwo.csv'
  })
  let files = [
    {
      fileName: 'sampleOne',
      lineCount: sampleOneLineCount
    },
    {
      fileName: 'sampleTwo',
      lineCount: sampleTwoLineCount
    }
  ]

  try {
    files.forEach(async (file) => {
      if (isWithinLimit(file.lineCount - 1)) {
        await processCSVData(file.fileName, file.lineCount)
      } else {
        throw new ApiError(400, 'File is not within limit')
      }
    })
    res.status(200).json({
      message: 'success'
    })
  } catch (error: unknown) {
    if (typeof error === 'string') {
      next(ApiError.internal(error))
    } else if (error instanceof Error) {
      next(ApiError.internal(error.message))
    }
  }
})
// curl localhost:3000/api/csv/
export default csvRouter
