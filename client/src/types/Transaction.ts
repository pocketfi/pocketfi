import {Category} from "./Category";

export class Transaction {
  id: string;
  transactionType: string;
  category: Category;
  place: string;
  price: number;
  currency: string;
  created: Date;

  constructor(id: string, transactionType: string, category: Category,
              place: string, price: number, currency: string, created: Date) {
    this.id = id;
    this.transactionType = transactionType;
    this.category = category;
    this.place = place;
    this.price = price;
    this.currency = currency;
    this.created = created;
  }

}