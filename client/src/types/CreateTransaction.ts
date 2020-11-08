export class CreateTransaction {
  transactionType: string
  category: string
  place: string
  price: number
  currency: string

  constructor(transactionType: string, category: string,
              place: string, price: number, currency: string) {
    this.transactionType = transactionType
    this.category = category
    this.place = place
    this.price = price
    this.currency = currency
  }
}
