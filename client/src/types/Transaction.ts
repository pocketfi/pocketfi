import {Category} from './Category'

export class Transaction {
  id: string
  transactionType: string
  category: Category
  place: string
  price: number
  currency: string
  created: Date
  description: string

  constructor(id: string, transactionType: string, category: Category,
              place: string, price: number, currency: string, created: Date, description: string) {
    this.id = id
    this.transactionType = transactionType
    this.category = category
    this.place = place
    this.price = price
    this.currency = currency
    this.created = created
    this.description = description
  }

}
