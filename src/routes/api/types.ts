// data types
export type CsvRow = {
  [key: string]: string
  area: string
  name: string
  quantity: string
  brand: string
}
export type Quantity = {
  category: number
}
export type AverageQuantity = {
  category: string
  average: number
}
export type MostSellingBrand = {
  category: string
  brand: string
}
export type CategoryWithBrands = { category: string[] }
export const sampleOne: CsvRow[] = [
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
export const sampleTwo: CsvRow[] = [
  {
    id: 'ID944806',
    area: 'Willard Vista',
    name: 'Intelligent Copper Knife',
    quantity: '3',
    brand: 'Hilll-Gorczany'
  },
  {
    id: 'ID644525',
    area: 'Roger Centers',
    name: 'Intelligent Copper Knife',
    quantity: '1',
    brand: 'Kunze-Bernhard'
  },
  {
    id: 'ID348204',
    area: 'Roger Centers',
    name: 'Small Granite Shoes',
    quantity: '4',
    brand: 'Rowe and Legros'
  },
  {
    id: 'ID710139',
    area: 'Roger Centers',
    name: 'Intelligent Copper Knife',
    quantity: '4',
    brand: 'Hilll-Gorczany'
  },
  {
    id: 'ID426632',
    area: 'Willa Hollow',
    name: 'Intelligent Copper Knife',
    quantity: '4',
    brand: 'Hilll-Gorczany'
  }
]
