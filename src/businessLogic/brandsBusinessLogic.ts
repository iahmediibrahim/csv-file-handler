import { CategoryWithBrands } from '../routes/api/types'

// returns the the item in the array that occurs the most
export const getElementWithHighestOccurence = (arr: any[]) => {
  return arr
    .sort(
      (a: any, b: any) =>
        arr.filter((v: any) => v === a).length - arr.filter((v: any): any => v === b).length
    )
    .pop()
}

// returns brands  for each category
export const getBrandsForEachCategory = (results: any[]): CategoryWithBrands => {
  return results.reduce((acc, cur) => {
    const { name } = cur
    let arr = [cur.brand]
    acc[name] = [...(acc[name] || []), ...arr]
    return acc
  }, {})
}
