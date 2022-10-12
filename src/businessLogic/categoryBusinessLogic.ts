import { Quantity } from '../routes/api/types'

// returns the quantity of each category
export const getQuantityForEachCategory = (results: any[]): Quantity => {
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
