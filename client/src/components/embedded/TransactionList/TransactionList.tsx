import React from 'react'
import './TransactionList.sass'
import {Transaction} from '../../../types/Transaction';
import {SeparatorWithDate} from '../SeparatorWithDate/SeparatorWithDate';
import moment from 'moment';
import TransactionItem from '../../embedded/TransactionItem/TransactionItem';

export interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onChange: (transaction: Transaction) => void;
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
        {
          this.props.transactions.reverse().map((transaction: any, i: number) => {
              // TODO
              const transactionItem = <TransactionItem
                transaction={transaction}
                onDelete={() => this.props.onDelete(transaction._id)}
                onChange={() => this.props.onChange(transaction)}
                key={transaction._id}
              />;

              if (i === 0 || transactionDates[i] !== transactionDates[i - 1]) {
                return <>
                  <SeparatorWithDate value={transactionDates[i]} key={`sep${transaction._id}`}/>
                  {transactionItem}
                </>
              }

              return transactionItem;
            }
          )
        }
      </div>
    );
  }

}

