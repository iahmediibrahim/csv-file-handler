import fs from 'fs'
import path from 'path'
import supertest from 'supertest'
import app from '../../..'
import {
  getBrandsForEachCategory,
  getElementWithHighestOccurence
} from '../../../businessLogic/brandsBusinessLogic'
import { getQuantityForEachCategory } from '../../../businessLogic/categoryBusinessLogic'
import { createCSVFile } from '../../../controllers/csv.controller'
import { fileLineCount } from '../../../csvFileOperations/csvFileOperations'
import { Quantity, sampleTwo } from '../../../routes/api/types'
import { processCSVData } from './../../../controllers/csv.controller'
import { CategoryWithBrands, sampleOne } from './../../../routes/api/types'
const request = supertest(app)
describe('Test business functionalitiy', () => {
  it('Shoud create csv files.', () => {
    expect(
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
    ).toBeTruthy()
  })
  it('Shoud Process csv files and create output files.', async () => {
    const sampleOneLineCount = await fileLineCount({
      fileLocation: path.resolve(__dirname, '../../../csvFiles/sampleOne.csv')
    })
    const sampleTwoLineCount = await fileLineCount({
      fileLocation: path.resolve(__dirname, '../../../csvFiles/sampleTwo.csv')
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
    expect(
      files.forEach(async (file: { fileName: string; lineCount: number }): Promise<void> => {
        await processCSVData(file.fileName, file?.lineCount)
      })
    ).toBeUndefined()
  })
  it('getElementWithHighestOccurence should work as intended.', () => {
    const testArr = ['Hilll-Gorczany', 'Kunze-Bernhard', 'Hilll-Gorczany', 'Hilll-Gorczany']
    expect(getElementWithHighestOccurence(testArr)).toEqual('Hilll-Gorczany')
  })

  it('getBrandsForEachCategory should work as intended.', () => {
    const testArr = {
      'Intelligent Copper Knife': [
        'Hilll-Gorczany',
        'Kunze-Bernhard',
        'Hilll-Gorczany',
        'Hilll-Gorczany'
      ],
      'Small Granite Shoes': ['Rowe and Legros']
    }
    expect(getBrandsForEachCategory(sampleTwo)).toEqual(testArr as unknown as CategoryWithBrands)
  })

  it('getQuantityForEachCategory should work as intended.', () => {
    const testArr = { 'Intelligent Copper Knife': 12, 'Small Granite Shoes': 4 }
    expect(getQuantityForEachCategory(sampleTwo)).toEqual(testArr as unknown as Quantity)
  })
})

describe('Test /api/csv endpoint response', () => {
  it('Should return status of 200', async () => {
    const response = await request.get('/api/csv')
    expect(response.status).toBe(200)
  })
  it('sampleOne should exist.', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../../csvFiles/sampleOne.csv'))).toBeTruthy()
  })
  it('sampleTwo should exist.', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../../csvFiles/sampleTwo.csv'))).toBeTruthy()
  })
  it('0_sampleOne should not exist.', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../../csvFiles/0_sampleOne.csv'))).toBeTruthy()
  })
  it('1_sampleOne should not exist.', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../../csvFiles/1_sampleOne.csv'))).toBeTruthy()
  })
  it('0_sampleTwo should not exist.', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../../csvFiles/0_sampleTwo.csv'))).toBeTruthy()
  })
  it('1_sampleTwo should not exist.', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../../csvFiles/1_sampleTwo.csv'))).toBeTruthy()
  })
})
