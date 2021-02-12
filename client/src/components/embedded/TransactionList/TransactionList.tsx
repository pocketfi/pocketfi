import React from 'react'
import './TransactionList.sass'
import {Transaction} from '../../../types/Transaction'
import {SeparatorWithDate} from '../SeparatorWithDate/SeparatorWithDate'
import moment from 'moment'
import TransactionItem from '../../embedded/TransactionItem/TransactionItem'
import Filters from '../Filters/Filters'
import {Category} from '../../../types/Category'

export interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void;
  onChange: (transaction: Transaction) => void
  search: (searchText?: string, transactionType?: string, category?: string, place?: string, startDate?: Date, endDate?: Date) => void
  categories: Category[]
  places: string[]
}

export class TransactionList extends React.Component<TransactionListProps> {

  render() {
    const transactionDates = this.props.transactions
      .map((transaction: Transaction) =>
        moment(transaction.created).format('MMM D')
      )
      .reverse()
    return (
      <div className='transaction-list'>
        <Filters
          categories={this.props.categories}
          places={this.props.places}
          search={this.props.search}
        />
        {
          this.props.transactions.reverse().map((transaction: any, i: number) => {
              const transactionItem = <TransactionItem
                transaction={transaction}
                onDelete={() => this.props.onDelete(transaction.id)}
                onChange={t => this.props.onChange(t)}
                key={transaction.id}
              />

              if (i === 0 || transactionDates[i] !== transactionDates[i - 1]) {
                return <>
                  <SeparatorWithDate value={transactionDates[i]} key={`sep${transaction.id}`}/>
                  {transactionItem}
                </>
              }

              return transactionItem
            }
          )
        }
      </div>
    )
  }
}
