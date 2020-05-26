import {Schema, model} from 'mongoose';
import {ITransaction} from "../types/interfaces/ITransaction";
import * as mongoose from "mongoose";

const TransactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  transactionType: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  place: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }

}, {
  _id: true,
  id: true, toJSON: {
    virtuals: true,
    versionKey: true
  }
});


const Transaction = model<ITransaction>('transaction', TransactionSchema);


export default Transaction;