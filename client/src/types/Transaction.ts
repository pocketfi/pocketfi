import {Category} from "./Category";

export class Transaction {
  transactionType: string;
  category: Category;
  place: string;
  price: number;
  currency: string;
  created: Date;

  constructor(transactionType: string, category: Category,
              place: string, price: number, currency: string, created: Date) {
    this.transactionType = transactionType;
    this.category = category;
    this.place = place;
    this.price = price;
    this.currency = currency;
    this.created = created;
  }
}